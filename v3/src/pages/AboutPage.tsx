import { ImageLink, TextLink } from "../components/link"
import { aboutPage } from "../content/about"
import styles from "./AboutPage.module.css"

export function AboutPage() {
  return (
    <div className="container">
      <section className={styles.intro}>
        <p className={styles.accentLabel}>{aboutPage.intro.eyebrow}</p>
        <h1>{aboutPage.intro.title}</h1>
        <p className={styles.introCopy}>{aboutPage.intro.description}</p>
        <div className={styles.story}>
          {aboutPage.intro.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className={styles.art} aria-labelledby="art-heading">
        <p className={styles.accentLabel}>{aboutPage.art.eyebrow}</p>
        <h2 id="art-heading">{aboutPage.art.title}</h2>
        <p className={styles.artCopy}>{aboutPage.art.description}</p>
        <div className={styles.gallery}>
          {aboutPage.art.gallery.map(image => <figure key={image.src}>
            <ImageLink href={image.src} label={aboutPage.art.imageLink(image.alt)}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
              <span className={styles.imageLabel}>{aboutPage.art.imageLabel}</span>
            </ImageLink>
          </figure>)}
        </div>
        <TextLink href={aboutPage.art.instagram.href}>{aboutPage.art.instagram.label}</TextLink>
      </section>
      <div className={styles.interests}>
        {aboutPage.sections.map(section => <section key={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`} className={styles.interestTitle}>{section.title}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
      </div>
    </div>
  )
}
