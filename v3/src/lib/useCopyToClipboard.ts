import { useEffect, useRef, useState } from "react"

export type CopyStatus = "idle" | "copying" | "copied" | "failed"

type Options = {
  /** What the live region announces in each state. Empty strings announce nothing. */
  messages: { copying?: string; copied: string; failed: string }
  /** Return to idle this long after a successful copy. Omit to stay "copied". */
  resetAfterMs?: number
}

/**
 * Copies text and tracks the result. Reports success only once the clipboard
 * confirms it. Render `message` in a `role="status"` live region.
 */
export function useCopyToClipboard(text: string, { messages, resetAfterMs }: Options) {
  const [status, setStatus] = useState<CopyStatus>("idle")
  const inFlight = useRef(false)

  useEffect(() => {
    if (status !== "copied" || resetAfterMs === undefined) return
    const timer = window.setTimeout(() => setStatus("idle"), resetAfterMs)
    return () => window.clearTimeout(timer)
  }, [status, resetAfterMs])

  // Controls stay enabled while copying (disabling would drop keyboard focus), so repeat presses are ignored here.
  async function copy() {
    if (inFlight.current) return
    inFlight.current = true
    setStatus("copying")
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(text)
      setStatus("copied")
    } catch {
      setStatus("failed")
    } finally {
      inFlight.current = false
    }
  }

  const message = status === "idle" ? "" : messages[status] ?? ""
  return { status, busy: status === "copying", copy, message }
}
