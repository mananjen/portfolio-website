import type { ComponentPropsWithRef } from "react"
import { Icon, type IconName } from "./Icon"
import { iconControlClass } from "./iconControl"

type IconButtonProps = Omit<ComponentPropsWithRef<"button">, "type" | "children" | "aria-label"> & {
  icon: IconName
  /** The accessible name, and the tooltip on mouse-first screens. */
  label: string
  /** A different tooltip from the name, e.g. "Copied" while the name stays "Copy email address". */
  tip?: string
}

/** An icon-only button that looks like an IconLink. */
export function IconButton({ icon, label, tip = label, className, ...props }: IconButtonProps) {
  return (
    <button {...props} type="button" aria-label={label} data-tip={tip} className={iconControlClass(icon, className)}>
      <Icon name={icon} />
    </button>
  )
}
