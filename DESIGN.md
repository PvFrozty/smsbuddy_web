---
name: SMS Buddy
description: Cobalt retail-sign typography and a practical messaging workspace.
colors:
  cobalt: "#244ceb"
  cobalt-hover: "#193ac2"
  ink: "#12234b"
  muted: "#526589"
  sky: "#edf3ff"
  line: "#dce5f3"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(44px, 4.7vw, 70px)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(34px, 3.6vw, 52px)"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    lineHeight: 1.8
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
rounded:
  field: "7px"
  tab: "6px"
  tab-group: "8px"
  button: "9px"
  message: "12px 12px 2px 12px"
  workspace: "16px"
  illustration: "14px"
  recipient: "24px"
spacing:
  control-gap: "13px"
  compact: "16px"
  workspace: "24px"
  cards: "32px"
  section: "105px"
  section-mobile: "59px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "14px 25px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-hover}"
  button-secondary:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.button}"
    padding: "14px 25px"
  button-inverse:
    backgroundColor: "{colors.white}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.button}"
    padding: "14px 25px"
  sender-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px"
    height: "40px"
  navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "88px"
  message-type:
    textColor: "{colors.cobalt}"
    backgroundColor: "{colors.white}"
    rounded: "{rounded.tab}"
    padding: "5px 3px"
  workspace-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.workspace}"
    padding: "24px"
  message-preview:
    rounded: "{rounded.message}"
    padding: "14px"
---

# Design System: SMS Buddy

## Overview

**Creative North Star: "Retail window signage"**

Retail window signage translated into a messaging workspace. Large geometric lettering, saturated cobalt and generous white space make SMS Buddy direct and approachable. Pale blue surfaces hold tangible message examples; flat SVG geometry supplies the identity and illustrations.

This records the implemented system, including the owner-requested Motion Sites look-and-feel refinement. The original home-a comp is a historical reference; the current homepage composition is recorded below. Semantic HTML carries the content and controls. The approved composition is evidence of the world, while src/app/globals.css, src/app/home.css and the live components own exact implementation values.

**Key Characteristics:**

- Cobalt actions and dark navy lettering on white.
- Locally served Manrope headings and Inter interface text.
- Flat message geometry with selective, quiet elevation.
- Responsive examples and restrained, user-triggered motion.

## Colors

### Primary

Cobalt marks primary actions, links, emphasis, selection and focus. Cobalt-hover darkens interactive primary controls. Sky creates the messaging workspace and secondary actions. The closing account section reverses the relationship: cobalt field, white text and white action.

### Neutral

Ink anchors headings and interface text; muted blue carries supporting explanations. White is the primary canvas and control surface. Line separates sections and disclosures. The frontmatter captures the reused homepage palette from the `--sb-*` aliases; the older `--color-border` is a distinct value and must not silently replace `--sb-line`.

Small mint and lavender fields distinguish order and OTP illustrations. They remain local example treatments, not competing brand accents. One-off inbox colors and status treatments remain in component CSS.

## Typography

Ubuntu Bold is the approved wordmark family, locally hosted as a 700-weight TTF under the Ubuntu Font Licence. Manrope serves headings; Inter serves body copy, labels and controls. JetBrains Mono serves code. These three are local variable WOFF2 files with swap loading; code is not preloaded. The legacy `plusJakartaSans` export in src/lib/fonts.ts loads Manrope, not Plus Jakarta Sans.

The normative desktop roles appear above. Hero support text is 18px/1.6 with a 580px maximum width; section leads use the body role with a 530px maximum. Ordinary explanatory copy is 14–16px. Primary buttons use 15px/700; the wordmark uses Ubuntu 26px/700 with -0.025em tracking. Small inbox metadata is illustrative detail rather than page body text.

At 640px and below, the homepage hero uses clamp(34px, 9.1vw, 52px), 1.15 line height; section headings use 34px/1.18 and leads 15px/1.85. Input text is 14px on tablet/mobile. Do not flatten this hierarchy into a single card-title scale.

## Layout

The shared shell is min(1408px, 100% - 112px), centered. The homepage refines this to min(1200px, 100% - 96px), with its route styles in src/app/home.css. Horizontal gutters reduce to 36px at 1199px and 20px at 640px. Standard sections use the section spacing token, becoming 85px at 1199px and the mobile section token at 640px.

The homepage hero centers the existing headline, supporting copy and signup actions above the full-width pale-blue message workspace. On desktop the composer and 264px phone are joined by an illustrative message arrow; tablets reduce the gap and device width. At 640px the composer precedes the phone in a single column, with 16px input text. The secondary hero action anchors directly to this working example. All sender editing, message-type selection and preview behavior remains intact.

Supporting layouts use three-column examples or two-column explanations, sequences and diagrams. At 640px they become one column; the footer becomes two columns. Use-case content is open on the page, with colored illustration fields rather than enclosing every article in a card.

The sticky navigation is 88px tall, 78px at 980px, 72px at 640px. The menu replaces desktop links at 980px while the account CTA remains visible. Anchor scroll padding is 100px, reduced to 84px on mobile.

## Elevation & Depth

The system is primarily flat. Pale surface changes, thin separators and overlapping message geometry create hierarchy. Selective soft shadows lift the composer, recipient preview and shared-credit pool; they do not surround every section. Exact shadows and focus treatments are recorded in .impeccable/design.json.

## Shapes

Controls have compact, consistent rounded corners; the actual button and field values are in the frontmatter. The initial brief's 12px control estimate is superseded by the implemented values. Composer corners are broader, while the message bubble has a single tight lower corner. Circles hold simple icons and numbered steps. The desktop workspace has 32px left corners; tablet uses 20px all around and mobile 14px. The recipient preview uses a 320:660 SVG hardware frame, graphite metal rim, side buttons, camera island and home indicator. The HTML screen is inset within the frame and remains interactive. This owner-requested realistic hardware is a deliberate exception to the otherwise flat illustration system.

The approved Buddy B mark is a flat cobalt B silhouette with a speech bubble cut out in negative space, followed by the full “SMS Buddy” wordmark in ink and Ubuntu Bold. The shared geometry lives in src/lib/brand.ts; public/brand contains standalone SVG exports. Inline outline SVGs and restrained drawn arrows support the product examples. Preserve their flat geometry and do not replace meaningful text with raster assets.

## Components

- **Actions:** primary cobalt, secondary sky, inverse white on cobalt. Standard primary minimum height is 52px; the hero uses 58px on desktop and 50px on mobile. Hover darkens the primary action and adds a light shadow. Focus uses a 3px cobalt outline offset by 4px; inverse actions use white focus. Disabled buttons show 50% opacity and a not-allowed cursor.
- **Navigation:** active routes turn cobalt. The mobile toggle exposes its expanded state; Escape closes it and restores toggle focus. Leaving the header or choosing a route closes the menu. A focus-revealed skip link precedes navigation.
- **Message type controls:** ordinary buttons in an accessible labelled group, with aria-pressed selection. A white selected tile sits within a pale compact segmented surface. They are not ARIA tabs.
- **Fields:** visible labels, thin borders and white backgrounds. Sender name is limited to 11 characters; message text to 400. An empty message disables Preview message. Switching type updates the example; submitting applies the edited message to the preview without sending anything.
- **Workspace and recipient:** editable semantic controls beside a clearly labelled example result. The preview has a polite atomic live region. Long message text wraps anywhere. Its 400ms arrival uses opacity, a 12px vertical offset and a shallow clip reveal; reduced motion removes the initial animation. It is user-triggered, not an ambient loop.
- **FAQ:** native details/summary disclosures with separator rules and a plus mark rotating when open. Keep keyboard behavior native.
- **Motion:** action arrows move 3px in 180ms and primary press scales to .985 only when reduced motion is not requested. Reduced motion suppresses CSS animation/transition duration and smooth scrolling globally. Existing legacy ambient-animation helpers are not the homepage motion language.

The sidecar provides nine self-contained component samples with inline SVG and resolved CSS; static message-type samples document states, while application state remains owned by React.

## Do's and Don'ts

### Do

- Do preserve the SMS Buddy name and geometric speech-bubble wordmark.
- Do use real text, labelled controls and visible keyboard focus.
- Do label message demonstrations as examples and preserve the statement that nothing is sent.
- Do stack the mobile composer before its recipient result and retain the primary account action.
- Do use the implementation values below when a provisional brief differs.

### Don't

- Don't reintroduce deleted logo, mascot or video assets without owner instruction.
- Don't turn illustrative message status into a real delivery claim.
- Don't add stock business photography, ornamental 3D or material textures to this established world.
- Don't make motion necessary to understand a message or control.

## Motion Sites homepage refinement — 9 September 2026

Quantum Lucid informed the centered introduction and prominent product workspace. Growth Decisions informed the coordinated, bounded entrance and selective color emphasis. These are references, not copied templates: SMS Buddy preserves its approved branding, real product copy and account-creation destination.

The hero uses a 650-weight Manrope display at up to 70px. The feature illustrations step down the desktop grid; the agency section reverses to navy with a shared-credit network, then the page returns to quiet pricing and FAQ content. A large Buddy B silhouette anchors the closing cobalt signup panel.

The entrance settles the headline, copy, controls and workspace over 0.8–0.9 seconds. Selected sections settle once as they enter view, and the agency network pulses twice. No continuous background motion, added video payload or third-party motion runtime. Content is visible without JavaScript; reduced-motion CSS suppresses these animations. Interactive message motion remains user-triggered.

The route stylesheet owns homepage refinements; base component examples describe the shared system. Independent visual/source review passed; browser checks verified responsive widths and preserved demo interactions. Conversion lift remains unmeasured.

The homepage's contextual UI scale uses 10–12px for illustrative metadata and compact demo labels, 13–15px for actions and supporting interface text, 16–17px for input/body text, and 18–22px for component and feature titles. Mobile form fields use 16px. The demo surface radius is 28px on desktop and 18px on mobile; its composer remains 16px. These deliberate route values extend the concise frontmatter scale and account for the detector's advisory scale mismatches.
