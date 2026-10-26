import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://mananjen.github.io",
  base: "/portfolio-website",
  output: "static",
  trailingSlash: "always",
  server: { port: 4321 },
})
