import { projectLabels } from "../content/site"
import { useCopyToClipboard } from "../lib/useCopyToClipboard"
import { TextButton } from "./link"
import styles from "./CopyCitation.module.css"

export function CopyCitation({ bibtex }: { bibtex: string }) {
  const { status, busy, copy, message } = useCopyToClipboard(bibtex, {
    messages: { copying: projectLabels.copyingBibtex, copied: projectLabels.bibtexCopied, failed: projectLabels.bibtexFailed },
  })

  return (
    <span className={styles.citation}>
      <TextButton onClick={copy} aria-busy={busy}>{projectLabels.copyBibtex}</TextButton>
      <span className={styles.status} role="status" aria-live="polite">{message}</span>
      {status === "failed" && (
        <textarea
          className={styles.bibtex}
          aria-label={projectLabels.bibtexLabel}
          readOnly
          value={bibtex}
          rows={8}
          onFocus={event => event.currentTarget.select()}
        />
      )}
    </span>
  )
}
