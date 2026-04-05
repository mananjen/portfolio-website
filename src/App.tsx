import { HashRouter, Route, Routes } from "react-router-dom"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HomePage } from "@/pages/home"
import { AboutPage } from "@/pages/about"
import { ProjectsPage } from "@/pages/projects"
import { ExperiencePage } from "@/pages/experience"
import { ContactPage } from "@/pages/contact"

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.10),_transparent_25%)]" />

        <SiteHeader />

        <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </main>

        <SiteFooter />
      </div>
    </HashRouter>
  )
}