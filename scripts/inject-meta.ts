// Writes index.html's <title>/meta description/Open Graph/Twitter tags from
// src/content/meta.ts, so those facts are typed once instead of duplicated as
// static HTML strings that can silently drift out of sync with the app.
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { currentRole, metaDescription, ogImageUrl, siteName, siteUrl } from "../src/content/meta"

const __dirname = dirname(fileURLToPath(import.meta.url))
const indexPath = resolve(__dirname, "../index.html")

const START_MARKER =
  "<!-- BEGIN GENERATED META (scripts/inject-meta.ts — do not edit by hand, edit src/content/meta.ts instead) -->"
const END_MARKER = "<!-- END GENERATED META -->"

const title = `${siteName} | Portfolio`

const generatedBlock = `    <title>${title}</title>
    <meta
      name="description"
      content="${metaDescription}"
    />
    <link rel="canonical" href="${siteUrl}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:url" content="${siteUrl}" />
    <meta property="og:title" content="${title}" />
    <meta
      property="og:description"
      content="${metaDescription}"
    />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="1471" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta
      name="twitter:description"
      content="${metaDescription}"
    />
    <meta name="twitter:image" content="${ogImageUrl}" />`

const html = readFileSync(indexPath, "utf8")
const startIndex = html.indexOf(START_MARKER)
const endIndex = html.indexOf(END_MARKER)

if (startIndex === -1 || endIndex === -1) {
  throw new Error(
    "inject-meta: could not find the generated-meta markers in index.html. " +
      "Restore the BEGIN/END GENERATED META comments before running this script."
  )
}

const before = html.slice(0, startIndex + START_MARKER.length)
const after = html.slice(endIndex)
const nextHtml = `${before}\n${generatedBlock}\n    ${after}`

if (nextHtml === html) {
  console.log("inject-meta: index.html is already up to date.")
} else {
  writeFileSync(indexPath, nextHtml)
  console.log(`inject-meta: updated index.html for "${currentRole.title}" role.`)
}
