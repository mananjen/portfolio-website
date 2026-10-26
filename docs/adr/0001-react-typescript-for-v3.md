# Build v3 with React and TypeScript

After evaluating an Astro Home/Projects slice, Manan chose React + TypeScript
on 26 October 2026 because familiar component and state patterns make the
portfolio easier for him to maintain. V3 uses Vite, CSS modules with shared
style variables, and typed content exports; the Astro implementation is replaced.
Static hosting on GitHub Pages remains the target, with hash routes for
refresh-safe project brief links. Prefer maintainability for the owner over
Astro's default reduction in browser JavaScript; no measured performance benefit
justified retaining a second component model for this site.
