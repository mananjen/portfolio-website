// PROTOTYPE (throwaway), round 2: "Choose the V3 link styles" (issue #36).
// Round 1 settled (fixed here): B's drawn rule for "Let's talk" and as the provisional base, B's icon links, B's dashed focus ring.
// Arrows only on "Let's talk" and external (new-tab) links. Three open axes, switchable in the yellow bar or by key:
//   ?nav=1-4    header nav, mono labels from C, no arrows        (key N, shift+N backwards)
//   ?arrow=1-5  the arrow glyph on "Let's talk" and external links (key A)
//   ?input=auto|mouse|touch-a|touch-b  mouse-first vs touch-first treatments (key I); auto follows this device
//   ?targets=1  outline touch targets                              (key T)
// Dev server only. Overrides real styles with an injected stylesheet; a DOM pass strips the existing arrows.
import { useEffect, useState, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import { useSearchParams } from "react-router-dom"

type Option = { key: string; name: string; css: string }

// Link kinds from "Inventory V3's links and link-like buttons".
const NAV = `[class*="_nav_"] a`
const CURRENT = `[class*="_nav_"] a[aria-current="page"]`
const ACTION = `.text-link, [class*="_toggle_"], [class*="_copyEmail_"]`
const PLAIN = `[class*="_footerLinks_"] a, main .actions a:not(.text-link), .proto-inline a`
const CTA = `[class*="_contactTitle_"]`
const TITLE = `[class*="_supporting_"] h3 a`
const ICON = `.proto-icon`
const RULED = `${ACTION}, ${PLAIN}, ${CTA}, ${TITLE}`
const ALL = `${NAV}, ${RULED}, ${ICON}`
const ARROWED = `${CTA}, a[target="_blank"]:not(:has(img, svg))`
const TAPPABLE = `${NAV}, ${ACTION}, [class*="_footerLinks_"] a, main .actions a:not(.text-link), ${CTA}, ${TITLE}`

const R = ":root:root" // outranks module rules such as .hero :global(.text-link)
const M = `:root:root[data-proto-input="mouse"]`
const T = `:root:root[data-proto-input^="touch"]`
const TA = `:root:root[data-proto-input="touch-a"]`
const TB = `:root:root[data-proto-input="touch-b"]`

const tint = (pct: number) => `color-mix(in srgb, var(--lk) ${pct}%, transparent)`
const soft = `color-mix(in srgb, currentColor 35%, transparent)`

// Settled in round 1 (B), plus touch/mouse handling.
const base = `
  ${R} { --lk: var(--accent); --lk-ink: var(--background); }
  ${R} [class*="_cobalt_"] { --lk: var(--on-cobalt); --lk-ink: var(--cobalt); }
  [data-proto-hidden] { display: none; }
  #contact { flex-wrap: wrap; }
  ${R} :is(${ALL}) { transition: color .15s, background-color .15s, background-size .25s ease, transform .2s; }
  ${R} :is([class*="_toggle_"], [class*="_copyEmail_"]) { width: fit-content; }

  ${R} :is(${ACTION}) { color: var(--lk); }
  ${R} :where(${RULED}) {
    text-decoration: none; padding-bottom: 3px; box-decoration-break: clone; -webkit-box-decoration-break: clone;
    background-image: linear-gradient(var(--lk), var(--lk)), linear-gradient(${soft}, ${soft});
    background-repeat: no-repeat; background-position: 0 100%, 0 100%; background-size: 0% 2px, 100% 1px;
  }
  ${R} :is(${TITLE}) { background-size: 0% 2px, 0% 1px; }
  ${M} :where(${RULED}):hover { background-size: 100% 2px, 100% 1px; }
  ${R} :is(${CTA}) { padding-bottom: 6px; background-size: 0% 3px, 100% 1px; }
  ${M} :is(${CTA}):hover { background-size: 100% 3px, 100% 1px; }

  ${R} :is(${ICON}) { display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; color: var(--muted); }
  ${M} :is(${ICON}):hover { color: var(--text); transform: translateY(-2px); }

  ${R} :is(${ALL}):focus-visible { outline: 2px dashed var(--lk); outline-offset: 5px; }
  ${R} :where(${RULED}):focus-visible { background-size: 100% 2px, 100% 1px; }

  ${R} :is(${ARROWED})::after { display: inline-block; transition: transform .2s ease; }
  ${M} :is(${ARROWED}):hover::after { transform: translate(2px, -2px); }
  ${M} :is(${CTA}):hover::after { transform: translate(3px, -3px); }

  /* Touch: no hover anywhere; targets grow to 44px; a press tint replaces hover. */
  ${T} :is(${TAPPABLE}) { position: relative; }
  ${T} :is(${TAPPABLE})::before { content: ""; position: absolute; inset: -10px -6px; border-radius: 8px; }
  ${T} :is(${TAPPABLE}):active::before { background: ${tint(18)}; }
  ${T} :is(${ICON}) { width: 44px; height: 44px; }
  ${T} :is(${ICON}):active { background-color: ${tint(18)}; color: var(--text); }
  :root[data-proto-targets] ${T} :is(${TAPPABLE})::before,
  :root[data-proto-targets] ${T} :is(${ICON}) { outline: 1px dashed #fde047; }

  /* Touch A: no hover to reveal the rule, so it's drawn at rest. */
  ${TA} :is(${ACTION}, ${PLAIN}, ${TITLE}) { background-size: 100% 1.5px, 0% 1px; }
  ${TA} :is(${CTA}) { background-size: 100% 3px, 0% 1px; }

  /* Touch B: standalone actions become tinted chips; the nav becomes one scrolling row on narrow screens. */
  ${TB} :is(${ACTION}) {
    display: inline-flex; align-items: center; min-height: 44px; padding: 0 .95em; border-radius: 10px;
    background-image: none; background-color: ${tint(13)};
  }
  @media (max-width: 600px) {
    ${TB} [class*="_nav_"] { flex-basis: 100%; min-width: 0; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-block: 10px; margin-block: -10px; }
    ${TB} :is(${NAV}) { flex: none; white-space: nowrap; }
  }

  @media (prefers-reduced-motion: reduce) { ${R} :is(${ALL}), ${R} :is(${ALL})::after { transition: none; } }
`

const mono = `${R} :is(${NAV}) { font-family: var(--font-mono); font-size: var(--size-label); letter-spacing: .08em; text-transform: uppercase; text-decoration: none; }`

const navOptions: Option[] = [
  {
    key: "1",
    name: "Inverted pill",
    css: `${mono}
      ${R} [class*="_nav_"] { gap: 6px 4px; }
      ${R} :is(${NAV}) { padding: .45em .8em; border-radius: 999px; }
      ${M} :is(${NAV}):not([aria-current]):hover { background-color: color-mix(in srgb, currentColor 10%, transparent); }
      ${R} ${CURRENT} { background-color: var(--text); color: var(--background); }
    `,
  },
  {
    key: "2",
    name: "Accent dot",
    css: `${mono}
      ${R} :is(${NAV}) { color: color-mix(in srgb, currentColor 68%, transparent); }
      ${M} :is(${NAV}):hover { color: inherit; }
      ${R} ${CURRENT} { color: inherit; padding-left: 14px; background: radial-gradient(circle, var(--lk) 0 3px, transparent 3.5px) 0 50% / 8px 8px no-repeat; }
    `,
  },
  {
    key: "3",
    name: "Drawn rule",
    css: `${mono}
      ${R} :is(${NAV}) {
        padding-bottom: 5px; background-repeat: no-repeat; background-position: 0 100%, 0 100%; background-size: 0% 2px, 0% 1px;
        background-image: linear-gradient(var(--lk), var(--lk)), linear-gradient(color-mix(in srgb, currentColor 50%, transparent), color-mix(in srgb, currentColor 50%, transparent));
      }
      ${M} :is(${NAV}):hover { background-size: 0% 2px, 100% 1px; }
      ${R} ${CURRENT} { background-size: 100% 2px, 0% 1px; }
    `,
  },
  {
    key: "4",
    name: "Segmented track",
    css: `${mono}
      ${R} [class*="_nav_"] { gap: 2px; padding: 4px; border: 1px solid color-mix(in srgb, currentColor 22%, transparent); border-radius: 22px; }
      ${R} :is(${NAV}) { padding: .45em .85em; border-radius: 999px; }
      ${M} :is(${NAV}):not([aria-current]):hover { background-color: color-mix(in srgb, currentColor 10%, transparent); }
      ${R} ${CURRENT} { background-color: var(--lk); color: var(--lk-ink); }
    `,
  },
]

const strokeArrow = (width: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='${width}' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M7 7h10v10M7 17 17 7'/%3E%3C/svg%3E")`
const drawn = (size: string, width: number) => `
  content: ""; width: ${size}; height: ${size}; background-color: currentColor;
  -webkit-mask: ${strokeArrow(width)} center / contain no-repeat; mask: ${strokeArrow(width)} center / contain no-repeat;
`
const arrowOptions: Option[] = [
  { key: "1", name: "Glyph, link's own font", css: `${R} :is(${ARROWED})::after { content: "↗"; margin-left: .2em; }` },
  { key: "2", name: "Glyph, mono (round 1 B)", css: `${R} :is(${ARROWED})::after { content: "↗"; margin-left: .4em; font-family: var(--font-mono); font-size: .85em; }` },
  { key: "3", name: "Drawn stroke", css: `${R} :is(${ARROWED})::after { ${drawn(".6em", 2.25)} margin-left: .3em; vertical-align: -.02em; }` },
  { key: "4", name: "Drawn, small + raised", css: `${R} :is(${ARROWED})::after { ${drawn(".45em", 3)} margin-left: .12em; vertical-align: .35em; }` },
  { key: "5", name: "Drawn stroke, accent", css: `${R} :is(${ARROWED})::after { ${drawn(".6em", 2.25)} margin-left: .3em; vertical-align: -.02em; background-color: var(--lk); }` },
]

const inputOptions: Option[] = [
  { key: "auto", name: "Auto (this device)", css: "" },
  { key: "mouse", name: "Mouse", css: "" },
  { key: "touch-a", name: "Touch A: rules drawn", css: "" },
  { key: "touch-b", name: "Touch B: chips", css: "" },
]

function remembered(param: string) {
  try { return sessionStorage.getItem(`prototype-links-${param}`) } catch { return null }
}

function useAxis(param: string, options: Option[]) {
  const [params, setParams] = useSearchParams()
  const current = options.find(o => o.key === (params.get(param) ?? remembered(param))) ?? options[0]
  function cycle(offset: number) {
    const next = options[(options.indexOf(current) + offset + options.length) % options.length]
    try { sessionStorage.setItem(`prototype-links-${param}`, next.key) } catch { /* prototype */ }
    const nextParams = new URLSearchParams(window.location.hash.split("?")[1] ?? "")
    nextParams.set(param, next.key)
    setParams(nextParams, { replace: true, preventScrollReset: true })
  }
  return { current, cycle }
}

// Strip trailing arrows (from content strings or aria-hidden JSX spans); CSS redraws them only where they stay.
function stripArrows() {
  document.querySelectorAll<HTMLElement>("a, button").forEach(el => {
    if (el.closest("[data-proto-bar]")) return
    const last = el.lastChild
    if (last instanceof HTMLElement && last.getAttribute("aria-hidden") === "true") {
      if (/^\s*[→↗↓↑]\s*$/.test(last.textContent ?? "") && !last.hasAttribute("data-proto-hidden")) {
        last.setAttribute("data-proto-hidden", "")
        const before = last.previousSibling
        if (before?.nodeType === Node.TEXT_NODE && /\s$/.test(before.nodeValue ?? "")) before.nodeValue = before.nodeValue!.trimEnd()
      }
      return
    }
    if (last?.nodeType === Node.TEXT_NODE) {
      const match = last.nodeValue?.match(/\s*[→↗↓↑]\s*$/)
      if (match) last.nodeValue = last.nodeValue!.slice(0, match.index)
    }
  })
}

function Specimen() {
  const [footer, setFooter] = useState<HTMLElement | null>(null)
  useEffect(() => setFooter(document.getElementById("contact")), [])
  if (!footer) return null
  return createPortal(
    <div style={specimen}>
      <p className="proto-inline" style={{ margin: 0, maxWidth: "52ch" }}>
        Inline link in body text: the method is described in the <a href="https://aclanthology.org/2026.findings-aacl.203/" target="_blank" rel="noreferrer">paper</a>, and the code is on <a href="https://github.com/mananjen" target="_blank" rel="noreferrer">GitHub</a>.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={specimenLabel}>Icon links / buttons:</span>
        <a className="proto-icon" href="https://github.com/mananjen" target="_blank" rel="noreferrer" aria-label="GitHub"><Placeholder text="GH" /></a>
        <a className="proto-icon" href="https://www.linkedin.com/in/mananjen" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Placeholder text="in" /></a>
        <button className="proto-icon" type="button" aria-label="Copy email address" style={iconButton}><CopyIcon /></button>
        <button className="proto-icon" type="button" aria-label="Back to top" style={iconButton} onClick={() => window.scrollTo({ top: 0 })}><UpIcon /></button>
        <span style={specimenLabel}>(placeholder marks; real ones come with the footer)</span>
      </div>
    </div>,
    footer,
  )
}

const Placeholder = ({ text }: { text: string }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><rect x="1" y="1" width="20" height="20" rx="5" fill="currentColor" /><text x="11" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="system-ui" fill="var(--background)">{text}</text></svg>
)
const CopyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
)
const UpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
)

const finePointer = "(hover: hover) and (pointer: fine)"

export function LinkStylesPrototype() {
  const [params, setParams] = useSearchParams()
  const nav = useAxis("nav", navOptions)
  const arrow = useAxis("arrow", arrowOptions)
  const input = useAxis("input", inputOptions)
  const targets = params.get("targets") === "1"
  const [mouseDevice, setMouseDevice] = useState(() => window.matchMedia(finePointer).matches)
  const resolvedInput = input.current.key === "auto" ? (mouseDevice ? "mouse" : "touch-a") : input.current.key

  function toggleTargets() {
    const nextParams = new URLSearchParams(window.location.hash.split("?")[1] ?? "")
    if (targets) nextParams.delete("targets")
    else nextParams.set("targets", "1")
    setParams(nextParams, { replace: true, preventScrollReset: true })
  }

  useEffect(() => {
    const query = window.matchMedia(finePointer)
    const onChange = () => setMouseDevice(query.matches)
    query.addEventListener("change", onChange)
    const noop = () => {}
    document.addEventListener("touchstart", noop, { passive: true }) // lets iOS Safari apply :active
    return () => { query.removeEventListener("change", onChange); document.removeEventListener("touchstart", noop) }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.protoInput = resolvedInput
    if (targets) root.dataset.protoTargets = ""
    else delete root.dataset.protoTargets
    return () => { delete root.dataset.protoInput; delete root.dataset.protoTargets }
  }, [resolvedInput, targets])

  useEffect(() => {
    stripArrows()
    const observer = new MutationObserver(stripArrows)
    observer.observe(document.body, { subtree: true, childList: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (event.ctrlKey || event.metaKey || event.altKey || target.closest("input, textarea, [contenteditable]")) return
      const offset = event.shiftKey ? -1 : 1
      const key = event.key.toLowerCase()
      if (key === "n") nav.cycle(offset)
      if (key === "a") arrow.cycle(offset)
      if (key === "i") input.cycle(offset)
      if (key === "t") toggleTargets()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const axes = [
    { label: "nav (N)", axis: nav, value: `${nav.current.key}. ${nav.current.name}` },
    { label: "arrow (A)", axis: arrow, value: `${arrow.current.key}. ${arrow.current.name}` },
    { label: "input (I)", axis: input, value: input.current.key === "auto" ? `Auto → ${resolvedInput}` : input.current.name },
  ]

  return (
    <>
      <style>{base + nav.current.css + arrow.current.css}</style>
      <Specimen />
      <div style={bar} role="toolbar" aria-label="Link style prototype" data-proto-bar="">
        {axes.map(({ label, axis, value }) => (
          <div key={label} style={group}>
            <button type="button" style={step} onClick={() => axis.cycle(-1)} aria-label={`Previous ${label}`}>‹</button>
            <div style={{ textAlign: "center", minWidth: 132 }}>
              <div style={{ opacity: .65, fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
              <strong>{value}</strong>
            </div>
            <button type="button" style={step} onClick={() => axis.cycle(1)} aria-label={`Next ${label}`}>›</button>
          </div>
        ))}
        <button type="button" style={{ ...step, width: "auto", padding: "0 10px" }} onClick={toggleTargets} aria-pressed={targets}>
          targets (T): {targets ? "on" : "off"}
        </button>
      </div>
    </>
  )
}

const bar: CSSProperties = {
  position: "fixed", bottom: 12, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
  display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 6, padding: 6,
  width: "max-content", maxWidth: "calc(100vw - 16px)", borderRadius: 16,
  background: "#fde047", color: "#111", font: "12px/1.3 system-ui, sans-serif",
  boxShadow: "0 6px 24px rgba(0,0,0,.45)", letterSpacing: 0,
}
const group: CSSProperties = { display: "flex", alignItems: "center", gap: 4 }
const step: CSSProperties = {
  border: 0, borderRadius: 999, width: 26, height: 26, background: "#111", color: "#fde047", cursor: "pointer", font: "14px system-ui",
}
const specimen: CSSProperties = {
  flexBasis: "100%", display: "grid", gap: 18, marginTop: 8, padding: "18px 20px",
  border: "1px dashed #fde04788", borderRadius: 8,
}
const specimenLabel: CSSProperties = { font: "11px/1.3 system-ui, sans-serif", color: "#fde047", letterSpacing: ".04em" }
const iconButton: CSSProperties = { background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }
