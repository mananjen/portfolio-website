import { act, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, expect, it } from "vitest"
import { CtaLink, IconButton, IconLink, ImageLink, TextButton, TextLink } from "."

let root: Root
let container: HTMLDivElement

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  container = document.createElement("div")
  document.body.append(container)
  root = createRoot(container)
})
afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

function render(node: ReactNode) {
  act(() => root.render(<MemoryRouter>{node}</MemoryRouter>))
  return container.firstElementChild as HTMLElement
}

it("opens other websites in a new tab, says so, and draws ↗", () => {
  const link = render(<TextLink href="https://example.com">Paper</TextLink>)
  expect(link.getAttribute("target")).toBe("_blank")
  expect(link.getAttribute("rel")).toBe("noreferrer")
  expect(link.textContent).toBe("Paper (opens in a new tab)")
  expect(link.querySelectorAll("svg")).toHaveLength(1)
})

it("keeps site pages and email in the same tab with no arrow", () => {
  for (const href of ["/about", "/#work", "mailto:someone@example.com"]) {
    const link = render(<TextLink href={href}>Go</TextLink>)
    expect(link.tagName).toBe("A")
    expect(link.hasAttribute("target")).toBe(false)
    expect(link.querySelector("svg")).toBeNull()
  }
  expect(render(<TextLink href="/about">Go</TextLink>).getAttribute("href")).toBe("/about")
})

it("marks downloads and draws ↓ without a new tab", () => {
  const link = render(<TextLink href="/resume.pdf" download aria-label="Download résumé (PDF)">Résumé</TextLink>)
  expect(link.hasAttribute("download")).toBe(true)
  expect(link.hasAttribute("target")).toBe(false)
  expect(link.querySelectorAll("svg")).toHaveLength(1)
})

it("always draws ↗ on the CTA, even for email", () => {
  const link = render(<CtaLink href="mailto:someone@example.com">Let’s talk.</CtaLink>)
  expect(link.querySelectorAll("svg")).toHaveLength(1)
  expect(link.hasAttribute("target")).toBe(false)
})

it("names icon links by their label, adds the new-tab note, and draws no arrow", () => {
  const link = render(<IconLink href="https://github.com/mananjen" icon="github" label="GitHub" />)
  expect(link.getAttribute("aria-label")).toBe("GitHub (opens in a new tab)")
  expect(link.dataset.tip).toBe("GitHub")
  expect(link.querySelectorAll("svg")).toHaveLength(1) // the mark only
  expect(link.querySelector("[aria-hidden='true']")).not.toBeNull()
})

it("can show visible text beside the icon while keeping the label as its name", () => {
  const link = render(<IconLink href="/resume.pdf" download icon="cv" label="Download résumé (PDF)" text="Résumé" />)
  expect(link.textContent).toContain("Résumé")
  expect(link.getAttribute("aria-label")).toBe("Download résumé (PDF)")
  expect(link.hasAttribute("download")).toBe(true)
  expect(link.querySelectorAll("svg")).toHaveLength(2) // the CV badge and the drawn ↓
})

it("opens a full-size image in a new tab and names the link by what it does", () => {
  const link = render(<ImageLink href="/assets/art.jpg" label="Open full-size artwork: Watercolour"><img src="/assets/art.jpg" alt="Watercolour" /></ImageLink>)
  expect(link.getAttribute("href")).toBe("/assets/art.jpg")
  expect(link.getAttribute("target")).toBe("_blank")
  expect(link.getAttribute("rel")).toBe("noreferrer")
  expect(link.getAttribute("aria-label")).toBe("Open full-size artwork: Watercolour (opens in a new tab)")
  expect(link.querySelector("svg")).toBeNull() // no drawn arrow on images
})

it("gives brand marks their own class so they are never dimmed", () => {
  const brand = [...render(<IconLink href="https://github.com/mananjen" icon="github" label="GitHub" />).classList]
  const plain = [...render(<IconLink href="/about" icon="arrowUp" label="Up" />).classList]
  // Same look as any icon link, plus a brand class that keeps the mark white.
  expect(brand).toEqual(expect.arrayContaining(plain))
  expect(brand.filter(name => !plain.includes(name))).toHaveLength(1)
})

it("renders buttons as type=button with no arrow", () => {
  const text = render(<TextButton>Copy BibTeX</TextButton>) as HTMLButtonElement
  expect(text.type).toBe("button")
  expect(text.querySelector("svg")).toBeNull()
  const icon = render(<IconButton icon="copy" label="Copy email address" tip="Copy email" />) as HTMLButtonElement
  expect(icon.type).toBe("button")
  expect(icon.getAttribute("aria-label")).toBe("Copy email address")
  expect(icon.dataset.tip).toBe("Copy email")
})
