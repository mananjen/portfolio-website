import { useEffect, useRef, useState } from "react"
import { site } from "../content/site"
import { useCopyToClipboard } from "../lib/useCopyToClipboard"
import { BaseLink, CtaLink, Icon, IconButton, IconLink, TextButton } from "./link"
import styles from "./Footer.module.css"

// "Design the V3 footer" (issue #38). Layout switches at 36rem of footer width (container query);
// touch-first below 64rem of screen width and mouse-first above it (ADR 0003). Both views render,
// and CSS shows the one that fits.
export function Footer() {
  const { footer, emailAddress, email } = site
  const { status, busy, copy, message } = useCopyToClipboard(emailAddress, {
    messages: { copied: footer.copy.copied, failed: footer.copy.failed },
    resetAfterMs: 2000,
  })
  const copied = status === "copied"
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

  return (
    <>
      <footer id="contact" tabIndex={-1} className={styles.footer}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.invite}>
            <p className={styles.eyebrow}>{footer.eyebrow}</p>
            <CtaLink href={email} className={styles.cta}>{footer.title}</CtaLink>
          </div>

          <div className={styles.email}>
            {/* Mouse-first: the address as text, with a copy button beside it. */}
            <span className={styles.mouseOnly}>
              <span className={styles.address}>{emailAddress}</span>
              <IconButton icon={copied ? "check" : "copy"} label={footer.copy.label}
                tip={copied ? footer.copy.copiedTip : footer.copy.tip}
                className={copied ? styles.copied : undefined} onClick={copy} aria-busy={busy} />
            </span>
            {status === "failed" && <span className={`${styles.mouseOnly} ${styles.failed}`}>{footer.copy.failed}</span>}

            {/* Touch-first: the address itself is the button. */}
            <TextButton tone="plain" className={`${styles.touchOnly} ${styles.tap}`} onClick={copy} aria-busy={busy}
              aria-label={`${footer.copy.label} ${emailAddress}`}>
              <span className={styles.address}>{emailAddress}</span>
              <span className={styles.hint} data-copied={copied ? "" : undefined} aria-hidden="true">
                {copied ? footer.copy.copiedHint : status === "failed" ? footer.copy.failedTouch : footer.copy.tapHint}
              </span>
            </TextButton>

            <span className="visually-hidden" role="status" aria-live="polite">{message}</span>
          </div>

          <div className={styles.social}>
            {footer.social.map(link => <IconLink key={link.href} href={link.href} icon={link.icon} label={link.label} />)}
            {footer.resume.href && (
              // One link: "Résumé ↓" when the footer is wide, the CV badge when it's narrow.
              <BaseLink href={footer.resume.href} download aria-label={footer.resume.name} className={styles.resume}>
                <span className={styles.resumeText}>{footer.resume.label}</span>
                <Icon name="cv" className={styles.resumeBadge} />
              </BaseLink>
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
