import type { ComponentPropsWithRef } from "react"
import { classNames } from "../../lib/classNames"
import type { TextTone } from "./TextLink"
import styles from "./textLink.module.css"

type TextButtonProps = Omit<ComponentPropsWithRef<"button">, "type"> & {
  tone?: TextTone
  /**
   * `inline` (default): reads as a text link. `box`: a block of text that is one button
   * (the footer's tap-to-copy address), in a tight rounded box that tints when pressed, with no rule.
   */
  shape?: "inline" | "box"
}

/** A button that looks like a TextLink. Never carries an arrow. */
export function TextButton({ tone = "text", shape = "inline", className, ...props }: TextButtonProps) {
  return <button {...props} type="button" className={classNames(styles.link, styles[tone], styles.button, shape === "box" && styles.box, className)} />
}
