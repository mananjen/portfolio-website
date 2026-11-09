import { BaseLink, type BaseLinkProps } from "./BaseLink"
import { classNames } from "../../lib/classNames"
import styles from "./ctaLink.module.css"

/** The large call to action. Always carries ↗, whatever the destination. */
export function CtaLink({ className, ...props }: Omit<BaseLinkProps, "arrow">) {
  return <BaseLink {...props} arrow="always" className={classNames(styles.cta, className)} />
}
