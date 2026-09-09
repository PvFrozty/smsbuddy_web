# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose
SMS Buddy is a Sri Lankan business SMS gateway. The owner's explicit conversion goal is a visitor clicking Get Started and successfully opening a new account. The owner delegated strategy, visual direction, implementation, and specialist work.

## Users
Working assumption from incumbent copy: Sri Lankan small businesses sending promotions and updates are the homepage's primary audience; agencies managing brands and developers integrating OTP/transactional messages are secondary. Audience priority remains unconfirmed.

## Capabilities and Constraints
Incumbent repository describes branded sender IDs, shared credits across brands, bulk messaging, API integration, delivery reporting, assisted setup, and three-month credit validity. These are existing product claims, not independently verified backend behavior. Avoid absolute delivery promises, unlimited features, guaranteed onboarding times, or fabricated endpoints.
The live portal root is a login page; its signup link is https://portal.smsbuddy.lk/register. Registration collects business and contact details, followed by email verification. The portal implementation is outside this repository.
The owner confirmed package pricing on 9 September 2026 using a supplied price sheet. Package prices and SMS counts are authoritative; the descending rates apply to extra SMS, not included SMS. `src/lib/constants.ts` stores these as `price`, `smsCount` and `extraSmsCost`. The prior apparent pricing contradiction is resolved. The supplied sheet does not specify tax treatment or sender-name setup fees; do not invent either.

## Evidence on Hand
src/lib/constants.ts and incumbent page copy. Public portal signup inspected read-only. No substantiation for testimonials, customer counts, delivery percentages, or revenue results. Existing public logo/mascot/video files are deleted in the user's working tree and must not be restored without instruction.

## Brand Commitments
Preserve SMS Buddy name. Owner explicitly permits a full redesign and original assets.

## Product Principles
Make the next step clear. Demonstrate with explicitly labelled examples. Disclose relevant setup and credit conditions. Measure account completion separately from signup clicks. Keep performance and accessible mobile interaction central.
