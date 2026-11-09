# V3 links and footer review — 2026-11-09

Completed the final validation for [#47](https://github.com/mananjen/portfolio-website/issues/47)
and the [#41 spec](https://github.com/mananjen/portfolio-website/issues/41).
The changes remain uncommitted for the owner. Nothing was deployed.

## Scope and setup

- Reviewed `git diff a2fd2fc...f8449d7`, covering `b75cbb5`, `3a06df8`,
  `e5efcaf`, and `f8449d7`, plus this ticket's working-tree changes.
- Spec sources: #31, #32, #33, #35, #36, #37, #38 (including the latest
  touch-email amendment), #41, and implementation tickets #42–#46.
- Standards sources: `AGENTS.md`, `GLOSSARY.md`, ADRs 0001–0004,
  `docs/design-system.md`, the root README, and `v3/README.md`.
- Owner confirmed this scope and the Stylelint regression-test seam.
- Chrome DevTools MCP **1.12.0**, Chrome **156**, headless isolated profile,
  dark mode, device scale factor **1**, viewport height **900px**.
  Below 1024px, viewport emulation enables both mobile and touch; from 1024px,
  it uses desktop/mouse. Captures use CSS viewport pixels.
- Current V3: `npm --prefix v3 run dev -- --port 4322`, base URL
  `http://127.0.0.1:4322/portfolio-website/`. Port 4321 was already occupied.
- Prototype: detached temporary worktree at **595ddb7**, served in **dev** mode
  on port 4323. Its URL is `#/?dock=handover&input=touch` below 1024px,
  and `input=mouse` above. The query follows the hash because it uses HashRouter.
- Images were scrolled into view and decoded before capture; fonts were awaited.
  Full-page captures start at the top and remove incidental focus.

## Browser tooling

`.mcp.json` registers `chrome-devtools` for Claude Code; `.codex/config.toml`
registers the same server for Codex. Both pin 1.12.0 and use Windows `cmd /c npx`,
headless Chrome, an isolated profile, the current workspace, and disabled usage
statistics/CrUX integration. The Codex startup timeout is 60 seconds.
The exact `.mcp.json` launcher completed the MCP initialize handshake; browser
navigation, emulation, input, evaluation, and screenshot tools were then exercised
through the same server/version by a local stdio MCP client. The existing agent
session does not reload tool registrations; reload the client after reviewing
these files to discover the tools. No global Codex configuration was edited.
Project-scoped registration follows the
[official OpenAI MCP documentation](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

## Standards

Initial independent review: **0 documented-standard violations; 0 actionable
smell findings**. The link components respect content/layout ownership and the
documented architecture. The footer's heading-token override is the documented
container-query exception. Follow-up review of the fix, tests, docs, ignore rule,
and both MCP configurations found no actionable standards findings.

## Spec

Initial independent review: **1 P2 finding**, fixed in this ticket:

- `v3/stylelint-hover-guard.mjs` independently recognized the width and hover
  tokens in comma/`or` alternatives. Thus
  `@media (width >= 64rem), (hover: hover)` could pass while requiring only one
  condition. That contradicted #42 and ADR 0003's requirement that hover needs
  **both** desktop width and hover support.
- At the owner-approved Stylelint seam, the comma and `or` regression cases
  failed before the fix. The guard now credits only positive conjunctions.
  Alternatives inside an already guarded ancestor remain allowed, with coverage.
  This deliberately conservative rule is documented in the design system and
  V3 README. Current component CSS did not use the bypass, so the fix changes
  prevention rather than the present UI.

Follow-up independent review: **0 remaining code-spec findings**. No larger
issue required filing. Total: Standards **0**; Spec **1 fixed, 0 open**.

## Validation

| Check | Result |
| --- | --- |
| `npm --prefix v3 run check` | Passed: TypeScript and all Stylelint guards |
| `npm --prefix v3 test -- src/components/link/link.test.tsx` | 9 passed |
| `npm --prefix v3 test -- stylelint.test.ts` | 28 passed; 2 new cases observed red before green |
| `npm --prefix v3 test` | Full suite: 71 tests, 4 files passed |
| `npm --prefix v3 run build` | Passed, including check and production build |
| Link bypass scan | Only documented header/skip links outside `link/`; images use `ImageLink` |
| Content arrow scan | Only `Panipat → Chicago → Hyderabad`, the permitted portrait caption; no arrows in link labels |
| Full-page screenshot matrix | 136 captures: 5 pages, 11 expanded project briefs, and the legacy contact redirect, each at 8 widths |
| Browser measurements | Exact requested viewport widths; no horizontal overflow in any capture; every image loaded |
| Footer input boundary | 44px icon targets at 1008px; 32px at 1024px, across the captured routes |
| Copy, 360 touch / 1280 mouse | Actual clicks succeeded; status announced “Email address copied”; focus stayed on copy control |
| Keyboard focus | Actual Tab navigation: 2px dashed accent outline, 5px offset, `:focus-visible` true |
| Tooltip | GitHub tooltip visible at 1280; absent at 360 as required for touch-first input |
| Back to top | Floating button visible after scrolling 1200px at 360; hidden when small print enters view; desktop uses inline control |
| Reduced motion | At both widths, clicking back to top returned to scrollY 0 and focused the header wordmark with reduced motion enabled |

The ordinary build still prints existing Vite configuration-loader migration
warnings and a PostCSS `from` warning. Both commands exit successfully; these
warnings are outside the links/footer changes. Unit tests do not measure layout;
the screenshots and browser measurements provide that evidence.

## Visual findings and prototype comparison

Page overview sheets and footer close-ups show the intended stacked/split
layouts, legible copy, and retained image proportions. Additional footer captures
at 425, 575, 576, and 600px record the area around the 36rem container transition.
At 320px the invitation and small-print row wrap naturally; targets stay usable
and the page stays within its viewport.

Round 3 is a historical reference, so these differences are intentional:

- The prototype includes a résumé link/badge; V3 hides it until a public URL is
  supplied. This also gives the narrow invitation more space.
- The current touch hint participates in normal flow, per #38's 2026-11-09
  amendment; the historical wide-touch prototype positions it absolutely.
- The implementation uses the approved foundation styles for the CTA, UI and
  small print. The historical prototype retains some inherited/default type.
- Current input mode switches at 64rem, per ADR 0003, rather than detecting input.

Side-by-side composites preserve the unmodified captures: prototype left,
current V3 right. No new design decision or glossary term was needed.

## Local gallery

All PNGs and diagnostic JSON live in `docs/reviews/links-and-footer/`, which is
gitignored. These links work only on this machine. PNGs retain full resolution;
overview sheets are for scanning. There are **194 PNGs**: 136 full pages,
12 interaction states, 12 footer widths, 8 prototype footers, 8 comparisons,
and 18 overview sheets.

### Every page and project brief

The six required layout widths are 320, 360, 768, 1280, 1440, 1920. The 1008
and 1024 columns record either side of the input switch. Project rows keep that
brief expanded. `/contact` redirects to the home footer and is included separately.

| Route / state | 320 | 360 | 768 | 1008 | 1024 | 1280 | 1440 | 1920 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | [320](links-and-footer/home-320.png) | [360](links-and-footer/home-360.png) | [768](links-and-footer/home-768.png) | [1008](links-and-footer/home-1008.png) | [1024](links-and-footer/home-1024.png) | [1280](links-and-footer/home-1280.png) | [1440](links-and-footer/home-1440.png) | [1920](links-and-footer/home-1920.png) |
| `/projects` | [320](links-and-footer/projects-320.png) | [360](links-and-footer/projects-360.png) | [768](links-and-footer/projects-768.png) | [1008](links-and-footer/projects-1008.png) | [1024](links-and-footer/projects-1024.png) | [1280](links-and-footer/projects-1280.png) | [1440](links-and-footer/projects-1440.png) | [1920](links-and-footer/projects-1920.png) |
| `/experience` | [320](links-and-footer/experience-320.png) | [360](links-and-footer/experience-360.png) | [768](links-and-footer/experience-768.png) | [1008](links-and-footer/experience-1008.png) | [1024](links-and-footer/experience-1024.png) | [1280](links-and-footer/experience-1280.png) | [1440](links-and-footer/experience-1440.png) | [1920](links-and-footer/experience-1920.png) |
| `/about` | [320](links-and-footer/about-320.png) | [360](links-and-footer/about-360.png) | [768](links-and-footer/about-768.png) | [1008](links-and-footer/about-1008.png) | [1024](links-and-footer/about-1024.png) | [1280](links-and-footer/about-1280.png) | [1440](links-and-footer/about-1440.png) | [1920](links-and-footer/about-1920.png) |
| `/missing-review-page` | [320](links-and-footer/not-found-320.png) | [360](links-and-footer/not-found-360.png) | [768](links-and-footer/not-found-768.png) | [1008](links-and-footer/not-found-1008.png) | [1024](links-and-footer/not-found-1024.png) | [1280](links-and-footer/not-found-1280.png) | [1440](links-and-footer/not-found-1440.png) | [1920](links-and-footer/not-found-1920.png) |
| `/projects?project=multilingual-image-text-retrieval` | [320](links-and-footer/brief-multilingual-image-text-retrieval-320.png) | [360](links-and-footer/brief-multilingual-image-text-retrieval-360.png) | [768](links-and-footer/brief-multilingual-image-text-retrieval-768.png) | [1008](links-and-footer/brief-multilingual-image-text-retrieval-1008.png) | [1024](links-and-footer/brief-multilingual-image-text-retrieval-1024.png) | [1280](links-and-footer/brief-multilingual-image-text-retrieval-1280.png) | [1440](links-and-footer/brief-multilingual-image-text-retrieval-1440.png) | [1920](links-and-footer/brief-multilingual-image-text-retrieval-1920.png) |
| `/projects?project=hinglish-sarcasm-detection` | [320](links-and-footer/brief-hinglish-sarcasm-detection-320.png) | [360](links-and-footer/brief-hinglish-sarcasm-detection-360.png) | [768](links-and-footer/brief-hinglish-sarcasm-detection-768.png) | [1008](links-and-footer/brief-hinglish-sarcasm-detection-1008.png) | [1024](links-and-footer/brief-hinglish-sarcasm-detection-1024.png) | [1280](links-and-footer/brief-hinglish-sarcasm-detection-1280.png) | [1440](links-and-footer/brief-hinglish-sarcasm-detection-1440.png) | [1920](links-and-footer/brief-hinglish-sarcasm-detection-1920.png) |
| `/projects?project=riot-amazon-hackathon` | [320](links-and-footer/brief-riot-amazon-hackathon-320.png) | [360](links-and-footer/brief-riot-amazon-hackathon-360.png) | [768](links-and-footer/brief-riot-amazon-hackathon-768.png) | [1008](links-and-footer/brief-riot-amazon-hackathon-1008.png) | [1024](links-and-footer/brief-riot-amazon-hackathon-1024.png) | [1280](links-and-footer/brief-riot-amazon-hackathon-1280.png) | [1440](links-and-footer/brief-riot-amazon-hackathon-1440.png) | [1920](links-and-footer/brief-riot-amazon-hackathon-1920.png) |
| `/projects?project=real-or-ai-generated` | [320](links-and-footer/brief-real-or-ai-generated-320.png) | [360](links-and-footer/brief-real-or-ai-generated-360.png) | [768](links-and-footer/brief-real-or-ai-generated-768.png) | [1008](links-and-footer/brief-real-or-ai-generated-1008.png) | [1024](links-and-footer/brief-real-or-ai-generated-1024.png) | [1280](links-and-footer/brief-real-or-ai-generated-1280.png) | [1440](links-and-footer/brief-real-or-ai-generated-1440.png) | [1920](links-and-footer/brief-real-or-ai-generated-1920.png) |
| `/projects?project=star-explorer` | [320](links-and-footer/brief-star-explorer-320.png) | [360](links-and-footer/brief-star-explorer-360.png) | [768](links-and-footer/brief-star-explorer-768.png) | [1008](links-and-footer/brief-star-explorer-1008.png) | [1024](links-and-footer/brief-star-explorer-1024.png) | [1280](links-and-footer/brief-star-explorer-1280.png) | [1440](links-and-footer/brief-star-explorer-1440.png) | [1920](links-and-footer/brief-star-explorer-1920.png) |
| `/projects?project=video-enhancement` | [320](links-and-footer/brief-video-enhancement-320.png) | [360](links-and-footer/brief-video-enhancement-360.png) | [768](links-and-footer/brief-video-enhancement-768.png) | [1008](links-and-footer/brief-video-enhancement-1008.png) | [1024](links-and-footer/brief-video-enhancement-1024.png) | [1280](links-and-footer/brief-video-enhancement-1280.png) | [1440](links-and-footer/brief-video-enhancement-1440.png) | [1920](links-and-footer/brief-video-enhancement-1920.png) |
| `/projects?project=twitter-data-sentiment-analysis` | [320](links-and-footer/brief-twitter-data-sentiment-analysis-320.png) | [360](links-and-footer/brief-twitter-data-sentiment-analysis-360.png) | [768](links-and-footer/brief-twitter-data-sentiment-analysis-768.png) | [1008](links-and-footer/brief-twitter-data-sentiment-analysis-1008.png) | [1024](links-and-footer/brief-twitter-data-sentiment-analysis-1024.png) | [1280](links-and-footer/brief-twitter-data-sentiment-analysis-1280.png) | [1440](links-and-footer/brief-twitter-data-sentiment-analysis-1440.png) | [1920](links-and-footer/brief-twitter-data-sentiment-analysis-1920.png) |
| `/projects?project=sentiment-analyzing-chatbot` | [320](links-and-footer/brief-sentiment-analyzing-chatbot-320.png) | [360](links-and-footer/brief-sentiment-analyzing-chatbot-360.png) | [768](links-and-footer/brief-sentiment-analyzing-chatbot-768.png) | [1008](links-and-footer/brief-sentiment-analyzing-chatbot-1008.png) | [1024](links-and-footer/brief-sentiment-analyzing-chatbot-1024.png) | [1280](links-and-footer/brief-sentiment-analyzing-chatbot-1280.png) | [1440](links-and-footer/brief-sentiment-analyzing-chatbot-1440.png) | [1920](links-and-footer/brief-sentiment-analyzing-chatbot-1920.png) |
| `/projects?project=accident-analysis-and-prediction` | [320](links-and-footer/brief-accident-analysis-and-prediction-320.png) | [360](links-and-footer/brief-accident-analysis-and-prediction-360.png) | [768](links-and-footer/brief-accident-analysis-and-prediction-768.png) | [1008](links-and-footer/brief-accident-analysis-and-prediction-1008.png) | [1024](links-and-footer/brief-accident-analysis-and-prediction-1024.png) | [1280](links-and-footer/brief-accident-analysis-and-prediction-1280.png) | [1440](links-and-footer/brief-accident-analysis-and-prediction-1440.png) | [1920](links-and-footer/brief-accident-analysis-and-prediction-1920.png) |
| `/projects?project=nl-interface-for-databases` | [320](links-and-footer/brief-nl-interface-for-databases-320.png) | [360](links-and-footer/brief-nl-interface-for-databases-360.png) | [768](links-and-footer/brief-nl-interface-for-databases-768.png) | [1008](links-and-footer/brief-nl-interface-for-databases-1008.png) | [1024](links-and-footer/brief-nl-interface-for-databases-1024.png) | [1280](links-and-footer/brief-nl-interface-for-databases-1280.png) | [1440](links-and-footer/brief-nl-interface-for-databases-1440.png) | [1920](links-and-footer/brief-nl-interface-for-databases-1920.png) |
| `/projects?project=smart-building-iot` | [320](links-and-footer/brief-smart-building-iot-320.png) | [360](links-and-footer/brief-smart-building-iot-360.png) | [768](links-and-footer/brief-smart-building-iot-768.png) | [1008](links-and-footer/brief-smart-building-iot-1008.png) | [1024](links-and-footer/brief-smart-building-iot-1024.png) | [1280](links-and-footer/brief-smart-building-iot-1280.png) | [1440](links-and-footer/brief-smart-building-iot-1440.png) | [1920](links-and-footer/brief-smart-building-iot-1920.png) |
| `/contact` | [320](links-and-footer/contact-redirect-320.png) | [360](links-and-footer/contact-redirect-360.png) | [768](links-and-footer/contact-redirect-768.png) | [1008](links-and-footer/contact-redirect-1008.png) | [1024](links-and-footer/contact-redirect-1024.png) | [1280](links-and-footer/contact-redirect-1280.png) | [1440](links-and-footer/contact-redirect-1440.png) | [1920](links-and-footer/contact-redirect-1920.png) |

### Footer interaction states

At 360px, “icon tooltip” records its deliberate absence under touch emulation.
Desktop mid-page records the deliberate absence of a floating control. Handover
uses a viewport capture so the relationship to the small print remains visible.

| State | 360 touch | 1280 mouse |
| --- | --- | --- |
| idle | [360](links-and-footer/footer-idle-360.png) | [1280](links-and-footer/footer-idle-1280.png) |
| copied | [360](links-and-footer/footer-copied-360.png) | [1280](links-and-footer/footer-copied-1280.png) |
| icon-tooltip | [360](links-and-footer/footer-icon-tooltip-360.png) | [1280](links-and-footer/footer-icon-tooltip-1280.png) |
| keyboard-focus | [360](links-and-footer/footer-keyboard-focus-360.png) | [1280](links-and-footer/footer-keyboard-focus-1280.png) |
| back-to-top-midpage | [360](links-and-footer/footer-back-to-top-midpage-360.png) | [1280](links-and-footer/footer-back-to-top-midpage-1280.png) |
| back-to-top-handover | [360](links-and-footer/footer-back-to-top-handover-360.png) | [1280](links-and-footer/footer-back-to-top-handover-1280.png) |

### Footer layout and prototype side by side

| Width | Current | Round 3 | Side by side |
| --- | --- | --- | --- |
| 320 | [Current](links-and-footer/footer-width-320.png) | [Prototype](links-and-footer/prototype-footer-320.png) | [Compare](links-and-footer/comparison-footer-320.png) |
| 360 | [Current](links-and-footer/footer-width-360.png) | [Prototype](links-and-footer/prototype-footer-360.png) | [Compare](links-and-footer/comparison-footer-360.png) |
| 768 | [Current](links-and-footer/footer-width-768.png) | [Prototype](links-and-footer/prototype-footer-768.png) | [Compare](links-and-footer/comparison-footer-768.png) |
| 1008 | [Current](links-and-footer/footer-width-1008.png) | [Prototype](links-and-footer/prototype-footer-1008.png) | [Compare](links-and-footer/comparison-footer-1008.png) |
| 1024 | [Current](links-and-footer/footer-width-1024.png) | [Prototype](links-and-footer/prototype-footer-1024.png) | [Compare](links-and-footer/comparison-footer-1024.png) |
| 1280 | [Current](links-and-footer/footer-width-1280.png) | [Prototype](links-and-footer/prototype-footer-1280.png) | [Compare](links-and-footer/comparison-footer-1280.png) |
| 1440 | [Current](links-and-footer/footer-width-1440.png) | [Prototype](links-and-footer/prototype-footer-1440.png) | [Compare](links-and-footer/comparison-footer-1440.png) |
| 1920 | [Current](links-and-footer/footer-width-1920.png) | [Prototype](links-and-footer/prototype-footer-1920.png) | [Compare](links-and-footer/comparison-footer-1920.png) |

Extra transition checks: [425px](links-and-footer/footer-width-425.png), [575px](links-and-footer/footer-width-575.png), [576px](links-and-footer/footer-width-576.png), [600px](links-and-footer/footer-width-600.png).

### Overview sheets

- [home](links-and-footer/overview-home.png)
- [projects](links-and-footer/overview-projects.png)
- [experience](links-and-footer/overview-experience.png)
- [about](links-and-footer/overview-about.png)
- [not-found](links-and-footer/overview-not-found.png)
- [brief-multilingual-image-text-retrieval](links-and-footer/overview-brief-multilingual-image-text-retrieval.png)
- [brief-hinglish-sarcasm-detection](links-and-footer/overview-brief-hinglish-sarcasm-detection.png)
- [brief-riot-amazon-hackathon](links-and-footer/overview-brief-riot-amazon-hackathon.png)
- [brief-real-or-ai-generated](links-and-footer/overview-brief-real-or-ai-generated.png)
- [brief-star-explorer](links-and-footer/overview-brief-star-explorer.png)
- [brief-video-enhancement](links-and-footer/overview-brief-video-enhancement.png)
- [brief-twitter-data-sentiment-analysis](links-and-footer/overview-brief-twitter-data-sentiment-analysis.png)
- [brief-sentiment-analyzing-chatbot](links-and-footer/overview-brief-sentiment-analyzing-chatbot.png)
- [brief-accident-analysis-and-prediction](links-and-footer/overview-brief-accident-analysis-and-prediction.png)
- [brief-nl-interface-for-databases](links-and-footer/overview-brief-nl-interface-for-databases.png)
- [brief-smart-building-iot](links-and-footer/overview-brief-smart-building-iot.png)
- [contact-redirect](links-and-footer/overview-contact-redirect.png)
- [Footer interactions](links-and-footer/overview-footer-states.png)

Diagnostics: [manifest.json](links-and-footer/manifest.json), [footer-behavior.json](links-and-footer/footer-behavior.json), [prototype-manifest.json](links-and-footer/prototype-manifest.json).

## Owner handoff

Review the configurations and working-tree changes, then stage only these files:

```sh
git add -- .gitignore .mcp.json .codex/config.toml docs/design-system.md docs/reviews/links-and-footer-2026-11-09.md v3/README.md v3/stylelint-hover-guard.mjs v3/stylelint.test.ts
git commit -m "Validate V3 links and footer and close hover guard bypass"
```

The local screenshot directory is intentionally excluded from staging.
