# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose
SMS Buddy is a Sri Lankan business SMS gateway. The owner's explicit conversion goal is a visitor clicking Get Started and successfully opening a new account. The owner delegated strategy, visual direction, implementation, and specialist work.

## Users
Working assumption from incumbent copy: Sri Lankan small businesses sending promotions and updates are the homepage's primary audience; agencies managing brands and developers integrating OTP/transactional messages are secondary. Audience priority remains unconfirmed.

## Capabilities and Constraints
Incumbent repository describes branded sender IDs, shared credits across brands, bulk messaging, API integration, delivery reporting and assisted setup. The owner confirmed on 10 November 2026 that purchased credits do not expire (this replaces the earlier three-month validity). These are existing product claims, not independently verified backend behavior. Avoid absolute delivery promises, unlimited features, guaranteed onboarding times, or fabricated endpoints.
The live portal root is a login page; its signup link is https://portal.smsbuddy.lk/register. Registration collects business and contact details, followed by email verification. The portal implementation is outside this repository.
The owner set a new tariff on 9 November 2026 (SMS Buddy Pricing.xlsx): pay as you go (SMPAYG) LKR 0.58 per SMS, and packages SB1X 1,000/LKR 560 (0.56), SB5X 5,000/2,700 (0.54), SB10X 10,000/5,200 (0.52), SB30X 30,000/15,000 (0.50), SB50X 50,000/24,000 (0.48), SB75X 75,000/35,250 (0.47), SB100X 100,000/45,000 (0.45). This supersedes the 7 October 2026 range (0.60 → 0.46) and the SB150X ladder. `smsPackages` and `transactionalPricing` in `src/lib/constants.ts` are the source of truth; the spreadsheet's cost and margin columns are internal and must never be published. Nanobotz clients paying more than LKR 50,000 a month can use a post-paid pay-as-you-go account with no top-ups at a special rate set from their monthly SMS usage (`nanobotzClientBilling`). The owner confirmed on 10 November 2026 that all published SMS Buddy rates and package prices include tax. On 10 November 2026 the owner also restricted pay as you go (SMPAYG, LKR 0.58) to customers who buy other Nanobotz services: it must not appear anywhere on the website, in ads or in llms.txt, and the public entry point is the SB1X package (1,000 SMS for LKR 560). The Nanobotz-client billing arrangement is handled through Nanobotz directly and is also not advertised on the site. The owner confirmed on 10 November 2026 that every new account can already send 10 free SMS as a trial before buying. Sender-name charges and promotional pricing remain unconfirmed.

The owner delegated public crawler policy on 7 October 2026. Search and user-requested AI retrieval are allowed. Google-Extended is allowed to support covered Gemini grounding and also permits its covered training use. Dedicated GPTBot and ClaudeBot training remain disallowed. Origin policy changes require deployment and final CDN-served verification; synthetic user-agent responses do not prove genuine crawler access.

## Evidence on Hand
src/lib/constants.ts and incumbent page copy. Public portal signup inspected read-only. No substantiation for testimonials, customer counts, delivery percentages, or revenue results. Existing public logo/mascot/video files are deleted in the user's working tree and must not be restored without instruction.

## Brand Commitments
Preserve SMS Buddy name. Owner explicitly permits a full redesign and original assets.

## Product Principles
Make the next step clear. Demonstrate with explicitly labelled examples. Disclose relevant setup and credit conditions. Measure account completion separately from signup clicks. Keep performance and accessible mobile interaction central.
