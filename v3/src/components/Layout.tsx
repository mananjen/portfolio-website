import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { site } from "../content/site"
import styles from "./Layout.module.css"

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <a className={styles.skip} href="#main" onClick={event => {
        event.preventDefault()
        const main = document.getElementById("main")
        main?.focus()
        main?.scrollIntoView()
      }}>{site.skip}</a>
      <div className={pathname === "/" ? styles.cobalt : undefined}>
        <header className={`container ${styles.header}`}>
          <Link className={styles.wordmark} to="/">{site.name}<span aria-hidden="true">.</span></Link>
          <nav className={styles.nav} aria-label={site.navigationLabel}>
            {site.nav.map(item => <NavLink key={item.path} to={item.path} end={item.path === "/"}>{item.label}</NavLink>)}
            <a href={site.email}>{site.hello}</a>
          </nav>
        </header>
      </div>
      <main id="main" tabIndex={-1}><Outlet /></main>
      <footer id="contact" tabIndex={-1} className={`container ${styles.footer}`}>
        <div>
          <p className="eyebrow">{site.footer.eyebrow}</p>
          <a className={styles.contactTitle} href={site.email}>{site.footer.title}<span aria-hidden="true"> ↗</span></a>
        </div>
        <div className={styles.footerLinks}>
          <div className="actions">{site.footer.links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
          <p>{site.footer.signature}</p>
        </div>
      </footer>
    </>
  )
}
