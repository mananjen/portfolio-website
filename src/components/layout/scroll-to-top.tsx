import { useEffect } from "react"
import { useLocation } from "react-router-dom"

type ScrollState = {
  preserveScroll?: boolean
}

export function ScrollToTop() {
  const location = useLocation()
  const state = (location.state as ScrollState | null) ?? null

  useEffect(() => {
    if (state?.preserveScroll) {
      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, [location.pathname, location.search, state?.preserveScroll])

  return null
}