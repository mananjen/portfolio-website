import { lazy, Suspense } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { site } from "../content/site"
import styles from "./Layout.module.css"

// Throwaway header study is loaded only by the dedicated dev command.
const PrototypeHeader = import.meta.env.DEV && import.meta.env.MODE === "header-prototype"
  ? lazy(() => import("./HeaderPrototype")) : null

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
      {PrototypeHeader ? <Suspense fallback={null}><PrototypeHeader /></Suspense> : <div className={pathname === "/" ? styles.cobalt : undefined}>
        <header className={`container ${styles.header}`}>
          <Link className={styles.wordmark} to="/">{site.name}<span aria-hidden="true">.</span></Link>
          <nav className={styles.nav} aria-label={site.navigationLabel}>
            {site.nav.map(item => <NavLink key={item.path} to={item.path} end={item.path === "/"}>{item.label}</NavLink>)}
            <a href={site.email}>{site.hello}</a>
          </nav>
        </header>
      </div>}
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  )
}
