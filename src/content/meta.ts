// Core identity facts, kept dependency-free (no asset imports) so this file can be
// loaded directly by scripts/inject-meta.ts outside of Vite, not just from the app.
import { workExperience } from "./experience"

const currentJob = workExperience.find((entry) => entry.period.endsWith("Present")) ?? workExperience[0]

export const siteName = "Manan Jain"
export const siteUrl = "https://mananjen.github.io/portfolio-website/"
export const ogImageUrl = `${siteUrl}og-image.jpg`

export const currentRole = {
  title: currentJob.title,
  organization: currentJob.organization,
}

export const metaDescription = `${currentRole.title} building practical AI systems across NLP, computer vision, and full-stack web applications.`
