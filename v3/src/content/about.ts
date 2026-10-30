import { aboutContent, aboutPageContent } from "../../../src/content/about"

type PersonalSection = {
  id: string
  title: string
  paragraphs?: string[]
  items?: string[]
}

// Personal facts and artwork share their source with the current portfolio.
// Section and gallery order are editorial and preserved by the page.
export const aboutPage = {
  intro: { ...aboutPageContent.intro, paragraphs: aboutContent.intro },
  art: {
    eyebrow: aboutPageContent.artEyebrow,
    title: aboutPageContent.artTitle,
    description: aboutContent.artIntro,
    gallery: aboutContent.gallery,
    imageLabel: "Open full-size artwork ↗",
    instagram: { label: aboutPageContent.instagramCta, href: aboutContent.instagramUrl },
  },
  sections: [
    { id: "books", title: "On the bookshelf", paragraphs: [aboutContent.books] },
    { id: "interests", title: aboutPageContent.factsTitle, items: aboutContent.funFacts },
    { id: "lately", title: aboutPageContent.rightNowTitle, items: aboutContent.rightNow },
  ] satisfies PersonalSection[],
}
