// THROWAWAY: three shortlisted mobile header ideas plus two baselines on the existing pages, ?variant=push|overlay|drawer|full|island.
// Desktop sticky behavior is a separate axis. Only enabled by `npm run prototype:header` in dev.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { useLocation, useSearchParams } from "react-router-dom"
import { allHeaderIdeas, headerIdeas, headerPrototype as copy, headerPrototypeKeys } from "../content/headerPrototype"
import { site } from "../content/site"
import { BaseLink, TextLink } from "./link"
import styles from "./HeaderPrototype.module.css"

export default function HeaderPrototype() {
  const [params, setParams] = useSearchParams()
  const { pathname, hash } = useLocation()
  const carried = useRef(new URLSearchParams(params))
  const option = (key: string) => params.get(key) ?? carried.current.get(key)
  const idea = allHeaderIdeas.find(item => item.key === option("variant")) ?? headerIdeas[0]
  const bar = copy.barOptions.find(item => item.key === option("bar"))?.key ?? "steady"
  const align = copy.alignOptions.find(item => item.key === option("align"))?.key ?? "content"
  const tablet = copy.tabletOptions.find(item => item.key === option("tablet"))?.key ?? "auto"
  const theme = copy.themeOptions.find(item => item.key === option("theme"))?.key ?? "bar"
  const surface = copy.surfaceOptions.find(item => item.key === option("surface"))?.key ?? "glass"
  const home = copy.homeOptions.find(item => item.key === option("home"))?.key ?? "icon"
  const motion = copy.motionOptions.find(item => item.key === option("motion"))?.key ?? "subtle"
  const settings = { variant: idea.key, bar, align, tablet, theme, surface, home, motion }
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const mobileTools = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const modal = open && collapsed && idea.key !== "push"

  function update(key: string, value: string) {
    setParams(previous => {
      const next = new URLSearchParams(previous)
      next.set(key, value)
      return next
    }, { replace: true })
  }

  function cycle(direction: number) {
    const index = headerIdeas.findIndex(item => item.key === idea.key)
    update("variant", headerIdeas[(index + direction + headerIdeas.length) % headerIdeas.length].key)
  }

  function destination(path: string) {
    const next = new URLSearchParams()
    for (const key of headerPrototypeKeys) next.set(key, settings[key])
    return `${path}?${next}`
  }

  function closeMenu(restoreFocus = true) {
    setOpen(false)
    if (restoreFocus) trigger.current?.focus({ preventScroll: true })
  }

  useLayoutEffect(() => { setOpen(false) }, [pathname, params.toString()])

  // Preserve the study when an ordinary page/brief link doesn't carry its query.
  // Existing route parameters (notably `project`) remain intact.
  useLayoutEffect(() => {
    const next = new URLSearchParams(params)
    for (const key of headerPrototypeKeys) next.set(key, settings[key])
    carried.current = next
    if (next.toString() !== params.toString()) setParams(next, { replace: true })
  }, [params.toString(), pathname])

  useLayoutEffect(() => {
    const measure = () => {
      const nextCollapsed = getComputedStyle(mobileTools.current!).display !== "none"
      setCollapsed(nextCollapsed)
      if (!nextCollapsed) setOpen(false)
      const bottom = frame.current!.getBoundingClientRect().bottom
      header.current!.style.setProperty("--prototype-bar-height", `${bottom}px`)
      document.documentElement.style.setProperty("--prototype-scroll-offset", `${bottom + 18}px`)
      document.documentElement.style.setProperty("--prototype-hero-offset", `${bottom}px`)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(frame.current!)
    observer.observe(header.current!)
    measure()
    return () => observer.disconnect()
  }, [tablet, bar, align, idea.key])

  useEffect(() => {
    document.documentElement.dataset.headerPrototype = ""
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      delete document.documentElement.dataset.headerPrototype
      document.documentElement.style.removeProperty("--prototype-scroll-offset")
      document.documentElement.style.removeProperty("--prototype-hero-offset")
    }
  }, [])

  useEffect(() => {
    // On a direct deep link the real page can mount before this lazy dev header.
    // Repeat its initial anchor placement once the sticky height is known.
    const project = params.get("project")
    const target = project ? document.getElementById(`project-${project}`)
      : hash ? document.getElementById(hash.slice(1)) : null
    target?.scrollIntoView({ block: "start", behavior: "instant" })
  }, [])

  useLayoutEffect(() => {
    if (!modal) return
    const background = [document.querySelector<HTMLElement>("main"), document.querySelector<HTMLElement>("footer"), document.querySelector<HTMLElement>("footer + div")].filter((element): element is HTMLElement => !!element)
    const previous = background.map(element => element.inert)
    const overflow = document.body.style.overflow
    background.forEach(element => { element.inert = true })
    document.body.style.overflow = "hidden"
    return () => {
      background.forEach((element, index) => { element.inert = previous[index] })
      document.body.style.overflow = overflow
    }
  }, [modal])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key === "Escape" && open) {
        event.preventDefault()
        closeMenu()
      }
      if (modal && event.key === "Tab") {
        const controls = [...header.current!.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(element => element.getClientRects().length)
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
      if (open || event.altKey || event.ctrlKey || event.metaKey || target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
        cycle(event.key === "ArrowLeft" ? -1 : 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const utilities = (
    <div className={styles.utilities}>
      {copy.resume.href && <TextLink tone="plain" href={copy.resume.href} download aria-label={copy.resume.label}>{copy.resume.text}</TextLink>}
      <TextLink tone="plain" href={copy.contact.href} onClick={() => closeMenu(false)}>{copy.contact.label}</TextLink>
    </div>
  )
  const themePreview = <span className={styles.themePreview} role="img" aria-label={copy.themeLabel} title={copy.themeLabel}><span aria-hidden="true">{copy.themeGlyph}</span><span className={styles.themeCaption} aria-hidden="true">{copy.themeCaption}</span></span>
  const entries = copy.entries.map((entry, index) => (
    <div key={entry.path} className={`${styles.entry} ${styles[idea.key === "drawer" ? "drawerEntry" : idea.key === "full" ? "fullEntry" : "compactEntry"]}`}>
      <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <TextLink tone="plain" href={destination(entry.path)} aria-current={pathname === entry.path ? "page" : undefined} onClick={() => closeMenu(entry.path === pathname)}>
        {entry.label}
      </TextLink>
      <span className={styles.description}>{entry.description}</span>
    </div>
  ))

  const panel = (
    <nav id="header-prototype-menu" aria-label={copy.navigation} className={styles.panel} hidden={!open} inert={!open}>
      <p className={styles.panelEyebrow}>{copy.panelEyebrow}</p>
      <p className={styles.panelTitle}>{copy.panelTitle}</p>
      <div className={styles.entries}>{entries}</div>
      <div className={styles.panelUtilities}>{utilities}{theme === "menu" && themePreview}</div>
    </nav>
  )

  return (
    <>
      <header ref={header} className={styles.root} data-idea={idea.key} data-bar={bar} data-align={align} data-tablet={tablet}
        data-surface={surface} data-motion={motion} data-route-home={pathname === "/" ? "" : undefined}
        data-scrolled={scrolled ? "" : undefined} data-home={pathname === "/" && surface === "blend" ? "" : undefined}
        data-open={open ? "" : undefined} data-collapsed={collapsed ? "true" : "false"}
        role={modal ? "dialog" : undefined} aria-modal={modal ? true : undefined} aria-label={modal ? copy.navigation : undefined}>
        <div className={styles.surface} />
        <div className={styles.frameContainer}><div ref={frame} className={styles.frame}>
          <BaseLink href={destination("/")} className={styles.wordmark} aria-current={pathname === "/" ? "page" : undefined} onClick={() => { if (open) closeMenu(pathname === "/") }}>{site.name}<span aria-hidden="true">.</span></BaseLink>
          <nav className={styles.desktopNav} aria-label={copy.navigation}>
            {copy.exposedEntries.map(entry => entry.path === "/" && home === "icon"
              ? <BaseLink key={entry.path} className={styles.homeControl} href={destination(entry.path)} aria-label={entry.label} title={entry.label} aria-current={pathname === entry.path ? "page" : undefined}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></svg>
              </BaseLink>
              : <TextLink key={entry.path} tone="plain" className={styles.desktopLink} href={destination(entry.path)} aria-current={pathname === entry.path ? "page" : undefined}>{entry.label}</TextLink>)}
          </nav>
          <div className={styles.desktopUtilities}>{utilities}{themePreview}</div>
          <div ref={mobileTools} className={styles.mobileTools}>
            {theme === "bar" && themePreview}
            <button ref={trigger} className={styles.menuButton} type="button" aria-expanded={open} aria-controls="header-prototype-menu" onClick={() => open ? closeMenu() : setOpen(true)}>
              <span className={styles.menuGlyph} data-open={open ? "" : undefined} aria-hidden="true"><i /><i /></span>
              {open ? copy.close : copy.menu}
            </button>
          </div>
        </div></div>
        {collapsed && <>
          {idea.key !== "push" && <div className={styles.shade} hidden={!open} onClick={() => closeMenu()} aria-hidden="true" />}
          {panel}
        </>}
      </header>
      {createPortal(
        <aside className={styles.switcher} data-menu-open={open ? "" : undefined} aria-label={copy.toolbar}>
          <div className={styles.switchRow}>
            <button type="button" onClick={() => cycle(-1)} aria-label={copy.previous}>{copy.previousGlyph}</button>
            <div className={styles.currentIdea}><span className={styles.prototypeEyebrow}>{copy.prototypeLabel}</span><strong>{idea.name}</strong></div>
            <button type="button" onClick={() => cycle(1)} aria-label={copy.next}>{copy.nextGlyph}</button>
            <details className={styles.settings}>
              <summary>{copy.settings}</summary>
              <div className={styles.settingsPanel}>
                <p className={styles.settingsNote}>{idea.note}</p>
                <Setting label={copy.menuLabel} value={idea.key} onChange={value => update("variant", value)} options={allHeaderIdeas.map(item => ({ key: item.key, label: item.name }))} />
                <Setting label={copy.barLabel} value={bar} onChange={value => update("bar", value)} options={copy.barOptions} />
                <Setting label={copy.alignLabel} value={align} onChange={value => update("align", value)} options={copy.alignOptions} />
                <Setting label={copy.tabletLabel} value={tablet} onChange={value => update("tablet", value)} options={copy.tabletOptions} />
                <Setting label={copy.themePlacementLabel} value={theme} onChange={value => update("theme", value)} options={copy.themeOptions} />
                <Setting label={copy.surfaceLabel} value={surface} onChange={value => update("surface", value)} options={copy.surfaceOptions} />
                <Setting label={copy.homeLabel} value={home} onChange={value => update("home", value)} options={copy.homeOptions} />
                <Setting label={copy.motionLabel} value={motion} onChange={value => update("motion", value)} options={copy.motionOptions} />
                <p className={styles.settingsNote}>{copy.hint}</p>
              </div>
            </details>
          </div>
          <p className={styles.axisHint}>{collapsed ? copy.mobileHint : copy.desktopHint}</p>
          <p className={styles.state} role="status">{collapsed ? copy.state.collapsed : copy.state.exposed} · {open ? copy.state.open : copy.state.closed} · {scrolled ? copy.state.scrolled : copy.state.top} · {bar} · {align} · {tablet} · {theme} · {surface} / {home} / {motion}</p>
        </aside>, document.body,
      )}
    </>
  )
}

function Setting({ label, value, options, onChange }: { label: string; value: string; options: readonly { key: string; label: string }[]; onChange: (value: string) => void }): ReactNode {
  return <label>{label}<select value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option.key} value={option.key}>{option.label}</option>)}</select></label>
}
