import { featuredProjects } from "@/content/projects"
import { homeExperienceHighlights } from "@/content/experience"

export type ContactLink = {
  label: string
  value: string
  href: string
  kind: "email" | "phone" | "external"
}

export const siteConfig = {
  name: "Manan Jain",
  title: "Software Engineer building practical AI systems",
  email: "mananjen@gmail.com",
  github: "https://github.com/mananjen",
  linkedin: "https://www.linkedin.com/in/mananjen",
  location: "Chicago, IL",
  phoneDisplay: "+91 82950 53791",
  phoneHref: "tel:+918295053791",
}

export const heroContent = {
  eyebrow: "Software Engineer • AI / NLP / CV",
  headline: "Building practical AI systems with clean product thinking.",
  description:
    "I’m Manan Jain, a software engineer with experience across production web systems, NLP, computer vision, and research-driven AI projects. I like turning technically deep ideas into products that feel clear, useful, and well-made.",
  primaryCta: {
    label: "View Projects",
    href: "/projects",
  },
  secondaryCta: {
    label: "Get in Touch",
    href: "/contact",
  },
  proofPoints: [
    "MS CS at UIC",
    "UIC NLP Lab",
    "Lowe’s India",
    "AI + Web Systems",
  ],
}

export const homeFeaturedProjects = featuredProjects.slice(0, 3)

export { homeExperienceHighlights as experienceHighlights }

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}?subject=Portfolio%20Inquiry%20for%20Manan%20Jain`,
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