import { classNames } from "../../lib/classNames"
import { BaseLink, type BaseLinkProps } from "./BaseLink"
import { Icon, type IconName } from "./Icon"
import { iconControlClass } from "./iconControl"
import styles from "./iconLink.module.css"

type IconLinkProps = Omit<BaseLinkProps, "arrow" | "children" | "aria-label"> & {
  icon: IconName
  /** The accessible name, and the tooltip on mouse-first screens. */
  label: string
  /** Optional visible text, with the destination's arrow. Which part shows is the owner's choice: see "Links" in docs/design-system.md. */
  text?: string
}

/** An icon link. Brand marks are never dimmed. */
export function IconLink({ icon, label, text, className, ...props }: IconLinkProps) {
  return (
    <BaseLink {...props} arrow={text ? "auto" : "none"} aria-label={label} data-tip={label}
      className={iconControlClass(icon, classNames(text && styles.withText, className))}>
      <Icon name={icon} className={text ? styles.iconPart : undefined} />
      {text && <span className={styles.textPart}>{text}</span>}
    </BaseLink>
  )
}
