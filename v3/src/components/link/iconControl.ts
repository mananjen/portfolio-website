import { classNames } from "../../lib/classNames"
import { isBrandIcon, type IconName } from "./Icon"
import styles from "./iconLink.module.css"

/** The shared look of IconLink and IconButton: brand marks get their own class so they are never dimmed. */
export const iconControlClass = (icon: IconName, extra?: string) =>
  classNames(styles.control, isBrandIcon(icon) && styles.brand, extra)
