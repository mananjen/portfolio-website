// PROTOTYPE (throwaway): "Design the V3 footer" (issue #38), round 3.
// Settled: split layout (from 36rem of footer width up), LinkedIn's own PNG, back to top in the small-print row (mouse),
// phones keep the icons in a row beside "Let's talk", résumé is "Résumé ↓" (a download link) wide and a CV badge narrow.
// Open axes, switchable in the yellow bar (top of the page) or by key:
//   ?dock=sticky|handover|space  stop the floating back-to-top covering the small print (touch)   (key D, shift+D backwards)
//   ?input=auto|mouse|touch      auto follows this device                                          (key I)
// Touch: the address itself is the copy button (no copy icon), back to top floats at the bottom centre.
// Dev server only. The real footer stays in the DOM but is hidden and loses its id, so /#contact lands here.
// Brand marks render pure white (#fff, no token yet) and are never dimmed.
import { useEffect, useState, type CSSProperties } from "react"
import { useSearchParams } from "react-router-dom"
import text from "../foundation/text.module.css"
import { site } from "../content/site"
import inBugWhite from "./InBug-White.png"

type Option = { key: string; name: string }

const docks: Option[] = [
  { key: "sticky", name: "Docks under the small print" },
  { key: "handover", name: "Hands over to the small print" },
  { key: "space", name: "Extra space below" },
]
const inputs: Option[] = [
  { key: "auto", name: "Auto" },
  { key: "mouse", name: "Mouse" },
  { key: "touch", name: "Touch" },
]

const arrowMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M7 7h10v10M7 17 17 7'/%3E%3C/svg%3E")`
const downMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 4v16M19 13l-7 7-7-7'/%3E%3C/svg%3E")`
const TOUCH = `:root[data-pf-input="touch"]`
const MOUSE = `:root[data-pf-input="mouse"]`

const css = `
  #contact-real { display: none; }
  .pf { margin-top: 50px; border-top: 1px solid var(--line); container: pf / inline-size; }
  .pf p { margin: 0; }
  .pf-inner {
    display: grid; grid-template-columns: 1fr auto; column-gap: 24px;
    grid-template-areas: "invite email" "invite social" "meta meta";
    padding-block: clamp(44px, 7vw, 88px) 20px;
  }
  .pf-invite { grid-area: invite; align-self: end; }
  .pf-email { grid-area: email; justify-self: end; align-self: end; display: flex; align-items: center; gap: 6px; }
  .pf-social { grid-area: social; justify-self: end; align-self: end; display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .pf-meta {
    grid-area: meta; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 24px;
    margin-top: clamp(36px, 6vw, 64px); padding-top: 20px; border-top: 1px solid var(--line); color: var(--muted);
  }
  .pf-eyebrow { color: var(--accent); }
  .pf-cta { display: inline-block; margin-top: var(--flow-tight); color: var(--text); text-decoration: none; }
  .pf-arrow::after {
    content: ""; display: inline-block; width: .45em; height: .45em; margin-left: .12em; vertical-align: .35em;
    background-color: currentColor; -webkit-mask: ${arrowMask} center / contain no-repeat; mask: ${arrowMask} center / contain no-repeat;
    transition: transform .2s ease;
  }
  /* Download links (résumé): the same drawn stroke, pointing down, sitting a little lower than the external arrow. */
  .pf-down::after {
    content: ""; display: inline-block; width: .5em; height: .5em; margin-left: .15em; vertical-align: .12em;
    background-color: currentColor; -webkit-mask: ${downMask} center / contain no-repeat; mask: ${downMask} center / contain no-repeat;
    transition: transform .2s ease;
  }
  .pf-text-link { color: var(--accent); text-decoration: none; margin-left: 6px; }
  .pf-resume-cv { display: none !important; }
  .pf-address { color: var(--text); overflow-wrap: anywhere; }
  .pf-fail { color: var(--muted); }

  .pf-icon {
    position: relative; display: inline-grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%;
    background: none; color: var(--muted); cursor: pointer; transition: color .15s, transform .2s, background-color .15s;
  }
  .pf-brand { color: #fff; }
  .pf-doc { color: var(--text); }
  .pf-copied { color: var(--accent); }
  .pf a:focus-visible, .pf button:focus-visible, .pf-float:focus-visible { outline: 2px dashed var(--accent); outline-offset: 5px; }

  /* Mouse: hover lifts; icon-only controls show their name as a small tip on hover or keyboard focus. */
  ${MOUSE} .pf-cta:hover.pf-arrow::after { transform: translate(3px, -3px); }
  ${MOUSE} .pf-text-link:hover.pf-down::after { transform: translateY(2px); }
  ${MOUSE} .pf-icon:hover { color: var(--text); transform: translateY(-2px); }
  ${MOUSE} .pf-brand:hover { color: #fff; }
  ${MOUSE} .pf-icon[data-tip]::after {
    content: attr(data-tip); position: absolute; bottom: calc(100% + 8px); left: 50%; translate: -50% 4px;
    padding: 3px 8px; border-radius: 6px; background: var(--surface); color: var(--text); white-space: nowrap;
    font-family: var(--font-mono); font-size: var(--size-caption); line-height: var(--leading-caption);
    opacity: 0; pointer-events: none; transition: opacity .15s, translate .15s;
  }
  ${MOUSE} .pf-icon[data-tip]:is(:hover, :focus-visible)::after { opacity: 1; translate: -50% 0; }

  /* Touch: 44px targets, a press tint instead of hover, the address is the copy button. */
  ${TOUCH} .pf-icon { width: 44px; height: 44px; }
  ${TOUCH} .pf-social { gap: 2px; }
  ${TOUCH} .pf-icon:active, ${TOUCH} .pf-float:active, ${TOUCH} .pf-tap:active { background-color: color-mix(in srgb, var(--accent) 18%, transparent); }
  ${TOUCH} .pf-email { min-height: 32px; }
  .pf-tap {
    position: relative; display: grid; justify-items: start; gap: 2px; margin: -8px -10px; padding: 8px 10px; border: 0; border-radius: 10px;
    background: none; color: inherit; font: inherit; text-align: start; cursor: pointer; transition: background-color .15s;
  }
  .pf-hint { color: var(--muted); }
  .pf-hint[data-copied] { color: var(--accent); }
  /* Wide: the hint hangs below the address, out of the flow, so the right column lines up as it does with a mouse. */
  @container pf (inline-size >= 36rem) {
    .pf-tap { justify-items: end; text-align: end; }
    .pf-hint { position: absolute; top: calc(100% - 7px); right: 10px; white-space: nowrap; }
  }

  /* Floating back to top, bottom centre. The dock option decides what happens when it reaches the small print. */
  .pf-float {
    display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border-radius: 50%;
    border: 1px solid var(--line); background: var(--surface); color: var(--text); cursor: pointer; pointer-events: auto;
    transition: opacity .2s, translate .2s, visibility .2s, background-color .15s;
  }
  .pf-float[data-hidden] { opacity: 0; visibility: hidden; translate: 0 8px; }
  .pf-float-dock {
    display: flex; justify-content: center; pointer-events: none; z-index: 900;
    position: fixed; left: 0; right: 0; bottom: max(16px, env(safe-area-inset-bottom));
  }
  /* sticky: rides the bottom of the screen, then settles into its own row under the small print at the end of the page. */
  .pf-float-dock[data-dock="sticky"] { position: sticky; padding-bottom: 20px; bottom: max(0px, env(safe-area-inset-bottom)); }
  /* space: the footer ends with room for the button, so at the end of the page the small print sits above it. */
  ${TOUCH} .pf[data-dock="space"] .pf-inner { padding-bottom: 84px; }

  /* Narrow footer: the links stay beside "Let's talk"; the address takes its own row. */
  @container pf (inline-size < 36rem) {
    .pf-cta { font-size: var(--size-heading); line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); }
    .pf-inner { grid-template-areas: "invite social" "email email" "meta meta"; }
    .pf-email { justify-self: start; margin-top: clamp(28px, 6vw, 40px); }
    .pf-social { margin-top: 0; align-self: end; }
    .pf-resume-text { display: none; }
    .pf-resume-cv { display: inline-grid !important; }
  }

  @media (prefers-reduced-motion: reduce) { .pf *, .pf *::after, .pf-float { transition: none !important; } }
`

function remembered(param: string) {
  try { return sessionStorage.getItem(`prototype-footer-${param}`) } catch { return null }
}

function useAxis(param: string, options: Option[]) {
  const [params, setParams] = useSearchParams()
  const current = options.find(o => o.key === (params.get(param) ?? remembered(param))) ?? options[0]
  function cycle(offset: number) {
    const next = options[(options.indexOf(current) + offset + options.length) % options.length]
    try { sessionStorage.setItem(`prototype-footer-${param}`, next.key) } catch { /* prototype */ }
    const nextParams = new URLSearchParams(window.location.hash.split("?")[1] ?? "")
    nextParams.set(param, next.key)
    setParams(nextParams, { replace: true, preventScrollReset: true })
  }
  return { current, cycle }
}

function backToTop() {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
  document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true }) // the wordmark; the next Tab reaches the nav
}

const touchQuery = "(hover: none), (pointer: coarse)"

export function FooterPrototype() {
  const dock = useAxis("dock", docks)
  const input = useAxis("input", inputs)
  const [metaInView, setMetaInView] = useState(false)
  const [touchDevice, setTouchDevice] = useState(() => window.matchMedia(touchQuery).matches)
  const touch = input.current.key === "auto" ? touchDevice : input.current.key === "touch"
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle")
  const [pastFirstScreen, setPastFirstScreen] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const real = document.querySelector<HTMLElement>("footer#contact:not(.pf)")
    real?.setAttribute("id", "contact-real")
    const meta = document.querySelector(".pf-meta")
    const observer = new IntersectionObserver(([entry]) => setMetaInView(entry.isIntersecting), { rootMargin: "0px 0px -24px 0px" })
    if (meta) observer.observe(meta)
    return () => { real?.setAttribute("id", "contact"); observer.disconnect() }
  }, [])

  useEffect(() => {
    const query = window.matchMedia(touchQuery)
    const onChange = () => setTouchDevice(query.matches)
    query.addEventListener("change", onChange)
    const onScroll = () => setPastFirstScreen(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const noop = () => {}
    document.addEventListener("touchstart", noop, { passive: true }) // lets iOS Safari apply :active
    return () => {
      query.removeEventListener("change", onChange)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("touchstart", noop)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.pfInput = touch ? "touch" : "mouse"
    return () => { delete root.dataset.pfInput }
  }, [touch])

  useEffect(() => {
    if (copy !== "copied") return
    const timer = window.setTimeout(() => setCopy("idle"), 2000)
    return () => window.clearTimeout(timer)
  }, [copy])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (event.ctrlKey || event.metaKey || event.altKey || target.closest("input, textarea, [contenteditable]")) return
      const axis = { d: dock, i: input }[event.key.toLowerCase()]
      axis?.cycle(event.shiftKey ? -1 : 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(site.emailAddress)
      setCopy("copied")
    } catch {
      setCopy("failed")
    }
  }

  // A download link: same-origin PDF with the download attribute; the name says what happens.
  const resumeHref = "#resume-placeholder"
  const resumeLink = (
    <>
      <a className="pf-text-link pf-down pf-resume-text" href={resumeHref} download aria-label="Download résumé (PDF)">Résumé</a>
      <a className="pf-icon pf-doc pf-resume-cv" href={resumeHref} download aria-label="Download résumé (PDF)" data-tip="Résumé (PDF)"><CvBadge /></a>
    </>
  )
  const floating = touch && !(dock.current.key === "handover" && metaInView)
  const rowTop = !touch || (dock.current.key === "handover" && metaInView)

  return (
    <>
      <style>{css}</style>
      <footer id="contact" tabIndex={-1} className="pf" data-dock={dock.current.key}>
        <div className="container pf-inner">
          <div className="pf-invite">
            <p className={`${text.label} pf-eyebrow`}>{site.footer.eyebrow}</p>
            <a className={`${text.title} pf-cta pf-arrow`} href={site.email}>{site.footer.title}</a>
          </div>

          <div className={`${text.ui} pf-email`}>
            {touch ? (
              <button type="button" className="pf-tap" onClick={copyEmail} aria-label={`Copy email address ${site.emailAddress}`}>
                <span className="pf-address">{site.emailAddress}</span>
                <span className={`${text.caption} pf-hint`} data-copied={copy === "copied" ? "" : undefined} aria-hidden="true">
                  {copy === "copied" ? "Copied ✓" : copy === "failed" ? "Couldn’t copy. Press and hold to select it." : "Tap to copy"}
                </span>
              </button>
            ) : (
              <>
                <span className="pf-address">{site.emailAddress}</span>
                <button type="button" className={`pf-icon${copy === "copied" ? " pf-copied" : ""}`} onClick={copyEmail}
                  aria-label="Copy email address" data-tip={copy === "copied" ? "Copied" : "Copy email"}>
                  {copy === "copied" ? <CheckIcon /> : <CopyIcon />}
                </button>
                {copy === "failed" && <span className={`${text.meta} pf-fail`}>Couldn’t copy. Select the address to copy it.</span>}
              </>
            )}
            <span role="status" aria-live="polite" style={visuallyHidden}>{copy === "copied" ? "Email address copied" : ""}</span>
          </div>

          <div className="pf-social">
            <a className="pf-icon pf-brand" href="https://github.com/mananjen" target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)" data-tip="GitHub"><GitHubMark /></a>
            <a className="pf-icon pf-brand" href="https://www.linkedin.com/in/mananjen" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)" data-tip="LinkedIn">
              <img src={inBugWhite} alt="" width={23} height={21} />
            </a>
            {resumeLink}
          </div>

          <div className={`${text.meta} pf-meta`}>
            <p>© {year} {site.name} · Hyderabad, India</p>
            {rowTop && <button type="button" className="pf-icon" onClick={backToTop} aria-label="Back to top" data-tip="Back to top"><UpIcon /></button>}
          </div>
        </div>
      </footer>

      {touch && (
        <div className="pf-float-dock" data-dock={dock.current.key}>
          <button type="button" className="pf-float" onClick={backToTop} aria-label="Back to top"
            data-hidden={pastFirstScreen && floating ? undefined : ""} tabIndex={pastFirstScreen && floating ? undefined : -1} aria-hidden={pastFirstScreen && floating ? undefined : true}>
            <UpIcon />
          </button>
        </div>
      )}

      <div style={bar} role="toolbar" aria-label="Footer prototype" data-proto-bar="">
        {[
          { label: "back to top on touch (D)", axis: dock, value: dock.current.name },
          { label: "input (I)", axis: input, value: input.current.key === "auto" ? `Auto → ${touch ? "touch" : "mouse"}` : input.current.name },
        ].map(({ label, axis, value }) => (
          <div key={label} style={group}>
            <button type="button" style={step} onClick={() => axis.cycle(-1)} aria-label={`Previous ${label}`}>‹</button>
            <div style={{ textAlign: "center", minWidth: 150 }}>
              <div style={{ opacity: .65, fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
              <strong>{value}</strong>
            </div>
            <button type="button" style={step} onClick={() => axis.cycle(1)} aria-label={`Next ${label}`}>›</button>
          </div>
        ))}
      </div>
    </>
  )
}

// Official GitHub Invertocat (brand.github.com kit, GitHub_Invertocat_White.svg), fill switched to currentColor.
const GitHubMark = () => (
  <svg width="22" height="22" viewBox="0 0 98 96" aria-hidden="true">
    <path fill="currentColor" d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
  </svg>
)
// Lucide (ISC): copy, check, arrow-up.
const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
)
const UpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
)
// A rounded square with "CV" knocked out, drawn to sit beside the [in] bug at the same weight.
const CvBadge = () => (
  <svg width="22" height="21" viewBox="0 0 22 21" aria-hidden="true">
    <defs><mask id="pf-cv"><rect width="22" height="21" rx="3" fill="#fff" /><text x="11" y="15" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#000">CV</text></mask></defs>
    <rect width="22" height="21" rx="3" fill="currentColor" mask="url(#pf-cv)" />
  </svg>
)

const visuallyHidden: CSSProperties = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }
const bar: CSSProperties = {
  position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
  display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 6, padding: 6,
  width: "max-content", maxWidth: "calc(100vw - 16px)", borderRadius: 16,
  background: "#fde047", color: "#111", font: "12px/1.3 system-ui, sans-serif",
  boxShadow: "0 6px 24px rgba(0,0,0,.45)", letterSpacing: 0,
}
const group: CSSProperties = { display: "flex", alignItems: "center", gap: 4 }
const step: CSSProperties = {
  border: 0, borderRadius: 999, width: 26, height: 26, background: "#111", color: "#fde047", cursor: "pointer", font: "14px system-ui",
}
