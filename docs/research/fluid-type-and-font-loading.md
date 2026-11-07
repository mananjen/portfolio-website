# Fluid type and self-hosted font loading

Research for issue #20. Applies to `v3/` (Vite 8, React 19, CSS modules, GitHub Pages under `/portfolio-website/`, dark theme only).
Fixed decisions this note works within: fluid type with one `clamp()` per role-named text style, capped sizes and content width on very wide screens, breakpoints for layout only, free self-hosted fonts, no styling library.

Researched 2026-11-07. Items marked **Unverified** could not be confirmed in a primary source.

## (a) Fluid `clamp()` type that respects zoom and text size

### What the specs say

- `clamp(MIN, VAL, MAX)` resolves as `max(MIN, min(VAL, MAX))`. [MDN clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- WCAG 1.4.4 Resize Text (AA): text must be resizable "without assistive technology up to 200 percent without loss of content or functionality". The Understanding doc treats scaling as mainly the user agent's job, and browser zoom is a sufficient technique (G142). [Understanding 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- Failure F94: if viewport units are "the primary method for defining text-size", text will likely fail to rescale. Text-size controls do not change `vw`, and zoom changes `vw` very little. F94 does not cover `calc()` or mixing units. [F94](https://www.w3.org/WAI/WCAG22/Techniques/failures/F94)
- MDN's accessibility note on `clamp()`: use a relative unit for the bounds and keep "the maximum allowed value ... no less than twice the minimum", for example `clamp(1rem, 2.5vw, 2rem)`, so text can still reach 200% when zoomed. [MDN clamp() — Accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp#accessibility)
- `rem` equals the root element's computed `em`, so it follows the user's default font-size setting. `vw` is 1% of the (large) viewport width. [CSS Values 4 §6.1.1 rem, §6.1.2.2 vw](https://www.w3.org/TR/css-values-4/#rem)
- WCAG 1.4.10 Reflow treats 320 CSS px as the narrow reference width: "equivalent to a starting viewport width of 1280 CSS pixels wide at 400% zoom". [Understanding 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

### Why mixing rem and vw works, and where it falls short

My own derivation from the definitions above (not stated in a W3C document):

- Write the preferred value as `i + s·100vw`. Here `i` (in rem) is the intercept and `s` is the slope.
- **Text-size setting.** Only `i` and the rem bounds scale. A larger `vw` share means the text responds less to the user's font-size setting. At the `MIN` end the text scales fully, because the bound is pure rem.
- **Browser zoom.** Zoom at factor `z` makes every CSS px `z` times larger and shrinks the CSS viewport to `W/z`. The rendered size becomes `z · f(W/z)`.
  - If the size is pinned at either bound, zoom scales it fully.
  - Inside the fluid range, the `vw` part does not grow with zoom.
  - Example: a heading `clamp(2.25rem, 1.5rem + 3.333vw, 4.5rem)` on a 1280 px window. At 100% it is 66.7 px. At 200% zoom (640 CSS px) it renders at 2 × 45.3 = 90.7 px, which is only 136%. It reaches 200% at about 400% zoom.
- **Practical rule.** Keep the max/min ratio small for body and UI text so those sizes behave almost like rem. Give the larger ratios only to display headings. Then check each style at 200% browser zoom on a 1280 px window.

**Unverified:** whether 1.4.4 requires 200% at the browser's 200% zoom setting specifically, or at any zoom level the browser offers. The Understanding doc does not say. MDN's "max ≥ 2 × min" heuristic is MDN's rule, not normative WCAG text.

### Deriving slope and intercept

Inputs are a min size `Smin` at viewport `Vmin` and a max size `Smax` at `Vmax`, all in px. Divide px by 16 to get rem.

```
slope     s = (Smax − Smin) / (Vmax − Vmin)
intercept i = Smin − s · Vmin                      (px → divide by 16 for rem)
font-size: clamp(Smin/16 rem, i/16 rem + (s·100)vw, Smax/16 rem)
```

Worked example: 16 px at 360 px viewport to 18 px at 1440 px.

- `s` = 2/1080 = 0.001852, which is `0.1852vw`.
- `i` = 16 − 0.667 = 15.33 px, which is `0.9583rem`.
- Result: `clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)`.

This is plain linear interpolation of the clamp definition above. Write the bounds in rem, not px, so the min and max follow the user's font-size setting. Per the CSS Values 4 `rem` definition, px bounds would ignore it.

### Viewport range and very wide screens

- **Min viewport.** Use around 360 px, a common phone CSS width, for the low end of the type ramp. Layout must still work at 320 CSS px, the 1.4.10 reference.
  - **Unverified:** 360 px as the most common phone width. I found no primary source for current device share.
- **Max viewport.** End the ramp near the content cap. v3's `.container` is `min(1200px, 100%)` plus side padding, so 1280–1440 px is a natural endpoint. Past that, sizes stay at `MAX`.
- **4K.** CSS layout uses CSS px, not device pixels. A high-DPR screen reports a CSS width of roughly physical width ÷ `devicePixelRatio`. [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
  - So capping type and content width is enough. Continuing to scale with `vw` would blow up line lengths and headings on wide windows.
  - Continuing to scale would also add more of the zoom-resistant `vw` share (see above).
  - **Unverified:** the typical OS scale factors on 4K monitors.

## (b) Self-hosting fonts in Vite on GitHub Pages

### Format, variable vs static, subsetting

- **WOFF2 only.** "Use only WOFF2 and forget about everything else." [web.dev Best practices for fonts](https://web.dev/articles/font-best-practices) (Hempenius and Pollard, Google, the first-party authors of that guidance). `font-display` has been supported since Chrome 60, Firefox 58 and Safari 11.1. [MDN BCD](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/font-face.json)
- **Variable vs static.**
  - Variable files cover a weight range in one file. Fontsource recommends the variable package when you need many weights, and lists it as the fix for large bundles. [Fontsource install](https://fontsource.org/docs/getting-started/install), [Fontsource FAQ](https://fontsource.org/docs/getting-started/faq)
  - With one or two weights, a static file can be smaller. **Unverified** in general; compare actual file sizes for the chosen family.
- **Subsetting and `unicode-range`.**
  - UAs "must not download or use the font for codepoints outside this set", and they load a face when the run contains a character in range. [CSS Fonts 4 §4.5](https://www.w3.org/TR/css-fonts-4/#unicode-range-desc), [§5.2](https://www.w3.org/TR/css-fonts-4/#font-matching-algorithm)
  - Fontsource CSS already splits each family into per-script `unicode-range` subsets (latin, latin-ext, cyrillic and others), "so the browser downloads only the character sets used on the page". [Fontsource install](https://fontsource.org/docs/getting-started/install)
  - Example: `@fontsource-variable/inter` ships 7 subsets, `font-display: swap`, `font-weight: 100 900`. [unpkg index.css](https://unpkg.com/@fontsource-variable/inter/index.css)
- **Licence.** Check the font licence before self-hosting or subsetting. [web.dev](https://web.dev/articles/font-best-practices)

### `font-display`

| Value | Block period | Swap period |
|---|---|---|
| `block` | short (3 s recommended) | infinite |
| `swap` | extremely small (≤100 ms recommended) | infinite |
| `fallback` | extremely small | short (3 s recommended) |
| `optional` | extremely small | none |

The durations come from [CSS Fonts 4 §4.9](https://www.w3.org/TR/css-fonts-4/#font-display-desc), which allows UAs to vary them slightly. [MDN font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)

How to choose, per [web.dev](https://web.dev/articles/font-best-practices):

- `optional` is the most performant and avoids swap layout shift, but a slow first visit keeps the fallback font.
- `swap` always shows the brand font, at the cost of a possible shift.
- web.dev suggests `swap` for distinctive or brand text and `optional` for body text.
- Fontsource's generated CSS uses `swap` (see the unpkg CSS above). To use another value, write your own `@font-face`.

### Preload, hashed URLs and the base path

- **Required markup.** A font preload needs `as="font"` and `crossorigin`, even for same-origin files, because fonts are fetched in anonymous CORS mode. `type="font/woff2"` lets unsupported browsers skip the download. [MDN rel=preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- **Preload ignores `unicode-range`.** Preload only the one critical subset, normally latin. [web.dev](https://web.dev/articles/font-best-practices), [Fontsource preload](https://fontsource.org/docs/getting-started/preload)
- **Base path is automatic.**
  - Vite treats font files as assets and hashes CSS `url()` references. [Vite assets](https://vite.dev/guide/assets)
  - At build time it rewrites "JS-imported asset URLs, CSS `url()` references, and asset references in your `.html` files" for `base`. So `@fontsource` CSS imported in `main.tsx` ends up at `/portfolio-website/assets/<name>-<hash>.woff2` without manual work. [Vite build: public base path](https://vite.dev/guide/build#public-base-path)
- **Preload URL must match the hashed file.** Hand-writing a path does not work. Two ways to get the hashed URL:
  1. Fontsource's documented Vite approach. Import the `.woff2` with `?url` and render the `<link rel="preload">` from that URL. [Fontsource preload](https://fontsource.org/docs/getting-started/preload), [Vite `?url`](https://vite.dev/guide/features)
     - In a client-rendered SPA, that link exists only after JS runs, which is about when the CSS would request the font anyway. So the gain is small.
  2. Put `<link rel="preload" href="<relative path to the woff2>" ...>` in `index.html`. Vite processes `<link href>` in HTML. [Vite features: HTML](https://vite.dev/guide/features)
     - **Unverified:** that Vite emits it as the *same* hashed file that the CSS `url()` uses, so the browser does not download it twice. Confirm by checking `dist/index.html` and `dist/assets/` after a build.
- **`public/` is not the answer.** Files in `public/` are not hashed and are referenced by absolute path. That gives up cache-busting filenames, and the path has to include the base. [Vite assets](https://vite.dev/guide/assets)
- **Preload is a tradeoff.** Fontsource warns that preloading too much can hurt Core Web Vitals. [Fontsource preload](https://fontsource.org/docs/getting-started/preload)

### Fallback metric overrides

- **`size-adjust`** scales a face's glyphs and metrics. It is Baseline widely available (Chrome 92, Firefox 92, Safari 17). [MDN size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust), [MDN BCD](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/font-face.json)
- **`ascent-override`, `descent-override`, `line-gap-override`** set the metrics as a percentage of font size. [CSS Fonts 4 §4.11](https://www.w3.org/TR/css-fonts-4/#font-metrics-override-desc)
  - Their support is "Limited availability": Chrome 87 and Firefox 89, but Safari only in Technology Preview. [MDN ascent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override), BCD as above.
- **Pattern.** Declare a second `@font-face` with `src: local("Arial")` and override values. Then list it between the web font and the generic fallback:
  ```
  font-family: "Inter Variable", "Inter Fallback", sans-serif
  ```
  [MDN size-adjust example](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust)
- **Computing the values.** You need the metrics of both fonts.
  - **Unverified:** tools for this (Capsize, fontaine, Next.js font) are third party and I did not verify their output.

### Fontsource vs files you place yourself

| | Fontsource (`@fontsource-variable/*` or `@fontsource/*`) | Files placed manually (e.g. `v3/src/assets/fonts`) |
|---|---|---|
| Setup | `npm i`, one `import` in the entry file | Download, convert/subset, write `@font-face` |
| Subsets / `unicode-range` | Generated for you | Yours to do |
| `font-display` | Fixed at `swap` in the shipped CSS | Your choice |
| Updates | Versioned in `package.json` | Manual |
| Vite hashing/base path | Automatic via CSS `url()` | Automatic if referenced from CSS in `src/` |

Sources: [Fontsource install](https://fontsource.org/docs/getting-started/install), [Vite assets](https://vite.dev/guide/assets). Both options satisfy "self-hosted": Fontsource files are bundled into `dist/` and served from GitHub Pages, not from Google's CDN.

## Recommendations for this repo

1. **Type tokens.** One custom property per role in `global.css`, for example `--text-body`, `--text-small`, `--text-eyebrow`, `--text-h3`, `--text-h2` and `--text-display`.
   - Each has the form `clamp(<min>rem, <i>rem + <s>vw, <max>rem)`, computed with the formula above. Comment each with its source px values.
   - *Tradeoff:* the numbers are not readable at a glance; the comments fix that.
2. **Ramp range 360 → 1440 px.** Every token is at its max from 1440 px up.
   - *Tradeoff:* very large monitors get no bigger type. That is deliberate.
3. **Small ratios for body and UI.** About 1.0–1.15× (for example 1rem → 1.125rem). Allow at most about 2× only on display headings.
   - *Tradeoff:* less dramatic headings on phones, in exchange for text that still scales with zoom and the font-size setting.
4. **Never use px or bare vw in type.** Bounds and intercept in rem only.
   - *Tradeoff:* none worth noting.
5. **Cap content width.** Keep `.container`'s px cap, or switch to rem so it grows with the text-size setting. Cap prose at roughly 65–75 `ch`.
   - *Tradeoff:* empty margins on 4K screens.
6. **Fonts via Fontsource.** Use the variable package for the sans family and the smallest package that covers the eyebrow mono face. Import them in the v3 entry file.
   - *Tradeoff:* adds npm deps, and `font-display` is fixed at `swap`.
7. **Do not preload at first.** Measure on the deployed site. If the font arrives visibly late, add one `index.html` preload for the latin body face and verify the hashed URL in `dist/`.
   - *Tradeoff:* a possible swap flash on the first visit.
8. **Add an `Arial`-based fallback face with `size-adjust`.** This reduces shift in every engine. Add `ascent-override`/`descent-override` for Chromium and Firefox; Safari ignores them.
   - *Tradeoff:* the values must be recomputed if the font changes.
9. **Test.** For each text style, check 200% browser zoom on a 1280 px window, and the browser's default font-size set to "Very large".
