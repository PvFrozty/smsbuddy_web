# SMS Buddy asset manifest

Reviewed `PRODUCT.md`, `docs/design-direction.md`, and `.impeccable/mocks/home-a.png`. Direction A is selected by the owner-delegated design lead. Minimum first-viewport media: one original vector brand mark; no raster image, stock photo, mascot, or video is needed.

| Element | Production treatment | Status and constraints |
| --- | --- | --- |
| SMS Buddy brand mark | Original geometric message-bubble SVG with separate live-text wordmark | Design lead to draw. Keep crisp at navigation size. Decorative SVG when adjacent to the visible name; accessible name on the home link. |
| Headline, navigation, actions | Semantic HTML and CSS | Never export mockup lettering into an image. Preserve focus, selection, responsive reflow, and accessible button/link names. |
| Message composer | Interactive HTML form with scenario choices and live preview | Explicitly label “Illustrative demo”. Mockup is visual direction, not a screenshot of the actual portal. No real sending. Use “Preview message” instead of a test-send promise. |
| Recipient inbox | HTML/CSS panel reflecting composer state | Label as an illustrative recipient preview. A simple rounded dark outline and light inbox surface provide sufficient device context. Avoid implying actual delivery; replace mockup “Delivered” with an explicitly simulated state or omit it. |
| Message, arrow, and benefit icons | Existing consistent icon library or simple inline SVG | Decorative icons hidden from assistive technology when accompanying text. No separate raster assets. |
| Pale blue background and text accent | CSS shapes or a restrained vector stroke | Decorative only; avoid clipping content or degrading contrast. Handwritten annotations are optional and should remain live text if retained. |

## Phone-frame decision

The comp contains a physically rendered smartphone bezel with metallic reflections, hardware details, and a fading lower edge. Faithfully reproducing that photographic hardware would require a dedicated raster render or supplied device asset; it should not be approximated with a large hand-drawn SVG. That degree of physical realism adds no necessary product information here. Use a basic responsive UI frame built in HTML/CSS instead, retaining the inbox relationship and keeping all message content live. On narrow screens, place the inbox after the composer in normal flow.

## Evidence and exclusions

- No real product screenshot is available. Do not describe the demo as the actual SMS Buddy dashboard or depict unverified controls as supported features.
- Do not embed the full generated comp as page media; it contains illustrative copy and states that require implementation review.
- Preserve the user's deletions of previous logo, mascot, and video files. They are not approved source assets.
- Existing framework placeholder SVGs in `public/` are not brand assets and should not appear in the redesigned interface.
- No new image generation is requested or justified by this viewport. No external-media licensing or attribution dependency is introduced by this plan.

## Handoff check

Before release, inspect the implemented mark and inbox at desktop and mobile widths, verify that the illustrative label remains visible, and confirm that editing or previewing a message never sends an SMS. Asset paths should be recorded by the implementation owner once the original SVG is saved; this review created no visual asset files.
