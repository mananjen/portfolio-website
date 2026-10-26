import { projectLabels } from "../content/site"
import styles from "./Tags.module.css"

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags} aria-label={projectLabels.technologies}>
      {tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>
  )
}
