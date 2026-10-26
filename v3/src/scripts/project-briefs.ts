// Native details keep the briefs usable without JS. This enhancement coordinates
// one open brief with a shareable URL and browser history, for every project.
const briefs = Array.from(document.querySelectorAll<HTMLDetailsElement>("details[data-brief]"))

function syncFromUrl(moveFocus: boolean) {
  const slug = new URL(location.href).searchParams.get("project")
  const previous = briefs.find(brief => brief.open)
  const selected = briefs.find(brief => brief.dataset.brief === slug)
  for (const brief of briefs) brief.open = brief === selected

  if (moveFocus) {
    const target = selected ?? previous
    target?.querySelector("summary")?.focus({ preventScroll: true })
    selected?.closest("article")?.scrollIntoView({ block: "start", behavior: "instant" })
  }
}

for (const brief of briefs) {
  brief.querySelector("summary")?.addEventListener("click", event => {
    event.preventDefault()
    const url = new URL(location.href)
    if (brief.open) url.searchParams.delete("project")
    else url.searchParams.set("project", brief.dataset.brief!)
    history.pushState(null, "", url)
    syncFromUrl(true)
  })
}

window.addEventListener("popstate", () => syncFromUrl(true))
window.addEventListener("pageshow", () => syncFromUrl(true))
syncFromUrl(false)
