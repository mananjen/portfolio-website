export function briefUrl(slug: string) {
  return `/projects?project=${encodeURIComponent(slug)}`
}
