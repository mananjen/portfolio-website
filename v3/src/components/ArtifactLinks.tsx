import type { Project } from "../content/projects"

export function ArtifactLinks({ links }: { links: Project["links"] }) {
  return links.map(link => (
    <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  ))
}
