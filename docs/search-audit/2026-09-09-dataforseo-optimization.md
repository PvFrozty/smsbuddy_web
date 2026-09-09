# SMS Buddy: DataForSEO research and implementation

9 September 2026. Changes implemented in the local website; not deployed.

## Research that informed the changes

Used the authenticated DataForSEO MCP, English, Sri Lanka:

- `dataforseo_labs_google_keyword_overview` for nine seed phrases.
- `serp_organic_live_advanced` for “bulk sms sri lanka” and “sms gateway sri lanka”, Google, depth 10.

Raw responses are saved beside this report as `dataforseo-keywords-2026-09-09.json`, `dataforseo-serp-2026-09-09.json` and `dataforseo-gateway-serp-2026-09-09.json`.

| Keyword | Reported estimated monthly searches | Page owning the intent |
| --- | ---: | --- |
| sms gateway sri lanka | 390 | Homepage |
| bulk sms sri lanka | 50 | Homepage; practical setup guide supports it |
| sms api sri lanka | 40 | Developer page |
| sms marketing sri lanka | 30 | Small-business page |

These are provider estimates, not verified traffic or forecasts. Keyword-info timestamps were 26–28 August 2026. Five requested phrases were absent from the database response; missing data is not zero demand. Paid competition and modeled keyword difficulty were not treated as guaranteed organic ranking opportunities.

The sampled gateway SERP included Text.lk, Notify, SMSlenz, Dialog eSMS, Send.lk and SLTMobitel. SMS Buddy did not appear among the returned organic results. This is a point-in-time query sample, not an exhaustive ranking study. Competitor and AI-overview claims were not used as verified SMS Buddy product facts.

People-also-ask results included “How to send 1000 SMS at once?” and “How much does a bulk SMS cost?” Related searches included SMS gateway pricing. These supported the new setup guide, cost answer and pricing metadata. We avoided free-SMS promises, keyword-stuffed pages and unsupported “cheapest in Sri Lanka” comparisons.

## Implemented

- Central route metadata registry: distinct titles, descriptions, canonical URLs and matching Open Graph/Twitter previews for all eight indexable pages.
- Build-generated XML sitemap and robots file. Existing observed training/bulk crawler restrictions are preserved; the sitemap excludes the noindex signup handoff and error pages.
- Organization and WebSite JSON-LD using existing public contact information, a stable identity and the actual brand logo. No invented ratings, addresses or performance statistics.
- A 1200×630 branded PNG for shared links, generated with the approved Ubuntu typeface, plus a 512×512 logo PNG for structured data. Reproducible generation script included.
- More explicit homepage supporting copy, pricing heading, developer heading and small-business heading, each aligned with its search intent. The homepage's main creative headline and interactive demo remain.
- A practical `/guides/bulk-sms-sri-lanka` page covering setup, sender IDs, a 1,000-SMS campaign, package examples, Unicode credit use, and portal/API choices. It links to the demo, pricing, relevant audience pages and signup. Footer and homepage links make it discoverable. Breadcrumb JSON-LD matches its visible hierarchy.
- A pricing FAQ answering the cost of 1,000 SMS. Package examples derive from the shared owner-confirmed price data. Extra-SMS rates remain explicitly separate from included averages.
- Improved contrast for the mobile SB150X price qualifier, a working 404 main landmark, noindex/error metadata, and removal of the internal design-contract payload from public HTML.
- Guide signup clicks retain their route in the existing analytics hook. This does not add an analytics collector or portal completion tracking.

The sitemap and robots use Next.js metadata routes and static export configuration. References: [Next.js sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Next.js robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

## Validation

- `npm run build`: passed, including static sitemap, robots and guide outputs.
- `npm run lint`: passed.
- `python3 scripts/verify-search-export.py`: passed for eight indexable pages; checks unique metadata, canonical/social URLs, image files, JSON-LD, internal links/fragments, signup destinations, sitemap exclusions and main landmarks.
- Browser interaction: changing the sender to TESTSTORE and clicking Preview message updated the recipient phone successfully.
- Desktop/mobile review covers homepage, pricing, guide and developer page at 1440px and 390px. All eight route/viewport combinations had no horizontal overflow and retained signup links. Screenshots are under `output/playwright/seo-*.png`; the social artwork was also inspected.

No post-change performance improvement or ranking uplift is claimed. Production Core Web Vitals require deployment and field measurement.

## Release and remaining dependencies

1. Publish the approved static output. Confirm the live pricing, guide, schema, PNGs, sitemap and canonical tags match this build. Re-run the export validator after subsequent content changes.
2. Configure a permanent redirect from `www.smsbuddy.lk` to the apex hostname at the hosting/CDN layer, preserving path and query. Confirm HTTP and HTTPS behavior and avoid redirect loops. Static Next.js export cannot install that host-level redirect by itself.
3. Inspect the **effective** Cloudflare-managed robots response after deployment: it must retain the owner's content/training policy and advertise the sitemap. An origin robots file alone cannot prove edge behavior. Verify real search crawlers in CDN/server logs.
4. Submit the sitemap in Google Search Console and Bing Webmaster Tools; inspect the selected canonical and indexability of homepage, pricing and guide. Account access is required.
5. Reconcile the separate Nanobotz product page with approved SMS Buddy capabilities and pricing. Confirm taxes, sender-name fees, approval requirements and actual API documentation before publishing more specific claims. This repository does not control that site or the portal.
6. Connect a real analytics collector and a portal account-created event to measure organic/AI referrals through completed signup. The current hook only measures a local click event.

The organization metadata identifies the public SMS Buddy service; legal operating-company details and policy documents still need owner-confirmed content. No legal policies, endpoint examples or customer case studies were fabricated.
