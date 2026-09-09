# SMS Buddy search and AI discovery audit

**Audited 9 September 2026. Read-only review; no application changes or deployment made for this audit.**

The site has a sound crawlable foundation. Its biggest opportunity is making public product facts consistent, complete and attributable, then improving technical discovery and measuring completed signups. A Lighthouse SEO score of 100 does not establish ranking, authority or AI citation readiness.

| Area | Readiness | Main gap |
| --- | --- | --- |
| SEO — conventional search | Partial | Canonicalization, sitemap, mobile loading and public/local content drift |
| AEO — answering customer questions | Partial | Useful pricing FAQs, but incomplete commercial and implementation answers |
| GEO — inclusion in generated answers | Needs work | Conflicting first-party descriptions and limited attributable evidence |
| AIO — AI crawler/agent discovery | Partial; access not fully verified | Readable HTML exists; edge bot access and actual AI referrals remain unverified |

These are qualitative judgments, not standardized certifications. AEO, GEO and AIO overlap substantially. Google's current guidance emphasizes useful original content and normal search fundamentals, with no special AI schema or required `llms.txt`. [Google AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Scope and evidence

Inspected source and production-export HTML for `/`, `/pricing`, `/features`, `/for-agencies`, `/for-developers`, `/for-smes`, `/contact` and `/get-started`. Checked internal links and fragments, metadata, structured data, live HTTP responses, public robots policy and mobile Lighthouse results. Reviewed the Nanobotz product page for brand consistency.

The local production export contains the latest pricing work. Public home and pricing responses were checked separately; findings about all eight pages refer to the local export unless stated otherwise. Search Console, Bing Webmaster Tools, server bot logs, portal analytics and field Core Web Vitals were unavailable. Actual indexing, rankings, AI citations and completed-account attribution are therefore **not established** by this audit.

Evidence files in this directory: `static-pages.json`, `link-check.json`, `public-fetch.json`, saved public response bodies/headers, and the three valid Lighthouse HTML/JSON reports. The initial pricing run named `invalid-directory-listing` measured a test-server directory listing and is excluded from every result below.

## What already works

- All eight pages have distinct document titles/descriptions, one H1 and a main landmark. Seven marketing pages have no meta indexing block; `/get-started` intentionally uses `noindex, follow`.
- Important copy, the pricing table and FAQs exist in initial HTML. Customers and crawlers can read them without running the interactive demo.
- Main-page internal links and fragments resolve. Signup links point directly to the account portal.
- The latest pricing keeps package totals and extra-SMS rates separate. Preserve that distinction everywhere.
- The promotional video loads on interaction, avoiding an initial video download. Local home and live home had zero measured layout shift in the lab runs.

## First priorities

### P1 — Publish one consistent set of product and pricing facts

**Observed:** the live pricing response still contains older “indicative” language and the effective-price presentation. It does not contain the latest extra-SMS positioning. The local package table is newer. Search engines can only discover the public version.

Separately, Nanobotz's public product page describes SMS, WhatsApp and email through one API, provider-managed OTP generation/verification, numerical reliability claims, and quote-based pricing. Those statements are broader than this site's SMS focus and application-managed OTP verification guidance. These are unresolved inconsistencies, not independently verified capabilities. [Nanobotz SMS Buddy page](https://www.nanobotz.lk/products/sms-buddy)

**Action:** reconcile channel support, OTP responsibility, commercial terms and evidence-backed performance claims with the product owner. Publish the approved local pricing and align the parent-company page. Add a genuine pricing review date when reviewed.

Keep the offer precise: **SB150X costs LKR 87,000 for 150,000 included SMS; extra SMS cost LKR 0.45 each.** The included average is LKR 0.58, so “all SMS at 0.45” would be misleading. A countrywide “cheapest” claim needs a current, comparable competitor study; this audit does not establish it.

**Acceptance:** live HTML, parent-company copy and portal pricing agree; conditions remain next to the offer. Sources: `src/lib/constants.ts:42`, `src/components/pricing/RateHighlight.tsx:8`, saved public pricing response.

### P1 — Consolidate canonical URLs

**Observed:** all eight local pages lack a canonical link. Both `https://smsbuddy.lk/` and `https://www.smsbuddy.lk/` return 200, with the latter remaining on `www`. HTTP already redirects to HTTPS. `metadataBase` and `og:url` do not emit a canonical link.

**Action:** choose the existing apex hostname, redirect the `www` equivalent permanently while preserving paths, and emit a self-referencing HTTPS canonical for each indexable route. Make internal URLs consistent. Check trailing-slash behavior during release.

**Acceptance:** one preferred URL per page, verified from live HTTP responses and HTML. Implementation location: `src/lib/metadata.ts:18` and route metadata; host redirect belongs in hosting/CDN configuration.

### P1 — Answer the questions that precede signup

**Observed:** the current FAQs explain validity and credit counting, but important buying and integration details are deferred to support.

| Intent | Publish after product confirmation | Best location |
| --- | --- | --- |
| “What will I actually pay?” | Tax treatment, sender-name charges, payment methods, renewal/top-up rules and exactly when extra-SMS rates apply | Pricing FAQ |
| “How soon can I send?” | Sender-name documents, approval steps, realistic timing and first-send walkthrough | Getting-started guide |
| “How are Sinhala/Tamil messages billed?” | Actual segmentation rules and worked examples from the product | Credit guide linked from pricing |
| “Can I integrate this?” | Authentication, executable examples, responses, errors, delivery statuses, retries and limits | Public API documentation |
| “Can I trust this provider?” | Verified operating company, product ownership, contact details, privacy/terms and genuine customer evidence | About/trust pages and footer |

Start with pricing and onboarding answers, then API documentation. Use direct factual opening sentences and descriptive headings while keeping the existing brand voice. Do not invent timings, supported networks, testimonials or SLA figures. Sources: pricing FAQs, `src/app/(segments)/for-developers/page.tsx:23`, contact page and footer.

### P1 — Measure qualified outcomes

**Observed:** `src/lib/conversion.ts:44` explicitly implements a local event hook only. It pushes `get_started_click` to a data layer and dispatches an event; it does not send analytics or confirm an account was created.

**Action:** connect an appropriate collector and instrument successful account creation in the portal. Preserve campaign/referral attribution between marketing and portal using the chosen platform's supported configuration. Record clicks and completed signups separately; do not transmit message contents or form values.

**Acceptance:** a controlled test signup produces one attributable completion event. Monitor organic search and identifiable AI referrals against completed accounts; referral data will not capture every AI-assisted journey.

## Technical and discovery improvements

| Priority | Verified finding | Recommendation and acceptance |
| --- | --- | --- |
| P2 | Public `/sitemap.xml` returns 404; no generated sitemap exists locally | Generate an XML sitemap for canonical indexable pages, excluding the signup handoff and error pages. Reference it in the effective robots file and submit in webmaster tools. Its absence is a discovery gap, not proof pages cannot be indexed. |
| P2 | No JSON-LD on any of the eight local pages | Add truthful Organization and WebSite identity data with stable IDs, real logo and verified profile links. Consider appropriate service/software offer markup only when it accurately represents visible pricing. Never encode LKR 0.45 as the price of the whole SB150X package or fabricate ratings. [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) |
| P2 | Five indexable interior pages inherit homepage Open Graph title, description and URL; all eight lack a social image | Emit page-specific social metadata and a branded share image. Pricing's social description also lags its new document description. Fix `src/lib/metadata.ts:18` and route layouts. This improves shared-link presentation; it is not a direct ranking promise. |
| P2 | Video source appears only after a click; no VideoObject or video sitemap | Preserve lightweight homepage playback. If video search matters, add a useful indexed watch page with prominent video, stable thumbnail/media URLs, a transcript and accurate video metadata. [Google video guidance](https://developers.google.com/search/docs/appearance/video) |
| P2 | Mobile SB150X explanatory text has 4.37:1 contrast against its blue background | Darken the small text at `src/app/pricing/page.tsx:104` to meet 4.5:1; recheck that state. The qualifier is commercially important. |
| P3 | Error pages have a skip link targeting a missing main landmark | Add `main#main-content` in `src/app/not-found.tsx`; verify the error route. |
| P3 | Internal design-contract JSON is emitted in public HTML | Remove that internal payload from production in `src/app/layout.tsx:35`. It is not product structured data; no search penalty has been established. |

Keep useful visible FAQs. **Do not spend effort promising Google FAQ rich results:** Google discontinued them beginning 7 May 2026. [Google Search updates](https://developers.google.com/search/updates)

## Mobile performance

Single Lighthouse 13.4.1 simulated-mobile runs; these are lab measurements, not visitor field data or a full accessibility certification.

| Target | Performance | SEO checks | Accessibility checks | LCP | Total blocking time | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Public homepage | 83 | 100 | 100 | 4.4 s | 20 ms | 0 |
| Local production homepage | 76 | 100 | 100 | 6.8 s | 10 ms | 0 |
| Local production pricing | 78 | 100 | 96 | 5.9 s | 0 ms | 0 |

The local static server did not provide production compression/cache headers, and public content differs from local. These results cannot prove a release regression. All three runs reported best-practices checks at 100.

Treat loading as a P1 performance investigation before scaling traffic. The largest element was heading text, so generating smaller hero imagery is not the main remedy. Live Lighthouse estimated about 69 KiB of unused JavaScript and 350 ms of render-blocking savings. Inspect critical CSS and font delivery, defer optional animation/calculator code where practical, and preserve immediate heading visibility. Re-measure the deployed release and obtain field data before judging actual Core Web Vitals. “Unused” is a single-load estimate, not permission to delete code needed by interactions.

## AI crawler policy and measurement

The live Cloudflare-managed robots file allows general crawling while explicitly blocking several training/bulk crawlers, including GPTBot and Google-Extended. It does not explicitly block OAI-SearchBot, Claude-SearchBot or PerplexityBot. This does **not** prove the CDN admits their real requests; inspect firewall rules and verified bot logs.

OpenAI distinguishes its search crawler from its training crawler. Allowing OAI-SearchBot while blocking GPTBot is a valid separate choice; do not remove training restrictions merely to pursue ChatGPT discovery. Check current published crawler/IP guidance against CDN settings. [OpenAI bot documentation](https://developers.openai.com/api/docs/bots)

After release, inspect canonical/indexing status in Google Search Console and Bing Webmaster Tools. Establish a dated sample of real buyer questions, record whether AI answers cite SMS Buddy and whether answers are accurate, and connect observable referrals to signup outcomes. Treat those observations as directional: generated answers vary and cannot be guaranteed.

## Recommended delivery order

1. Reconcile public facts, confirm unanswered pricing conditions and publish the approved pricing.
2. Implement canonical redirects, sitemap, consistent metadata and verified company identity.
3. Publish pricing/onboarding answers and API documentation; add genuine first-party product evidence.
4. Improve mobile loading and qualifier contrast, then verify the deployed pages.
5. Validate indexing, real bot access and completed-signup attribution; use that evidence to prioritize subsequent content.

The interactive demo and visual direction can stay. The work with the highest likely return is clearer product truth, fewer unanswered questions and a measurable path from discovery to a new account.
