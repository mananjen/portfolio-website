# Navigation and header inspiration for V3

Researched 10 November 2026 for [Research navigation and header ideas for V3](https://github.com/mananjen/portfolio-website/issues/53), under [Header for V3](https://github.com/mananjen/portfolio-website/issues/48).

The original four mobile treatments are starting candidates, not a closed list.
There are useful alternatives beyond choosing which direction a hidden menu
opens. In particular, test **how much navigation stays visible**, **how the
header occupies the page**, and **how the open navigation explains destinations**.
The recommendations below are proposals for Manan's portfolio, not a winning
design or a claim that another site's whole navigation should be copied.

## Evidence and limits

The reference set uses first-party pages and author-owned source. Website text
was inspected for labels and hierarchy; source was inspected where behavior
matters. This was not a live browser interaction/accessibility audit. No mobile,
scroll, animation, or keyboard behavior is inferred solely from extracted text.
Repository implementations are identified separately from current live pages:
they may represent earlier versions. They are useful primary design evidence,
not proof that a deployed site still behaves exactly that way. No screenshots
or awards-gallery descriptions are used as evidence.

## Seven references

| Reference | Verified observation | What is useful for V3 |
| --- | --- | --- |
| **Paco Coursey — published header implementation** | The author's [header component](https://github.com/pacocoursey/paco/blob/master/components/header/index.js) contains a home logo, a command control, and an optional title. Its [CSS](https://github.com/pacocoursey/paco/blob/master/components/header/header.module.css) explicitly uses `position: sticky; top: 0`, backdrop filtering, and a constrained inner row. This is source evidence, not a claim about the current homepage. | A small persistent control strip can include current-page context instead of repeating a large wordmark/navigation composition. A floating island is a **proposed adaptation**, not an observed property of this source. |
| **Takuya Matsuyama / craftzdog** | The [live homepage](https://www.craftz.dog/) exposes work/content destinations. The author's [Navbar source](https://github.com/craftzdog/craftzdog-homepage/blob/master/components/navbar.js) specifies a fixed full-width translucent surface, constrained inner container, active-link background, theme control, and a narrow-view hamburger menu alongside that theme control. | A compact bar can retain utilities outside the collapsed menu. Active navigation can have a restrained filled treatment rather than relying only on an underline. The source's Chakra breakpoints and colors are not V3 requirements. |
| **Brittany Chiang — v4 implementation** | The author's [nav source](https://github.com/bchiang7/v4/blob/main/src/components/nav.js) specifies a fixed blurred header and a smaller scrolled height. It also hides the header on downward scrolling when motion is allowed. The [menu source](https://github.com/bchiang7/v4/blob/main/src/components/menu.js) specifies a fixed right panel and numbered links. | A concrete reference for compact-on-scroll proportions and a deliberate drawer composition. **Do not copy its scroll-down hiding:** that conflicts with the owner's persistent mobile-trigger requirement and the planned always-available header. This is explicitly the historical v4 source. |
| **Josh W. Comeau — header surface handoff** | In [Sneaky Header Blocker Trick](https://www.joshwcomeau.com/css/header-blockers/), the author explains his own fixed header, with sticky background blockers handing off between article hero and body. He separately describes a scroll-triggered color change on his homepage, and explains the vertical-space cost of blockers. | A strong reference for V3's cobalt Home hero meeting the dark body. Experiment with a header that initially belongs to the hero and then becomes a clearly bounded reading/navigation surface. The article's cloud motif and blocker technique are not needed to test that visual question. |
| **Linear — destination and utility hierarchy** | The [first-party homepage](https://linear.app/) includes Product/Resources buttons, direct destination links, and app/account actions in its navigation content. Extracted HTML establishes this distinction, **not** their responsive positions or sticky behavior. | Separate portfolio destinations from contact/résumé/theme utilities instead of giving everything equal weight. A centered destination group with utilities at the end is a V3 proposal; it is not asserted as a verified layout of this page. Do not reproduce the product site's multi-level catalog. |
| **Frank Chimero — descriptive editorial index** | The [first-party homepage](https://frankchimero.com/) presents links with explanatory secondary text: a design practice, a book, collages, profile/contact, and an archive. Only the content structure is claimed here. | An open menu could be an editorial index: Projects with a short explanation, Experience with another, and so on. This offers a different hierarchy from a bare vertical link list. A two-column or 2×2 navigation panel is a proposed adaptation, not a claim about the source's mobile layout. |
| **Adham Dannaway — small exposed navigation set** | The [first-party homepage](https://www.adhamdannaway.com/) exposes a short named navigation list: about, learn, portfolio, blog, contact. No sticky or mobile behavior is asserted from the extracted page. | Keep exposed links as a serious control condition, particularly on tablets. With V3's small page set, hiding every destination may be unnecessary where space permits. An exposed-priority-links-plus-More variant is a proposed adaptation. |

## Six additional directions worth trying

These are **adaptation candidates** based on the references above. They are not
six new mandatory prototypes. Some change the closed header, some change the
open navigation, and some change scroll presentation; choose combinations that
answer a clear question.

| Candidate | Mobile/tablet experiment | Desktop/widescreen experiment | Fit and trade-off |
| --- | --- | --- | --- |
| **Contained top island** | Keep a small inset bar containing the wordmark, a labeled Menu control, and the future-theme preview. Expand navigation from that bar. | Compare an inset, content-capped sticky island against the existing full-width header surface. | Adapts Paco's constrained sticky row. Gives the artwork/cobalt hero more breathing room. It also covers content on every side of its outline, so offsets and the 320px target budget need checking. |
| **Visible destinations plus More** | Keep one or two priority destinations visible and put the rest in a clearly labeled More disclosure. On a roomy tablet, expose the whole set. | Keep the ordinary navigation exposed, reserving a separate utility group. | Draws on the small exposed set and compact utility/menu separation. Reduces the need to open a menu, but introduces a priority decision and can make secondary destinations harder to find. It must not silently choose Projects/Experience priority for the owner. |
| **Editorial navigation index** | When opened, present the page destinations as large, clearly separated entries with short descriptions; try a 2×2 layout only when it actually fits. | Keep the closed header simple; if a menu is used on desktop, let its larger panel carry descriptive hierarchy rather than giant empty space. | Adapts Frank Chimero's descriptive links. Fraunces headings plus Recursive descriptions could make the menu feel part of this portfolio. More copy and height are the cost; descriptions must come from typed content. This can inhabit an overlay or drawer without being just another animation of the same list. |
| **Split navigation and utilities** | Keep the trigger and the future-theme preview accessible in the bar; compare putting contact/résumé outside versus inside the menu after the content decision. | Compare wordmark / centered destinations / utility group against the existing left-right arrangement, keeping the inner content cap. | Adapts Linear's destination/utility distinction and craftzdog's separated controls. Clearer hierarchy, but too many utilities will crowd the header; four portfolio pages do not justify a mega-menu. |
| **Context-first compact bar** | After leaving the top, retain the menu trigger and a short current-page label rather than the entire initial header composition. The trigger stays at the top throughout. | Try a compact row that emphasizes current-page context while keeping navigation directly reachable. | Adapts Paco's optional title in the persistent header. Helps long project/experience pages retain orientation. Label width and transitions can distract or shift content; this is different from hiding the header. A label must represent the actual route/state rather than inventing new navigation. |
| **Hero-blended to solid reading header** | Keep the same trigger position while comparing a cobalt-integrated opening state with a solid dark scrolled state. | Apply the same surface handoff to the exposed navigation; compare a stable height against the selected compact state. | Inspired by Comeau's first-party explanation. Especially relevant to V3's existing cobalt hero. Check contrast over changing content, focus rings, and anchor offsets. Prototype the visual effect first; do not adopt background-blocker machinery or advanced scroll animation before it is justified. |

## Suggested first comparison round

After the header-content decision, begin with a manageable set:

All four original menu treatments remain in the candidate pool. This proposed
round order does not discard them; narrowing or replacing candidates belongs to
the owner's review, and remaining treatments can be tried in subsequent rounds.

1. One straightforward dropdown/drawer from the original list as a control.
2. The contained top island.
3. Visible priority destinations plus More.
4. The editorial navigation index.

Compare desktop width/alignment and constant-versus-compact sticky behavior as
a separate axis, holding the destination set constant. The split utility group,
context label, or hero-surface handoff can be tested in later rounds or applied
to a favored structure. Keep each round at 3–5 alternatives; the **whole effort
has no four-idea cap**. This sequence is a recommendation for owner feedback,
not a resolution of the prototype decision.

## Constraints every adaptation inherits

- The mobile trigger remains reachable **at the top while scrolling**. A bottom
  dock can be an interesting outside reference but cannot replace that trigger
  without changing the owner's requirement. No hide-on-scroll-down behavior.
- Desktop can keep its current exposed navigation. Novelty is optional; retain
  that arrangement as a useful comparison rather than forcing an elaborate menu.
- Follow [ADR 0004](../adr/0004-layouts-adapt-to-their-space.md): use available
  space to decide layout; compare the existing 1200px content cap with a wider
  treatment. [ADR 0003](../adr/0003-touch-first-below-64rem.md) separately makes
  input touch-first below 64rem, with 44px targets; hover requires desktop width
  and hover support. A tablet can have exposed navigation and touch targets.
- Keep the [typography and link foundation](../design-system.md). Plain/inherited
  navigation with an active marker, accent text/rules, and large editorial
  headings are viable experiments. Internal destinations have no arrow; a
  selected-item marker must not masquerade as a destination arrow. Keep the
  global dashed focus ring. Do not copy another site's font/color/reset values.
- Keep future theme placement realistic, but use a clearly marked preview and
  do not implement themes. A source's working toggle does not expand this scope.
- Trial open/close, scrolled pages, route changes, keyboard/Escape, focus return,
  reduced motion, and the mobile-menu/desktop-layout transition on real pages.
  A source's keyboard code is not evidence that a resulting V3 implementation is
  accessible; that requires its own implementation and validation.

## Handoff

No production code changed. Findings are uncommitted, as `AGENTS.md` requires.
To capture this note after review:

```sh
git add -- docs/research/v3-header-inspiration.md
git commit -m "Research additional V3 navigation and header directions"
```
