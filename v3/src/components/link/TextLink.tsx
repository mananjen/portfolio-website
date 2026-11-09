import { BaseLink, type BaseLinkProps } from "./BaseLink"
import { classNames } from "../../lib/classNames"
import styles from "./textLink.module.css"

export type TextTone = "text" | "plain"

/** An inline or standalone text link. `text`: accent UI text; `plain`: takes the surrounding colour and type. */
export function TextLink({ tone = "text", className, ...props }: Omit<BaseLinkProps, "arrow"> & { tone?: TextTone }) {
  return <BaseLink {...props} className={classNames(styles.link, styles[tone], className)} />
}
