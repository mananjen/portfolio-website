// PROTOTYPE (throwaway): live tuning panel for the 11 V3 text styles on the real pages. Dev server only.
// Sizes scale from 360px to 1440px viewport (rem + vw clamp), capped outside. Values persist in localStorage.
// Fonts load from Google Fonts here purely for comparison; production will self-host via Fontsource.
import { useEffect, useState, type CSSProperties } from "react"

type Style = { min: number; max: number; lh: number; ls: number; weight: number }
type StyleKey = "display" | "title" | "heading" | "subheading" | "body" | "small" | "ui" | "meta" | "label" | "caption" | "code"
type Flow = { min: number; max: number }
type State = { styles: Record<StyleKey, Style>; casl: number; flow: Record<"tight" | "flow" | "loose", Flow> }

const VMIN = 360
const VMAX = 1440

const defaults: State = {
  styles: {
    display: { min: 44, max: 88, lh: 1.02, ls: -0.03, weight: 500 },
    title: { min: 40, max: 64, lh: 1.05, ls: -0.025, weight: 500 },
    heading: { min: 28, max: 40, lh: 1.12, ls: -0.015, weight: 500 },
    subheading: { min: 21, max: 25, lh: 1.2, ls: -0.005, weight: 500 },
    body: { min: 16, max: 18, lh: 1.65, ls: 0, weight: 400 },
    small: { min: 15, max: 16, lh: 1.6, ls: 0, weight: 400 },
    ui: { min: 14, max: 15, lh: 1.5, ls: 0, weight: 400 },
    meta: { min: 12.5, max: 13, lh: 1.45, ls: 0, weight: 400 },
    label: { min: 12, max: 13, lh: 1.5, ls: 0.1, weight: 400 },
    caption: { min: 12, max: 12.5, lh: 1.5, ls: 0, weight: 400 },
    code: { min: 12, max: 13, lh: 1.5, ls: 0, weight: 400 },
  },
  casl: 1,
  flow: { tight: { min: 8, max: 12 }, flow: { min: 14, max: 20 }, loose: { min: 24, max: 36 } },
}

const styleKeys = Object.keys(defaults.styles) as StyleKey[]
const fraunces = "'Fraunces', serif"
const recursive = "'Recursive', sans-serif"
const syne = "'Syne Mono', monospace"
const family: Record<StyleKey, string> = {
  display: fraunces, title: fraunces, heading: fraunces, subheading: fraunces,
  body: recursive, small: recursive, ui: recursive, meta: recursive,
  label: syne, caption: syne, code: syne,
}

// Order matters: later groups win over earlier ones at equal specificity.
const selectors: [StyleKey, string][] = [
  ["body", `body, [class*="_introCopy_"], [class*="_intro_"] > .muted, [class*="_brief_"] p, [class*="_story_"], [class*="_bullets_"] li,
    [class*="_interests_"] p, [class*="_interests_"] li, [class*="_detail_"] [class*="_summary_"], [class*="_art_"] > p`],
  ["small", `[class*="_project_"] [class*="_summary_"], [class*="_lead_"] .muted, [class*="_supporting_"] article p, [class*="_personal_"] .muted, [class*="_context_"] .muted`],
  ["ui", `[class*="_nav_"], .text-link, [class*="_toggle_"], [class*="_footerLinks_"], [class*="_footerLinks_"] [class*="_emailAddress_"],
    [class*="_copyEmail_"], [class*="_citation_"] [class*="_status_"], [class*="_citation_"] [class*="_copy_"], [class*="_context_"], [class*="_brief_"] h3`],
  ["meta", `[class*="_role_"], [class*="_tags_"] li, [class*="_imageLabel_"], [class*="_footerLinks_"] > p:last-child`],
  ["subheading", `h3, [class*="_interests_"] h2, [class*="_wordmark_"], [class*="_number_"]`],
  ["ui", `[class*="_brief_"] h3`],
  ["heading", `h2:not(.eyebrow), [class*="_contactTitle_"]`],
  ["subheading", `[class*="_interests_"] h2`],
  ["title", `h1`],
  ["display", `[class*="_hero_"] h1`],
  ["label", `.eyebrow`],
  ["caption", `figcaption`],
  ["code", `textarea`],
  ["display", `.pt-display`], ["title", `.pt-title`], ["heading", `.pt-heading`], ["subheading", `.pt-subheading`],
  ["body", `.pt-body`], ["small", `.pt-small`], ["ui", `.pt-ui`], ["meta", `.pt-meta`],
  ["label", `.pt-label`], ["caption", `.pt-caption`], ["code", `.pt-code`],
]

const rem = (px: number) => `${+(px / 16).toFixed(4)}rem`
function fluid(min: number, max: number) {
  const slope = (max - min) / (VMAX - VMIN)
  const intercept = min - slope * VMIN
  return `clamp(${rem(Math.min(min, max))}, ${rem(intercept)} + ${+(slope * 100).toFixed(4)}vw, ${rem(Math.max(min, max))})`
}
function sizeAt(min: number, max: number, width: number) {
  const t = Math.min(1, Math.max(0, (width - VMIN) / (VMAX - VMIN)))
  return min + (max - min) * t
}

function cssFor(state: State) {
  const rules = selectors.map(([key, sel]) => {
    const s = state.styles[key]
    const isRecursive = family[key] === recursive
    return `${sel} {
      font-family: ${family[key]} !important; font-size: ${fluid(s.min, s.max)} !important;
      line-height: ${s.lh} !important; letter-spacing: ${s.ls}em !important; font-weight: ${s.weight} !important;
      font-variation-settings: ${isRecursive ? `"CASL" ${state.casl}` : "normal"} !important;
      text-transform: ${key === "label" ? "uppercase" : "none"} !important;
    }`
  })
  const f = state.flow
  return `
    :root { --flow-tight: ${fluid(f.tight.min, f.tight.max)}; --flow: ${fluid(f.flow.min, f.flow.max)}; --flow-loose: ${fluid(f.loose.min, f.loose.max)}; }
    ${rules.join("\n")}
    [class*="_wordmark_"] { font-weight: 600 !important; }
    [class*="_brief_"] h3 { font-weight: 600 !important; }
    [class*="_intro_"] h1 { margin-block: var(--flow-tight) var(--flow) !important; }
    [class*="_lead_"] h2, [class*="_project_"] h2, [class*="_art_"] h2, [class*="_personal_"] h2 { margin-block: var(--flow-tight) var(--flow) !important; }
    [class*="_interests_"] h2, [class*="_listing_"] > h2 { margin-bottom: var(--flow) !important; }
    [class*="_brief_"] h3 { margin-bottom: var(--flow-tight) !important; }
    [class*="_story_"] p + p { margin-top: var(--flow) !important; }
    [class*="_bullets_"] li + li, [class*="_interests_"] li + li, [class*="_interests_"] p + p { margin-top: var(--flow-tight) !important; }
  `
}

const storageKey = "prototype-type-scale"
function load(): State {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null")
    if (saved?.styles) return { ...defaults, ...saved, styles: { ...defaults.styles, ...saved.styles }, flow: { ...defaults.flow, ...saved.flow } }
  } catch { /* prototype */ }
  return defaults
}

const samples: [StyleKey, string][] = [
  ["display", "Let’s make sense of things."],
  ["title", "Selected work"],
  ["heading", "Multilingual image–text retrieval"],
  ["subheading", "Machine Learning Engineer, Velocitor"],
  ["body", "I work on language, vision, and the engineering around them. This is the size of a project brief paragraph that someone reads end to end."],
  ["small", "A compact summary that helps a reader decide whether to explore a project."],
  ["ui", "Projects   Experience   About   Read the brief →"],
  ["meta", "Lead researcher · PyTorch · CLIP"],
  ["label", "Selected work / research & engineering"],
  ["caption", "Figure 1. Retrieval pipeline overview."],
  ["code", "@article{jain2026, title={...}}"],
]

export function TypeScalePrototype() {
  const [state, setState] = useState<State>(load)
  const [open, setOpen] = useState(true)
  const [specimen, setSpecimen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)) } catch { /* prototype */ }
  }, [state])
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const setStyle = (key: StyleKey, field: keyof Style, value: number) =>
    setState(s => ({ ...s, styles: { ...s.styles, [key]: { ...s.styles[key], [field]: value } } }))
  const setFlow = (key: keyof State["flow"], field: keyof Flow, value: number) =>
    setState(s => ({ ...s, flow: { ...s.flow, [key]: { ...s.flow[key], [field]: value } } }))
  const json = JSON.stringify(state)

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Recursive:CASL,wght@0..1,300..1000&family=Syne+Mono&display=swap" />
      <style>{cssFor(state)}</style>

      {specimen && (
        <div style={overlay} onClick={() => setSpecimen(false)}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }} onClick={e => e.stopPropagation()}>
            {samples.map(([key, text], i) => (
              <div key={key} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20, alignItems: "baseline", padding: "14px 0",
                borderTop: "1px solid var(--line)", marginTop: key === "subheading" || key === "meta" ? 0 : i ? 10 : 0 }}>
                <code style={{ font: "11px system-ui", color: "#fde047" }}>{key} · {sizeAt(state.styles[key].min, state.styles[key].max, width).toFixed(1)}px</code>
                <div className={`pt-${key}`}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <aside style={{ ...panel, transform: open ? "none" : "translateX(calc(100% - 34px))" }}>
        <button type="button" style={tab} onClick={() => setOpen(o => !o)}>{open ? "›" : "‹"}</button>
        <div style={{ paddingLeft: 30 }}>
          <strong>Type scale</strong> · viewport {width}px ({Math.round(Math.min(100, Math.max(0, (width - VMIN) / (VMAX - VMIN) * 100)))}% of 360→1440)
          <div style={{ display: "flex", gap: 6, margin: "8px 0", flexWrap: "wrap" }}>
            <button type="button" style={btn} onClick={() => setSpecimen(s => !s)}>{specimen ? "Hide" : "Show"} specimen</button>
            <button type="button" style={btn} onClick={() => navigator.clipboard?.writeText(json)}>Copy values</button>
            <button type="button" style={btn} onClick={() => setState(defaults)}>Reset</button>
          </div>
          <label style={row}>
            Recursive casual <input type="range" min={0} max={1} step={0.05} value={state.casl} onChange={e => setState(s => ({ ...s, casl: +e.target.value }))} /> {state.casl}
          </label>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead><tr style={{ opacity: .7 }}><th align="left">style</th><th>now</th><th>min</th><th>max</th><th>lh</th><th>ls em</th><th>wt</th></tr></thead>
            <tbody>
              {styleKeys.map(key => {
                const s = state.styles[key]
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td align="center" style={{ opacity: .7 }}>{sizeAt(s.min, s.max, width).toFixed(1)}</td>
                    <td><input style={num} type="number" step={0.5} value={s.min} onChange={e => setStyle(key, "min", +e.target.value)} /></td>
                    <td><input style={num} type="number" step={0.5} value={s.max} onChange={e => setStyle(key, "max", +e.target.value)} /></td>
                    <td><input style={num} type="number" step={0.01} value={s.lh} onChange={e => setStyle(key, "lh", +e.target.value)} /></td>
                    <td><input style={num} type="number" step={0.005} value={s.ls} onChange={e => setStyle(key, "ls", +e.target.value)} /></td>
                    <td><input style={num} type="number" step={50} min={100} max={900} value={s.weight} onChange={e => setStyle(key, "weight", +e.target.value)} /></td>
                  </tr>
                )
              })}
              {(Object.keys(state.flow) as (keyof State["flow"])[]).map(key => (
                <tr key={key}>
                  <td>flow-{key}</td>
                  <td align="center" style={{ opacity: .7 }}>{sizeAt(state.flow[key].min, state.flow[key].max, width).toFixed(1)}</td>
                  <td><input style={num} type="number" step={1} value={state.flow[key].min} onChange={e => setFlow(key, "min", +e.target.value)} /></td>
                  <td><input style={num} type="number" step={1} value={state.flow[key].max} onChange={e => setFlow(key, "max", +e.target.value)} /></td>
                  <td colSpan={3} />
                </tr>
              ))}
            </tbody>
          </table>
          <textarea readOnly value={json} style={{ width: "100%", height: 56, marginTop: 8, fontSize: 10 }} onFocus={e => e.target.select()} />
        </div>
      </aside>
    </>
  )
}

const panel: CSSProperties = {
  position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "100vw", zIndex: 1000, overflowY: "auto",
  padding: "12px 12px 12px 4px", background: "#fde047", color: "#111", font: "12px/1.4 system-ui, sans-serif",
  boxShadow: "-6px 0 24px rgba(0,0,0,.45)", transition: "transform .2s",
}
const tab: CSSProperties = { position: "absolute", left: 4, top: 12, width: 24, height: 40, border: 0, borderRadius: 6, background: "#111", color: "#fde047", cursor: "pointer", font: "18px system-ui" }
const btn: CSSProperties = { border: 0, borderRadius: 6, padding: "4px 8px", background: "#111", color: "#fde047", cursor: "pointer", font: "12px system-ui" }
const num: CSSProperties = { width: 48, font: "12px system-ui", padding: "2px 3px" }
const row: CSSProperties = { display: "flex", alignItems: "center", gap: 8, margin: "4px 0 8px" }
const overlay: CSSProperties = { position: "fixed", inset: 0, zIndex: 999, overflowY: "auto", padding: "40px 460px 40px 40px", background: "var(--background)", color: "var(--text)" }
