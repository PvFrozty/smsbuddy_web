# SMS Buddy conversion research

Update — 9 September 2026: the owner supplied the authoritative price sheet. The pricing discrepancy recorded below is resolved: descending rates are for extra SMS, while package totals and included SMS counts remain as listed. The live pricing page and calculator now label these separately. Earlier findings below are historical.
## Decision

Build the homepage around a concrete job: **send branded business SMS in Sri Lanka, with a portal or an API and help getting set up**. Use account creation as the primary conversion. Explain what happens after account creation before the visitor clicks. A visually polished site is a testable intervention; it is not evidence that conversion or revenue has increased.

The initial audience recommendation is Sri Lankan small businesses with repeat customer communication, plus the agencies and software teams serving them. This is a positioning hypothesis derived from the existing product scope, not customer research or a measured market-size estimate. Existing account, acquisition, and revenue data were unavailable.

Research checked public first-party pages on 9 September 2026. Prices below are provider-published statements, not independently purchased offers. Their tax, validity, usage, and onboarding conditions differ; do not turn them into a simplistic public price-comparison claim.

## Competitive evidence

| Provider | Public offer and entry point | Implication for SMS Buddy |
|---|---|---|
| Notify.lk | Pay&Go lists LKR 7,500 once, LKR 0.60/SMS before applicable taxes, no monthly fee, five sender IDs, six-month credit validity. Monthly plans also exist. Promotional SMS have an additional stated charge. It offers free trial credits without payment/card. The pricing page labels its update date 1 January 2024 despite remaining publicly available. [1] | No monthly subscription can address a real objection but is not unique. Explain all charges and credit expiry. Do not claim a current savings percentage using this older price sheet. |
| Text.lk | Starter lists no subscription/setup fee, tax-inclusive top-up rates from LKR 0.84 to 0.64, and non-expiring credits. A separate Business plan lists LKR 549/month. Clear free-account CTAs repeatedly precede plan commitment. [2] | Compete on understanding and fit, rather than presenting pay-as-you-go as exclusive. SMS Buddy's existing three-month expiry is less generous; disclose it. |
| Text.lk onboarding | Docs describe ten trial units, a demo sender ID, dashboard/API access, and no payment. The same page says some demo delivery is simulated and live delivery needs a paid account. Custom sender-ID approval is usually hours to one business day, sometimes three. [3] | Be precise about the difference between opening an account, testing, and sending live under a business name. Avoid promising a first live message immediately if approval is required. |
| Ideamart | Official onboarding has account creation, application provisioning, approval, limited production, and active production. Its docs expose SMS, carrier billing, USSD, and subscription APIs. [4] | It is a broader telecom platform, not a like-for-like pricing comparison. Guided integration could reduce perceived complexity, if SMS Buddy can demonstrate it. |
| SMSGo.lk | Its pricing page advertises LKR 0.54/SMS including taxes, no setup/monthly fees, non-expiring credits, Unicode, REST API, and a WooCommerce plugin. Brand-name sender masks require approval. [5] | Avoid “cheapest” language. A visible workflow and human setup assistance can give buyers a reason to choose beyond the unit price. |

Notify's homepage positions promotions, reminders, brand-name sending, a dashboard, and API access together. It displays customer quotations and integrations. These are its own marketing claims, not proof of SMS Buddy performance. [6] The useful design lesson is to show recognizable communication tasks and verifiable evidence near the decision, rather than a long abstract feature inventory.

## Audience hypotheses and page emphasis

| Audience | Job and likely trigger | First evidence needed | Recommended priority |
|---|---|---|---|
| Owner or operator of a retail, appointment, education, or service business | An upcoming promotion, reminder, or customer update; already has contacts | A branded message example, visible compose/send workflow, clear price, setup explanation | Main homepage and business landing page |
| Software developer or product team | Needs application notifications or OTP integration | Real API documentation, authentication example, status handling, known limits | Clear secondary route; a working documented example is stronger than code-looking decoration |
| Agency managing several client brands | Needs sender names, credits, and client access in one workflow | Actual multi-brand controls and scope of account permissions | Dedicated landing page once shared credits/sub-accounts are operationally verified |

These are not three equal heroes stacked together. The homepage should lead with the shared outcome, then let each visitor recognize their task. Test a business-led hero against a multi-brand-led hero only after traffic-source and signup-quality data are available. Agencies could offer higher account value, but no evidence here establishes their acquisition cost, willingness to pay, or retention.

## Conversion friction and recommended treatment

| Question in the buyer's mind | Website treatment | Evidence requirement |
|---|---|---|
| What does this do for me? | Show one realistic branded message for a promotion, reminder, or order update next to a short outcome headline | Mark invented customer/message examples as a preview; do not imply real customers |
| Can I do this without a developer? | Show portal workflow and an obvious separate API route | Confirm actual portal supports the depicted actions |
| What will I pay? | Put a simple entry pack and full pricing link close to a CTA; show expiry and tax treatment beside prices | Reconcile the repository's inconsistent package arithmetic before using prices |
| Do I need my own sender name first? | Explain account → sender-name request → credits/message steps, with approval qualified | Confirm SMS Buddy's exact required documents and process; competitor timelines are not its timelines |
| Will I be left alone to configure it? | A concise setup-assistance promise and contact route | Confirm scope, availability, and any support fees; do not invent 24/7 availability |
| Is there a catch after Get Started? | State that the CTA opens the account portal; make registration the destination | Inspect portal route and requirements rather than guessing `/register` |
| Will messages really arrive? | Explain delivery reporting and link live service evidence when available | Do not claim guaranteed delivery, a numerical SLA, or an uptime percentage without measured support |
| Can I trust this company with my contacts? | Company/contact details and actual privacy/terms links | Use real policies; do not invent certifications or a security badge |

Google's form guidance recommends obvious account-entry labels, fewer required fields, deferred collection of unnecessary profile data, appropriate autocomplete, and device/field testing. This supports examining the entire signup flow, not just landing-page clicks. It does not supply a conversion-uplift prediction for SMS Buddy. [7]

## Product claim audit

The following reflects source files inspected before redesign. Repository copy is evidence of existing messaging, not independent verification of production capability.

| Claim or issue | Evidence inspected | Treatment |
|---|---|---|
| Assisted Sri Lankan SMS gateway, promotional and transactional use, no long-term subscription | `src/lib/constants.ts`, site description | Reasonable baseline positioning; confirm commercial truth before publishing |
| Pay-as-you-go LKR 0.60; 1,000 pack LKR 580 | `smsPackages` in `src/lib/constants.ts` | Internally arithmetically consistent; tax treatment remains unconfirmed |
| Descending pack rates from 0.56 to 0.45 | Same array | **Conflict:** 5,000 for 2,900 and every larger listed total divide to 0.58, not their `perSmsCost`. Decide whether totals, counts, or stated rates are authoritative. Do not silently invent an offer |
| Three-month credit validity | Business segment and pricing FAQ | Keep visible near pricing; “no subscription” does not mean credits never expire |
| Unlimited sender masks, shared pool, sub-accounts | Agency segment page | Preserve product scope only with operational confirmation; never infer account-limit details |
| Queue/retries, webhooks, sandbox, rate limits, batch sending | Developer segment page | No API implementation or production proof was audited; technical claims need documentation and testing |
| “Your messages always get through” and “faster than any other provider” | Developer segment value-proposition text | Remove absolutes and unsupported comparative superiority |
| Setup free; priority/dedicated support on highlighted packs | Pricing page | Confirm actual service tiers before elevating to primary promises |
| Registration destination | `registerUrl` originally points to `https://portal.smsbuddy.lk` | Verify where a signed-out visitor lands. A portal login screen can add a step to the signup journey |

The external portal could not be inspected through the research fetcher, which returned an internal fetch error. Competitor registration pages similarly returned blocked/failed fetches. This is a research limitation, not evidence that those sites are down. Browser verification is still required. No accounts were created and no test SMS were sent by this research task.

## Proposed conversion architecture

1. **Hero:** clear Sri Lanka relevance; branded SMS outcome; one dominant Get Started button; pricing/preview as a secondary action. Show an intentional product/message preview that teaches something immediately.
2. **Reasons to proceed:** portal plus API, brand-name sending, pay-as-you-go, setup help. Use only established scope.
3. **Choose your task:** campaign, reminder/update, application message. Changing the example should help the buyer identify a use case, not create extra mandatory steps.
4. **Explain getting started:** account, sender name/setup, credits and sending. Keep account creation distinct from production activation.
5. **Pricing:** consistent numbers and meaningful totals, explicit expiry and tax status, full pricing link. A calculator must reflect genuine prices and SMS-segment rules.
6. **Evidence/objections:** real screenshots or plainly labeled previews, setup explanation, short FAQs. Add attributable customer proof when permission and evidence exist.
7. **Final action:** repeat Get Started with a short reminder of what the next page does.

Motion should explain a message moving from a business to a customer, or help inspect the interface. Keep core content visible without motion and respect reduced-motion preferences. Do not delay the first meaningful content or CTA for an entrance sequence. These are implementation recommendations, not proven winning variants.

## Measurement and experiments

The primary KPI is **completed new accounts / eligible marketing visitors**. CTA click-through is a diagnostic metric. A design can increase clicks while decreasing account completion if the promise and portal experience disagree.

| Event | Meaning | Suggested non-sensitive properties |
|---|---|---|
| `get_started_click` | Marketing visitor chooses the account CTA | page, placement, CTA label, variant, audience route |
| `signup_start` | Registration form opened or begun, consistently defined | source page/placement if safely carried to portal |
| `sign_up` | Account creation actually succeeds | signup method, variant attribution |
| `sender_id_requested` | New account begins activation | cohort, elapsed time since signup |
| `first_top_up` / `first_sms_sent` | Account reaches commercial/product value | cohort, elapsed time; keep message/recipient content out of analytics |

Google provides a recommended `sign_up` event with a `method` parameter. [8] Use one consistent analytics setup across the marketing site and portal, verify session/referral continuity, and inspect whether a cross-domain linker is needed for the actual hosts/cookie setup. Google's guidance warns that redirects can strip linker parameters. [9] Same-parent subdomains do not automatically require the same configuration as unrelated domains; test the actual journey.

Do not mark an outbound click as `sign_up`. Without portal instrumentation or authenticated backend evidence, the website can measure signup intent but cannot prove account creation.

| Priority | Intervention | Success criterion | Guardrail |
|---|---|---|---|
| P0 | Validate Get Started destination, pricing arithmetic, and signup event | Visitor reaches registration; one success event per created account; price math consistent | No fabricated account, broken login, or unsupported commercial offer |
| P1 | Clear outcome hero + realistic product preview + consistent CTA | Higher completed-account rate among comparable visitors | Signup quality and activation do not deteriorate |
| P1 | Disclose sender-ID/setup path and true costs | Better click-to-account and account-to-activation rates | Lower surprise-related support questions; no hidden expiry |
| P2 | Business-specific examples versus a generic feature hero | More activated accounts from the intended segment | Compare by channel/device rather than pooling very different traffic |
| P2 | Verified customer proof near CTA | Improved account conversion | Every quotation and number is attributable and approved |
| P3 | Test a small free trial, if the business authorizes and implements it | More activated paying customers net of trial cost/abuse | Do not add “free SMS” copy before the offer exists |

Establish a baseline before declaring a winner. Record experiment dates, traffic sources, device mix, account counts, activation, and spend. If traffic is low, use five to eight moderated signup observations to locate major comprehension or form failures before splitting traffic across many variants. That participant range is a pragmatic planning recommendation, not a statistical claim. Never advertise a forecasted conversion uplift as an achieved result.

## Business inputs still needed

Pricing owner should resolve totals versus unit rates, taxes, minimum top-up, credit validity, sender-ID charges, and whether opening an account is free. Product owner should confirm real portal features, signup fields, approval requirements, documentation, and free-testing availability. Commercial owner should supply attributable customers, acquisition sources, monthly signup/activation counts, and support capacity. These inputs affect final claims and growth experiments; they do not prevent improving the current site's clarity and usability now.

## Sources

1. Notify.lk. [Packages & Pricing](https://www.notify.lk/pricing/). Page states last updated 1 January 2024; accessed 9 September 2026. Price and condition snapshot only.
2. Text.lk. [Pricing](https://text.lk/pricing/). Undated live page; accessed 9 September 2026.
3. Text.lk. [Documentation and FAQs](https://text.lk/docs/). Undated live page; accessed 9 September 2026. Demo and sender-ID conditions.
4. Ideamart. [Developer documentation overview](https://docs.ideamart.io/). Undated live page; accessed 9 September 2026. Provisioning stages and API scope.
5. SMSGo.lk. [Pricing](https://smsgo.lk/pricing). Undated live page; accessed 9 September 2026. Provider's own rates and offer conditions.
6. Notify.lk. [Homepage](https://www.notify.lk/). Undated live page; accessed 9 September 2026. Positioning and proof presentation, not verified performance evidence.
7. Sam Dutton, Google web.dev. [Sign-up form best practices](https://web.dev/articles/sign-up-form-best-practices?hl=en). Last updated 9 December 2020; accessed 9 September 2026. Durable form-design guidance; not a sector-specific uplift study.
8. Google Analytics. [Recommended events reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#sign_up). Accessed 9 September 2026.
9. Google Analytics Help. [Set up cross-domain measurement](https://support.google.com/analytics/answer/10071811?hl=en). Accessed 9 September 2026.
