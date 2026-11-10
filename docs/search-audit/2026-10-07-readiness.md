# SMS Buddy phase 1 readiness — 7 October 2026

Scope: bounded local changes for the Nanobotz product growth plan, days 1–14. No production release, DNS/CDN change, account creation, message sending or analytics-provider configuration was performed.

## Owner update and current release state — 7 October 2026

The owner approved a **transactional SMS range of LKR 0.60 down to LKR 0.46** as larger credit packages are topped up in the app. That instruction supersedes this report’s historical 0.45-floor discussion below. The updated public site replaces the old exact package ladder with this range and links to portal purchase options. Its calculator compares the two rates without claiming eligibility or an actual package quote. The homepage, pricing page, guide, agencies page, metadata and optional `llms.txt` all use the same approved range. The old package data is absent from public source/export.

Authenticated GitHub still showed `main` at `091a32fd10e1ac35c2eb17a0699ae12ba4cf3ae2`. The inspected seeder listing did not contain an identifiable tariff/package seed, and GitHub code search reported indexing. This limited inspection cannot establish current exact package tiers or prove that they do not exist elsewhere. The developer handoff requests a tariff export and the actual runtime handlers.

The delegated crawler policy now allows search/user retrieval agents and Google-Extended. Google-Extended also permits its covered Google training use; GPTBot and ClaudeBot remain disallowed. Specific allowed groups repeat the wildcard private-path exclusions. `/get-started` remains crawlable with noindex. This marketing-domain policy does not protect or configure the separate portal. The final CDN-served policy and genuine crawler logs still need release verification.

No deployment connection was found in this checkout: no `.vercel` linkage or `.github` workflow; the remote is `PvFrozty/smsbuddy_web`, and the app builds as a static export. Deploy only the validated `out/` directory through the actual hosting account. Configure www-to-apex redirects at that host/CDN with path/query preservation. No production changes or live conversions are claimed here.

## Historical phase 1 notes (superseded where noted above)

## Implemented locally

- Added an optional static `/llms.txt` with the same eight canonical public routes and package data used by the website. It describes prepaid SMS, approval/credit conditions, application-owned verification logic, and the real portal signup. It is a directory for consumers that choose to use it, not a search-ranking guarantee or substitute for public HTML.
- Added a stable `SoftwareApplication` entity alongside the existing Organization/WebSite entities. It describes the visible SMS portal/API scope without invented reviews, ratings, free offers or customer counts.
- Added explicit indexing and Google preview permissions to the eight public marketing pages. The legacy signup handoff and error page retain `noindex` without an inherited Google-specific index override.
- Extended the conversion contract from marketing clicks to backend-confirmed signup, setup, accepted/delivered messaging and settled credit purchase. These downstream events are specified, not installed: the portal source and analytics property were not available.

## Commercial facts and release dependencies

The existing working tree already contains the owner's 26 September price correction. Keep it. PAYG is LKR 0.60; bundle rates fall from 0.58 for 1,000 SMS to 0.45 for 100,000 SMS and remain 0.45 through 150,000. Totals are derived from integer-cent rates. SB150X is therefore LKR 67,500, not LKR 87,000. Credits have a stated three-month validity. Tax treatment and sender-name charges remain unconfirmed; no assumptions were added.

The 7 October public audit of `/guides/bulk-sms-sri-lanka` still found the older LKR 87,000 SB150X total and “extra-SMS” interpretation. The approved local correction must be included in the eventual product-site release. Inspect the live pricing page, guide, homepage, calculator and actual purchase terms together after release. The current local source is the evidence for the new rate; a portal purchase was not inspected.

The existing developer landing page is `/for-developers`; there is no `/sms-api` page. It explains OTP responsibility and asks developers to confirm actual authentication, formats, statuses and limits. Publish technical API examples only after verifying the real service contract. Do not invent endpoints from the marketing copy.

## Canonical host and crawler policy

The production audit observed `www.smsbuddy.lk` returning 200 with an apex canonical. This is a Next.js static export, so adding Next server redirect configuration would not create the required HTTP redirect. Apply the following at the actual serving CDN/host as a separate release step:

- Match hostname `www.smsbuddy.lk` only.
- Permanently redirect to `https://smsbuddy.lk` with the original path and query string preserved.
- Preserve apex routing and portal subdomain behavior. Verify HTTPS certificate coverage for the source hostname and one-hop redirects for `/`, `/pricing` and `/for-developers` with query parameters.

The origin robots file remains unchanged. Its wildcard group permits normal search crawlers; the existing block list includes Google-Extended, GPTBot and ClaudeBot. Cloudflare also managed a public robots policy in the prior audit, so source changes alone would not establish the final response.

Google documents that Google-Extended controls both Gemini training use and Gemini Apps/Vertex AI grounding; it is not a Google Search ranking signal. Retaining the current block preserves the existing policy but limits that grounding use. A release owner should deliberately resolve this combined control and confirm the final edge-served robots response. ChatGPT and Claude search crawlers are distinct from their training crawlers. No broader training permission was silently enabled.

## Open operational dependencies

1. Portal source access and the chosen analytics property are needed to implement and verify completed-account/activation reporting. The existing local CTA hook is not a collector.
2. Confirm purchase terms in the portal: corrected package rates/totals, tax treatment, sender charges and current API availability. No new rates or fee assumptions were introduced.
3. Apply and verify the canonical-host redirect at the serving host/CDN; review the Google-Extended tradeoff and any edge WAF/challenge behavior using genuine bot logs where possible.
4. After an authorized deployment, inspect all public routes, the new text directory, structured data, actual response headers, signup destination and Search Console URL inspection. Local build success is not proof of live indexing or conversion delivery.

## Validation

The staged copy was built against the sibling repository's existing dependencies; no packages were installed. `npm run lint`, `npm run build`, and `python3 scripts/verify-search-export.py` passed. Export verification covers eight canonical indexable pages, metadata uniqueness, social assets, parseable identity markup, internal links/fragments, signup links, sitemap and preserved noindex pages. Additional checks verify the application entity, preview directives, llms route coverage, current package totals and unchanged crawler restrictions.

Further public fetches from this sandbox failed DNS resolution and the web tool did not return the portal/pricing page. Those failures are tool-access limitations, not proof that the public pages are unavailable. Use the saved successful 7 October audit for public observations; a fresh portal journey remains unverified.

## References

- [Google crawler controls](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [OpenAI crawler purposes](https://developers.openai.com/api/docs/bots)
- [SoftwareApplication vocabulary](https://schema.org/SoftwareApplication)
- [Optional llms.txt proposal](https://llmstxt.org/)
- [Conversion event contract](../conversion-measurement.md)
