import { useEffect, useRef } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Layout } from "./components/Layout"
import { projects } from "./content/projects"
import { notFound } from "./content/site"
import { pageMeta } from "./content/meta"
import { HomePage } from "./pages/HomePage"
import { ProjectsPage } from "./pages/ProjectsPage"

function RouteEffects() {
  const { pathname, search, hash } = useLocation()
  const previousPath = useRef<string | undefined>(undefined)

  useEffect(() => {
    const meta = pathname === "/projects" ? pageMeta.projects : pageMeta.home
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description)

    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname
    const selected = new URLSearchParams(search).get("project")
    if (pathname === "/projects" && projects.some(project => project.slug === selected)) return
    const anchor = hash ? document.getElementById(hash.slice(1)) : null
    if (anchor) {
      anchor.focus({ preventScroll: true })
      anchor.scrollIntoView({ block: "start" })
    } else if (changedPage) {
      window.scrollTo(0, 0)
      document.getElementById("main")?.focus({ preventScroll: true })
    }
  }, [pathname, search, hash])

  return null
}

export function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={(
            <section className="container page-message">
              <h1>{notFound.title}</h1>
              <p className="muted">{notFound.description}</p>
              <div className="actions"><Link to="/">{notFound.home}</Link><Link to="/projects">{notFound.projects}</Link></div>
            </section>
          )} />
        </Route>
      </Routes>
    </>
  )
}
