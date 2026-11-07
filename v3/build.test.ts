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
