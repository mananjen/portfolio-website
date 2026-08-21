import { featuredProjects } from "@/content/projects"
import { education, homeExperienceHighlights, workExperience } from "@/content/experience"
import { currentRole, siteName } from "@/content/meta"

export type ContactLink = {
  label: string
  value: string
  href: string
  kind: "email" | "phone" | "external"
}

export const siteConfig = {
  name: siteName,
  email: "mananjen@gmail.com",
  github: "https://github.com/mananjen",
  linkedin: "https://www.linkedin.com/in/mananjen",
  currentLocation: "Hyderabad, Telangana, India",
  phoneDisplay: "+91 82950 53791",
  phoneHref: "tel:+918295053791",
}

export { currentRole }

export const heroContent = {
  eyebrow: `${currentRole.title} • AI / NLP / CV`,
  headline: "Building practical AI systems with clean product thinking.",
  description: `I’m ${siteConfig.name} — ${currentRole.title} at ${currentRole.organization} — with experience across production web systems, NLP, computer vision, and research-driven AI projects. I like turning technically deep ideas into products that feel clear, useful, and well-made.`,
  primaryCta: {
    label: "View Projects",
    href: "/projects",
  },
  secondaryCta: {
    label: "Get in Touch",
    href: "/contact",
  },
  proofPoints: [
    education[0]?.homeLabel ?? education[0]?.school ?? "",
    workExperience.find((entry) => entry.organization === "UIC NLP Lab")?.organization ?? "",
    currentRole.organization,
    "AI + Web Systems",
  ].filter(Boolean),
}

export const homeFeaturedProjects = featuredProjects.slice(0, 3)

export { homeExperienceHighlights as experienceHighlights }

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}?subject=Portfolio%20Inquiry%20for%20${encodeURIComponent(siteConfig.name)}`,
    kind: "email",
  },
  {
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
    kind: "phone",
  },
  {
    label: "GitHub",
    value: "github.com/mananjen",
    href: siteConfig.github,
    kind: "external",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mananjen",
    href: siteConfig.linkedin,
    kind: "external",
  },
]
