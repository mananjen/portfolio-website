// PROTOTYPE (throwaway), round 3: round-2 picks (Fraunces / Inter / Courier Prime) first on each axis, then wilder options.
// URL params ?display=&body=&label=&size= (remembered per tab). Dev server only.
// Fonts load from Google Fonts here purely for comparison; the chosen fonts will be self-hosted via Fontsource.
import { useState, type CSSProperties } from "react"
import { useSearchParams } from "react-router-dom"

type Option = { key: string; name: string; stack?: string; query?: string; weight?: number; tracking?: [string, string, string]; extra?: string; px?: number }
type Axis = "display" | "body" | "label" | "size"

const fraunces = "Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1"

const options: Record<Axis, Option[]> = {
  display: [
    { key: "fraunces", name: "Fraunces ✓", stack: "'Fraunces', serif", query: fraunces, weight: 500, tracking: ["-.03em", "-.02em", "-.01em"] },
    { key: "wonky", name: "Fraunces soft + wonky", stack: "'Fraunces', serif", query: fraunces, weight: 600, tracking: ["-.035em", "-.02em", "-.01em"], extra: `font-variation-settings: "SOFT" 100, "WONK" 1;` },
    { key: "frauncesitalic", name: "Fraunces italic", stack: "'Fraunces', serif", query: fraunces, weight: 400, tracking: ["-.03em", "-.02em", "-.01em"], extra: `font-style: italic; font-variation-settings: "SOFT" 50, "WONK" 1;` },
    { key: "syne", name: "Syne (extended)", stack: "'Syne', sans-serif", query: "Syne:wght@400;500;600;700;800", weight: 700, tracking: ["-.04em", "-.03em", "-.01em"] },
    { key: "unbounded", name: "Unbounded", stack: "'Unbounded', sans-serif", query: "Unbounded:wght@400;500;600;700", weight: 500, tracking: ["-.05em", "-.035em", "-.015em"] },
    { key: "bigshoulders", name: "Big Shoulders (condensed)", stack: "'Big Shoulders Display', sans-serif", query: "Big+Shoulders+Display:wght@400;500;600;700;800", weight: 800, tracking: ["-.01em", "0", ".01em"] },
    { key: "gloock", name: "Gloock (high contrast)", stack: "'Gloock', serif", query: "Gloock", weight: 400, tracking: ["-.025em", "-.015em", "0"] },
    { key: "bodoni", name: "Bodoni Moda", stack: "'Bodoni Moda', serif", query: "Bodoni+Moda:wght@400;500;600;700", weight: 500, tracking: ["-.03em", "-.02em", "-.005em"] },
    { key: "majormono", name: "Major Mono Display", stack: "'Major Mono Display', monospace", query: "Major+Mono+Display", weight: 400, tracking: ["-.04em", "-.03em", "-.01em"] },
  ],
  body: [
    { key: "inter", name: "Inter ✓", stack: "'Inter', sans-serif", query: "Inter:wght@400;500;600;700" },
    { key: "atkinson", name: "Atkinson Hyperlegible", stack: "'Atkinson Hyperlegible', sans-serif", query: "Atkinson+Hyperlegible:wght@400;700" },
    { key: "recursive", name: "Recursive (casual)", stack: "'Recursive', sans-serif", query: "Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1", extra: `font-variation-settings: "CASL" 1;` },
    { key: "literata", name: "Literata (serif body)", stack: "'Literata', serif", query: "Literata:wght@400;500;600" },
    { key: "spacegrotesk", name: "Space Grotesk", stack: "'Space Grotesk', sans-serif", query: "Space+Grotesk:wght@400;500;600;700" },
  ],
  label: [
    { key: "courier", name: "Courier Prime ✓", stack: "'Courier Prime', monospace", query: "Courier+Prime:wght@400;700" },
    { key: "elite", name: "Special Elite", stack: "'Special Elite', monospace", query: "Special+Elite" },
    { key: "vt323", name: "VT323 (terminal)", stack: "'VT323', monospace", query: "VT323" },
    { key: "silkscreen", name: "Silkscreen (pixel)", stack: "'Silkscreen', monospace", query: "Silkscreen:wght@400;700" },
    { key: "xanh", name: "Xanh Mono", stack: "'Xanh Mono', monospace", query: "Xanh+Mono" },
    { key: "synemono", name: "Syne Mono", stack: "'Syne Mono', monospace", query: "Syne+Mono" },
    { key: "majormono", name: "Major Mono Display", stack: "'Major Mono Display', monospace", query: "Major+Mono+Display" },
  ],
  size: [
    { key: "12", name: "12px (+1) ✓", px: 12 },
    { key: "13", name: "13px (+2)", px: 13 },
    { key: "14", name: "14px (+3)", px: 14 },
    { key: "11", name: "11px (current)", px: 11 },
  ],
}

const axes: Axis[] = ["display", "body", "label", "size"]
const axisLabel: Record<Axis, string> = { display: "headings", body: "body", label: "labels", size: "label size" }
const allQueries = [...new Set(axes.flatMap(axis => options[axis]).flatMap(o => o.query ? [`family=${o.query}`] : []))].join("&")

function remembered(axis: Axis) {
  try { return sessionStorage.getItem(`prototype-font-${axis}`) } catch { return null }
}

function stylesFor({ display, body, label, size }: Record<Axis, Option>) {
  const px = size.px!
  return `
    :root { font-family: ${body.stack}; ${body.extra ?? ""} }
    h1, h2, h3, [class*="_wordmark_"], [class*="_contactTitle_"], [class*="_number_"], [class*="_personal_"] h2 {
      font-family: ${display.stack}; font-weight: ${display.weight}; ${display.extra ?? ""}
    }
    h1 { letter-spacing: ${display.tracking![0]}; }
    h2, [class*="_contactTitle_"] { letter-spacing: ${display.tracking![1]}; }
    h3 { letter-spacing: ${display.tracking![2]}; }
    [class*="_brief_"] h3 { font-family: ${body.stack}; font-weight: 600; letter-spacing: 0; font-style: normal; font-variation-settings: normal; }
    .eyebrow, figcaption, textarea { font-family: ${label.stack}; }
    .eyebrow { font-size: ${px}px; }
    figcaption { font-size: ${px - 1}px; }
  `
}

export function FontPairingPrototype() {
  const [params, setParams] = useSearchParams()
  const [, rerender] = useState(0)

  const current = Object.fromEntries(axes.map(axis => {
    const key = params.get(axis) ?? remembered(axis)
    return [axis, options[axis].find(o => o.key === key) ?? options[axis][0]]
  })) as Record<Axis, Option>

  function cycle(axis: Axis, offset: number) {
    const list = options[axis]
    const next = list[(list.indexOf(current[axis]) + offset + list.length) % list.length]
    try { sessionStorage.setItem(`prototype-font-${axis}`, next.key) } catch { /* prototype */ }
    const nextParams = new URLSearchParams(params)
    for (const a of axes) nextParams.set(a, a === axis ? next.key : current[a].key)
    setParams(nextParams, { replace: true, preventScrollReset: true })
    rerender(n => n + 1)
  }

  return (
    <>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${allQueries}&display=swap`} />
      <style>{stylesFor(current)}</style>
      <div style={bar} role="toolbar" aria-label="Font prototype">
        {axes.map(axis => (
          <div key={axis} style={group}>
            <button type="button" style={arrow} onClick={() => cycle(axis, -1)} aria-label={`Previous ${axisLabel[axis]}`}>←</button>
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{ opacity: .65, fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{axisLabel[axis]}</div>
              <strong>{current[axis].name}</strong>
            </div>
            <button type="button" style={arrow} onClick={() => cycle(axis, 1)} aria-label={`Next ${axisLabel[axis]}`}>→</button>
          </div>
        ))}
      </div>
    </>
  )
}

const bar: CSSProperties = {
  position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
  display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, padding: 8, borderRadius: 20, maxWidth: "calc(100vw - 16px)",
  background: "#fde047", color: "#111", font: "12px/1.3 system-ui, sans-serif",
  boxShadow: "0 6px 24px rgba(0,0,0,.45)", letterSpacing: 0,
}
const group: CSSProperties = { display: "flex", alignItems: "center", gap: 6 }
const arrow: CSSProperties = {
  border: 0, borderRadius: 999, width: 28, height: 28, background: "#111", color: "#fde047", cursor: "pointer", font: "14px system-ui",
}
