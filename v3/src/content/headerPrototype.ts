// Throwaway content for the header experiments (issue #50), not a production spec.
import { site } from "./site"

export const baselineHeaderIdeas = [
  { key: "push", name: "Push-down (baseline)", note: "A compact navigation list that moves the page down." },
  { key: "island", name: "Top island (baseline)", note: "An inset persistent bar with a compact navigation grid." },
] as const

export const headerIdeas = [
  { key: "overlay", name: "Overlay", note: "An accent navigation sheet over the page." },
  { key: "drawer", name: "Right drawer", note: "A narrow panel with numbered destinations." },
  { key: "full", name: "Full-screen", note: "An editorial index with room to explain each destination." },
] as const

export const allHeaderIdeas = [...headerIdeas, ...baselineHeaderIdeas]


const descriptions: Record<string, string> = {
  "/": "The introduction and selected work.",
  "/projects": "Projects, research, and the thinking behind them.",
  "/experience": "Roles, contributions, and education.",
  "/about": "Interests, artwork, and a little beyond work.",
}

export const headerPrototype = {
  entries: site.nav.map(entry => ({ ...entry, description: descriptions[entry.path] })),
  exposedEntries: site.nav,
  resume: site.footer.resume,
  contact: { label: site.hello, href: site.email },
  menu: "Menu",
  close: "Close",
  navigation: site.navigationLabel,
  panelTitle: "Explore the portfolio",
  panelEyebrow: "A place to start",
  themeGlyph: "◐",
  themeLabel: "Theme control preview — not interactive",
  themeCaption: "Theme · preview",
  toolbar: "Header prototype controls",
  prototypeLabel: "HEADER STUDY · ROUND 2",
  previous: "Previous shortlisted mobile idea",
  next: "Next shortlisted mobile idea",
  previousGlyph: "←",
  nextGlyph: "→",
  settings: "Compare settings",
  menuLabel: "Mobile menu (open to compare)",
  desktopHint: "Desktop: use Compare settings for surface, height, width and Home. Arrows preview mobile menus only.",
  mobileHint: "Open Menu to compare the three shortlisted layouts. Push-down and top island remain as baselines in settings.",
  homeLabel: "Home control",
  homeOptions: [{ key: "icon", label: "Home icon" }, { key: "text", label: "Home text" }],
  motionLabel: "Motion",
  motionOptions: [{ key: "subtle", label: "Subtle" }, { key: "none", label: "None" }],
  barLabel: "Desktop bar",
  barOptions: [
    { key: "steady", label: "Steady" },
    { key: "compact", label: "Compact on scroll" },
    { key: "island", label: "Inset island" },
  ],
  alignLabel: "Header width",
  alignOptions: [{ key: "content", label: "Content aligned" }, { key: "wide", label: "Wide" }],
  tabletLabel: "Tablet layout",
  tabletOptions: [{ key: "auto", label: "Automatic" }, { key: "menu", label: "Prefer menu" }, { key: "links", label: "Prefer links" }],
  themePlacementLabel: "Mobile theme preview",
  themeOptions: [{ key: "bar", label: "In the bar" }, { key: "menu", label: "In the menu" }],
  surfaceLabel: "Header surface",
  surfaceOptions: [{ key: "glass", label: "Translucent" }, { key: "frost", label: "Denser translucent" }, { key: "blend", label: "Round 1: hero to solid" }, { key: "solid", label: "Opaque baseline" }],
  state: { open: "menu open", closed: "menu closed", collapsed: "collapsed", exposed: "exposed", scrolled: "scrolled", top: "at top" },
  hint: "Use ← / → to compare mobile ideas. Settings travel with header navigation links. Theme is a placement preview only.",
}

export const headerPrototypeKeys = ["variant", "bar", "align", "tablet", "theme", "surface", "home", "motion"] as const
