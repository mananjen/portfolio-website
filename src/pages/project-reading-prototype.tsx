// Throwaway reading study: identical briefs, inline versus dedicated, selected by ?variant=.
// Separate development entry preserves the production site and A–I homepage studies.
import { createRoot } from "react-dom/client"
import { useEffect, useRef, useState } from "react"
import research from "../assets/training_free_cross_modal_alignment.JPG?url"
import "./project-reading-prototype.css"

const slug = "multilingual-image-text-retrieval"
const sections = [
  ["The question", "Can frozen text and vision encoders retrieve images across languages without training a new multimodal model? We adapted ASIF to compare captions and images through their similarities to a shared bank of 1.6 million paired anchors, evaluating retrieval across 36 languages on XM3600."],
  ["My contribution", "As an equal-contributing coauthor, I conducted the initial literature review, investigated candidate datasets and models, and built the complete research codebase. I produced experimental results and helped shape the research through discussions with Usman Shahid and our advisor, Dr. Natalie Parde."],
  ["Making matching practical", "Efficient matching was a practical challenge across nine encoder pairings and multiple hyperparameter settings. I stored sparse image relative representations in an inverted index, allowing caption queries to accumulate matching scores only over shared retained anchors. Cached embeddings separated expensive encoder inference from repeated retrieval experiments."],
  ["What we found", "Our strongest configuration reached 57.5% Recall@10: the correct image appeared among the top ten results for 57.5% of evaluated captions. It remained below strong multimodal and translation-based baselines, while demonstrating multilingual transfer without training a new alignment model."],
  ["A useful trade-off", "An anchor-size ablation exposed a useful trade-off: 10% of the anchor bank achieved 52.56% Recall@10, versus 57.49% with the full bank, using one-tenth of the estimated anchor-relative construction compute and stored anchor embeddings."],
]
const words = sections.map(([, text]) => text).join(" ").split(/\s+/).length
function readState() {
  const params = new URLSearchParams(location.search)
  return { variant: params.get("variant") === "page" ? "page" : "inline", open: params.get("project") === slug, mobile: params.get("viewport") === "mobile" }
}
function Brief() {
  return <div className="brief">{sections.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}<a className="paper" href="https://openreview.net/forum?id=v35BaCj1kc" target="_blank" rel="noreferrer">Read the paper ↗</a></div>
}
function Study() {
  const [state, setState] = useState(readState)
  const [copied, setCopied] = useState(false)
  const focusTarget = useRef<HTMLHeadingElement>(null)
  const opener = useRef<HTMLAnchorElement>(null)
  const restoreFocus = useRef(false)
  const urlFor = (open: boolean) => {
    const url = new URL(location.href)
    url.searchParams.set("variant", state.variant)
    url.searchParams.set("viewport", state.mobile ? "mobile" : "desktop")
    if (open) url.searchParams.set("project", slug); else url.searchParams.delete("project")
    return url
  }
  const navigate = (open: boolean) => {
    history.pushState(null, "", urlFor(open))
    restoreFocus.current = !open
    setState(readState())
    setCopied(false)
  }
  const switchVariant = () => {
    const url = urlFor(state.open)
    url.searchParams.set("variant", state.variant === "inline" ? "page" : "inline")
    history.replaceState(null, "", url)
    setState(readState())
    setCopied(false)
  }
  useEffect(() => {
    const pop = () => { restoreFocus.current = true; setState(readState()); setCopied(false) }
    window.addEventListener("popstate", pop)
    return () => window.removeEventListener("popstate", pop)
  }, [])
  useEffect(() => {
    if (state.open) focusTarget.current?.focus()
    else if (restoreFocus.current) { opener.current?.focus(); restoreFocus.current = false }
  }, [state.open, state.variant])
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof HTMLElement && event.target.closest("input,textarea,select,button,a,[contenteditable]"))) return
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); switchVariant() }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  })
  if (!import.meta.env.DEV) return <p>This reading study is available in local development only.</p>
  const detail = state.variant === "page" && state.open
  return <>
    <div className="study-note">V3 reading study · Draft copy · Compare how much you want to read</div>
    <div className={`reading-shell ${state.mobile ? "mobile" : ""}`}>
      <header><a className="name" href={urlFor(false).href} onClick={e => { e.preventDefault(); navigate(false) }}>Manan Jain.</a><nav aria-label="Portfolio"><a aria-current={!detail ? "page" : undefined} href={urlFor(false).href} onClick={e => { e.preventDefault(); navigate(false) }}>Projects</a><a href="mailto:mananjen@gmail.com">Say hello ↗</a></nav></header>
      <main>
        {detail ? <div className="detail-heading"><a href={urlFor(false).href} onClick={e => { e.preventDefault(); navigate(false) }}>← All projects</a><p className="eyebrow">Research / UIC NLP Lab</p><h1 ref={focusTarget} tabIndex={-1}>Training-free multilingual image retrieval</h1><p className="subtitle">Frozen encoders. A shared anchor space. Retrieval across 36 languages.</p><div className="reading-meta">Full brief · {words} words · about 1 minute</div></div> : <section className="intro"><p className="eyebrow">Selected work</p><h1>Questions explored.<br />Systems built.</h1><p>Research and independent work in language, vision, and applied AI.</p></section>}
        {detail ? <article className="detail-layout"><aside><a href={research} target="_blank" rel="noreferrer"><img src={research} alt="Overview of the multilingual image retrieval pipeline" /></a><p>Research overview · Open image ↗</p><span>ASIF · Python · PyTorch<br />XM3600 · CC12M</span></aside><Brief /></article> : <>
          <article className="flagship">
            <div className="preview"><div><p className="eyebrow">01 / Research · UIC NLP Lab</p><h2>Training-free multilingual image retrieval</h2><p>Connecting frozen text and vision encoders through paired anchors to retrieve images across 36 languages.</p><p className="role">Equal-contributing coauthor · Research & engineering</p><a className="open" ref={opener} aria-expanded={state.variant === "inline" ? state.open : undefined} aria-controls={state.variant === "inline" ? "inline-brief" : undefined} href={urlFor(!state.open).href} onClick={e => { e.preventDefault(); navigate(!state.open) }}>{state.open ? "Close brief ↑" : state.variant === "inline" ? "Read project brief ↓" : "Read project brief →"}</a><span className="length">About 1 minute</span></div><a className="preview-image" href={research} target="_blank" rel="noreferrer"><img src={research} alt="Overview of the multilingual image retrieval pipeline" /></a></div>
            {state.open && <div id="inline-brief" className="inline-detail"><div className="brief-heading"><h2 tabIndex={-1} ref={focusTarget}>Inside the project</h2><span>{words} words · Full brief</span></div><Brief /><a className="close" href={urlFor(false).href} onClick={e => { e.preventDefault(); navigate(false) }}>Close brief ↑</a></div>}
          </article>
          <section className="other-work" aria-label="Other featured projects"><article><span>02 / NLP</span><div><h2>Hindi–English sarcasm detection</h2><p>Working with code-mixed language and dataset curation.</p></div><a href="https://github.com/mananjen/cs521" target="_blank" rel="noreferrer" aria-label="Open sarcasm detection repository">↗</a></article><article><span>03 / Applied AI</span><div><h2>From match data to player insights</h2><p>Valorant esports data, RAG, and Amazon Bedrock.</p></div><a href="https://github.com/mananjen/esportsManagerChallenge" target="_blank" rel="noreferrer" aria-label="Open esports project repository">↗</a></article></section>
        </>}
      </main>
      <footer><p>Something you’d like to explore together?</p><a href="mailto:mananjen@gmail.com">Let’s talk. ↗</a><span>Manan Jain · Research & engineering</span></footer>
    </div>
    <div className="study-controls" aria-label="Reading study controls"><button onClick={switchVariant} aria-label="Previous reading format">←</button><span aria-live="polite"><b>{state.variant === "inline" ? "A · Inline expansion" : "B · Dedicated page"}</b><small>{state.open ? "Brief open" : "Project listing"} · Identical full copy</small></span><button onClick={switchVariant} aria-label="Next reading format">→</button><select aria-label="Preview width" value={state.mobile ? "mobile" : "desktop"} onChange={e => { const url = urlFor(state.open); url.searchParams.set("viewport", e.target.value); history.replaceState(null, "", url); setState(readState()) }}><option value="desktop">Fluid desktop</option><option value="mobile">390px mobile</option></select><button onClick={async () => { await navigator.clipboard.writeText(urlFor(true).href); setCopied(true) }}>{copied ? "Copied!" : "Copy brief URL"}</button><a href="./portfolio-prototype.html?variant=I">Homepage studies ↗</a></div>
  </>
}
createRoot(document.getElementById("root")!).render(<Study />)
