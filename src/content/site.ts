import profileImage from "@/assets/temp.jpg"
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
  profileImage,
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

export const homeContent = {
  featured: {
    eyebrow: "Featured Work",
    title: "A few projects that best represent how I like to build.",
    description:
      "Selected projects that combine technical depth, practical constraints, and clear product thinking.",
  },
  experience: {
    eyebrow: "Experience Snapshot",
    title: "Research and engineering work with measurable outcomes.",
    description:
      "A quick view of experiences that represent the mix of applied research and production engineering behind the portfolio.",
  },
  projectCta: { label: "View details", href: "/projects" },
  experienceCta: { label: "View Full Experience", href: "/experience" },
  contactCta: { label: "Open Contact Page", href: "/contact" },
}

export const contactContent = {
  call: "Call",
  open: "Open",
  eyebrow: "Contact",
  title: "Easy ways to reach me.",
  description:
    "The easiest way to reach me is by email or LinkedIn. I typically respond within a day or two, but it may take longer during busy periods. I look forward to connecting with you!",
  compose: "Compose",
  copied: "Copied",
  copy: "Copy",
}

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
]

export const navigationContent = {
  openMenu: "Open menu",
  title: "Navigate",
  github: "GitHub",
}

export const footerContent = {
  credit: "Built with React, Vite, Tailwind, and shadcn/ui.",
}
