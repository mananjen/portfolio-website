import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { pageMeta } from "./src/content/meta"
import { ogImageUrl, siteName, siteUrl } from "../src/content/meta"

export default defineConfig({
  base: "/portfolio-website/",
  plugins: [
    react(),
    {
      name: "portfolio-meta",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          const { title, description } = pageMeta.home
          const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
          const ogAlt = `${siteName} — portfolio`
          return {
            html: html.replace("<title>Portfolio</title>", `<title>${escape(title)}</title>`),
            tags: [
              { tag: "meta", attrs: { name: "description", content: description }, injectTo: "head" },
              { tag: "link", attrs: { rel: "canonical", href: siteUrl }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:site_name", content: siteName }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:url", content: siteUrl }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:title", content: title }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image", content: ogImageUrl }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image:width", content: "1200" }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image:height", content: "1471" }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image:type", content: "image/jpeg" }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:image:alt", content: ogAlt }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:title", content: title }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:image", content: ogImageUrl }, injectTo: "head" },
              { tag: "meta", attrs: { name: "twitter:image:alt", content: ogAlt }, injectTo: "head" },
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
