'use client'

import Link from 'next/link'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import type { ContactApiResponse, ContactFieldErrorCode, ContactFieldName } from '@/app/api/contact/route'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'

interface ContactFormProps {
  locale: Locale
  className?: string
}

type FieldName = 'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'subject' | 'message' | 'consent'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  consent: boolean
  /** Piège anti-spam : reste toujours vide pour un humain. */
  honeypot: string
}

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  consent: false,
  honeypot: '',
}

const FIELD_ORDER: FieldName[] = ['firstName', 'lastName', 'email', 'phone', 'company', 'subject', 'message', 'consent']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/

/**
 * Copie propre à ce formulaire, absente de `@/content/ui` (qui ne porte
 * qu'un unique champ « nom complet », pas prénom/nom séparés). Suit le
 * même principe que les dictionnaires locaux du reste du projet
 * (`Breadcrumbs`, `LangSwitch`…) : pas de texte en dur, tout est traduit.
 */
const COPY: Record<
  Locale,
  {
    firstName: string
    lastName: string
    honeypotLabel: string
    requiredLegend: string
    errorRequired: string
    errorEmail: string
    errorPhone: string
    errorMessageShort: string
    errorTooLong: string
    errorConsent: string
    errorSummaryTitle: string
    errorRateLimited: string
    sendAnother: string
  }
> = {
  fr: {
    firstName: 'Prénom',
    lastName: 'Nom',
    honeypotLabel: 'Laissez ce champ vide',
    requiredLegend: 'obligatoire',
    errorRequired: 'Ce champ est obligatoire.',
    errorEmail: 'Veuillez saisir une adresse email valide.',
    errorPhone: 'Veuillez saisir un numéro de téléphone valide.',
    errorMessageShort: 'Votre message est un peu court (10 caractères minimum).',
    errorTooLong: 'Ce champ dépasse la longueur autorisée.',
    errorConsent: 'Veuillez accepter la politique de confidentialité pour continuer.',
    errorSummaryTitle: 'Veuillez corriger les champs suivants :',
    errorRateLimited: 'Trop de tentatives ont été effectuées. Merci de réessayer dans quelques minutes.',
    sendAnother: 'Envoyer un autre message',
  },
  ro: {
    firstName: 'Prenume',
    lastName: 'Nume',
    honeypotLabel: 'Lăsați acest câmp gol',
    requiredLegend: 'obligatoriu',
    errorRequired: 'Acest câmp este obligatoriu.',
    errorEmail: 'Vă rugăm să introduceți o adresă de email validă.',
    errorPhone: 'Vă rugăm să introduceți un număr de telefon valid.',
    errorMessageShort: 'Mesajul dumneavoastră este puțin cam scurt (minimum 10 caractere).',
    errorTooLong: 'Acest câmp depășește lungimea permisă.',
    errorConsent: 'Vă rugăm să acceptați politica de confidențialitate pentru a continua.',
    errorSummaryTitle: 'Vă rugăm să corectați următoarele câmpuri:',
    errorRateLimited: 'Au fost efectuate prea multe încercări. Vă rugăm să reîncercați peste câteva minute.',
    sendAnother: 'Trimite un alt mesaj',
  },
}

function validateField(field: FieldName, values: FormState, locale: Locale): string | undefined {
  const c = COPY[locale]
  switch (field) {
    case 'firstName':
      return values.firstName.trim() ? undefined : c.errorRequired
    case 'lastName':
      return values.lastName.trim() ? undefined : c.errorRequired
    case 'email': {
      const value = values.email.trim()
      if (!value) return c.errorRequired
      if (!EMAIL_RE.test(value)) return c.errorEmail
      return undefined
    }
    case 'phone': {
      const value = values.phone.trim()
      if (!value) return undefined
      if (!PHONE_RE.test(value)) return c.errorPhone
      return undefined
    }
    case 'message': {
      const value = values.message.trim()
      if (!value) return c.errorRequired
      if (value.length < 10) return c.errorMessageShort
      return undefined
    }
    case 'consent':
      return values.consent ? undefined : c.errorConsent
    default:
      return undefined
  }
}

function serverErrorMessage(field: ContactFieldName, code: ContactFieldErrorCode, locale: Locale): string {
  const c = COPY[locale]
  if (code === 'invalid_format' && field === 'email') return c.errorEmail
  if (code === 'invalid_format' && field === 'phone') return c.errorPhone
  if (code === 'too_short') return c.errorMessageShort
  if (code === 'too_long') return c.errorTooLong
  if (field === 'consent') return c.errorConsent
  return c.errorRequired
}

export function ContactForm({ locale, className }: ContactFormProps) {
  const ui = UI[locale]
  const copy = COPY[locale]

  const [values, setValues] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const summaryRef = useRef<HTMLDivElement>(null)

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }) as FormState)
  }

  function handleChange(field: FieldName, value: string | boolean) {
    const nextValues = { ...values, [field]: value } as FormState
    updateField(field, value as FormState[typeof field])
    if (touched[field] || submitAttempted) {
      const message = validateField(field, nextValues, locale)
      setErrors((prev) => {
        const next = { ...prev }
        if (message) next[field] = message
        else delete next[field]
        return next
      })
    }
  }

  function handleTextInput(field: FieldName) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(field, event.target.value)
  }

  function handleBlur(field: FieldName) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      const message = validateField(field, values, locale)
      setErrors((prev) => {
        const next = { ...prev }
        if (message) next[field] = message
        else delete next[field]
        return next
      })
    }
  }

  function focusSummarySoon() {
    window.requestAnimationFrame(() => summaryRef.current?.focus())
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    setGlobalError(null)

    const allTouched: Partial<Record<FieldName, boolean>> = {}
    for (const field of FIELD_ORDER) allTouched[field] = true
    setTouched(allTouched)

    const nextErrors: Partial<Record<FieldName, string>> = {}
    for (const field of FIELD_ORDER) {
      const message = validateField(field, values, locale)
      if (message) nextErrors[field] = message
    }
    setErrors(nextErrors)
    setSubmitAttempted(true)

    if (Object.keys(nextErrors).length > 0) {
      focusSummarySoon()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = (await response.json()) as ContactApiResponse

      if (response.ok && data.ok) {
        setStatus('success')
        return
      }

      setStatus('idle')
      if (response.status === 429) {
        setGlobalError(copy.errorRateLimited)
      } else if (response.status === 400 && !data.ok && data.fieldErrors) {
        const mapped: Partial<Record<FieldName, string>> = {}
        for (const [field, code] of Object.entries(data.fieldErrors)) {
          mapped[field as FieldName] = serverErrorMessage(field as ContactFieldName, code, locale)
        }
        setErrors(mapped)
      } else {
        setGlobalError(ui.form.errorText)
      }
      focusSummarySoon()
    } catch {
      setStatus('idle')
      setGlobalError(ui.form.errorText)
      focusSummarySoon()
    }
  }

  function resetForm() {
    setValues(INITIAL_STATE)
    setErrors({})
    setTouched({})
    setSubmitAttempted(false)
    setGlobalError(null)
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div role="status" className={`rounded-lg border border-c2/25 bg-c2-bg p-8 ${className ?? ''}`}>
        <div className="flex items-start gap-3">
          <Icon name="check-circle" size={28} className="mt-0.5 shrink-0 text-c2" />
          <div>
            <p className="font-display text-xl text-ink">{ui.form.successTitle}</p>
            <p className="mt-2 leading-relaxed text-ink-2">{ui.form.successText}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 inline-flex min-h-11 items-center rounded border border-line-2 bg-paper px-5 text-sm font-medium text-brand transition-colors duration-200 ease-out-soft hover:border-brand hover:bg-brand-tint"
        >
          {copy.sendAnother}
        </button>
      </div>
    )
  }

  const showSummary = (submitAttempted && Object.keys(errors).length > 0) || globalError !== null
  const inputBase =
    'mt-1.5 h-11 w-full rounded border bg-paper px-3.5 text-[0.95rem] text-ink transition-colors duration-200 ease-out-soft placeholder:text-ink-3'
  const errorBorder = 'border-bad'
  const okBorder = 'border-line-2'

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      {showSummary && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-lg border border-bad/30 bg-bad/5 p-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-bad"
        >
          {Object.keys(errors).length > 0 ? (
            <>
              <p className="font-medium text-bad">{copy.errorSummaryTitle}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {FIELD_ORDER.filter((field) => errors[field]).map((field) => (
                  <li key={field}>
                    <a href={`#field-${field}`} className="text-sm text-bad underline underline-offset-2">
                      {fieldLabel(field, ui, copy)} — {errors[field]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-medium text-bad">{globalError}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="field-firstName" className="block text-sm font-medium text-ink">
            {copy.firstName} <RequiredMark label={copy.requiredLegend} />
          </label>
          <input
            id="field-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? 'field-firstName-error' : undefined}
            value={values.firstName}
            onChange={handleTextInput('firstName')}
            onBlur={handleBlur('firstName')}
            className={`${inputBase} ${errors.firstName ? errorBorder : okBorder}`}
          />
          {errors.firstName && (
            <p id="field-firstName-error" role="alert" className="mt-1.5 text-sm text-bad">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-lastName" className="block text-sm font-medium text-ink">
            {copy.lastName} <RequiredMark label={copy.requiredLegend} />
          </label>
          <input
            id="field-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            aria-required="true"
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? 'field-lastName-error' : undefined}
            value={values.lastName}
            onChange={handleTextInput('lastName')}
            onBlur={handleBlur('lastName')}
            className={`${inputBase} ${errors.lastName ? errorBorder : okBorder}`}
          />
          {errors.lastName && (
            <p id="field-lastName-error" role="alert" className="mt-1.5 text-sm text-bad">
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-email" className="block text-sm font-medium text-ink">
            {ui.form.email} <RequiredMark label={copy.requiredLegend} />
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'field-email-error' : undefined}
            value={values.email}
            onChange={handleTextInput('email')}
            onBlur={handleBlur('email')}
            className={`${inputBase} ${errors.email ? errorBorder : okBorder}`}
          />
          {errors.email && (
            <p id="field-email-error" role="alert" className="mt-1.5 text-sm text-bad">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-phone" className="block text-sm font-medium text-ink">
            {ui.form.phone} <span className="text-ink-3">({ui.form.optional})</span>
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'field-phone-error' : undefined}
            value={values.phone}
            onChange={handleTextInput('phone')}
            onBlur={handleBlur('phone')}
            className={`${inputBase} ${errors.phone ? errorBorder : okBorder}`}
          />
          {errors.phone && (
            <p id="field-phone-error" role="alert" className="mt-1.5 text-sm text-bad">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-company" className="block text-sm font-medium text-ink">
            {ui.form.company} <span className="text-ink-3">({ui.form.optional})</span>
          </label>
          <input
            id="field-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleTextInput('company')}
            onBlur={handleBlur('company')}
            className={`${inputBase} ${okBorder}`}
          />
        </div>

        <div>
          <label htmlFor="field-subject" className="block text-sm font-medium text-ink">
            {ui.form.subject} <span className="text-ink-3">({ui.form.optional})</span>
          </label>
          <input
            id="field-subject"
            name="subject"
            type="text"
            autoComplete="off"
            value={values.subject}
            onChange={handleTextInput('subject')}
            onBlur={handleBlur('subject')}
            className={`${inputBase} ${okBorder}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="field-message" className="block text-sm font-medium text-ink">
          {ui.form.message} <RequiredMark label={copy.requiredLegend} />
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={5}
          autoComplete="off"
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'field-message-error' : undefined}
          value={values.message}
          onChange={handleTextInput('message')}
          onBlur={handleBlur('message')}
          className={`mt-1.5 w-full rounded border bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink transition-colors duration-200 ease-out-soft placeholder:text-ink-3 ${errors.message ? errorBorder : okBorder}`}
        />
        {errors.message && (
          <p id="field-message-error" role="alert" className="mt-1.5 text-sm text-bad">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot : invisible et hors du parcours au clavier pour un humain. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="field-website">{copy.honeypotLabel}</label>
        <input
          id="field-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(event) => updateField('honeypot', event.target.value)}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="field-consent" className="flex items-start gap-3 text-sm text-ink-2">
          <input
            id="field-consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'field-consent-error' : undefined}
            checked={values.consent}
            onChange={(event) => handleChange('consent', event.target.checked)}
            onBlur={handleBlur('consent')}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line-2 accent-brand"
          />
          <span>
            {ui.form.consent}{' '}
            <Link
              href={path(locale, 'privacy')}
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-2"
            >
              {ui.nav.privacy}
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id="field-consent-error" role="alert" className="mt-1.5 text-sm text-bad">
            {errors.consent}
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-3">* — {copy.requiredLegend}</p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-brand px-6 text-base font-medium text-paper transition-colors duration-200 ease-out-soft hover:bg-brand-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {status === 'submitting' && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper"
          />
        )}
        {status === 'submitting' ? ui.form.sending : ui.form.submit}
      </button>
    </form>
  )
}

function RequiredMark({ label }: { label: string }) {
  return (
    <span aria-hidden="true" className="text-bad">
      * <span className="sr-only">({label})</span>
    </span>
  )
}

function fieldLabel(
  field: FieldName,
  ui: (typeof UI)[Locale],
  copy: (typeof COPY)[Locale],
): string {
  switch (field) {
    case 'firstName':
      return copy.firstName
    case 'lastName':
      return copy.lastName
    case 'email':
      return ui.form.email
    case 'phone':
      return ui.form.phone
    case 'company':
      return ui.form.company
    case 'subject':
      return ui.form.subject
    case 'message':
      return ui.form.message
    case 'consent':
      return ui.form.consent
    default:
      return field
  }
}
