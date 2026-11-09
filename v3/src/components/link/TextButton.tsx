import type { ComponentPropsWithRef } from "react"
import { classNames } from "../../lib/classNames"
import type { TextTone } from "./TextLink"
import styles from "./textLink.module.css"

/** A button that looks like a TextLink. Never carries an arrow. */
export function TextButton({ tone = "text", className, ...props }: Omit<ComponentPropsWithRef<"button">, "type"> & { tone?: TextTone }) {
  return <button {...props} type="button" className={classNames(styles.link, styles[tone], styles.button, className)} />
}
