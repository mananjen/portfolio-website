// @vitest-environment node
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { JSDOM } from "jsdom"
import { build } from "vite"
import { afterAll, beforeAll, expect, it } from "vitest"
import { ogImageUrl, siteUrl } from "../src/content/meta"
import { pageMeta } from "./src/content/meta"

const root = fileURLToPath(new URL(".", import.meta.url))
let output: string
let document: Document

beforeAll(async () => {
  output = await mkdtemp(join(tmpdir(), "portfolio-v3-build-"))
  await build({
    root,
    configFile: join(root, "vite.config.ts"),
    logLevel: "silent",
    build: { outDir: output, emptyOutDir: true },
  })
  const html = await readFile(join(output, "index.html"), "utf8")
  document = new JSDOM(html).window.document
}, 30000)

afterAll(async () => {
  if (output) await rm(output, { recursive: true, force: true })
})

it("ships homepage social metadata with absolute shared URLs in the production HTML", () => {
  const content = (selector: string) => document.querySelector(selector)?.getAttribute("content")
  expect(content('meta[property="og:url"]')).toBe(siteUrl)
  expect(content('meta[property="og:image"]')).toBe(ogImageUrl)
  expect(new URL(content('meta[property="og:image"]')!).protocol).toBe("https:")
  expect(content('meta[name="twitter:card"]')).toBe("summary_large_image")
  expect(content('meta[name="twitter:image"]')).toBe(ogImageUrl)
  expect(content('meta[property="og:title"]')).toBe(pageMeta.home.title)
  expect(content('meta[name="twitter:title"]')).toBe(pageMeta.home.title)
  expect(content('meta[name="twitter:description"]')).toBe(pageMeta.home.description)
})

it("ships the unchanged preview image at the path named by its production URL", async () => {
  const url = document.querySelector('meta[property="og:image"]')!.getAttribute("content")!
  const path = new URL(url).pathname.slice(new URL(siteUrl).pathname.length)
  const emitted = await readFile(join(output, path))
  const original = await readFile(fileURLToPath(new URL(`../public/${path}`, import.meta.url)))
  expect(emitted).toEqual(original)
})

const basePath = new URL(siteUrl).pathname
const emittedPath = (url: string) => join(output, url.slice(basePath.length))

async function emittedCss() {
  const hrefs = [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute("href")!)
  const sheets = await Promise.all(hrefs.map(href => readFile(emittedPath(href), "utf8")))
  return sheets.join("\n")
}

it("self-hosts the heading, body, and label fonts as woff2 files under the site base path", async () => {
  const css = await emittedCss()
  const fontUrls = [...css.matchAll(/url\(([^)]+\.woff2)\)/g)].map(match => match[1].replace(/["']/g, ""))
  for (const family of ["fraunces", "recursive", "syne-mono"]) {
    expect(fontUrls.some(url => url.includes(family)), `${family} woff2 referenced`).toBe(true)
  }
  for (const url of fontUrls) {
    expect(url.startsWith(`${basePath}assets/`), url).toBe(true)
    await expect(readFile(emittedPath(url))).resolves.toBeDefined()
  }
})

it("requests no fonts from third-party hosts", async () => {
  const shipped = `${document.documentElement.outerHTML}\n${await emittedCss()}`
  expect(shipped).not.toMatch(/fonts\.(googleapis|gstatic)\.com|use\.typekit|fonts\.bunny/)
})
