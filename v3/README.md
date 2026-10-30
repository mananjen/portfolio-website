# V3: React + TypeScript

V3 is the new portfolio implementation, starting with the Cobalt cut Home and
Projects journey, with Experience for roles and education. It uses React,
TypeScript, Vite, CSS modules, and typed content.
The Astro evaluation was replaced after owner review; see
[ADR 0001](../docs/adr/0001-react-typescript-for-v3.md).

From the repository root:

```sh
npm install --prefix v3
npm run dev:v3
npm run check:v3
npm --prefix v3 test
npm run build:v3
npm run preview:v3
```

Open `http://127.0.0.1:4321/portfolio-website/`. A direct brief link is:
`http://127.0.0.1:4321/portfolio-website/#/projects?project=multilingual-image-text-retrieval`.
Stop the dev server with Ctrl+C before starting the production preview, since
both use port 4321. The server reports a port conflict rather than silently
switching to another port.

## Where to edit

| Change | File |
| --- | --- |
| Homepage copy, navigation, contact links, labels | `src/content/site.ts` |
| Page titles and descriptions | `src/content/meta.ts` |
| Add a project, edit its brief, reorder featured work | `src/content/projects.ts` |
| Experience headings and shared record imports | `src/content/experience.ts` |
| Roles, education, order, related project links | `../src/content/experience.ts` |
| Homepage composition | `src/pages/HomePage.tsx` |
| Projects selection and URL state | `src/pages/ProjectsPage.tsx` |
| Experience composition | `src/pages/ExperiencePage.tsx` |
| Shared project rendering | `src/components/ProjectCard.tsx` |
| Header/footer and shared navigation | `src/components/Layout.tsx` |
| Fonts, colors, shared spacing | `src/styles/global.css` |
| Component styles | The adjacent `*.module.css` file |
| Routes, page metadata, route focus/scroll | `src/App.tsx` |

Paths above are relative to `v3`. Adding a project with existing fields only
requires editing `src/content/projects.ts`. Array order controls featured order;
other projects sort by project `year`, with stable array order for ties.
`featured` adds a project to Home and the featured group on Projects. The first
featured project gets the large homepage treatment. Keep each `slug` stable and
unique: it is the public brief identifier. Each project has a `brief` array and
optional artifact links. Content and layout stay separate.

`ProjectsPage` derives the open project from React Router's search parameters.
`ProjectCard` receives `expanded` and `onToggle` props. Opening, closing, refresh,
and Back/Forward share the same URL state. Ordinary React effects handle focus
and scroll. Hash routes keep direct links working on GitHub Pages. The Skip link
and in-page section links move focus without losing the current route.

## Scope and migration

Home, Projects, and Experience are implemented. About and final
copy/design work remain for subsequent changes. The personal link currently
opens the deployed About page; v3's old `/contact` route leads to its footer.
Unknown routes show a recovery page. Earlier A-I and reading studies remain
available through the root prototype scripts.

V3 dependencies, lockfile, and output are separate from the current site.
`npm run build:v3` writes `v3/dist`; the existing build/deploy commands still
build/publish the current site. No hosting settings have changed. The GitHub
Pages base path is exercised in development as well as the production build.
Switch deployment after the remaining pages and content are ready for launch.

Current role/name reuse the repository's `src/content/meta.ts`; artwork reuses
existing assets. V3 project records are maintained separately from v2 during the
migration. The flagship uses the reviewed compact draft; supporting narratives
carry existing copy and still need editorial review.

Experience reuses `../src/content/experience.ts` for role and education records,
rendering their declared order. Maintain reverse chronology there. Optional
`relatedProjects` entries (`slug`, `label`) link a role to its v3 project briefs;
industry contributions stay on Experience. New entries using these fields need
only content edits. The research role's outdated retrieval metric and manuscript
status have been replaced by the reviewed contribution summary in this shared
source, which also updates the current site's Experience page.

The production HTML gets homepage metadata from the content exports. React
updates page titles/descriptions after navigation. This is a client-rendered
site; social crawlers that do not run JavaScript receive the homepage metadata,
including when a project brief URL is shared.

## Validation

Run `npm run check:v3`, `npm --prefix v3 test`, and `npm run build:v3`.
The small app-level suite checks Home-to-brief navigation, direct selection,
one-open behavior, Back/Forward, focus, Skip, and the legacy contact route using
React Router and an in-memory DOM. It does not measure browser layout.
Experience coverage includes navigation/title/focus and research brief links with
Back navigation from a direct Experience visit.
In a browser, open a flagship and
supporting brief from Home, reload, use Back/Forward, open/close another brief,
and test the toggle and Skip link with the keyboard. Check narrow and wide
layouts. Build and HTTP/module checks do not replace visual/interaction review.
