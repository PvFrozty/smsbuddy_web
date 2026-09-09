# Conversion measurement integration

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
