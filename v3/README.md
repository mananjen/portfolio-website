# V3: Home + Projects in Astro

This is a working two-page slice for evaluating Astro, not the replacement for
the deployed portfolio yet. It uses the Cobalt cut direction, static HTML,
TypeScript content, scoped CSS, and a small script for project briefs.

From the repository root:

```sh
npm install --prefix v3
npm run dev:v3
npm run build:v3
npm run preview:v3
```

Open `http://localhost:4321/portfolio-website/`. The repository base path is used
locally too, so links exercise the same paths required by GitHub Pages. A direct
brief link is `/portfolio-website/projects/?project=multilingual-image-text-retrieval`.
The build writes `v3/dist`, separately from the existing React build. The current
deploy command still publishes v2. No deployment or GitHub settings are changed.
Astro dependencies and their lockfile live in `v3`, keeping the React toolchain
independent. Use Node 22.23.4 or newer (this slice was checked with Node 24).

## Where to edit

| Change | File |
| --- | --- |
| Homepage copy, navigation, contact links, page labels | `src/content/site.ts` |
| Add a project, edit its brief, reorder featured work | `src/content/projects.ts` |
| Homepage composition | `src/pages/index.astro` |
| Projects composition | `src/pages/projects.astro` |
| Shared project rendering | `src/components/ProjectCard.astro` |
| Fonts, colors, shared spacing | `src/styles/global.css` |
| URL, history, and focus behavior | `src/scripts/project-briefs.ts` |

Paths in this table are relative to `v3`. Array order determines featured order;
the rest sort by `year`, preserving array order for ties. Marking a project
`featured` adds it to Home and the featured group on Projects. The first featured
project gets the large homepage treatment. Keep `slug` stable: it is the public
brief identifier. Every project has a `brief` array and optional artifact links.

The content files use plain TypeScript objects and asset URL imports, so they can
also feed React components. Current role/name reuse `../src/content/meta.ts` from
the repository, and images reuse existing assets. V3 project records are an
independent evaluation copy; editing them does not alter v2. The flagship brief
uses the reviewed compact draft. Other narratives carry over existing content
and still need editorial review before launch.

## Coming from React

An `.astro` file has three familiar parts:

```astro
---
// Runs at build time. Import data and compute the props for this page here.
import { home } from "../content/site"
---
<h1>{home.headline.map(line => <span>{line}</span>)}</h1>
<style>
  /* Scoped to this component. Global tokens live in global.css. */
  h1 span { display: block; }
</style>
```

Use `class` instead of `className`; expressions and `.map()` look much like JSX.
Component inputs come from `Astro.props`. There is no React render loop or
`useState` in a static template. A `<script>` handles browser interactions, and
Astro bundles its TypeScript automatically. Here, native `<details>` controls
expansion even without JavaScript. The browser script adds one-open-at-a-time
behavior, URL synchronization, and focus/scroll handling.

## Scope and verification

Only Home and Projects are built. The personal link goes to the existing About
page; other pages, light mode, deployment automation, and final copy are deferred.
Old `#/projects` and `#/contact` bookmarks are recognized by this slice's homepage.
Full legacy-route migration belongs to the eventual site replacement.

Before adopting this slice, try the flagship and a supporting project from Home,
reload the selected brief, use Back/Forward, open another brief, and operate its
summary with the keyboard. Check narrow and wide layouts and artwork sizing.
Build/type checks and served-route checks can run without a browser; visual and
interaction acceptance still need a connected browser or a manual review.
