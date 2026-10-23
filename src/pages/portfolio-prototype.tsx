// Throwaway, local-only homepage study. Three compositions, selected by ?variant=A|B|C.
// Separate HTML entry keeps both the existing homepage and production bundle untouched.
import { createRoot } from "react-dom/client"
import { useEffect, useState } from "react"
import portrait from "../assets/temp.jpg"
import painting from "../assets/art1.jpg"
import research from "../assets/training_free_cross_modal_alignment.jpg"
import sarcasm from "../assets/hinglish_sarcasm_infographic.svg"
import { currentRole } from "../content/meta"
import "./portfolio-prototype.css"

const paper = "https://openreview.net/forum?id=v35BaCj1kc"
const live = "https://mananjen.github.io/portfolio-website/"
const names = ["Personal publication", "Research notebook", "Quiet gallery"]
const keys = ["A", "B", "C"]
const projectTitle = "Finding images across languages. Without retraining the models."
const description = "A multilingual image–text retrieval system built with pretrained vision and text encoders and non-parametric alignment."
const contribution = "I owned the end-to-end implementation. Research direction by Usman Shahid, advised by Dr. Natalie Parde at UIC."

function Nav() {
  return <nav aria-label="Main navigation"><a href="#work">Work</a><a href={`${live}#/experience`}>Experience ↗</a><a href={`${live}#/about`}>Beyond work ↗</a><a href="mailto:mananjen@gmail.com">Say hello ↗</a></nav>
}
function Footer() {
  return <footer><div><p className="label">Have something in mind?</p><a className="email" href="mailto:mananjen@gmail.com">Let’s talk. ↗</a></div><div><a href="https://github.com/mananjen">GitHub ↗</a><a href="https://www.linkedin.com/in/mananjen">LinkedIn ↗</a><span>Manan Jain · Hyderabad, India</span></div></footer>
}
function Beyond({ image = true }: { image?: boolean }) {
  return <aside className="beyond">{image && <img src={painting} alt="Manan’s watercolor of a house beside a sunlit forest path" />}<div><p className="label">Away from the screen</p><h2>Sometimes, a different kind of making.</h2><p>Watercolors, long fantasy novels, and a game I’ll probably spend too much time exploring.</p><a href={`${live}#/about`}>A little beyond work ↗</a></div></aside>
}
function VariantA() {
  return <div className="publication"><header><a className="wordmark" href="#top">manan jain<span className="ink-dot">.</span></a><Nav /></header><main><section className="pub-intro"><div><p className="label">Engineer · Researcher · Occasionally, painter</p><h1>Hi, I’m Manan.<br />I like figuring<br />things <em>out.</em></h1><p className="intro-copy">I work on machine learning and the engineering that makes it useful. Currently {currentRole.title} at {currentRole.organization}.</p><a className="text-link" href="#work">A few things I’ve worked on ↓</a></div><figure className="portrait"><img src={portrait} alt="Manan Jain" /><figcaption>From Panipat, via Chicago.<br />Now in Hyderabad.</figcaption></figure></section><section id="work"><div className="section-line"><span className="label">Selected work</span><span className="label">01 — 03</span></div><article className="pub-feature"><div><p className="label green">01 / Multilingual retrieval · UIC NLP Lab</p><h2>{projectTitle}</h2><p>{description}</p><p className="credit">{contribution}</p><p className="acceptance">Accepted · AACL-IJCNLP 2026 Findings</p><a className="text-link" href={paper}>Read the paper ↗</a></div><figure className="research-figure"><img src={research} alt="Infographic illustrating the multilingual image–text retrieval project" /><figcaption>Research overview · multilingual cross-modal alignment</figcaption></figure></article><div className="pub-support"><article><span className="label">02 / Language</span><h3>When “great” doesn’t mean great.</h3><p>Detecting sarcasm in Hindi–English code-mixed text, where context rarely stays in one language.</p><a href="https://github.com/mananjen/cs521">Explore the Hinglish project ↗</a></article><article><span className="label">03 / Applied AI</span><h3>From esports data to player insights.</h3><p>A hackathon build using Riot’s Valorant data and Amazon Bedrock to explore player statistics and team building.</p><a href="https://github.com/mananjen/esportsManagerChallenge">Explore the esports project ↗</a></article></div></section><Beyond /><Footer /></main></div>
}
function VariantB() {
  return <div className="notebook"><aside className="notebook-rail"><a className="monogram" href="#top">mj<span>_</span></a><p className="label">Manan Jain<br />ML engineer</p><Nav /><div className="rail-bottom"><img src={portrait} alt="Manan Jain" /><p>Based in Hyderabad.<br />Previously at UIC NLP Lab.</p></div></aside><main><section className="notebook-intro"><p className="label">A working collection / 2026</p><h1>Manan Jain</h1><p>I build and investigate machine learning systems.<br />These are some of the questions I’ve worked on.</p><div className="status"><span className="ink-dot">●</span> {currentRole.title} · {currentRole.organization}</div></section><section id="work"><div className="section-line"><span className="label">Research & engineering</span><span className="label">Index / 03 entries</span></div><article className="notebook-feature"><div className="entry-meta"><span>01</span><span>RESEARCH<br />2025 — PRESENT</span></div><div><p className="label green">Question</p><h2>Can we align images and languages without end-to-end training?</h2><p>{description}</p><figure className="notebook-figure"><img src={research} alt="Multilingual retrieval research overview" /><figcaption>FIG. 01 — Project overview. Existing research illustration.</figcaption></figure><dl><div><dt>My role</dt><dd>End-to-end implementation</dd></div><div><dt>Research lead</dt><dd>Usman Shahid</dd></div><div><dt>Advisor</dt><dd>Dr. Natalie Parde · UIC</dd></div><div><dt>Status</dt><dd>Accepted · AACL-IJCNLP 2026 Findings</dd></div></dl><a className="text-link" href={paper}>Open research paper ↗</a></div></article><article className="notebook-entry"><span className="label">02 / NLP</span><div><h3>What does sarcasm look like between two languages?</h3><p>Hindi–English code-mixed sarcasm detection.</p></div><a aria-label="View Hinglish research repository" href="https://github.com/mananjen/cs521">↗</a></article><article className="notebook-entry"><span className="label">03 / Applied AI</span><div><h3>What can esports data tell us about a player?</h3><p>RAG over Valorant data, built with Amazon Bedrock.</p></div><a aria-label="View esports project repository" href="https://github.com/mananjen/esportsManagerChallenge">↗</a></article></section><Beyond image={false} /><Footer /></main></div>
}
function VariantC() {
  return <div className="gallery"><header><a className="wordmark" href="#top">Manan Jain</a><Nav /></header><main><section className="gallery-intro"><div><p className="label">Machine learning / Research / Making things</p><h1>A curious mind.<br />An engineer’s<br /><em>way of making.</em></h1></div><div className="gallery-bio"><img src={portrait} alt="Manan Jain" /><p>I’m Manan, an {currentRole.title} at {currentRole.organization}. My work spans language, vision, and the systems around them.</p><a href="#work">Selected work ↓</a></div></section><section id="work"><div className="section-line"><span className="label">Selected work</span><span className="label">Research & experiments</span></div><article className="gallery-feature"><figure><div className="gallery-visual"><img src={research} alt="Multilingual image–text retrieval research illustration" /></div><figcaption><span>01 — Multilingual image–text retrieval</span><span>UIC NLP Lab</span></figcaption></figure><div className="gallery-story"><h2>{projectTitle}</h2><div><p>{description}</p><p className="credit">{contribution}</p><p className="acceptance">Accepted · AACL-IJCNLP 2026 Findings</p><a className="text-link" href={paper}>Read the paper ↗</a></div></div></article><div className="gallery-support"><article><img src={sarcasm} alt="Infographic about Hindi–English sarcasm detection" /><span className="label">02 / NLP</span><h3>A sense of sarcasm.<br />In more than one language.</h3><a href="https://github.com/mananjen/cs521">Hinglish sarcasm detection ↗</a></article><article className="gallery-text-project"><span className="label">03 / Applied AI</span><h3>Reading between<br />the rounds.</h3><p>Exploring Valorant player statistics and playstyles through a RAG-powered hackathon project.</p><a href="https://github.com/mananjen/esportsManagerChallenge">Riot × Amazon hackathon ↗</a></article></div></section><Beyond /><Footer /></main></div>
}
function Prototype() {
  const initial = new URLSearchParams(location.search)
  const [variant, setVariant] = useState(keys.includes(initial.get("variant") ?? "") ? initial.get("variant")! : "A")
  const [mobile, setMobile] = useState(initial.get("viewport") === "mobile")
  const index = keys.indexOf(variant)
  const cycle = (step: number) => { setVariant(keys[(index + step + 3) % 3]); window.scrollTo(0, 0) }
  useEffect(() => {
    const url = new URL(location.href); url.searchParams.set("variant", variant); url.searchParams.set("viewport", mobile ? "mobile" : "desktop"); history.replaceState(null, "", url)
  }, [variant, mobile])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target instanceof HTMLElement && e.target.closest("input,textarea,select,[contenteditable]"))) return
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); cycle(e.key === "ArrowLeft" ? -1 : 1) }
    }
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler)
  }, [index])
  if (!import.meta.env.DEV) return <p>This design exploration is available in local development only.</p>
  return <><div className="study-notice">V3 DESIGN STUDY · Draft copy · Links open existing pages or research artifacts</div><div className={`preview-shell ${mobile ? "mobile-preview" : ""}`}><div className="design-page" id="top">{variant === "A" ? <VariantA /> : variant === "B" ? <VariantB /> : <VariantC />}</div></div><div className="prototype-controls" aria-label="Design exploration controls"><button onClick={() => cycle(-1)} aria-label="Previous concept">←</button><span aria-live="polite"><b>{variant}</b> / {names[index]}</span><button onClick={() => cycle(1)} aria-label="Next concept">→</button><button className="viewport-button" onClick={() => setMobile(!mobile)} aria-pressed={mobile}>{mobile ? "390px mobile" : "Desktop"} ▣</button></div></>
}
createRoot(document.getElementById("root")!).render(<Prototype />)
