import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { pageMeta } from "./src/content/meta"

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
          return {
            html: html.replace("<title>Portfolio</title>", `<title>${escape(title)}</title>`),
            tags: [
              { tag: "meta", attrs: { name: "description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:title", content: title }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:description", content: description }, injectTo: "head" },
              { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
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
