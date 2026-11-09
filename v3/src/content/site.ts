import portrait from "../../../src/assets/temp.jpg?url"
import painting from "../../../src/assets/art1.jpg?url"
import { currentRole, siteName } from "../../../src/content/meta"
import { emailAddress } from "../../../src/content/contact"
import { pageMeta } from "./meta"
import type { LinkContent } from "./link"

const email = `mailto:${emailAddress}`
const location = "Hyderabad, India"
const copyEmailLabel = "Copy email address"

export const site = {
  name: siteName,
  ...pageMeta.home,
  email,
  emailAddress,
  nav: [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
    { label: "About", path: "/about" },
  ],
  hello: "Say hello",
  skip: "Skip to content",
  navigationLabel: "Main navigation",
  footer: {
    eyebrow: "Have something in mind?",
    title: "Let’s talk.",
    copy: {
      label: copyEmailLabel,
      tip: "Copy email",
      copiedTip: "Copied",
      tapHint: "Tap to copy",
      copiedHint: "Copied ✓",
      copied: "Email address copied",
      failed: "Couldn’t copy. Select the address to copy it.",
      failedTouch: "Couldn’t copy. Press and hold to select it.",
      touchLabel: (address: string) => `${copyEmailLabel} ${address}`,
    },
    social: [
      { label: "GitHub", href: "https://github.com/mananjen", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mananjen", icon: "linkedin" },
    ] satisfies LinkContent[],
    resume: {
      /** The public résumé PDF. While empty, the footer shows no résumé link. */
      href: undefined as string | undefined,
      label: "Download résumé (PDF)",
      text: "Résumé",
      download: true,
      icon: "cv",
    } satisfies Omit<LinkContent, "href"> & { href: string | undefined },
    backToTop: "Back to top",
    smallPrint: (year: number) => `© ${year} ${siteName} · ${location}`,
  },
}

export const home = {
  eyebrow: `${currentRole.title} / ${location}`,
  headline: ["Hi, I’m Manan.", "Let’s make sense", "of things."],
  intro: `I work on language, vision, and the engineering around them. Currently at ${currentRole.organization}.`,
  workCta: "Start with the work",
  portrait: { src: portrait, alt: siteName, caption: "Panipat → Chicago → Hyderabad" },
  featuredLabel: "Selected work / Research & engineering",
  moreLabel: "More work",
  allProjects: "All projects",
  personal: {
    eyebrow: "Okay, enough work talk.",
    title: "I make things without a keyboard, too.",
    description: "Watercolors, long fantasy novels, and a game I’ll probably spend too much time exploring.",
    image: painting,
    alt: "Manan’s watercolor of a house among trees",
    link: { label: "A little beyond work", href: "/about" } satisfies LinkContent,
  },
}

export const projectPage = {
  ...pageMeta.projects,
  eyebrow: "Selected work",
  headline: ["Questions explored.", "Systems built."],
  featuredLabel: "Featured projects",
  additionalLabel: "More projects",
}

const openImage = "Open full-size image"

export const linkLabels = {
  /** Added to the accessible name of every link that opens a new tab. */
  newTab: "(opens in a new tab)",
}

export const projectLabels = {
  copyBibtex: "Copy BibTeX",
  copyingBibtex: "Copying citation…",
  bibtexCopied: "BibTeX copied.",
  bibtexFailed: "Could not copy citation. Select the BibTeX below to copy it manually, or try again.",
  bibtexLabel: "BibTeX citation",
  read: "Read brief",
  close: "Close brief",
  technologies: "Technologies and methods",
  image: openImage,
  imageAlt: (title: string) => `Overview of ${title}`,
  imageLink: (title: string) => `${openImage}: ${title}`,
  readLabel: (title: string) => `Read brief: ${title}`,
  closeLabel: (title: string) => `Close brief: ${title}`,
  briefLabel: (title: string) => `Inside the project: ${title}`,
}

export const notFound = {
  title: "That page isn’t here yet.",
  description: "The new portfolio is taking shape. Explore the work or head back home.",
  home: "Back to Home",
  projects: "Explore Projects",
}
