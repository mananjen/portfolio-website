# Manan Jain's portfolio

This repository contains two React/TypeScript implementations built with Vite:

- `v3/`: the new portfolio shell and the focus of current work. It needs
  substantial UI design and iterative interaction improvements before launch.
- `src/`: the older site, which the existing deployment script still publishes.

## Setup

Use Node.js 22.x (22.12 or newer) or 24.x, and npm. From the repository root,
install both sets of dependencies; v3 imports shared content and assets from the
root project.

```sh
npm ci
npm ci --prefix v3
```

## Work on v3

Start the development server:

```sh
npm run dev:v3
```

Open <http://127.0.0.1:4321/portfolio-website/>. For example, a direct project
brief opens at
<http://127.0.0.1:4321/portfolio-website/#/projects?project=multilingual-image-text-retrieval>.

Check types, run tests, and create a production build:

```sh
npm run check:v3
npm --prefix v3 test
npm run build:v3
```

The build output is `v3/dist`. To serve that build locally:

```sh
npm run preview:v3
```

Stop the dev server before starting preview: both use port 4321 and report a
conflict if it is occupied. A passing build or test run does not mean the UI is
accepted or ready to publish.

See the [v3 editing guide](v3/README.md) for content files, components and routing,
and the [current plan](docs/portfolio-improvements.md#current-state-and-remaining-work)
for remaining design and content work.

## Older site

These commands operate on the root implementation:

```sh
npm run dev
npm run typecheck
npm run build
npm run preview
```

Use the URL printed by Vite for development or preview. The build output is
`dist`. The root package has no test script; the v3 tests use the command above.

## Deployment

The existing `npm run deploy` command builds the **older root site** and publishes
`dist` to the `gh-pages` branch. It does not publish `v3/dist`.

Deployment remains deferred until Manan is satisfied with v3 after UI design and
iteration. Publishing v3 requires an explicit deployment workflow/cutover change;
the local development and build commands above do not deploy anything.
