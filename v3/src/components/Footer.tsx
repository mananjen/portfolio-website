import { useEffect, useRef, useState } from "react"
import { site } from "../content/site"
import { classNames } from "../lib/classNames"
import { useCopyToClipboard, type CopyStatus } from "../lib/useCopyToClipboard"
import { CtaLink, IconButton, IconLink, TextButton } from "./link"
import styles from "./Footer.module.css"

// "Design the V3 footer" (issue #38, with its 2026-11-09 amendment). Layout switches at 36rem of footer width
// (container query); touch-first below 64rem of screen width and mouse-first above it (ADR 0003).
// Both email views render, and CSS shows the one that fits.
export function Footer() {
  const { footer, emailAddress, email } = site
  const { copy: copyText } = footer
  const { status, busy, copy, message } = useCopyToClipboard(emailAddress, {
    messages: { copied: copyText.copied, failed: copyText.failed },
    resetAfterMs: 2000,
  })
  const copied = status === "copied"
  // What each email view shows for each copy state.
  const touchHint: Record<CopyStatus, string> = { idle: copyText.tapHint, copying: copyText.tapHint, copied: copyText.copiedHint, failed: copyText.failedTouch }
  const mouseTip = copied ? copyText.copiedTip : copyText.tip

  const smallPrint = useRef<HTMLDivElement>(null)
  const [smallPrintInView, setSmallPrintInView] = useState(false)
  const [pastFirstScreen, setPastFirstScreen] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastFirstScreen(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    // Hand the floating button over to the small print once that row is on screen.
    const observer = typeof IntersectionObserver === "undefined" ? undefined
      : new IntersectionObserver(([entry]) => setSmallPrintInView(entry.isIntersecting), { rootMargin: "0px 0px -24px 0px" })
    if (smallPrint.current) observer?.observe(smallPrint.current)
    return () => {
      window.removeEventListener("scroll", onScroll)
      observer?.disconnect()
    }
  }, [])

  const floatingShown = pastFirstScreen && !smallPrintInView
  const { resume } = footer

  return (
    <>
      <footer id="contact" tabIndex={-1} className={styles.footer}>
        <div className={classNames("container", styles.inner)}>
          <div className={styles.invite}>
            <p className={styles.eyebrow}>{footer.eyebrow}</p>
            <CtaLink href={email} className={styles.cta}>{footer.title}</CtaLink>
          </div>

          <div className={styles.email}>
            {/* Mouse-first: the address as text, with a copy button beside it. */}
            <span className={styles.mouseOnly}>
              <span className={styles.address}>{emailAddress}</span>
              <IconButton icon={copied ? "check" : "copy"} label={copyText.label} tip={mouseTip}
                className={copied ? styles.copied : undefined} onClick={copy} aria-busy={busy} />
            </span>
            {status === "failed" && <span className={classNames(styles.mouseOnly, styles.failed)}>{copyText.failed}</span>}

            {/* Touch-first: the address and its hint are one button. */}
            <TextButton tone="plain" shape="box" className={classNames(styles.touchOnly, styles.tap)} onClick={copy} aria-busy={busy}
              aria-label={copyText.touchLabel(emailAddress)}>
              <span className={styles.address}>{emailAddress}</span>
              <span className={styles.hint} data-copied={copied ? "" : undefined} aria-hidden="true">{touchHint[status]}</span>
            </TextButton>

            <span className="visually-hidden" role="status" aria-live="polite">{message}</span>
          </div>

          <div className={styles.social}>
            {footer.social.map(link => <IconLink key={link.href} href={link.href} icon={link.icon} label={link.label} />)}
            {/* "Résumé ↓" when the footer is wide, the CV badge when it's narrow (see .social in the CSS). */}
            {resume.href && (
              <IconLink {...resume} href={resume.href} className={styles.resume} />
            )}
          </div>

          <div ref={smallPrint} className={styles.smallPrint}>
            <p>{footer.smallPrint(new Date().getFullYear())}</p>
            <IconButton icon="arrowUp" label={footer.backToTop} onClick={backToTop} />
          </div>
        </div>
      </footer>

      <div className={styles.floatingDock}>
        <IconButton icon="arrowUp" label={footer.backToTop} onClick={backToTop}
          className={styles.floating} data-hidden={floatingShown ? undefined : ""}
          tabIndex={floatingShown ? undefined : -1} aria-hidden={floatingShown ? undefined : true} />
      </div>
    </>
  )
}

function backToTop() {
  const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
  // The wordmark: the next Tab reaches the nav.
  document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true })
}
