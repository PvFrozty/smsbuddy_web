# SMS Buddy — Small messages. Stronger connections.

Three editable HyperFrames compositions and finished 15-second exports.

| Use | Export | Resolution |
| --- | --- | --- |
| Website (optimized, 0.64 MB) | `../public/videos/smsbuddy-website.mp4` | 1280 × 720 |
| Landscape master | `exports/smsbuddy-website-master.mp4` | 1920 × 1080 |
| Reels / Stories | `exports/smsbuddy-reels.mp4` | 1080 × 1920 |
| Facebook / Instagram feed | `exports/smsbuddy-feed.mp4` | 1080 × 1350 |

All exports use H.264, 30 fps and AAC stereo audio. The site exposes an optional player below the interactive message demo. It requests no video until opened, uses native playback controls, and pauses on dismissal.

## Edit and render

The source projects are `smsbuddy-website/`, `smsbuddy-reels/`, and `smsbuddy-feed/`. Each is standalone with local fonts, GSAP, imagery and audio. HyperFrames version: 0.8.31.

From a project directory:

```sh
npm run check
npm run dev -- --background
npm run render -- --output output.mp4 --fps 30 --quality high --workers 2
```

`build_compositions.py` generates all three HTML layouts and the original audio bed. It reads the current website's logo path and phone SVG. Its GSAP input is the local cache at `/tmp/smsbuddy-gsap.min.js`; the standalone project copies remain fully editable without running this generator. Copy an existing project's `gsap.min.js` there before regeneration if that cache has expired.

## Asset provenance

- Boutique photo: generated with the built-in OpenAI image generation tool for this campaign. The tool did not expose a selectable or verifiable “Image 2.5” model. It is illustrative, not customer evidence.
- Phone shell and logo: approved SMS Buddy vectors from this repository.
- Typography: local Manrope and Ubuntu Bold from the website. See its font licenses.
- Soundtrack: original deterministic synthesized pad, melody and message chimes, generated in `build_compositions.py`; no sampled music or voiceover.
- GSAP 3.14.2: local copy from the official npm package distributed via jsDelivr. Its embedded license notice is retained.

### Image prompt

Use case: ads-marketing. Create a premium editorial photograph for SMS Buddy's small-business SMS advertising film. Landscape 3:2 composition. An intimate close-up of a Sri Lankan small business owner's hands carefully wrapping a small clothing purchase in clean white tissue paper beside two matte cobalt-blue paper shopping bags on a pale warm wood counter. Only hands and forearms in a natural plain navy cotton shirt, no face. A tidy independent boutique in Colombo suggested by very soft background: daylight, a pale wall, a small clothing rack. Modern, authentic, modest, warm, competent. Side window light with beautiful soft natural shadows. Beautiful realistic paper texture, accurate fingers and hands. Camera at counter height, slight diagonal view, 50mm lens documentary product photography. The hands and parcel occupy center/right with composed negative space at left. Restricted colors cobalt #244CEB, navy #12234B, warm natural skin, pale wood and ivory. No text anywhere, no visible logos, no phone, no screen, no graphics, no watermarks. This is a staged illustrative business scene, not a testimonial. Real photography aesthetic with gentle depth of field, no artificial glossy CGI.

## Verification

All three passed HyperFrames lint, runtime, layout (including transition timestamps) and contrast checks with zero errors or warnings. Opening, message and CTA frames were visually inspected; actual MP4 frames were inspected after encoding. FFprobe metadata is saved in `exports/verification.json`; audio peak is -14.4 dBFS with no clipping.

Headline entrances were staggered to remove crossfade text collisions. Final transition checks have zero warnings. The legacy skill animation-map script could not run because the current CLI does not expose its required `@hyperframes/producer` dependency; its motion pass reports disabled. Visual frame inspection and transition layout checks were completed, not a standalone automated motion audit.

The website production build and lint passed. A separate browser verified MP4 playback (1280 × 720, no media error), dialog dismissal and automatic pause, and the 390 px mobile layout.

## Advertising handoff

See `../docs/video-campaign-brief.md` for primary text, headline and destination. Use the portrait export for Reels/Stories and the 4:5 export for feed; preview placement overlays in Ads Manager. Essential Reels copy is kept inside conservative working safe areas, which are not a guarantee for every placement.

Suggested button: **Sign Up**, linked to **https://portal.smsbuddy.lk/register**. The creative itself says **Get Started / Create your account**. Ads have not been published or boosted. Completed account creation must be measured in the portal before judging acquisition performance.
