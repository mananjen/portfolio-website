# Official GitHub and LinkedIn marks and an icon approach

Research for issue #32. Applies to `v3/` (Vite 8, React 19, TypeScript, CSS modules on the token foundation, GitHub Pages, dark theme only: background `#101d34`, text `#f1f5ff`, accent `#b6d3ff`). The Stylelint guard (`v3/stylelint.config.mjs`) rejects hex, named and functional colours in component CSS modules, so icon colour has to come from `currentColor` or a foundation token.

Researched 2026-11-08. Items marked **Unverified** could not be confirmed in a primary source. "Observed" means I checked it myself in a downloaded file or package rather than reading it on a policy page.

## 1. The official marks and their usage rules

### GitHub mark (the "Invertocat")

- **Source.** `github.com/logos` now redirects (301) to the brand site, which links the kit at `https://brand.github.com/GitHub_Logos.zip`. [GitHub brand: Logo](https://brand.github.com/foundations/logo)
- **What's in the kit (observed).** SVG, PNG and PDF for `GitHub_Invertocat_{Black,White}` and `GitHub_Lockup_{Black,White}`, each also in a `_Clearspace` version. The mark SVG is `viewBox="0 0 98 96"`, a single path with a hard-coded `fill="white"`/`"black"`. Files are dated 2026-01-10. [kit zip](https://brand.github.com/GitHub_Logos.zip)
- **The mark has been redrawn (observed).** The kit's Invertocat has a different outline (rounder head and ears) from the classic Octicons path. Simple Icons, Font Awesome, Tabler and the others still ship the classic drawing. For example, Simple Icons' `github.svg` path has not changed since 2018. [simple-icons github.svg history](https://github.com/simple-icons/simple-icons/commits/develop/icons/github.svg). **Unverified:** when GitHub switched, and whether the classic drawing is still acceptable. The brand page doesn't say.
- **Permitted uses.** The page explicitly lists "linking to GitHub" and "using the Invertocat as a social button linking to your GitHub profile or project". [GitHub brand: Logo](https://brand.github.com/foundations/logo)
- **Colours.** "The Invertocat and our wordmark should only appear in white, black, or in few cases grey or green. When in doubt, use the highest contrast option." On `#101d34`, that means white. [same](https://brand.github.com/foundations/logo)
- **Not allowed.** You may not:
  - rearrange elements, or substitute Mona or other mascots for the mark;
  - add shadows or gradients;
  - place the mark on busy or low-contrast backgrounds, or "mix the color of the logo";
  - "compress, distort, skew, stretch, or alter the logo in any way", including "changing the color, dimensions" or combining it with other words or design elements;
  - imply affiliation or endorsement, or use the mark as your own logo.

  [same](https://brand.github.com/foundations/logo)
- **Clear space and minimum size.** The page shows a clear-space diagram but gives no numbers. The `_Clearspace` files pad the 96-unit mark to a 128-unit square, so there are 16 units on each side, or **⅙ of the mark's height** (observed, my derivation). No minimum size is published (**Unverified** that none exists).
- **Licensing.** GITHUB®, the Invertocat design and OCTOCAT® are registered trademarks. Uses beyond the listed ones need written permission. [same](https://brand.github.com/foundations/logo)

### LinkedIn "[in]" bug and logo

- **Two different marks:**
  - The **LinkedIn Logo** (wordmark plus bug) is off-limits: "LinkedIn does not allow anyone to use the LinkedIn Logo, unless they already have an existing relationship with LinkedIn." [LinkedIn Logo](https://brand.linkedin.com/linkedin-logo)
  - The **[in] Logo** (the bug) is the one members may use. [[in] Logo](https://brand.linkedin.com/in-logo)
- **Source.** The only approved source is the brand site. "Any logos or images found elsewhere on the web are not approved for use." [brand.linkedin.com](https://brand.linkedin.com/). The kit is `in-logo.zip`, linked from [Downloads](https://brand.linkedin.com/downloads).
- **What's in the kit (observed).** **PNG only, no SVG**: `LI-In-Bug.png` (blue, 635×540), `InBug-Black.png` and `InBug-White.png` (840×779), and a China variant. The bug includes a small ® symbol at the lower right. [in-logo.zip](https://content.linkedin.com/content/dam/me/business/en-us/amp/xbu/linkedin-revised-brand-guidelines/logos/in-logo.zip). **Unverified:** whether the letters in the white PNG are transparent knockouts. That decides whether the page background shows through the "in".
- **Permitted member uses.** The page lists:
  - "as a hyperlink to your profile";
  - "in a series of social media icons showing your participation on those sites";
  - "alongside an invitation for others to view your LinkedIn profile".

  [[in] Logo](https://brand.linkedin.com/in-logo)
- **Colours.** "LinkedIn members may only use the [in] Logo in three color variations: blue, black, and white." Blue on white is preferred. In a row of social icons, use one of the three downloadable colours "on any background colour". **White on `#101d34` is allowed.** [same](https://brand.linkedin.com/in-logo)
- **Not allowed.** You may not:
  - modify the colour or shape (special colours need a request to `trademarkrequest@linkedin.com`);
  - combine it with other symbols, words or designs;
  - work it into a word or slogan;
  - imply affiliation or endorsement.

  [same](https://brand.linkedin.com/in-logo)
- **Clear space and minimum size.** The [in] Logo page gives none. The full LinkedIn Logo page says the bug portion must be at least **21 px tall on screen**, with clear space of "the height/width of one [in] Logo". [LinkedIn Logo](https://brand.linkedin.com/linkedin-logo). Applying those numbers to the standalone bug is my inference (**Unverified**).
- **Licensing.** "By downloading our logos, you agree to comply with the terms of the LinkedIn Brand and User Agreements." [Downloads](https://brand.linkedin.com/downloads)

### What this means for an off-white, `currentColor` treatment

- Both brands allow white on a dark background. Both forbid recolouring.
- If the marks follow `currentColor`, they must resolve to white. The site's `#f1f5ff` is a near-white tint, and a hover state in the accent `#b6d3ff` would be a colour change. Whether `#f1f5ff` counts as "white" is a judgement call. The strict reading is pure `#fff` on the marks and no colour change on hover. Show hover on the label instead (underline or text colour).
- A truly LinkedIn-compliant [in] bug is the approved PNG, because there is no official SVG. Tracing the PNG or using a third-party SVG means using an asset "found elsewhere on the web".

## 2. Licensing and coverage in icon packages

| Package (version checked) | Licence | GitHub | LinkedIn | Notes |
|---|---|---|---|---|
| Simple Icons 16.36.0 | CC0, but each brand stays a trademark | yes (`github`) | **removed** | [LICENSE](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md), [DISCLAIMER](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md) |
| `@icons-pack/react-simple-icons` 13.15.1 | MIT (wrapper) | `SiGithub` | no `SiLinkedin` | Built from Simple Icons 16.28.0. `sideEffects: false`. Renders `<title>` by default (observed). [README](https://github.com/icons-pack/react-simple-icons) |
| Lucide / `lucide-react` 1.70.0 | ISC | **removed** | **removed** | `icons/github.svg` and `linkedin.svg` return 404 on `main` (observed) |
| react-icons 5.7.0 | MIT wrapper; each set keeps its own licence | `SiGithub`, `FaGithub`, `LuGithub`, `TbBrandGithub`, `PiGithubLogo` | `FaLinkedin`, `LuLinkedin`, `TbBrandLinkedin`, `PiLinkedinLogo`; no `SiLinkedin` | `LuLinkedin` survives because react-icons pins `lucide-static ^0.462.0`, which predates the removal (observed in the [package.json](https://github.com/react-icons/react-icons/blob/master/packages/react-icons/package.json)) |
| Font Awesome Free brands 7.3.1 | Icons CC BY 4.0, code MIT | `github`, `square-github` | `linkedin`, `linkedin-in` | Attribution sits in an SVG comment that FA asks you to keep. "Do not use brand logos for any purpose except to represent the company…" [LICENSE.txt](https://github.com/FortAwesome/Font-Awesome/blob/7.x/LICENSE.txt) |
| Phosphor `@phosphor-icons/react` 2.1.10 | MIT | `github-logo` | `linkedin-logo` | Redrawn in Phosphor's style ([core assets](https://github.com/phosphor-icons/core/tree/main/assets)) |
| Tabler `@tabler/icons-react` 3.50.0 | MIT | `brand-github` | `brand-linkedin` | Redrawn as 2 px strokes ([icons](https://github.com/tabler/tabler-icons/tree/main/icons/outline)) |

All the "yes" entries are the **classic or stylised GitHub drawing, not the current kit artwork**. The Phosphor and Tabler versions are re-styled, which both brands' "do not alter" rules prohibit. A permissive code licence doesn't override trademark rules.

### The "LinkedIn was removed" claim: verified

- **Simple Icons.**
  - June 2024: Microsoft's legal team told the project it could only include Microsoft brands from four official Microsoft icon sources, "without any edits being made". Version 13.0.0 was pulled forward to remove them. [#11236](https://github.com/simple-icons/simple-icons/issues/11236)
  - Issue #11372 (opened 2024-07-01) cited Microsoft ownership and LinkedIn's guidelines: "LinkedIn generally does not permit … use [of] its name, trademarks, logos…". [#11372](https://github.com/simple-icons/simple-icons/issues/11372)
  - PR #11380 "Remove LinkedIn" was merged 2024-12-17 [#11380](https://github.com/simple-icons/simple-icons/pull/11380) and shipped in **v14.0.0 on 2024-12-22** (release notes mention LinkedIn; [releases](https://github.com/simple-icons/simple-icons/releases/tag/14.0.0)).
  - New requests are still being auto-closed in 2026, e.g. [#15076](https://github.com/simple-icons/simple-icons/issues/15076).
- **Lucide.**
  - PR #3639 "Remove brand icons" was merged into `next` on 2025-11-27. [#3639](https://github.com/lucide-icons/lucide/pull/3639)
  - It shipped in **v1.0.1 on 2026-03-23**: "Removed brand icons". [1.0.1](https://github.com/lucide-icons/lucide/releases/tag/1.0.1). v1.0.0 was published by mistake the same day.
  - The reasons are legal ("protected by trademark… don't allow modification"), visual consistency, and maintenance. Lucide points users to Simple Icons or the brands' own asset pages. [BRAND_LOGOS_STATEMENT.md](https://github.com/lucide-icons/lucide/blob/main/BRAND_LOGOS_STATEMENT.md)
  - So Lucide removed **both** GitHub and LinkedIn, not only LinkedIn.

## 3. A generic set for email and future UI icons

- **Lucide** is the recommended set.
  - ISC licence: keep the copyright notice if you copy SVGs. [LICENSE](https://github.com/lucide-icons/lucide/blob/main/LICENSE)
  - 24×24 grid, 2 px stroke, `currentColor` by default. [React guide](https://lucide.dev/guide/react/getting-started)
  - `lucide-react` is ESM with `sideEffects: false`. "Only the icons that are imported … are included." [same](https://lucide.dev/guide/react/getting-started)
  - `dist/esm/icons/mail.mjs` is 594 bytes before minification (observed via [jsDelivr](https://data.jsdelivr.com/v1/packages/npm/lucide-react@1.70.0)). The shared runtime adds a little more (**Unverified** size).
  - Icons render with `aria-hidden="true"` by default. [Accessibility](https://lucide.dev/guide/advanced/accessibility)
  - It is the set both Lucide and Simple Icons describe as complementary: same 24×24 viewBox. [BRAND_LOGOS_STATEMENT](https://github.com/lucide-icons/lucide/blob/main/BRAND_LOGOS_STATEMENT.md)
- **Phosphor** (MIT) offers six weights, including `fill`, which matches solid brand marks better than outlines.
  - Its README warns that importing from the package root makes some bundlers transpile "all 9,000+ modules" in development. It recommends per-file imports such as `@phosphor-icons/react/dist/csr/…`.
  - Weight defaults go through React Context. [README](https://github.com/phosphor-icons/react)
- **Tabler** (MIT) is 2 px stroke like Lucide, with about the same trade-offs. [repo](https://github.com/tabler/tabler-icons)
- **Visual pairing.** Both official marks are solid filled shapes. A stroked mail icon next to them reads lighter. You can either accept that (it's the usual look in footers) or use a filled envelope (Phosphor `EnvelopeSimple` fill, or Lucide `mail` with heavier stroke). This is a design judgement, not a sourced fact.
- **Package vs copy.** Install the package once you need more than about 5 icons or want new ones without manual work. For the 1–3 generic icons in scope now, copying the SVG source into a local component avoids a dependency and lets you match stroke width to the type scale. The cost is copying updates by hand and keeping the ISC notice.

## 4. Structuring icons in React + Vite

Options:

1. **One component per icon** (`<GitHubMark />`, `<MailIcon />`). Inline SVG, so `currentColor` and CSS work directly. Vite tree-shakes unused ones. Types are trivial. This is what Lucide and react-simple-icons do.
2. **One `Icon` component with a name map** (`<Icon name="github" />`). It gives a single place for size, `aria-hidden` and class, and it suits the content layer: content can store `icon: "github"` as a typed union key. A static map imports every icon it lists, so keep the map small and local (tree-shaking can't drop map entries). This is my reasoning about bundlers, not a sourced claim.
3. **SVG sprite** (`<svg><use href="icons.svg#github"/></svg>`). One cached file, small markup. However:
   - browsers "may refuse to load a cross-origin URL" in `<use>` (same-origin on GitHub Pages is fine);
   - CSS properties "are not guaranteed to be inherited by the cloned DOM unless you explicitly request them", so the symbol must not hard-code `fill`.

   [MDN `<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use). This is worth doing only with dozens of icons repeated on a page.

**Accessibility:**

- **Icon next to visible text** (the footer links already have text labels from `site.footer.links`). Mark the SVG `aria-hidden="true"` so the name isn't announced twice, and don't render a `<title>`. MDN: exposing the icon "could lead to redundancy". [MDN aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
  - Note: `@icons-pack/react-simple-icons` adds a `<title>` by default, so you'd have to suppress it.
- **Never** put `aria-hidden` on the focusable `<a>` itself or on an ancestor of it. [same](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- **Icon-only link** (e.g. a future compact project "Code" link). Put the name on the link, not the icon: either `aria-label` or visually hidden text. [Lucide accessibility](https://lucide.dev/guide/advanced/accessibility), [WCAG ARIA14](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14)
  - If any visible text remains, the accessible name must contain it (2.5.3 Label in Name, cited in [ARIA8](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8)).
  - Icon-only targets also need at least 24×24 CSS px under [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

**Sizing and colour:**

- Set `width`/`height` to `1em` (or a token multiple) so the icon follows the role-based text style it sits in. Align it with `vertical-align` or flex `align-items: center`.
- Set `fill="currentColor"` (or `stroke` for Lucide) on the SVG so colour comes from the text token, which keeps the Stylelint guard happy.
  - **Unverified:** that `color-named: "never"` accepts `currentColor` in CSS. It isn't a named colour in the CSS colour list, but run `npm run check` to confirm.
  - Brand marks are the exception: they must stay white (section 1). Give them their own foundation token (e.g. `--color-brand-mark: #fff`) instead of inheriting the link's hover colour.

## Recommendations for this repo

1. **GitHub.** Use the official kit's `GitHub_Invertocat_White.svg`. Replace the hard-coded `fill` with `currentColor`, set it to a pure-white foundation token, and keep ⅙ clear space. *Tradeoff:* the current drawing differs from every icon package's, but it's the one GitHub publishes.
2. **LinkedIn.** Strictest option: use the official `InBug-White.png` as an `<img alt="">` at 21 px or larger. Practical option: an SVG of the [in] bug (e.g. Font Awesome `linkedin`, CC BY with its comment kept), rendered pure white and unmodified. *Tradeoff:* the PNG is the only approved asset but ignores `currentColor`. An SVG fits the system but isn't from LinkedIn's site. The owner should decide which. Asking `trademarkrequest@linkedin.com` for an SVG is the zero-risk route.
3. **Generic icons.** Use Lucide. For now, copy `mail` (and later `code`/`external-link`) into a local component with the ISC notice. Switch to `lucide-react` once you have more than about 5 icons. *Tradeoff:* manual updates vs a dependency.
4. **Structure.** Put local per-icon components in `src/components/icons/`, wrapped by one small `Icon` with a typed `IconName` union, so content entries (footer links, project artifact links) can name an icon as data. Skip sprites. *Tradeoff:* the map pulls in every listed icon, which is negligible at this size.
5. **Accessibility and sizing.** Default every icon to `aria-hidden="true"` with no `<title>`, at `1em`, in `currentColor`. Allow an icon-only variant only when the link has an `aria-label` and a 24 px or larger target. Keep the visible footer labels. *Tradeoff:* text plus icon is wider than icon-only, but it is unambiguous and needs no extra ARIA.
