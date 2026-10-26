// All internal links include the GitHub Pages repository path, including in dev.
export function pageUrl(page = "") {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${page}`
}

export function briefUrl(slug: string) {
  return `${pageUrl("projects/")}?project=${encodeURIComponent(slug)}`
}
