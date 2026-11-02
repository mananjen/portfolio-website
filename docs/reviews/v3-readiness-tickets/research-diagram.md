# Correct the flagship diagram's contradictory retrieval example

## Problem

The flagship image `src/assets/training_free_cross_modal_alignment.JPG` labels
the input as a Māori caption and shows a hen as the best match. Its bottom
sentence instead says a French query retrieves a dog-in-park image.

The image is displayed on v3 Home and Projects through
`v3/src/content/projects.ts`. This is an internally contradictory research
explanation, independent of the deferred visual design review.

## Suggested change

Correct or remove the inaccurate footer sentence so the diagram tells one
consistent story. Retain the existing query/result demonstration unless its
accuracy cannot be established; a neutral caption about caption-to-image
retrieval is sufficient. Do not invent a translation or imply an additional
measured result. Preserve the other technical labels and asset references.

## Acceptance

- Query language, illustrated result, and caption no longer contradict each other.
- The full-size image and both v3 placements use the corrected asset.
- Text remains readable; no unintended cropping or technical-label changes.
- The v3 production build resolves the asset.

## Evidence

Direct inspection of the tracked raster on 2 November 2026 at commit `b07c23d`.
This is separate from the existing filename-casing issue.
