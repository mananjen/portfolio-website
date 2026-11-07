import { useState } from "react"
import { projectLabels } from "../content/site"
import styles from "./CopyCitation.module.css"

export function CopyCitation({ bibtex }: { bibtex: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "failed">("idle")

  async function copy() {
    setStatus("copying")
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(bibtex)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  return (
    <span className={styles.citation}>
      <button type="button" className={`text-link ${styles.copy}`} onClick={copy} disabled={status === "copying"}>
        {projectLabels.copyBibtex}
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {status === "copying" ? projectLabels.copyingBibtex
          : status === "copied" ? projectLabels.bibtexCopied
          : status === "failed" ? projectLabels.bibtexFailed : ""}
      </span>
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
