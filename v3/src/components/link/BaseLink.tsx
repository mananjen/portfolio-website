import type { AnchorHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import { linkLabels } from "../../content/site"
import { Icon } from "./Icon"
import styles from "./link.module.css"

type Destination = "page" | "external" | "email" | "download"

/** Where a link goes decides how it opens and which arrow it carries. */
function destinationOf(href: string, download?: boolean): Destination {
  if (download) return "download"
  if (/^https?:/i.test(href)) return "external"
  if (/^mailto:/i.test(href)) return "email"
  return "page"
}

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel" | "download" | "children">

export type BaseLinkProps = AnchorProps & {
  /** A site path ("/projects"), a web address, or a mailto: address. */
  href: string
  /** The link downloads a file instead of opening it. */
  download?: boolean
  children: ReactNode
  /**
   * `auto` (default): ↗ on new-tab links and ↓ on downloads.
   * `always`: always ↗ (the CTA). `none`: no arrow (icon-only links).
   */
  arrow?: "auto" | "always" | "none"
}

/**
 * Behaviour only, no look: the looks (TextLink, CtaLink, IconLink) wrap it.
 * Links to another website open in a new tab and say so to screen readers.
 */
export function BaseLink({ href, download, arrow = "auto", children, className, "aria-label": ariaLabel, ...rest }: BaseLinkProps) {
  const destination = destinationOf(href, download)
  const newTab = destination === "external"
  const arrowIcon = arrow === "none" ? undefined
    : arrow === "always" || newTab ? "external"
    : destination === "download" ? "download"
    : undefined

  const content = (
    <>
      {children}
      {arrowIcon && <Icon name={arrowIcon} data-arrow="" className={arrowIcon === "external" ? styles.arrowExternal : styles.arrowDownload} />}
      {newTab && !ariaLabel && <span className="visually-hidden"> {linkLabels.newTab}</span>}
    </>
  )
  const shared = {
    ...rest,
    className,
    "aria-label": ariaLabel && newTab ? `${ariaLabel} ${linkLabels.newTab}` : ariaLabel,
    "data-destination": destination,
  }

  if (destination === "page") return <Link to={href} {...shared}>{content}</Link>
  return (
    <a
      href={href}
      {...shared}
      {...(newTab && { target: "_blank", rel: "noreferrer" })}
      {...(destination === "download" && { download: true })}
    >
      {content}
    </a>
  )
}
