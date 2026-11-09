// Type-only: which icon a link shows is content, so content names it from the icon registry.
import type { IconName } from "../components/link/Icon"

/**
 * A link as content: where it goes and what it says. Nothing about looks:
 * the destination decides new tab and arrows (see "Links" in docs/design-system.md).
 * `href` is a site path ("/about"), a web address, or a mailto: address.
 */
export type LinkContent = {
  /** What the link says: its visible text, or its accessible name and tooltip when it shows an icon. */
  label: string
  href: string
  download?: true
  icon?: IconName
  /** Visible text for an icon link whose accessible name (`label`) is longer, e.g. "Résumé" for "Download résumé (PDF)". */
  text?: string
}
