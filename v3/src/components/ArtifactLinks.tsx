import type { Project } from "../content/projects"
import { CopyCitation } from "./CopyCitation"
import { TextLink } from "./link"

export function ArtifactLinks({ links, bibtex }: Pick<Project, "links" | "bibtex">) {
  return <>{links.map(link => (
    <TextLink key={link.href} href={link.href}>{link.label}</TextLink>
  ))}{bibtex && <CopyCitation bibtex={bibtex} />}</>
}
