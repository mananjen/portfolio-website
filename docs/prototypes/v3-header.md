# V3 header study - round 2

Throwaway UI for [Explore V3 mobile menus and sticky header behavior](https://github.com/mananjen/portfolio-website/issues/50), part of [Header for V3](https://github.com/mananjen/portfolio-website/issues/48).
The owner has not chosen a winning design. The ticket stays open for hands-on feedback.

## Run it

From the repository root:

```sh
npm run prototype:header
```

Open <http://127.0.0.1:4324/portfolio-website/#/?variant=overlay&surface=glass>.
This uses a separate Vite development mode and port. Ordinary development and
production builds retain the existing header. The experiment is lazy-loaded only
in `header-prototype` development mode; its code and styles are excluded from
the ordinary production bundle.

Use the bottom **Header study** bar to cycle ideas, or press Left/Right when a
menu is closed and a form control is not focused. **Compare settings** exposes
the other comparisons. The current settings and menu/scroll state are visible
in the bar and encoded in the URL, so a combination can be shared/reloaded.
Existing page/brief links retain the study settings while the study is running.

## Round 2: owner feedback and experiment (15 November 2026)

The screenshots identify a concrete discontinuity: the round-1 `blend` surface
switches from cobalt to opaque navy at 48px, while the cobalt hero is still
behind it. A persistent translucent surface is the next direction to judge.
The owner wants minimalism with room for small, purposeful animations; the
previous blanket preference against animation no longer applies. This is a
standing design preference for later component discussions, not a requirement
to animate every component or a settled site-wide motion specification.

Owner feedback carried into this round:

- Keep the home-linked name and provide a dedicated Home destination too.
  Compare an outlined Home icon with a text Home link on exposed navigation;
  collapsed menus keep the explicit Home label. The icon has an accessible
  name, a current-page state, and a 44px touch target.
- Give the divider before the resume/contact utility group more presence.
- Concentrate the next mobile comparison on overlay, right drawer, and full-screen.
  These share a closed bar; opening Menu reveals their structural differences.
  Push-down and top island remain available as baselines, not rejected ideas.
- Improve menu type hierarchy and link treatment using the existing foundation.
  Overlay now uses subheading-sized links and rules; drawer uses a numbered,
  narrow list; full-screen uses heading-sized links and smaller descriptions.
- Compare subtle open/close movement and the menu glyph transition with motion
  disabled. Reduced-motion preference overrides the animated setting.

The arrow controls now cycle the three shortlisted mobile ideas. On desktop,
the toolbar explicitly explains that those arrows preview mobile menus; surface,
height, alignment and Home controls live in Compare settings. No new desktop
layouts are implied by the three mobile choices.

`surface=glass` is the default: 72% navy tint with an 18px backdrop blur.
`surface=frost` uses an 88% tint. Both keep the same surface treatment before
and after scrolling and retain a visible lower rule. On Home, the real hero
background extends behind the bar while the copy keeps its existing position.
The backdrop therefore changes with the actual content under it, rather than
an arbitrary scroll threshold. Browsers without backdrop filtering get an
opaque fallback. The inset-bar baseline also gets a blurred surface.
These opacity/blur values and the stronger utility divider are experiments,
not approved tokens. Menu panels retain an opaque reading surface.

New controls: `home=icon|text` and `motion=subtle|none`. Defaults are `icon`
and `subtle`. Existing URLs with `surface=blend` still show the old behavior:
choose Translucent in settings or use the new links below.

- [Overlay with translucent bar](http://127.0.0.1:4324/portfolio-website/#/?variant=overlay&surface=glass)
- [Right drawer with translucent bar](http://127.0.0.1:4324/portfolio-website/#/?variant=drawer&surface=glass)
- [Full-screen with translucent bar](http://127.0.0.1:4324/portfolio-website/#/?variant=full&surface=glass)
- [Denser tint, compact desktop, text Home](http://127.0.0.1:4324/portfolio-website/#/?variant=overlay&surface=frost&bar=compact&home=text)

Review at the top, slightly into the hero, crossing into the navy section, and
on Projects. Compare glass versus frost independently of menu shape. Judge the
Home footprint and divider separately. For menus, compare link scale, panel
width, open/close motion, current-page emphasis and scroll reach on short screens.
A winner and the production interaction contract still require owner feedback;
this round does not resolve the prototype ticket or promote code to production.

## Round 1 reference: five mobile ideas

| URL `variant` | Idea | Question it makes concrete |
| --- | --- | --- |
| `push` | Push-down disclosure | Does a compact two-column list moving the page down feel clear or disruptive? |
| `overlay` | Overlay dropdown | Does a shallow accent-link sheet give enough separation without taking over the screen? |
| `drawer` | Right-hand drawer | Does a narrower panel with numbered destinations and a filled active state feel better? |
| `full` | Full-screen editorial index | Do larger type and short destination descriptions earn the space they use? |
| `island` | Inset top bar and navigation grid | Does a contained persistent control strip suit the portfolio better than a full-width bar? |

The first four retain the owner's original menu candidates. The fifth brings
the contained-header direction from the [inspiration research](../research/v3-header-inspiration.md)
into the comparison; the full-screen idea also tries descriptive editorial
navigation. No other researched direction is rejected. Further rounds can try
priority links plus More, current-page context, or different combinations.
The descriptions in this round are provisional prototype copy.

## Separate comparison settings

| Query | Choices | What changes |
| --- | --- | --- |
| `bar` | `steady`, `compact`, `island` | Desktop sticky presentation: stable height, smaller after scrolling, or an inset bar. All remain visible. |
| `align` | `content`, `wide` | Align the bar to the content cap or let it use more of a wide viewport. |
| `tablet` | `auto`, `menu`, `links` | Compare automatic collapse with a preference for collapsed or exposed tablet navigation. |
| `theme` | `bar`, `menu` | Position the noninteractive future-theme preview in the mobile bar or open menu. |
| `surface` | `glass`, `frost`, `blend`, `solid` | Two translucent densities, the original hero-to-solid transition, or an opaque baseline. |
| `home` | `icon`, `text` | Dedicated exposed Home control; the wordmark remains linked home. |
| `motion` | `subtle`, `none` | Small open/close and glyph transitions, or immediate changes. Reduced motion always wins. |

For example:

- [Mobile drawer, theme preview in menu](http://127.0.0.1:4324/portfolio-website/#/?variant=drawer&bar=steady&align=content&tablet=auto&theme=menu&surface=blend)
- [Compact desktop bar](http://127.0.0.1:4324/portfolio-website/#/?variant=push&bar=compact&align=content&tablet=auto&theme=bar&surface=blend)
- [Wide inset desktop bar](http://127.0.0.1:4324/portfolio-website/#/?variant=island&bar=island&align=wide&tablet=auto&theme=bar&surface=solid)

Tablet settings change component-container thresholds; they do not change ADR
0003's touch/mouse rule. Automatic layout currently collapses below 58rem of
header space. Prefer menu extends that to 70rem; Prefer links exposes navigation
from 44rem and allows wrapping. These are experiment values, not new page-level
breakpoints or approved production rules.

## What to try

1. At 360px, open each menu at the top and after scrolling. Compare both the
   closed bar and the open navigation. Also try 320px and a short viewport.
2. At 768px, compare automatic, Prefer menu, and Prefer links. The 44px touch
   target treatment remains even when navigation is exposed.
3. At 1280px, compare the three desktop bar settings at the top and mid-page.
   At 1920px, compare content-aligned and wide treatment.
4. Visit Projects, Experience, and About through the header. Open a project
   brief, use Skip, and try Back/Forward. Destinations and selected experiment
   settings should stay understandable.
5. Try Tab/Shift+Tab, Escape, the close trigger, and outside-click dismissal.
   Non-push menus lock background scrolling and make the page/footer inert;
   focus stays within the header navigation. Escape restores the trigger.
   Reduced motion removes the entrance animation and compact-height transition.

The dashed-circle theme mark is a placement preview, not a working toggle.
Résumé and Say hello remain inside collapsed menus and exposed on large screens.
Home is explicit in collapsed menus, has its own icon/text comparison in exposed navigation,
and remains available through the wordmark everywhere.
The résumé URL and email destination come from existing shared content.

The study toolbar is outside the design, remains available for comparison, and
adds temporary bottom space. It also raises the existing floating back-to-top
control above itself. These accommodations are scoped to the prototype.

## Round 1 validation and limits (historical)

- TypeScript and Stylelint pass through `npm --prefix v3 run check`.
- The existing app suite passes: 30 tests. No prototype unit tests were added.
- `npm --prefix v3 run build` passes; emitted assets contain no header-study
  strings, prototype component, or prototype CSS.
- Chrome DevTools checks cover all five ideas at
  320/360/768/1008/1024/1280/1440/1920, opening each collapsed menu, Escape and
  focus return, sticky behavior after scrolling, desktop compact height, tablet
  choices, and route navigation. Prototype source is still throwaway and has not
  had a production accessibility audit.
- Header layout stayed within the viewport. The newly enabled **footer résumé
  tooltip** separately causes about 6px page overflow at 1024px. Hiding only the
  footer removes it; this is recorded as
  [Keep the footer résumé tooltip within the viewport](https://github.com/mananjen/portfolio-website/issues/54).
  It is not hidden or fixed by this prototype.
- Existing Vite configuration migration and PostCSS warnings remain; the build
  exits successfully.

Local screenshots and measurements live in the gitignored
`docs/reviews/header-prototype/` folder. They do not travel with the repository.
Useful starting captures:

- [Five mobile ideas side by side](../reviews/header-prototype/mobile-ideas.png)
- [Three desktop bars while scrolled](../reviews/header-prototype/desktop-bars.png)
- [Push-down, 360 open](../reviews/header-prototype/header-push-360-open.png)
- [Overlay, 360 open](../reviews/header-prototype/header-overlay-360-open.png)
- [Drawer, 360 open](../reviews/header-prototype/header-drawer-360-open.png)
- [Full-screen, 360 open](../reviews/header-prototype/header-full-360-open.png)
- [Top island, 360 open](../reviews/header-prototype/header-island-360-open.png)
- [Compact desktop, scrolled](../reviews/header-prototype/header-desktop-compact-scrolled.png)
- [Desktop island, scrolled](../reviews/header-prototype/header-desktop-island-scrolled.png)
- [Tablet exposed navigation](../reviews/header-prototype/header-tablet-links.png)
- [Browser measurements](../reviews/header-prototype/browser-checks.json)

## Round 2 validation

- `npm run build:v3` passes, including TypeScript and Stylelint.
- `npm --prefix v3 test` passes: 71 tests across four files. No prototype tests added.
- Browser checks compare the same glass tint at top and after scrolling at
  320/360/768/1008/1024/1280/1440/1920, header bounds, and collapsed-menu hiding
  and inertness after close. Additional visual/interaction checks cover the three
  shortlisted panels, short screens, Home navigation, Escape, and reduced motion.
- Discrete display transitions provide exit motion in supporting browsers;
  older browsers can close immediately. This remains throwaway prototype code.
- Existing Vite/PostCSS warnings and the separately tracked footer issue remain.

Local round-2 capture: [Drawer at 768px](../reviews/header-prototype/round2-drawer-768.png).

## Owner capture

All changes remain uncommitted under `AGENTS.md`. Review/capture this throwaway
round separately from production implementation:

```sh
git add -- .gitignore package.json v3/package.json v3/src/components/Layout.tsx v3/src/components/HeaderPrototype.tsx v3/src/components/HeaderPrototype.module.css v3/src/content/headerPrototype.ts v3/README.md docs/prototypes/v3-header.md
git commit -m "Prototype V3 mobile menus and desktop sticky headers"
```

The prototype skill calls for preserving the final experiment on a throwaway
branch. The owner controls that capture; the agent does not commit or switch
branches. Production implementation will follow the later approved spec.
