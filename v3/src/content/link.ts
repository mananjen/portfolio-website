// Type-only: which icon a link shows is content, so content names it from the icon registry.
import type { IconName } from "../components/link/Icon"

/**
 * A link as content: where it goes and what it says. Nothing about looks:
 * the destination decides new tab and arrows (see "Links" in docs/design-system.md).
 * `href` is a site path ("/about"), a web address, or a mailto: address.
 */
export type LinkContent = { label: string; href: string; download?: true; icon?: IconName }
