/**
 * Sérialise un objet JSON-LD dans un `<script type="application/ld+json">`.
 * Seul endroit du projet où `dangerouslySetInnerHTML` est autorisé (SPEC §11).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
