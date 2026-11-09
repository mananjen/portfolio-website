import { useId, type HTMLAttributes, type ReactNode } from "react"
import linkedInBug from "./linkedin-in-bug-white.png"
import { classNames } from "../../lib/classNames"
import styles from "./link.module.css"

// Every icon on the site, by name. Brand marks are the owners' official artwork:
// they render as supplied (pure white on this site) and are never dimmed or recoloured.
type IconDefinition = { brand?: true; render: () => ReactNode }

// Generic icons are copied from Lucide (ISC; check and arrow-up via Feather, MIT): see LUCIDE-LICENSE.txt.
// Switch to the lucide-react package once there are more than about five.
const lucide = (paths: ReactNode, strokeWidth = 2) => () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" focusable="false">{paths}</svg>
)

const icons = {
  github: { brand: true, render: () => <GitHubMark /> },
  linkedin: { brand: true, render: () => <img src={linkedInBug} alt="" width={23} height={21} /> },
  cv: { render: () => <CvBadge /> },
  copy: { render: lucide(<><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>) },
  check: { render: lucide(<path d="M20 6 9 17l-5-5" />, 2.25) },
  arrowUp: { render: lucide(<><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></>) },
  // The drawn arrows links carry: ↗ for new-tab links and the CTA, ↓ for downloads.
  external: { render: () => <DrawnStroke d="M7 7h10v10M7 17 17 7" /> },
  download: { render: () => <DrawnStroke d="M12 4v16M19 13l-7 7-7-7" /> },
} satisfies Record<string, IconDefinition>

export type IconName = keyof typeof icons

export function isBrandIcon(name: IconName) {
  return (icons[name] as IconDefinition).brand === true
}

/** Decorative: the control around it carries the accessible name. */
export function Icon({ name, className, ...rest }: { name: IconName; className?: string } & HTMLAttributes<HTMLSpanElement>) {
  return <span {...rest} className={classNames(styles.icon, className)} aria-hidden="true">{icons[name].render()}</span>
}

// Official GitHub Invertocat (brand.github.com kit, GitHub_Invertocat_White.svg), fill switched to currentColor.
function GitHubMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 98 96" focusable="false">
      <path fill="currentColor" d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
    </svg>
  )
}

// A rounded square with "CV" knocked out, drawn to sit beside the [in] bug at the same weight.
function CvBadge() {
  const mask = useId()
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" focusable="false">
      <defs>
        <mask id={mask}>
          <rect width="22" height="21" rx="3" fill="white" />
          <text x="11" y="15" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="0" style={{ fontFamily: "var(--font-body)" }} fill="black">CV</text>
        </mask>
      </defs>
      <rect width="22" height="21" rx="3" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  )
}

function DrawnStroke({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d={d} />
    </svg>
  )
}
