# Conversion measurement integration

## Installed collectors (10 November 2026)

`AnalyticsTags` (`src/components/analytics/AnalyticsTags.tsx`) is mounted in the root layout. The IDs are in `analyticsIds` in `src/lib/constants.ts`.

| Tool | ID | Where it lives | What it receives from the website |
|---|---|---|---|
| Google Analytics 4 | `G-F3RXZWWZQ0` | Property "SMS Buddy (smsbuddy.lk)", web stream "SMS Buddy website" (stream 16307839408), Analytics account PvFrozty. Sri Lanka time, LKR. | Page views and enhanced measurement (scrolls, outbound clicks and so on). `get_started_click` with `cta_location` and `cta_page`. The cross-domain linker covers `smsbuddy.lk` and `portal.smsbuddy.lk`. |
| Meta Pixel | `1654565889543577` | Dataset "SMS Buddy website" in the **Nanobotz It Solutions** business portfolio (connected to ad account Prahas Nanobotz, 513640306738372). Created 10 November 2026 for SMS Buddy only. | `PageView` (including client-side navigation) and the custom event `GetStartedClick` with `cta_location` and `cta_page` |

### Interaction events (added 10 November 2026)

Sent through `trackEvent` in `src/lib/analytics.ts`. Every event also carries `cta_page` (the known marketing route).

| GA4 event | Meta event | When | Parameters |
|---|---|---|---|
| `contact_click` | `Contact` (standard) | A WhatsApp, email or phone link is clicked | `method` (whatsapp, email, phone), `cta_location` |
| `contact_form_submit` | `Contact` (standard) | The contact form prepares a WhatsApp message | `method` |
| `login_click` | `LoginClick` (custom) | A portal link that is not the signup page (Sign in) | `cta_location` |
| `faq_open` | none | An FAQ question is opened | `faq_question` (our own question text) |
| `pricing_estimate` | `PricingEstimate` (custom) | 1.5 s after a visitor changes the pricing calculator (not the default value) | `sms_requested`, `package_mix` (e.g. `1xSB30X+1xSB10X`), `estimate_value`, `currency` |

Verified with the dev server on 10 November: all five reach `gtag`/`fbq`, and `PricingEstimate` and `Contact` reach `facebook.com/tr`.

**GA4 to do once data arrives (up to 24 h after deploy):** Admin > Data display > Events > Recent events, star `get_started_click` and `contact_click` as key events. Register `cta_location`, `cta_page`, `method`, `faq_question` and `package_mix` as event-scoped custom dimensions to see them in reports.

**Microsoft Clarity** (heatmaps, session recordings): set `analyticsIds.clarity` to the project ID from clarity.microsoft.com (Settings > Setup). While it is empty, Clarity is not loaded.

**Verified locally** on 10 November with the dev server:
- GA4 `page_view` and `get_started_click` (`cta_location=pricing-hero`, `cta_page=/pricing`) reach `google-analytics.com/g/collect`.
- The Meta Pixel results are below.

An earlier attempt used "Prahas Vichakshana's Pixel" (551974532345787). Its allow list holds only lada.lk, iptad.lk and sentrylabs.lk, so Meta refused smsbuddy.lk events; it is shared with other clients and was left unchanged.

**The campaign's ad account (460577024500891) is not in the Nanobotz portfolio**, so it cannot select this Pixel for ad-level conversion tracking. The Pixel still collects site data and audiences in the Nanobotz portfolio. To optimise SMS Buddy ads on Pixel events, run them from an ad account in that portfolio, or share the dataset with the ad account.

**Not yet measured (needs the live portal code):**
- Meta `CompleteRegistration` and GA4 `sign_up`, fired once only after the backend confirms a verified account.
- Conversions API from the backend.
- Saving `utm_*` on the new account.

The portal must load the same two IDs and keep the GA4 linker domains.

## What is implemented

`ConversionTracking` observes signup links through one delegated document listener, including links rendered after client navigation. It recognizes only the verified `https://portal.smsbuddy.lk/register` origin/path (including an optional trailing slash); login and other external links are excluded. Normal clicks, keyboard activation and middle-click are supported without preventing navigation.

Mount the component once inside the root layout body:

```tsx
import { ConversionTracking } from "@/components/analytics/ConversionTracking";

// Inside <body>:
<ConversionTracking />
```

Use stable developer-authored placement labels on `Button` or an anchor:

```tsx
<Button href={registerUrl} data-cta-location="hero">Get started</Button>
```

Valid labels use lowercase letters, digits, underscores and hyphens, starting with a letter, up to 48 characters. Without one, placement is inferred as header, footer, navigation, section or page. Do not put customer identifiers or other personal information in placement labels.

Every activation publishes this payload to `window.dataLayer` and dispatches a `smsbuddy:conversion` CustomEvent on `window`:

```json
{
  "event": "get_started_click",
  "page_path": "/",
  "cta_location": "hero"
}
```

Only known marketing pathnames are emitted; unknown routes become `other`. Query strings, fragments, destination URLs, link text, form input, contact details, IDs and referrer are not included. The implementation makes no network requests and creates no storage/cookies. An existing third-party dataLayer consumer may act on queued events according to its own configuration.

## Still required for real reporting

**There is no analytics collector configured by this change.** These are local integration hooks, not proof that a dashboard is receiving events. Without an actual collector, the in-memory queue is lost on page navigation.

1. Configure the chosen analytics provider and applicable consent handling. Use either a dataLayer trigger for `get_started_click` or a listener for `smsbuddy:conversion`; do not collect both or clicks will be duplicated.
2. Ensure the collector handles outbound navigation delivery reliably without holding up signup. Verify real delivery in its debug/stream tooling. Do not equate a local event with confirmed delivery.
3. Add portal events separately: `registration_view`, `registration_started`, optional OTP progress, and **`signup_completed` only after the backend confirms a verified account was created**. If a provider uses `sign_up` as its standard event, map `signup_completed` to that provider name once.
4. Deduplicate completion on the portal/backend using a non-sensitive event identifier, including refresh/retry cases. Never count Get Started, a popup opening, or an OTP request as completed signup.
5. Preserve original acquisition attribution across the handoff. The marketing hook intentionally does not rewrite UTMs or append tracking parameters to signup URLs. Share a consistent provider setup across the website and portal and verify session linkage. For GA4, see [Google's cross-domain and subdomain guidance](https://support.google.com/analytics/answer/10071811?hl=en).

The different-origin portal cannot be inspected from marketing-page JavaScript. Verified signup reporting needs portal/backend cooperation; this repository alone cannot truthfully measure account creation.

## QA checks

- Click hero, navigation, final and pricing signup links: exactly one correctly labeled event per activation; direct destination is `/register`.
- Activate links with the keyboard and middle-click; ensure normal browser navigation remains available.
- Click Sign in or WhatsApp: no `get_started_click` event.
- Include a query/fragment in the marketing URL and the signup link: neither appears in the event payload.
- Remount the component or navigate between client routes: no duplicate listeners.
- Configure the collector, then confirm actual outbound event receipt and independently confirm portal completion receipt using a user-authorized test account workflow.
- Monitor `verified new accounts / marketing visitors`; show CTA click-through and registration completion separately so improvements can be attributed to the correct stage.

## Activation contract — phase 1, 7 October 2026

The marketing hook above is implemented. The portal/backend stages below are an integration specification, **not installed event collection**. At the time this contract was drafted, portal source and its analytics property were unavailable. The subsequent source review below updates the repository evidence; portal instrumentation and a receiving collector are still not installed. Keep each stage distinct in reporting:

| Stage / suggested event | Authoritative trigger | Do not count |
| --- | --- | --- |
| `get_started_click` | The existing marketing link activation | Registration or account creation |
| `registration_started` | First meaningful interaction in a valid registration flow | A page view alone |
| `account_created` | A backend-confirmed new account record, once | Form submit attempts, failed requests or existing accounts |
| `email_verified` | Backend-confirmed email verification, once | A verification email being requested or sent |
| `signup_completed` | The account meets the product's documented signup completion state; if verified email is mandatory, wait for both account creation and verification | A link click or client-only success screen |
| `setup_completed` | The backend confirms the requirements for this account's sending mode, including an approved sender where required | An onboarding screen opening |
| `first_message_request_recorded` | The first eligible request is committed in a requested/pending state | Provider acceptance or delivery |
| `first_message_accepted` | The provider accepts the first eligible message for processing | Delivery to a handset |
| `first_message_delivered` | A validated delivery receipt confirms the first delivered message | An accepted, queued or pending message; if receipt support is absent, report delivery as unknown |
| `first_paid_credit_purchase` | A settled payment is allocated to the account's purchased credits | A checkout view, pending payment, trial/free credits or a cancelled/refunded payment |

Define “eligible message” consistently: exclude internal/demo accounts and staff test traffic from customer activation metrics. Record acceptance and delivery separately. A manually confirmed first send may be useful operational evidence, but it is not automated delivery reporting. Do not send any test message or create a production account merely to populate analytics.

### Implementation acceptance for the portal team

1. Identify the actual registration, verification, sender-approval, send-status and payment code paths before adding hooks. Check the backend's completion states and the actual provider status vocabulary; the names above are proposed reporting names, not an assumed SMS API contract.
2. Emit irreversible milestones after the successful committed state transition. Give each event an opaque deduplication key derived from an internal event record. Do not put contact details, OTPs, sender lists, message text, credentials, full URLs or payment details in analytics. The internal event store and analytics transport need their normal access controls and retention rules.
3. Verify refresh, retry, duplicate callbacks and webhook redelivery produce one milestone per account. Keep intermediate attempt/error events separate from conversions. Handle refunds or reversed payments in financial reporting rather than pretending the original transaction never happened.
4. Choose the analytics property and applicable consent behavior before attaching a network collector. Use one mapping for the existing local marketing hook; do not collect both its dataLayer entry and CustomEvent. Confirm actual receipt after outbound navigation and the website-to-portal session link in provider diagnostics.
5. Run the complete workflow with an authorized test account and agreed recipients. Confirm the account, verified email, setup, acceptance, delivery and settled payment against their authoritative records. Never infer a milestone from a dashboard counter alone. Exclude these test records from customer KPI reporting.

**Readiness gate:** account signup and activation reporting remain unverified until portal code is integrated, the collector is selected and an authorized end-to-end test passes. Existing marketing clicks must not be presented as completed accounts or revenue.

## Subsequent backend source review — 7 October 2026

The user supplied `NanobotzAdmin/SMS_BUDDY` and selected the latest revision. Authenticated GitHub inspection read default-branch `main` at `091a32fd10e1ac35c2eb17a0699ae12ba4cf3ae2` (27 February 2025); runtime equality with the portal was not independently verified. The archive download was blocked, so no complete checkout, backend edits or backend tests were performed.

In the inspected `ApiV1Controller::saveSms`, a `PmSmsRequest` is committed with `SMS_REQUESTED` and `SMS_QUEUED_PENDING`, then the response labels it SENT. This supports only a committed-request milestone. The inspected `SMSRequestController::sendSms` checks for a `sentStatus` key before marking SMS_SENT; its value and provider contract must be validated before counting acceptance. A delivery-report request flag does not confirm receipt processing or delivery. No registration, verification, payment or delivery-receipt route was found in the inspected `routes/web.php`; other files and branches were not exhaustively inspected. Locate the actual handlers before adding those milestones.

Reuse committed state or the existing event mechanism, deduplicate milestones, exclude internal/test accounts and keep third-party collection off until a destination and applicable consent are configured. Tests must use fake SMS/mail/payment adapters. Do not send a real SMS merely to populate a metric. Source: [pinned repository](https://github.com/NanobotzAdmin/SMS_BUDDY/tree/091a32fd10e1ac35c2eb17a0699ae12ba4cf3ae2).
