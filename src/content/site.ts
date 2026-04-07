import { featuredProjects } from "@/content/projects"
import { homeExperienceHighlights } from "@/content/experience"

export const siteConfig = {
  name: "Manan Jain",
  title: "Software Engineer building practical AI systems",
  email: "mananjen@gmail.com",
  github: "https://github.com/mananjen",
  linkedin: "https://www.linkedin.com/in/mananjen",
  location: "Chicago, IL",
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
    "AI + Full-Stack Systems",
  ],
}

export const homeFeaturedProjects = featuredProjects.slice(0, 3)

export { homeExperienceHighlights as experienceHighlights }

export const contactLinks = [
  {
    label: "Email",
    value: "mananjen@gmail.com",
    href: "mailto:mananjen@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/mananjen",
    href: "https://github.com/mananjen",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mananjen",
    href: "https://www.linkedin.com/in/mananjen",
  },
]