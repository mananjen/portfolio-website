import react from "@vitejs/plugin-react"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { pageMeta } from "./src/content/meta"
import { ogImageUrl, siteUrl } from "../src/content/meta"

const ogImagePath = new URL(ogImageUrl).pathname.slice(new URL(siteUrl).pathname.length)

export default defineConfig({
  base: "/portfolio-website/",
  plugins: [
    react(),
    {
      name: "portfolio-meta",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: ogImagePath,
          source: readFileSync(new URL(`../public/${ogImagePath}`, import.meta.url)),
        })
      },
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          const { title, description } = pageMeta.home
          const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
          return {
            html: html.replace("<title>Portfolio</title>", `<title>${escape(title)}</title>`),
            tags: [
              { tag: "meta", attrs: { name: "description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:title", content: title }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:url", content: siteUrl }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image", content: ogImageUrl }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:title", content: title }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:image", content: ogImageUrl }, injectTo: "head" },
            ],
          }
        },
      },
    },
  ],
  server: {
    port: 4321,
    strictPort: true,
    fs: { allow: [fileURLToPath(new URL("..", import.meta.url))] },
  },
  preview: { port: 4321, strictPort: true },
})
