import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { App } from "./App"
import { projects } from "./content/projects"
import { site } from "./content/site"

// Exercise the rendered application and router history, rather than individual
// components or private URL helpers. Real browser layout remains a manual check.
function HistoryControls() {
  const navigate = useNavigate()
  return (
    <div>
      <button id="test-back" onClick={() => navigate(-1)}>Back</button>
      <button id="test-forward" onClick={() => navigate(1)}>Forward</button>
    </div>
  )
}

let root: Root
let container: HTMLDivElement

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  vi.spyOn(window, "scrollTo").mockImplementation(() => {})
  HTMLElement.prototype.scrollIntoView = vi.fn()
  container = document.createElement("div")
  document.body.append(container)
  root = createRoot(container)
})

afterEach(async () => {
  await act(() => root.unmount())
  container.remove()
  document.head.querySelectorAll("[data-test-meta]").forEach(element => element.remove())
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function addMetadataTags() {
  for (const [attribute, name] of [["name", "description"], ["property", "og:title"], ["property", "og:description"]]) {
    const meta = document.createElement("meta")
    meta.setAttribute(attribute, name)
    meta.setAttribute("data-test-meta", "")
    document.head.append(meta)
  }
}

function expectMetadata(title: string, description: string) {
  expect(document.title).toBe(title)
  expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(description)
  expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(title)
  expect(document.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(description)
}

async function renderAt(url: string) {
  await act(() => root.render(
    <MemoryRouter initialEntries={[url]}>
      <HistoryControls />
      <App />
    </MemoryRouter>,
  ))
}

async function click(element: Element | null) {
  expect(element).not.toBeNull()
  await act(() => (element as HTMLElement).click())
}

function briefToggle(slug: string) {
  return container.querySelector<HTMLButtonElement>(`#project-${slug} button[aria-controls]`)
}

describe("the v3 project reading journey", () => {
  it.each(["/", "/projects"])("copies the full research citation on %s only after clipboard success", async url => {
    let finishCopy = () => {}
    const writeText = vi.fn(() => new Promise<void>(resolve => { finishCopy = resolve }))
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    await renderAt(url)
    const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>("main button"))
      .filter(button => button.textContent === "Copy BibTeX")
    expect(buttons).toHaveLength(1)
    const button = buttons[0]
    await act(() => button.focus())
    await click(button)
    expect(writeText).toHaveBeenCalledWith(projects[0].bibtex)
    // Stays usable while copying (disabling would drop keyboard focus); a second press does not copy again.
    expect(button.disabled).toBe(false)
    expect(document.activeElement).toBe(button)
    await click(button)
    expect(writeText).toHaveBeenCalledTimes(1)
    expect(button.parentElement?.querySelector('[role="status"]')?.textContent).toBe("Copying citation…")
    await act(() => finishCopy())
    expect(button.disabled).toBe(false)
    expect(button.parentElement?.querySelector('[role="status"]')?.textContent).toBe("BibTeX copied.")
  })

  it.each(["denied", "unavailable"])("offers selectable BibTeX when copying is %s and permits a retry", async failure => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("Permission denied")).mockResolvedValueOnce(undefined)
    vi.stubGlobal("navigator", failure === "denied" ? { clipboard: { writeText } } : {})
    await renderAt("/projects")
    const button = Array.from(container.querySelectorAll<HTMLButtonElement>("main button"))
      .find(button => button.textContent === "Copy BibTeX")!
    await click(button)
    const textarea = button.parentElement?.querySelector("textarea")
    expect(textarea?.value).toBe(projects[0].bibtex)
    expect(textarea?.readOnly).toBe(true)
    await act(() => textarea?.focus())
    expect(textarea?.selectionStart).toBe(0)
    expect(textarea?.selectionEnd).toBe(textarea?.value.length)
    expect(button.disabled).toBe(false)
    if (failure === "denied") {
      await click(button)
      expect(button.parentElement?.querySelector("textarea")).toBeNull()
      expect(button.parentElement?.querySelector('[role="status"]')?.textContent).toBe("BibTeX copied.")
    }
  })

  it("shows the footer's contact details and confirms copying only after it succeeds", async () => {
    let finishCopy = () => {}
    const writeText = vi.fn(() => new Promise<void>(resolve => { finishCopy = resolve }))
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    await renderAt("/contact")

    const footer = container.querySelector("#contact")
    expect(document.activeElement).toBe(footer)
    expect(footer?.textContent).toContain("mananjen@gmail.com")
    expect(footer?.querySelector('a[href="mailto:mananjen@gmail.com"]')?.textContent).toContain("Let’s talk.")
    expect(footer?.querySelector('a[href^="tel:"]')).toBeNull()
    expect(container.querySelector('nav a[href="mailto:mananjen@gmail.com"]')).not.toBeNull()
    for (const [href, name] of [["https://github.com/mananjen", "GitHub"], ["https://www.linkedin.com/in/mananjen", "LinkedIn"]]) {
      const link = footer?.querySelector(`a[href="${href}"]`)
      expect(link?.getAttribute("target")).toBe("_blank")
      expect(link?.getAttribute("aria-label")).toBe(`${name} (opens in a new tab)`)
    }
    expect(footer?.querySelector("a[download]")).toBeNull() // no public résumé yet
    expect(footer?.textContent).toContain(`© ${new Date().getFullYear()}`)

    const copyButton = footer?.querySelector<HTMLButtonElement>('button[aria-label="Copy email address"]') ?? null
    expect(copyButton?.type).toBe("button")
    expect(footer?.querySelector('[role="status"]')?.getAttribute("aria-live")).toBe("polite")

    await act(() => copyButton?.focus())
    await click(copyButton)
    expect(writeText).toHaveBeenCalledWith("mananjen@gmail.com")
    expect(copyButton?.disabled).toBe(false)
    expect(document.activeElement).toBe(copyButton)
    await click(copyButton)
    expect(writeText).toHaveBeenCalledTimes(1)
    expect(footer?.querySelector('[role="status"]')?.textContent).toBe("")
    await act(async () => finishCopy())
    expect(copyButton?.disabled).toBe(false)
    expect(footer?.querySelector('[role="status"]')?.textContent).toBe("Email address copied")
    expect(copyButton?.dataset.tip).toBe("Copied")
  })

  it("lets touch screens copy by tapping the address", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    await renderAt("/")

    const footer = container.querySelector("#contact")
    const tap = footer?.querySelector<HTMLButtonElement>('button[aria-label="Copy email address mananjen@gmail.com"]') ?? null
    expect(tap?.textContent).toContain("Tap to copy")
    await click(tap)
    expect(writeText).toHaveBeenCalledWith("mananjen@gmail.com")
    expect(tap?.textContent).toContain("Copied ✓")
  })

  it("offers manual copying after clipboard rejection and allows a retry", async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("Permission denied")).mockResolvedValueOnce(undefined)
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    await renderAt("/")

    const footer = container.querySelector("#contact")
    const copyButton = footer?.querySelector<HTMLButtonElement>('button[aria-label="Copy email address"]') ?? null
    await click(copyButton)
    expect(footer?.querySelector('[role="status"]')?.textContent).toBe("Couldn’t copy. Select the address to copy it.")
    expect(footer?.textContent).toContain("mananjen@gmail.com")
    expect(copyButton?.disabled).toBe(false)

    await click(copyButton)
    expect(writeText).toHaveBeenCalledTimes(2)
    expect(footer?.querySelector('[role="status"]')?.textContent).toBe("Email address copied")
  })

  it("offers manual copying when the clipboard API is unavailable", async () => {
    vi.stubGlobal("navigator", {})
    await renderAt("/")

    const footer = container.querySelector("#contact")
    await click(footer?.querySelector('button[aria-label="Copy email address"]') ?? null)
    expect(footer?.querySelector('[role="status"]')?.textContent).toBe("Couldn’t copy. Select the address to copy it.")
    expect(footer?.textContent).toContain("mananjen@gmail.com")
  })

  it("shows the résumé download once its URL is set", async () => {
    site.footer.resume.href = "/resume.pdf"
    try {
      await renderAt("/")
      const link = container.querySelector("#contact a[download]")
      expect(link?.getAttribute("href")).toBe("/resume.pdf")
      expect(link?.getAttribute("aria-label")).toBe("Download résumé (PDF)")
      expect(link?.textContent).toContain("Résumé")
      // Both parts are there; the footer's width decides which shows: "Résumé ↓" (the drawn arrow) or the CV badge.
      expect(link?.querySelector("[data-arrow]")).not.toBeNull()
      expect(link?.querySelectorAll("svg")).toHaveLength(2)
      expect(link?.hasAttribute("target")).toBe(false)
    } finally {
      site.footer.resume.href = undefined
    }
  })

  it("takes the reader back to the top and focuses the header", async () => {
    await renderAt("/about")

    const footer = container.querySelector("#contact")
    await click(footer?.querySelector('button[aria-label="Back to top"]') ?? null)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
    expect(document.activeElement).toBe(container.querySelector("header a"))
  })

  it.each(["/ABOUT/", "/%61bout"])("uses About metadata for route variant %s", async url => {
    addMetadataTags()
    await renderAt(url)

    expect(container.querySelector("h1")?.textContent).toContain("A little more about me")
    expectMetadata("About — Manan Jain", "A little beyond work: Manan’s artwork, books, games, and other interests.")
  })

  it.each(["/PROJECTS/", "/%70rojects"])("keeps project metadata and brief focus on %s", async path => {
    addMetadataTags()
    await renderAt(`${path}?project=hinglish-sarcasm-detection`)

    expectMetadata("Projects — Manan Jain", "Research and independent work in language, vision, and applied AI. Explore the work, decisions, and results.")
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("true")
    expect(document.activeElement).toBe(briefToggle("hinglish-sarcasm-detection"))
  })

  it("uses recovery metadata for an unknown destination", async () => {
    addMetadataTags()
    await renderAt("/about/unknown")

    expect(container.querySelector("h1")?.textContent).toBe("That page isn’t here yet.")
    expectMetadata("Page not found — Manan Jain", "This page could not be found. Explore Manan Jain’s projects or return home.")
  })

  it.each(["/EXPERIENCE", "/experience/"])("uses Experience metadata for %s", async url => {
    addMetadataTags()
    await renderAt(url)

    expect(container.querySelector("h1")?.textContent).toContain("Engineering in practice.")
    expectMetadata("Experience — Manan Jain", "Industry engineering, multilingual NLP research, and a foundation in computer science.")
  })

  it.each([
    ["/", "Manan Jain — Machine learning & research", "Language, vision, and the engineering around them. Selected research and projects by Manan Jain."],
    ["/projects", "Projects — Manan Jain", "Research and independent work in language, vision, and applied AI. Explore the work, decisions, and results."],
    ["/experience", "Experience — Manan Jain", "Industry engineering, multilingual NLP research, and a foundation in computer science."],
    ["/about", "About — Manan Jain", "A little beyond work: Manan’s artwork, books, games, and other interests."],
  ])("uses the correct metadata for canonical route %s", async (url, title, description) => {
    addMetadataTags()
    await renderAt(url)

    expectMetadata(title, description)
  })

  it("updates metadata when navigating and using Back and Forward", async () => {
    addMetadataTags()
    await renderAt("/")
    await click(container.querySelector('nav a[href="/about"]'))
    expect(document.title).toBe("About — Manan Jain")
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe("About — Manan Jain")

    await click(container.querySelector("#test-back"))
    expect(document.title).toBe("Manan Jain — Machine learning & research")
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute("content"))
      .toBe("Language, vision, and the engineering around them. Selected research and projects by Manan Jain.")

    await click(container.querySelector("#test-forward"))
    expect(document.title).toBe("About — Manan Jain")
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content"))
      .toBe("A little beyond work: Manan’s artwork, books, games, and other interests.")
  })

  it("returns focus and scroll to work when its link is activated again", async () => {
    await renderAt("/")
    const workLink = container.querySelector<HTMLAnchorElement>('a[href="/#work"]')
    const work = container.querySelector("#work")
    const scrollIntoView = vi.mocked(HTMLElement.prototype.scrollIntoView)

    await click(workLink)
    expect(document.activeElement).toBe(work)
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" })
    expect(scrollIntoView.mock.contexts).toEqual([work])

    // Move focus back to the hero; jsdom observes scroll requests, not layout.
    await act(() => workLink?.focus())
    scrollIntoView.mockClear()
    await click(workLink)

    expect(document.activeElement).toBe(work)
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" })
    expect(scrollIntoView.mock.contexts).toEqual([work])
  })

  it("opens About from the homepage personal link and returns through history", async () => {
    await renderAt("/")
    await click(container.querySelector("main aside a"))

    expect(container.querySelector("h1")?.textContent).toContain("A little more about me")
    expect(document.title).toBe("About — Manan Jain")
    expect(container.querySelector('nav a[aria-current="page"]')?.textContent).toBe("About")
    expect(document.activeElement).toBe(container.querySelector("#main"))

    await click(container.querySelector("#test-back"))
    expect(container.querySelector("h1")?.textContent).toContain("Hi, I’m Manan.")
  })

  it("shows artwork and personal interests on a direct About visit", async () => {
    await renderAt("/about")
    expect(container.querySelector('nav a[aria-current="page"]')?.textContent).toBe("About")
    expect(document.activeElement).toBe(container.querySelector("#main"))
    expect(container.querySelector("main")?.textContent).toContain("The Wheel of Time")
    expect(container.querySelector("main")?.textContent).toContain("Divinity Original Sin 2")

    const artwork = container.querySelector('main img[alt="Watercolor of a cottage beside a sunlit forest road, by Manan Jain"]')
    expect(artwork).not.toBeNull()
    expect(artwork?.closest("a")?.getAttribute("href")).toContain("art1.jpg")
    expect(artwork?.closest("a")?.getAttribute("aria-label")).toContain("Open full-size artwork")
    expect(container.querySelector('main a[href^="https://www.instagram.com/mananjen"]')?.textContent).toContain("View more on Instagram")
  })

  it("navigates to Experience with its title, active navigation, and page focus", async () => {
    await renderAt("/")
    await click(container.querySelector('nav a[href="/experience"]'))

    expect(container.querySelector("h1")?.textContent).toContain("Engineering in practice.")
    expect(document.title).toBe("Experience — Manan Jain")
    expect(container.querySelector('nav a[aria-current="page"]')?.textContent).toBe("Experience")
    expect(document.activeElement).toBe(container.querySelector("#main"))
  })

  it("opens research briefs from a direct Experience visit and returns through history", async () => {
    await renderAt("/experience")
    expect(container.querySelector("h1")?.textContent).toContain("Research in context.")

    await click(container.querySelector('main a[href="/projects?project=multilingual-image-text-retrieval"]'))
    expect(briefToggle("multilingual-image-text-retrieval")?.getAttribute("aria-expanded")).toBe("true")
    expect(document.activeElement).toBe(briefToggle("multilingual-image-text-retrieval"))

    await click(container.querySelector("#test-back"))
    expect(container.querySelector('nav a[aria-current="page"]')?.textContent).toBe("Experience")
    expect(document.activeElement).toBe(container.querySelector("#main"))
    await click(container.querySelector('main a[href="/projects?project=hinglish-sarcasm-detection"]'))
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("true")
  })

  it("opens the homepage flagship on Projects and returns through history", async () => {
    await renderAt("/")
    await click(container.querySelector('a[href="/projects?project=multilingual-image-text-retrieval"]'))

    const toggle = briefToggle("multilingual-image-text-retrieval")
    expect(toggle?.getAttribute("aria-expanded")).toBe("true")
    expect(document.activeElement).toBe(toggle)
    expect(container.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(1)

    await click(container.querySelector("#test-back"))
    expect(container.querySelector("h1")?.textContent).toContain("Hi, I’m Manan.")
    await click(container.querySelector("#test-forward"))
    expect(briefToggle("multilingual-image-text-retrieval")?.getAttribute("aria-expanded")).toBe("true")
  })

  it("restores a supporting brief from its URL and preserves one-open behavior", async () => {
    await renderAt("/projects?project=hinglish-sarcasm-detection")
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("true")
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-label")).toBe("Close brief: Hindi-English Code-mixed Sarcasm Detection")
    expect(document.activeElement).toBe(briefToggle("hinglish-sarcasm-detection"))
    expect(briefToggle("video-enhancement")?.getAttribute("aria-label")).toBe("Read brief: Video Enhancement")

    await click(briefToggle("video-enhancement"))
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("false")
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-label")).toBe("Read brief: Hindi-English Code-mixed Sarcasm Detection")
    expect(briefToggle("video-enhancement")?.getAttribute("aria-expanded")).toBe("true")
    expect(briefToggle("video-enhancement")?.getAttribute("aria-label")).toBe("Close brief: Video Enhancement")
    expect(document.activeElement).toBe(briefToggle("video-enhancement"))

    await click(briefToggle("video-enhancement"))
    expect(container.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(0)
    expect(briefToggle("video-enhancement")?.getAttribute("aria-label")).toBe("Read brief: Video Enhancement")
    expect(document.activeElement).toBe(briefToggle("video-enhancement"))

    await click(container.querySelector("#test-back"))
    expect(briefToggle("video-enhancement")?.getAttribute("aria-expanded")).toBe("true")
    await click(container.querySelector("#test-back"))
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("true")
  })

  it("keeps the route intact when skipping content and handles old contact links", async () => {
    await renderAt("/contact")
    expect(document.activeElement).toBe(container.querySelector("#contact"))
    await click(container.querySelector('a[href="#main"]'))
    expect(document.activeElement).toBe(container.querySelector("#main"))
    expect(container.querySelector("h1")?.textContent).toContain("Hi, I’m Manan.")
  })
})
