import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

/**
 * API du formulaire de contact.
 *
 * Validation entièrement côté serveur (le client ne fait que de la
 * validation d'expérience utilisateur), limitation de débit simple en
 * mémoire par IP, et un honeypot : un champ invisible pour un humain,
 * que seul un robot remplit — on répond alors un faux succès, sans rien
 * traiter, pour ne pas révéler que le piège a été détecté.
 *
 * Aucune donnée personnelle n'est journalisée (pas de `console.log` du
 * corps de la requête). Aucun secret n'est présent dans ce fichier.
 */

// ─────────────────────────── Types de réponse ───────────────────────────

export type ContactFieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'company'
  | 'subject'
  | 'message'
  | 'consent'

export type ContactFieldErrorCode = 'required' | 'too_short' | 'too_long' | 'invalid_format'

export interface ContactSuccessResponse {
  ok: true
}

export interface ContactErrorResponse {
  ok: false
  error: 'validation_error' | 'rate_limited' | 'server_error'
  fieldErrors?: Partial<Record<ContactFieldName, ContactFieldErrorCode>>
}

export type ContactApiResponse = ContactSuccessResponse | ContactErrorResponse

// ─────────────────────────── Payload attendu ───────────────────────────

interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  consent: boolean
  /** Champ honeypot : doit rester vide. Rempli => très probablement un robot. */
  honeypot: string
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.firstName === 'string' &&
    typeof record.lastName === 'string' &&
    typeof record.email === 'string' &&
    typeof record.phone === 'string' &&
    typeof record.company === 'string' &&
    typeof record.subject === 'string' &&
    typeof record.message === 'string' &&
    typeof record.consent === 'boolean' &&
    typeof record.honeypot === 'string'
  )
}

// ─────────────────────────── Limitation de débit ───────────────────────────
// Compteur en mémoire, simple à dessein : suffisant pour un formulaire de
// cabinet comptable à faible trafic. Repart de zéro à chaque redémarrage
// du serveur — c'est un compromis assumé, pas un bug.

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

interface RateEntry {
  count: number
  windowStart: number
}

const rateLimitStore = new Map<string, RateEntry>()

function checkRateLimit(key: string): boolean {
  const now = Date.now()

  // Purge opportuniste des entrées expirées, pour ne pas laisser grossir
  // la map indéfiniment sur un serveur longue durée.
  for (const [entryKey, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(entryKey)
  }

  const entry = rateLimitStore.get(key)
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false
  entry.count += 1
  return true
}

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

// ─────────────────────────── Validation ───────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/

function validate(payload: ContactPayload): Partial<Record<ContactFieldName, ContactFieldErrorCode>> {
  const errors: Partial<Record<ContactFieldName, ContactFieldErrorCode>> = {}

  const firstName = payload.firstName.trim()
  if (!firstName) errors.firstName = 'required'
  else if (firstName.length > 100) errors.firstName = 'too_long'

  const lastName = payload.lastName.trim()
  if (!lastName) errors.lastName = 'required'
  else if (lastName.length > 100) errors.lastName = 'too_long'

  const email = payload.email.trim()
  if (!email) errors.email = 'required'
  else if (email.length > 200 || !EMAIL_RE.test(email)) errors.email = 'invalid_format'

  const phone = payload.phone.trim()
  if (phone && (phone.length > 30 || !PHONE_RE.test(phone))) errors.phone = 'invalid_format'

  if (payload.company.trim().length > 150) errors.company = 'too_long'
  if (payload.subject.trim().length > 150) errors.subject = 'too_long'

  const message = payload.message.trim()
  if (!message) errors.message = 'required'
  else if (message.length < 10) errors.message = 'too_short'
  else if (message.length > 5000) errors.message = 'too_long'

  if (!payload.consent) errors.consent = 'required'

  return errors
}

// ─────────────────────────── Handler ───────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  try {
    if (!checkRateLimit(clientKey(request))) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'validation_error' }, { status: 400 })
    }

    if (!isContactPayload(body)) {
      return NextResponse.json({ ok: false, error: 'validation_error' }, { status: 400 })
    }

    // Honeypot rempli : très probablement un robot. On répond un faux
    // succès sans rien traiter ni révéler que le piège a fonctionné.
    if (body.honeypot.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const fieldErrors = validate(body)
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ ok: false, error: 'validation_error', fieldErrors }, { status: 400 })
    }

    // TODO(email) : envoyer une notification une fois un fournisseur choisi
    // (Resend, Amazon SES, Nodemailer + SMTP…). Structure attendue :
    //
    //   await sendMail({
    //     to: SITE.email,                                  // depuis '@/lib/site'
    //     from: 'no-reply@tmfcompta.be',
    //     replyTo: body.email,
    //     subject: `Nouveau message du site — ${body.subject || 'Contact'}`,
    //     text: [
    //       `${body.firstName} ${body.lastName}`,
    //       body.email,
    //       body.phone,
    //       body.company,
    //       '',
    //       body.message,
    //     ].filter(Boolean).join('\n'),
    //   })
    //
    // La clé de l'API d'envoi se lit depuis une variable d'environnement
    // (ex. process.env.CONTACT_EMAIL_API_KEY), jamais en dur dans ce fichier.

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
