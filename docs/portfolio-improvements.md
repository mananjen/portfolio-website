# Portfolio improvement planning

Updated: 23 October 2026. These are planning notes, not implemented website changes.

## Agreed direction

- Prioritize engineers and hiring managers evaluating Manan's AI engineering work.
- Improve project storytelling first, beginning with multilingual image–text
  retrieval without end-to-end training as the flagship story.
- Initial design exploration has selected I (Cobalt cut) as the working direction.
  Defer visual fine-tuning while moving on to the next planning decisions.
  Typography, spacing, image treatment, and responsive details remain open.
- Include a brief personal glimpse near the end of the homepage and evolve About
  into a dedicated personal page for art, books, gaming, and other interests.
  Its final name and appearance remain open.
- V3 should feel personal and minimal, with restrained motion and no visual
  bloat. Substantial changes to the homepage and visual style are welcome.
- Explore subtle references to Manan's own artwork, a person-first introduction,
  and three different homepage compositions before choosing a direction.
- Detailed research storytelling is paused until after this initial exploration;
  prototype wording is provisional.

## Site structure discussion

Agreed: the homepage gives a glimpse into Manan's life and work, with details
kept on separate pages. Retain Projects as a listing, Experience as its own page,
and About as the personal/outside-work page. Renaming About remains open.

### Experience and Projects: scope

Agreed: Experience remains reverse chronological, showing role context,
responsibilities, and concrete contributions.

Manan clarified the existing content split:

- Industry work done as an employee is described in Experience, including the
  projects undertaken in those roles. Do not move it into Projects by default.
- Projects contains independently pursued work and projects undertaken during
  bachelor's/master's study, as well as the research work.
- Research overlaps intentionally: Experience explains the research role and
  responsibilities; Projects explains the specific research work, implementation,
  and results. Link these where useful rather than repeating full narratives.

Keep this distinction. Projects is not meant to be an exhaustive catalog of
everything Manan has done professionally. The same rigor applies to industry,
research, academic, and personal work; context describes where work happened,
not its quality. Small context labels can clarify entries without splitting
the listing into additional pages. Such labels remain a presentation proposal.

### Contact and project reading flow

Contact: Manan is open to sunsetting the separate page and placing LinkedIn,
GitHub, and email in the footer. Recommendation: do this, retain a direct email
action near the top, and preserve old contact links with a route that leads to
the contact section. This is a recommendation, not yet an implemented change.
The current contact page also includes a phone link and copy-email behavior;
decide what to retain when implementing the replacement.

Project reading flow is undecided: explore both inline expansion and dedicated
detail pages using identical content, retaining the Projects listing either way.
Manan wants enough substance to establish credibility and invite interview
questions, without exhaustive accounts of the work. Current content may not
justify separate pages; inline expansion is the provisional recommendation.

Agreed: every project has a preview and a full brief. Featured projects appear
on Home and Projects; the remaining projects appear on Projects. Use one
consistent opening behavior across all projects, chosen after comparing inline
expansion with dedicated pages. Brief length may vary without changing behavior.

Agreed Projects listing order: three curated featured projects first, followed by
the remaining projects in reverse chronological order, without duplicating the
featured entries in that list. Featured order reflects editorial emphasis rather
than recency. Within the remaining list, use project dates rather than the date
a portfolio entry was edited. Exact same-year ties can retain editorial order;
do not invent month-level precision where only years are known. Detailed date
handling remains an implementation decision.

Preserve useful detail in older work; age alone does not justify reducing it.
Featured status determines prominence, not a project's entitlement to detail.
Aim for roughly 30–60 seconds of reading, guided by available substance rather
than a fixed age-based limit, with paper/code links for deeper exploration.
Cover the problem,
Manan's contribution, one meaningful decision or challenge, and the outcome with
available evidence. Remove repetition and generic claims without discarding
substantive information. Do not invent details or pad a story to fill a page. Full
experiment histories and implementation walkthroughs are unnecessary. Compare
the two reading formats later; neither has been selected or implemented.

## Local homepage design exploration

Run `npm run prototype`. This opens the separate, development-only HTML entry
at `/src/pages/portfolio-prototype.html`; the current homepage is untouched.

- `?variant=A`: Personal publication — serif introduction and editorial spreads.
- `?variant=B`: Research notebook — rejected; retained for comparison only.
- `?variant=C`: Quiet gallery — asymmetric introduction and image-led work.

### Round two: dark blue and tighter composition

Feedback on round one:

- Keep A's conversational introduction; explore C's image-led composition with
  more deliberate image sizing on laptop and desktop screens.
- Reject the research notebook direction. A and C's pale backgrounds and overall
  feel were not right; they also had too much whitespace.
- Start with dark mode and a bluish palette; light mode can be explored later.
- Technical content can be detailed. Personal content should sound more casual.
- Typography and italics are still open; no final font decision has been made.

Round two explores:

- `?variant=D`: Editorial blue — compact conversational introduction, a split
  research spread, two supporting stories, and a casual personal glimpse.
- `?variant=E`: Understated modern — smaller sans-serif introduction, denser
  technical information, and compact project rows.
- `?variant=F`: Personal imprint — asymmetric research composition with a narrow
  crop from Manan's watercolor and a distinct personal section.

The arrows cycle within each round. Use the round selector to revisit A–C.
The viewport selector offers fluid desktop, 390px mobile, 768px tablet, and
1280px laptop previews. Fixed-width previews shrink to fit narrower windows.
Research images are capped at 440px wide and link to full-size versions.
Round two was checked at actual browser widths of 390, 768, 1280, and 1920px.
At the end of round two, no direction had been selected.

### Round three: more dramatic alternatives

Manan initially preferred F (Personal imprint) and requested more dramatic
options before selecting a direction. Preserve all earlier concepts.

- `?variant=G`: Two currents — a sticky personal introduction beside a separate
  engineering column on desktop; stacked reading order on smaller screens.
- `?variant=H`: Name in lights — oversized identity typography, a poster-like
  research spread, and a compact two-project strip.
- `?variant=I`: Cobalt cut — a saturated cobalt introduction, dark technical
  spread, and an artwork-led personal close.

Round three opens by default without a variant. The round selector preserves
access to all nine concepts; F remains unchanged in round two. These alternatives
explore structure and emphasis, not final typefaces or publication-ready copy.
All retain restrained motion and blue palettes. Checked at browser widths of
390, 768, 1280, and 1920px, with research images capped at 440px wide.

Use the floating arrows or keyboard left/right arrows to switch concepts.
The viewport selector constrains the design to the selected width; narrowing
the browser also exercises the responsive layout. Variant and viewport choices
are preserved in the URL. Links lead to existing site pages, project repositories,
or the supplied OpenReview record; new project detail pages are not implemented.

The prototype files are `src/pages/portfolio-prototype.{html,tsx,css}`.
They use existing assets and no new project dependencies. The separate HTML entry
is not included in the default production build.

### Working selection and next discussion

Manan selected I (Cobalt cut) as the working direction after round three.
Keep A–I available; selection does not authorize discarding earlier explorations.
Pause visual fine-tuning and additional visual variants for now.

Agreed next deliverable: develop and review one credible flagship research brief,
then compare inline expansion and a dedicated detail page using that identical
content. Keep visual refinement paused while establishing the brief and reading
flow. Neither reading format has been selected.

Agreed: every full project brief must have a URL that opens it directly, including
after refresh, whichever reading format wins. The URL mechanism remains an
implementation decision; navigation state alone does not satisfy this requirement.

After selecting the reading format, the recommended implementation sequence is
one complete Cobalt cut journey from homepage preview to project brief and onward
to paper/code/contact, followed by extending the pattern across the site. This
implementation sequence remains a proposal, not authorization to build it yet.

## Flagship project: research publication update

Project slug: `multilingual-image-text-retrieval`

OpenReview link supplied by Manan:
<https://openreview.net/forum?id=v35BaCj1kc>

Manan reported on 23 October 2026:

- The paper has been accepted to AACL-IJCNLP 2026 Findings.
- Usman will present it online on 7 November 2026.
- The paper should already be available through the supplied OpenReview link.

Verification status: OpenReview could not be retrieved during this session;
the acceptance and presentation details above are attributed to Manan.
Acceptance, public manuscript availability, and proceedings publication should
be described separately in the eventual website copy.

### Contribution and research roles

As described by Manan on 23 October 2026:

- **Manan Jain:** conducted the initial literature review after the research idea
  was proposed, identified relevant related work and comparisons, investigated
  candidate datasets and models, and wrote the entire research codebase (using
  coding-assistant help for some functions). Produced experimental results and
  participated in discussions of research direction. These contributions are
  Manan's account, clarified on 23 October 2026.
- **Usman Shahid:** a PhD student at UIC at the time; originated the research idea
  and directed the research decisions.
- **Dr. Natalie Parde:** an NLP professor at UIC and the team's research advisor.

The supplied paper marks Usman Shahid and Manan Jain as equal contributors.
Manan clarified that final research decisions were not solely his, but an
implementation-only framing understates his research participation. Describe
his actual research contributions and code ownership without making decision
hierarchy the focus of the public brief. Do not infer paper-writing ownership.

Approved ownership wording (23 October 2026):

> As an equal-contributing coauthor, I conducted the initial literature review,
> investigated candidate datasets and models, and built the complete research
> codebase. I produced experimental results and helped shape the research through
> discussions with Usman Shahid and our advisor, Dr. Natalie Parde.

### Sparse matching story and timing recollection

Agreed: feature sparse matching as the main engineering challenge, with
anchor-bank subsampling as a separate research finding.

Manan explained that the large number of combinations made storing relative
representations for fast matching a practical problem. He recalls a standard
run for a model pair taking approximately 1.5 days before the change and less
than a day afterward. This is an approximate firsthand recollection, not a
controlled benchmark supported by saved logs. On 24 October 2026 he tentatively
confirmed retrieval with cached embeddings as the scope and recalled retrieval
across all nine encoder pairs taking approximately 2.5-3 days. This does not
establish matched before/after conditions or the exact k/p configurations covered.
Do not extrapolate the earlier per-pair estimate into a total sweep speedup.

Proposed engineering paragraph, pending review:

> Matching relative representations efficiently was a practical bottleneck
> across the encoder and hyperparameter combinations. I stored the sparse image
> representations in an inverted index, so caption-to-image matching accumulated
> scores only over shared retained anchors, rather than comparing full
> anchor-dimensional vectors.

Keep approximate timing in background notes rather than the first public draft.
Do not attribute reduced anchor-construction TFLOP estimates to this index.

### First flagship brief draft

On 24 October 2026, Manan approved this structure: research question, personal
contribution, sparse matching challenge, main result, and a short supporting
anchor-size finding. The following copy is proposed for review, not approved
website content. Use identical copy for the later reading-format comparison.

**Training-free multilingual image retrieval**

Can frozen text and vision encoders retrieve images across languages without
training a new multimodal model? We adapted ASIF to compare captions and images
through their similarities to a shared bank of 1.6 million paired anchors,
evaluating retrieval across 36 languages on XM3600.

As an equal-contributing coauthor, I conducted the initial literature review,
investigated candidate datasets and models, and built the complete research
codebase. I produced experimental results and helped shape the research through
discussions with Usman Shahid and our advisor, Dr. Natalie Parde.

Efficient matching was a practical challenge across nine encoder pairings and
multiple hyperparameter settings. I stored sparse image relative representations
in an inverted index, allowing caption queries to accumulate matching scores
only over shared retained anchors. Cached embeddings separated expensive encoder
inference from repeated retrieval experiments.

Our strongest configuration reached 57.5% Recall@10: the correct image appeared
among the top ten results for 57.5% of evaluated captions. It remained below
strong multimodal and translation-based baselines, while demonstrating
multilingual transfer without training a new alignment model.

An anchor-size ablation exposed a useful trade-off: 10% of the anchor bank
achieved 52.56% Recall@10, versus 57.49% with the full bank, using one-tenth of
the estimated anchor-relative construction compute and stored anchor embeddings.

The draft intentionally omits recalled timings and publication status. The latter
can be presented separately with paper/code links once public destinations are
checked. The result and ablation numbers above come from different reported
experiments; retain their respective precision and scope.

### Local project reading prototype

On 24 October 2026, Manan accepted the brief as a basis for exploration, while
questioning whether it is too long for the portfolio. He authorized prototyping
both reading formats before deciding. The copy remains provisional.

Run `npm run prototype:reading` to open
`/src/pages/project-reading-prototype.html`:

- `?variant=inline`: brief expands within the Projects listing.
- `?variant=page`: brief opens as a dedicated detail view.
- Add `&project=multilingual-image-text-retrieval` to open the brief directly.
- Add `&viewport=mobile` for a 390px layout constrained to the available width.

Both formats use identical full copy, a shorter listing preview, and the Cobalt
cut palette. The floating controls switch format while preserving open/closed
state, display reading length, and copy a direct brief URL. Browser history and
refresh restore the URL-selected view. Supporting project links lead to existing
repositories; their detail flows are outside this comparison. A link returns to
the preserved A-I homepage studies.

The three `src/pages/project-reading-prototype.*` files are a separate local-only
entry excluded from the default production build. No new dependencies were added.
Validation: `npx tsc -b`, `npm run build`, and `git diff --check` passed; HTML,
transformed React module, and research image returned HTTP 200 from Vite.
No browser was connected for visual or interaction verification in this session.

### Paper and implementation review

Read the supplied `ASIF_PAPER (5).pdf` and the local research repository
`D:/Random/npa-multilingual` on 23 October 2026. These establish the technical
details below; they do not independently establish individual decision ownership.

- Exact paper title: **Training free Cross-Modal Alignment for Multilingual Image
  Retrieval**; authors: Usman Shahid, Manan Jain, and Natalie Parde.
- The method adapts ASIF using frozen encoders, paired English CC12M anchors,
  and sparse relative representations. Evaluation uses XM3600: 3,600 candidate
  images, 36 languages, and 261,375 caption queries. The main bank has 1.6M pairs.
- Table 1 reports 57.5% Recall@10 and 21.2% Recall@1 for the strongest RR
  configuration selected by Recall@10 (Qwen3-Embed-8B + C-RADIOv4-H, k=800,
  p=4). Strong dense baselines outperform it. The existing roughly 30% Recall@1
  website claim is not supported by this table and must be reconciled or replaced.
- `scripts/xm3600_rr_retrieval.py` implements a vectorized inverted posting index,
  not a tree. It scores caption/image RRs through shared retained anchor
  coordinates. Chunked top-k construction still compares queries with every
  anchor; the inverted index optimizes the subsequent sparse matching stage.
- Table 2 and Section 5.3 concern a separate anchor-size ablation. At 10% of the
  bank, mean Recall@10 is 52.56% versus 57.49% at full size; estimated RR
  construction cost is 2.68 versus 26.84 TFLOP, and stored anchor embeddings are
  3.97 versus 39.67 GB. These are estimated construction costs, not measured
  runtime speedups or savings attributable to the inverted index. They exclude
  encoder inference. Use TFLOP for an operation count, not TFLOPS throughput.
- Other supported story candidates: caching encoder outputs for repeated sweeps;
  validating image/caption anchor order to prevent silent alignment errors;
  seeded anchor subsampling and aggregation of repeated experiments. Which
  decisions Manan personally proposed, and the problems that motivated them,
  remain to be discussed before writing a first-person decision narrative.
- No before/after timing measurements or profiling logs were found in the local
  repository. Manan's approximate timing recollection is recorded above; do not
  turn it into a precise or independently benchmarked speedup.
- The manuscript links a GitHub repository, but its current public accessibility
  was not checked. This local PDF review also does not verify acceptance or final
  proceedings publication.

### Pending portfolio updates

- Link the paper from the project; the supplied OpenReview URL is available to
  record now. Check for a final published/proceedings URL when updating the site.
- Replace the stale “Manuscript and open-source release are still in preparation”
  statement in `src/content/projects.ts`. Confirm code-release status separately;
  paper acceptance does not establish that the code has been released.
- Use the reviewed paper details above when drafting; check public publication
  and code availability separately before publishing the brief.
- Expand the contribution summary above with concrete implementation examples.
- Reconcile the existing “roughly 30% Recall@1 on XM3600” claim with the paper;
  do not assume it is still the best or final result.
- Decide whether the presentation date belongs on the website; keep it out of
  evergreen copy unless there is a reason to maintain an event update.
