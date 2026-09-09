# SMS Buddy verification

## Passed

- `npm run lint`: no errors or warnings.
- `npm run build`: production compilation, TypeScript checks and static export complete.
- Static export references: 276 local asset/link references checked; no missing targets.
- Homepage desktop (1440px) and mobile (390px): no horizontal overflow; one main landmark and one instance of each section.
- Features, agencies, developers, SMEs and contact: inspected headings and no horizontal overflow at desktop/mobile widths.
- Mobile navigation: opens, closes, Escape dismisses it and returns focus to the menu control.
- Message preview: example-type selection and custom sender name update the local preview; no SMS is sent.
- Pricing: 5,001 credits selects the 10,000-credit pack, LKR 5,800 package price, 4,999 credits remaining. Above 150,000 directs to support. Keyboard-entered zero yields an accessible invalid state and removes the estimate. No purchase is made.
- Native FAQ disclosure opens.
- Get Started was clicked and verified to navigate in the same tab to https://portal.smsbuddy.lk/register with the actual Create Customer Account form. No account, email or SMS was created/sent.
- Independent homepage finish review: PASS across all five design contract areas.
- Fonts are bundled in WOFF2 format with their OFL licenses; rendering/build no longer depends on Google Fonts requests.

## Limits

The CTA event implementation queues local dataLayer/CustomEvent hooks. No analytics collector has been configured. Portal/back-end `signup_completed` tracking remains necessary; no conversion lift is asserted.

The owner confirmed all ten package prices, SMS counts and separate extra-SMS rates on 9 September 2026. The site now uses that schedule and removes indicative-price wording. The supplied sheet does not specify tax treatment or sender setup charges.

Full-page browser screenshots had stitching artifacts. Use the native viewport hero and section captures in `docs/screenshots/` for visual review, rather than the stitched full-page images.

Browser automation's number-field `fill()` did not consistently dispatch the application change event in this environment; the invalid-input state was confirmed using actual keyboard input.

Development and production scripts use webpack following a Turbopack module-resolution failure in this environment. The site remains a static Next.js export. No deployment was performed.

## SB150X positioning update — 9 September 2026

Homepage credit section and pricing hero now feature the lowest extra-SMS rate from the shared package data, alongside the package price, included SMS count and validity. Pricing rows and calculator identify SB150X; agencies get matching volume-pricing context. No country-wide price-superiority claim is used. The pricing CTA targets the registration portal and has its own click-location tag. High-volume ad-copy variants are recorded in `video-campaign-brief.md`.
