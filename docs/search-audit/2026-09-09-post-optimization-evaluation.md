# SMS Buddy: post-optimization evaluation

9 September 2026. Read-only reassessment of the updated local export and public site.

**Verdict: the local site is ready for an initial SEO release. Public discovery has not yet received those improvements. Answer coverage is improving; authority, factual consistency and measured outcomes remain incomplete.**

## Evaluation

| Discipline | Updated local build | Public readiness | Evidence and remaining limit |
| --- | --- | --- | --- |
| SEO: search discovery and relevance | Strong technical foundation | Partial; release pending | Eight indexable pages pass metadata, canonical, structured-data, link and sitemap checks. Live homepage/pricing lack canonicals and JSON-LD; live sitemap is 404. Rankings and field performance are unverified. |
| AEO: direct, useful answers | Good starter coverage | Partial | Guide and FAQ answer setup, sender-name, 1,000-SMS cost, credit expiry and portal/API questions. Taxes, sender fees, approval timing, precise segmentation and implementation documentation remain incomplete. New guide is not public. |
| AIO: AI crawler and retrieval readiness | Structurally ready; access unverified | Partial | Important facts are present in HTML, with site identity and stable URLs. Robots permits general search crawling and preserves explicit training/bulk restrictions. Actual crawler access through the CDN and real AI referrals are not established. |
| GEO: credible inclusion in generated answers | Developing | Needs work | Clearer content helps retrieval, but cross-site product contradictions, limited independently attributable evidence and missing detailed documentation reduce confidence in a consistent product story. No citation uplift has been demonstrated. |

These ratings describe observed readiness, not numerical ranking predictions. AEO, GEO and AIO overlap; here AIO means AI crawler/retrieval readiness, and GEO means evidence supporting accurate inclusion in generated answers. Google emphasizes useful original information and established search fundamentals rather than a special AI markup requirement. [Google guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## What improved since the first audit

The export validator passed again in this turn for all eight indexable pages. It verifies unique titles and descriptions, canonical/social URLs, existing social images, Organization/WebSite JSON-LD, internal links and fragments, signup destinations, sitemap membership, noindex handoff/error behavior and main landmarks.

Metadata and headings now address the keyword opportunities found through DataForSEO. The practical guide adds an actual answer to the observed setup/cost questions. Shared pricing data reduces the risk that the guide and pricing page drift apart. SB150X's LKR 0.45 rate remains explicitly an extra-SMS rate; its included average is LKR 0.58.

The preceding implementation verification passed build and lint, checked four pages at desktop/mobile widths without horizontal overflow, and confirmed that editing the demo sender updated the phone preview. Those browser checks were not repeated for this read-only evaluation because no UI code changed.

## Fresh public-site checks

| URL | Observed response |
| --- | --- |
| `https://smsbuddy.lk/` | 200; old document title; no canonical, JSON-LD or social image |
| `https://smsbuddy.lk/pricing` | 200; old document title; no canonical, JSON-LD or social image |
| `https://smsbuddy.lk/guides/bulk-sms-sri-lanka` | 404 |
| `https://smsbuddy.lk/sitemap.xml` | 404 |
| `https://smsbuddy.lk/robots.txt` | 200; Cloudflare-managed policy; no sitemap declaration |
| `https://www.smsbuddy.lk/` | 200 on www; no redirect to apex and no canonical |

Raw results: `post-optimization-live-check.json`. They demonstrate deployment drift, not a failure of the new local implementation. Missing canonicals or a sitemap do not by themselves prove a site is unindexed.

## Most consequential remaining issues

**1. Release and verify the improvements.** Publish the approved export, configure the permanent www-to-apex redirect, and confirm the effective CDN robots file advertises the sitemap while retaining the owner's content policy. Then inspect indexing and selected canonicals in Google Search Console and Bing Webmaster Tools.

**2. Reconcile the product story across owned websites.** The Nanobotz page describes SMS, WhatsApp and email, built-in OTP verification, quote-based pricing and an enterprise/developer focus. It explicitly discourages manual spreadsheet campaigns. The SMS Buddy site promotes a portal suitable for small businesses, published credit packages and application-managed OTP validation. Resolve this with authoritative product facts before adding broader claims. [Nanobotz product page](https://www.nanobotz.lk/products/sms-buddy)

**3. Complete the information buyers need.** Publish approved tax/fee details, sender-name requirements and realistic timing. Add real API documentation with tested request/response examples and billing examples based on actual product behavior. Current references to contacting support are honest, but leave searchers without a complete answer.

**4. Build attributable evidence.** Establish the verified operating company and appropriate policy pages. Add a real portal walkthrough and consented customer case studies with methodology and dates. Schema helps identify entities; it does not substantiate business claims. No backlink-quality audit or independent reputation study was performed here.

**5. Measure discovery through account creation.** The current code emits a local click hook without an analytics collector or portal completion event. Until those are connected, neither SEO nor AI referrals can be evaluated against the user's actual conversion goal. Actual indexed pages, ranking changes and generated-answer citations remain unverified.

## Performance and scope limits

The previous public-home Lighthouse run recorded 83 performance and 4.4-second simulated mobile LCP. That was an earlier single lab run of the old public build, not a new post-optimization result. This pass did not rerun Lighthouse or obtain field Core Web Vitals. Mobile loading therefore remains an open priority; no performance improvement is claimed.

Keyword research from the immediately preceding implementation is reused as research evidence, not as a fresh ranking test. No account was created, external content edited, application code changed or deployment performed during this evaluation.

**Recommended next milestone:** publish the corrected version and establish indexing, factual consistency and completed-signup measurement. Then prioritize API documentation and genuine product evidence to strengthen answer quality and credibility.
