import portrait from "../../../src/assets/temp.jpg?url"
import painting from "../../../src/assets/art1.jpg?url"
import { currentRole, siteName } from "../../../src/content/meta"
import { pageMeta } from "./meta"

const email = "mailto:mananjen@gmail.com"
const location = "Hyderabad, India"

export const site = {
  name: siteName,
  ...pageMeta.home,
  email,
  nav: [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
  ],
  hello: "Say hello ↗",
  skip: "Skip to content",
  navigationLabel: "Main navigation",
  footer: {
    eyebrow: "Have something in mind?",
    title: "Let’s talk.",
    signature: `${siteName} · ${location}`,
    links: [
      { label: "Email", href: email },
      { label: "GitHub", href: "https://github.com/mananjen" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mananjen" },
    ],
  },
}

export const home = {
  eyebrow: `${currentRole.title} / ${location}`,
  headline: ["Hi, I’m Manan.", "Let’s make sense", "of things."],
  intro: `I work on language, vision, and the engineering around them. Currently at ${currentRole.organization}.`,
  workCta: "Start with the work ↓",
  portrait: { src: portrait, alt: siteName, caption: "Panipat → Chicago → Hyderabad" },
  featuredLabel: "Selected work / Research & engineering",
  moreLabel: "More work",
  allProjects: "All projects →",
  personal: {
    eyebrow: "Okay, enough work talk.",
    title: "I make things without a keyboard, too.",
    description: "Watercolors, long fantasy novels, and a game I’ll probably spend too much time exploring.",
    image: painting,
    alt: "Manan’s watercolor of a house among trees",
    link: { label: "A little beyond work ↗", href: "https://mananjen.github.io/portfolio-website/#/about" },
  },
}

export const projectPage = {
  ...pageMeta.projects,
  eyebrow: "Selected work",
  headline: ["Questions explored.", "Systems built."],
  featuredLabel: "Featured projects",
  additionalLabel: "More projects",
}

export const projectLabels = {
  read: "Read brief",
  close: "Close brief",
  technologies: "Technologies and methods",
  image: "Open full-size image ↗",
  imageAlt: (title: string) => `Overview of ${title}`,
  readLabel: (title: string) => `Read brief: ${title}`,
  briefLabel: (title: string) => `Inside the project: ${title}`,
}

export const notFound = {
  title: "That page isn’t here yet.",
  description: "The new portfolio is taking shape. Explore the work or head back home.",
  home: "Back to Home",
  projects: "Explore Projects",
}
