import { aboutPage } from "../content/about"
import styles from "./AboutPage.module.css"

export function AboutPage() {
  return (
    <div className="container">
      <section className={styles.intro}>
        <p className="eyebrow">{aboutPage.intro.eyebrow}</p>
        <h1>{aboutPage.intro.title}</h1>
        <p className="muted">{aboutPage.intro.description}</p>
        <div className={styles.story}>
          {aboutPage.intro.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className={styles.art} aria-labelledby="art-heading">
        <p className="eyebrow">{aboutPage.art.eyebrow}</p>
        <h2 id="art-heading">{aboutPage.art.title}</h2>
        <p className="muted">{aboutPage.art.description}</p>
        <div className={styles.gallery}>
          {aboutPage.art.gallery.map(image => <figure key={image.src}>
            <a href={image.src} target="_blank" rel="noreferrer" aria-label={`${aboutPage.art.imageLabel}: ${image.alt}`}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
              <span className={styles.imageLabel}>{aboutPage.art.imageLabel}</span>
            </a>
          </figure>)}
        </div>
        <a className="text-link" href={aboutPage.art.instagram.href} target="_blank" rel="noreferrer">{aboutPage.art.instagram.label} <span aria-hidden="true">↗</span></a>
      </section>
      <div className={styles.interests}>
        {aboutPage.sections.map(section => <section key={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
      </div>
    </div>
  )
}
