import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { App } from "./App"

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
  vi.restoreAllMocks()
})

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
  return container.querySelector<HTMLButtonElement>(`#project-${slug} button`)
}

describe("the v3 project reading journey", () => {
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

    await click(briefToggle("video-enhancement"))
    expect(briefToggle("hinglish-sarcasm-detection")?.getAttribute("aria-expanded")).toBe("false")
    expect(briefToggle("video-enhancement")?.getAttribute("aria-expanded")).toBe("true")
    expect(document.activeElement).toBe(briefToggle("video-enhancement"))

    await click(briefToggle("video-enhancement"))
    expect(container.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(0)
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
