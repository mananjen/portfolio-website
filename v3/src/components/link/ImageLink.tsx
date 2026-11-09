import type { AnchorHTMLAttributes, ReactNode } from "react"
import { linkLabels } from "../../content/site"

type ImageLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "aria-label" | "children"> & {
  /** The full-size file to open. */
  href: string
  /** What the link does, e.g. "Open full-size image: <title>". The new-tab note is added. */
  label: string
  children: ReactNode
}

/**
 * An image that opens its full-size file in a new tab. Behaviour only, no look and no drawn arrow:
 * image links keep their own styling until their redesign (see "Links" in docs/design-system.md).
 * Not BaseLink: images never carry a drawn arrow, and their file may be a site asset or a web address
 * (e.g. Cloudinary), so they always open in a new tab whatever the destination.
 */
export function ImageLink({ label, children, ...props }: ImageLinkProps) {
  return <a {...props} target="_blank" rel="noreferrer" aria-label={`${label} ${linkLabels.newTab}`}>{children}</a>
}
