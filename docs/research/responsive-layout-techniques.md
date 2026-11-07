# Responsive layout techniques for V3

Research for issue #34. Applies to `v3/` (Vite 8.3, React 19, CSS modules with `composes`, fluid type tokens in `v3/src/foundation/`, GitHub Pages).
First consumer: the footer redesign (#35). The header redesign comes later.

Researched 2026-11-08. Items marked **Unverified** could not be confirmed in a primary source, or were read from source code but not tested in this repo.

## Where the repo is today

- **CSS pipeline.** There is no PostCSS config, and `vite.config.ts` does not set `css.transformer`. Vite therefore uses its default `'postcss'` transformer with no plugins. [Vite css.transformer](https://vite.dev/config/shared-options#css-transformer)
- **Minification.** Production CSS is minified by Lightning CSS (`build.cssMinify` defaults to `'lightningcss'`). It targets `build.cssTarget`, which defaults to `build.target`: `'baseline-widely-available'` = `chrome111, edge111, firefox114, safari16.4, ios16.4`. [Vite build options](https://vite.dev/config/build-options); confirmed in `v3/node_modules/vite/dist/node/chunks/node.js` (Vite 8.3.5, lightningcss 1.33.0 installed).
- **Lightning CSS is a minifier only.** Lightning CSS minifies, but it does not process drafts such as `@custom-media` unless you opt in (see section 3).
- **Media queries in use.** Five ad-hoc media queries exist: `max-width: 600px` in `Layout.module.css` (header and footer), and `max-width: 700px` in `HomePage`, `AboutPage`, `ExperiencePage`, and `ProjectCard`.
- **Lint guard.** `stylelint.config.mjs` guards type and colour tokens, but nothing guards breakpoints.

## 1. Container queries

### What they are

- **Making a container.** Set `container-type: inline-size` (or `size`) on an element. Its descendants can then use `@container (width > 30rem) { … }`. [MDN Container size and style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)
- **Which container a query uses.** An unnamed query matches the nearest ancestor size container. `container-name` narrows the match to containers with that name. [same MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)
- **The default value.** `container-type: normal` (the default) is not a size container. It can still be a style container. [MDN container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type)
- **Container query units.**
  - `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, and `cqmax` are 1% of the query container's width, height, inline size, or block size.
  - With no eligible container, they fall back to the small viewport units (`sv*`).
  - [MDN Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- **Spec.** Container queries are defined in CSS Conditional Rules Level 5, a W3C Working Draft dated 30 Oct 2025. [css-conditional-5](https://www.w3.org/TR/css-conditional-5/)

### Browser support

| Feature | Status | Versions | Source |
|---|---|---|---|
| Container size queries | Baseline **widely available** since 2025-08-14 | Chrome/Edge 105, Firefox 110, Safari 16 | [web-features](https://web-platform-dx.github.io/web-features-explorer/features/container-queries/) |
| Container query units (`cqi` …) | Same versions, about 96% global usage | Chrome 105, Firefox 110, Safari 16 | [caniuse](https://caniuse.com/css-container-query-units) |
| Container **style** queries (`style(--x: y)`) | Baseline **newly available** since 2026-05-19 | Chrome 111, Safari 18, Firefox 151 | [web-features](https://web-platform-dx.github.io/web-features-explorer/features/container-style-queries/) |
| Media query range syntax (`width >= 48rem`) | Widely available since 2025-09-27 | Chrome 104, Firefox 102, Safari 16.4 | [web-features](https://web-platform-dx.github.io/web-features-explorer/features/media-query-range-syntax/) |

Size queries, container units, and range syntax all fall inside Vite's default build target (Safari 16.4+). Style queries do not yet: Safari 16.4–17.x and Firefox before 151 lack them.

### Pitfalls

- **Containment side effects.**
  - `inline-size` applies **style containment** and **inline-size containment**.
  - `size` applies style containment and **size containment** on both axes.
  - Both establish an **independent formatting context**.
  - The spec does not list layout containment for either value.
  - Sources: [css-conditional-5 §5.1](https://www.w3.org/TR/css-conditional-5/), [MDN container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type).
  - In practice:
    - The container's inline size is computed "in isolation, ignoring the child elements".
    - Margins of children do not collapse through it, because it is a new formatting context.
    - Counters are scoped to it (style containment). [MDN Using CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Using_CSS_containment)
- **Collapse in shrink-to-fit contexts.** "If a contextual or explicit size is not available, elements with size containment will collapse." [MDN container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type)
  - A block-level wrapper that stretches to its parent is safe.
  - These collapse to zero width unless given a width:
    - a flex item sized by its content (like today's `.footerLinks`)
    - an `inline-block`
    - a grid item in an `auto` track
- **Never use `container-type: size` for a header or footer.** Their height comes from content, so with `size` they would collapse vertically. Use `inline-size`.
- **An element styles its descendants, not itself.** A container query matches the *nearest ancestor* container ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)). To restyle `.footer` itself, the container must be a wrapper around it, such as the `<footer>` element with an inner `.footerInner`.
- **Style queries only see custom properties.** "The only style feature currently supported is custom properties." Querying a regular declaration like `max-width` is not supported. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)
- **Container names in CSS Modules (Unverified).**
  - Lightning CSS's CSS Modules docs say "custom identifiers" are scoped by default, but they do not mention container names. [Lightning CSS CSS Modules](https://lightningcss.dev/css-modules.html)
  - The default PostCSS modules path is not documented for this either.
  - The safest choice is unnamed containers, or names that are unique project-wide.

### Good patterns for a footer or header

1. **The component wrapper is the container.**
   - Put `container-type: inline-size` on the outer element (`<footer>`, `<header>`).
   - Lay out the inner element with `@container (width < …)`.
   - The component then adapts to the width it is given, so it behaves the same inside a narrow page column or a full-bleed band.
2. **Thresholds in `rem`, not px.** In `@container`, `rem` follows the root font size, so the switch point moves with the user's text-size setting. (In `@media`, `em`/`rem` are "relative to the initial value of font-size". [Media Queries 4 §1.3](https://www.w3.org/TR/mediaqueries-4/#units))
3. **Container units for spacing only.**
   - Use `cqi` for gaps or padding, such as `gap: clamp(1rem, 4cqi, 3rem)`.
   - Keep font sizes on the foundation tokens. Text sized in `cqi`/`vw` has the zoom problem described in [fluid-type-and-font-loading.md](fluid-type-and-font-loading.md).
   - The stylelint guard already forbids raw font sizes.
4. **Use intrinsic patterns first** (section 2), and add `@container` only for changes those patterns cannot express, such as reordering, hiding a label, or switching alignment.

## 2. Intrinsic layouts without breakpoints

| Technique | What it does | Limits |
|---|---|---|
| `flex-wrap: wrap` + `gap` | Items wrap when they run out of room. The nav already does this. | You do not control *which* item wraps or how the wrapped row aligns. |
| Grid `repeat(auto-fit, minmax(min(18rem, 100%), 1fr))` | Fits as many columns as there is room for. With `auto-fit`, empty tracks "are collapsed", so the items fill the row. [MDN repeat()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat) | Column count depends on width, not on design intent, so you can get 3+1 orphan rows. The `min(…, 100%)` guard prevents overflow (my usage note, not in the MDN page). |
| `clamp()` for spacing and widths | Values change continuously between two bounds. Type already uses it. | It only interpolates a value. It cannot change layout structure. |
| **Switcher** (`flex-basis: calc((var(--threshold) - 100%) * 999)`) | All items move from one row to one column at a container-width threshold, without a query. [Every Layout: Switcher](https://every-layout.dev/layouts/switcher/) | All-or-nothing, so there is no 2×2 state. Item count needs a quantity-query workaround. The `* 999` trick is hard to read later. |
| **Sidebar** (`flex-grow: 999; flex-basis: 0; min-inline-size: 50%` on the main item) | A side item keeps its ideal width until the main item would drop below 50%, then both stack. [Every Layout: Sidebar](https://every-layout.dev/layouts/sidebar/) | The 50% ratio is a fixed heuristic. The sidebar can stretch when stacked. |

Overall limits:

- Intrinsic layouts respond to the space they have, which keeps them robust and query-free.
- They cannot express designed differences between views: a different order, hidden or extra elements, a different alignment, or a menu toggle.
- Those changes need `@container` or `@media`.
- Switcher and Sidebar rely on clever arithmetic. That is a readability cost on a solo project, so leave a comment pointing to the source.

**Fit for the footer.** Today's footer is "label + contact title" beside "links". That is a Sidebar/Switcher shape, so it can probably stack without any query.

## 3. Sharing named breakpoints across CSS modules

### Custom properties cannot be used in queries

- **`var()` in queries.** `var()` "cannot be used in property names, selectors or anything else besides property values". [MDN var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var) Media Queries resolve units from initial values: "units are never based on results of declarations". [MQ4 §1.3](https://www.w3.org/TR/mediaqueries-4/#units) A `--bp-tablet` custom property therefore cannot drive `@media` or `@container` width conditions.
- **`env()`.** The spec's intro cites `@media` as a motivating place for `env()`. Using it in media queries is still an open issue. Authors can only define custom env variables via "CSS link parameters". [css-env-1 ED, 3 Nov 2026](https://drafts.csswg.org/css-env-1/) This is not usable today.
- **Container style queries** query custom properties *of an ancestor*. A page could set `--view: tablet` and components could test `@container style(--view: tablet)`. But something still has to *set* `--view` per viewport, which means a media query. This moves the problem rather than solving it, and support is too new for the build target (see the table above).
- **`if()`** (Chrome 137+ only, limited availability). It is per-property and not cross-browser. [web-features if()](https://web-platform-dx.github.io/web-features-explorer/features/if/)

### `@custom-media`

- **Spec.** Media Queries Level 5 §10 defines `@custom-media --name <media-query-list> | true | false;`.
  - The name is used as `@media (--name)`.
  - Cycles are forbidden.
  - When a name is defined twice, the last definition wins.
  - [mediaqueries-5 ED](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
- **Browsers.** No browser supports it, so it is not Baseline. web-features lists Chrome, Edge, Firefox, and Safari as unsupported, with open bugs. [web-features custom-media-queries](https://web-platform-dx.github.io/web-features-explorer/features/custom-media-queries/)
  - **Unverified/conflicting:** search results report Firefox has it behind `layout.css.custom-media.enabled`, but I could not load the caniuse/MDN compat page to confirm the version.
  - Either way, it only works today if a build step compiles it away.
- **Vite default pipeline.** Vite does nothing with it. There is no PostCSS plugin, and the Lightning CSS minifier leaves drafts off.
- **Lightning CSS.**
  - It supports `@custom-media` via `drafts: { customMedia: true }`, which is off by default "because custom media queries are a draft". [Lightning CSS transpilation](https://lightningcss.dev/transpilation.html)
  - In Vite, this means opting into the experimental `css.transformer: 'lightningcss'` with `css.lightningcss.drafts.customMedia`.
  - CSS Modules then move to `css.lightningcss.cssModules`, because `css.modules` is ignored. [Vite features: Lightning CSS](https://vite.dev/guide/features.html), [Vite css options](https://vite.dev/config/shared-options#css-transformer)
  - Sharing definitions: Vite's source calls Lightning CSS `bundleAsync` per file, which follows `@import`s. Each module would `@import "../foundation/media.css"`, a file that holds only `@custom-media` rules.
  - **Unverified (read from Vite source, not tested):** that the imported definitions resolve and emit no duplicate CSS. Also that `composes … from` still works the same. Lightning CSS documents `composes from` support under its bundle API. [Lightning CSS CSS Modules](https://lightningcss.dev/css-modules.html)
- **PostCSS.**
  - `postcss-custom-media` compiles `@custom-media` per the MQ5 spec.
  - CSS Modules process each file separately, so it recommends `@csstools/postcss-global-data` with a `files` list placed before it. That plugin injects the definitions as data and "does not add anything to the output".
  - Sources: [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media), [postcss-global-data](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-global-data)
  - Cost: two devDependencies plus a `postcss.config.js`, which Vite auto-detects. It keeps Vite's stable default transformer.
  - `postcss-preset-env` bundles the same plugin with many others. That is more than this repo needs.
- **Documented constants (no tooling).**
  - List the few allowed widths in `docs/design-system.md` and write them literally in `@media` rules.
  - Stylelint's `media-feature-name-value-allowed-list` can then reject any other value ("enforce a subset of values for a media feature as a convention"). [stylelint rule](https://stylelint.io/user-guide/rules/media-feature-name-value-allowed-list/)
  - **Unverified:** whether that rule checks range syntax (`width >= 48rem`) and `@container` preludes. Its docs only show `@media … (min-width: …)`. A test in `stylelint.test.ts` would settle it.

## 4. Trade-offs for a solo-maintained site

- **Maintenance cost.**
  - Intrinsic layouts and container queries are plain, Baseline CSS with no build dependency. They are the cheapest to keep working.
  - `@custom-media` gives readable names, but it adds either an experimental Vite transformer (Lightning CSS) or two PostCSS plugins.
  - With PostCSS, the source stops being valid browser CSS: Firefox ignores `(--tablet)` unless a flag is set.
  - Few queries are planned (header, footer, a handful of pages), so naming saves little.
- **Testability.**
  - jsdom (used by Vitest here) does not do layout, so unit tests cannot check responsive behaviour. **Unverified** in jsdom docs, but it is a well-known jsdom limit.
  - What *is* testable cheaply:
    - the stylelint guard (allowed breakpoint values, banning `container-type: size`)
    - the existing build test
  - Visual checks stay manual, or need a browser runner such as Playwright screenshots at the check widths. That would add a heavy dependency, so add it only if regressions actually happen.
- **How to check the four views.**
  - Use browser devtools responsive mode at the widths below, then drag-resize slowly between them.
  - Intrinsic and container layouts change at content-driven points, not only at the named widths, so "in between" is where bugs hide.
  - Keep the existing zoom checks: 200% on a 1280px window, and "very large" text.

### Suggested check widths

| View | Width | Why |
|---|---|---|
| Reflow floor | **320** | WCAG 1.4.10: content must reflow at 320 CSS px, the equivalent of 1280px at 400% zoom. [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| Mobile | **360** | The type scale's lower bound (`tokens.css`). 360×800 is the #3 screen size worldwide (Oct 2026). [StatCounter](https://gs.statcounter.com/screen-resolution-stats) |
| Tablet | **768** | 768×1024 and 800×1280 portrait are among the top tablet sizes. [StatCounter tablet](https://gs.statcounter.com/screen-resolution-stats/tablet/worldwide) |
| Laptop | **1280** | Already the design-system check width. 1280 is the WCAG zoom reference. 1366/1536 laptops sit just above it. [StatCounter desktop](https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide) |
| Widescreen | **1440 and 1920** | 1440 is where fluid type stops growing. 1920×1080 is the top desktop size (27.8%), and it checks the content-width cap. [StatCounter desktop](https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide) |

Caveat: StatCounter reports *screen* resolution. Browser viewports are narrower because of scrollbars and window chrome, so treat these as approximate. Check widths are not breakpoints: breakpoints should sit where the *content* breaks.

## Recommendations for this repo

1. **Intrinsic-first + container queries for components + documented page-level widths (recommended).**
   - Build the footer (then header) with flex-wrap or Sidebar/Switcher patterns.
   - Make the outer element an `inline-size` container, with `rem` thresholds for designed changes.
   - Keep the few page-level `@media` rules on 2–3 documented widths, guarded by stylelint's allowed-value rule.
   - *Tradeoff:* no new dependencies and all Baseline CSS. The cost is that breakpoint names live in docs, not code.
2. **Option 1 + `@custom-media` via PostCSS** (`postcss-custom-media` + `@csstools/postcss-global-data`).
   - *Tradeoff:* real names in code on Vite's stable path. The cost is two plugins plus config, and source CSS that browsers cannot read raw.
3. **Option 1 + `@custom-media` via Lightning CSS** (`css.transformer: 'lightningcss'`, `drafts.customMedia`).
   - *Tradeoff:* one engine for transform and minify. The cost is that Vite marks it experimental, the CSS Modules config moves, and `composes` and shared `@import` would need a spike first.
4. **Media queries only, consolidated to the named widths.**
   - *Tradeoff:* the simplest mental model. The cost is that components depend on viewport, not their slot, which is fragile once the header and footer sit in different contexts.
5. **Avoid for now:** container style queries or `if()` as a breakpoint-sharing mechanism. They are too new for the build target, and they still need a media query to set the value.
