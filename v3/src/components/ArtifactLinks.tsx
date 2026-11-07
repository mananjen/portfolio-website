import type { Project } from "../content/projects"
import { CopyCitation } from "./CopyCitation"

export function ArtifactLinks({ links, bibtex }: Pick<Project, "links" | "bibtex">) {
  return <>{links.map(link => (
    <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  ))}{bibtex && <CopyCitation bibtex={bibtex} />}</>
}
