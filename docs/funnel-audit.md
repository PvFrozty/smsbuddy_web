# SMS Buddy conversion funnel audit

Audit date: 9 September 2026. This records the initial site before the conversion redesign; findings may be resolved by subsequent changes in this work session.

## Critical conversion fix: go directly to registration

Live, read-only browser verification confirmed:

- `https://portal.smsbuddy.lk/` is **Sign in**, titled “SMS Buddy - Login”.
- Its “Register here” link goes to **`https://portal.smsbuddy.lk/register`**, titled “SMS Buddy - Customer Registration”.
- Registration requires contact person, business name, email, mobile number, address line 1 and city. Address line 2 is optional.
- “Verify Email & Register” initiates the next step. The page describes a six-digit email OTP followed by automatically generated credentials emailed to the customer.
- No information was entered, no form was submitted, and no account was created. Account completion and actual email delivery were not tested.

Initial `src/lib/constants.ts:73` sends every Get Started/Create Account CTA to the **login** page. Update the shared `registerUrl` to the verified `/register` route. Keep a distinct Sign in link to the root portal. Make account creation the consistent primary action. Describe the next step accurately: “Create your business account. Verify your email.” Do not promise immediate sending, no verification, or a two-field signup.

The shared Button initially opens external destinations in a new tab (`src/components/ui/Button.tsx`). Prefer same-tab navigation for signup so the next step is continuous; retain normal link semantics and optional modified-click behavior. A CTA click is an intent signal, not a newly created account.

## Other initial findings

| Severity | Evidence | Issue | Implementation recommendation |
|---|---|---|---|
| High | `src/lib/constants.ts:44–51`; `src/app/pricing/page.tsx`; `src/components/pricing/PricingCalculator.tsx` | Package totals are LKR 0.58 × quantity, while stated unit rates fall to 0.45. Example: SB100X advertises 0.48/SMS and 58,000 total; calculator produces 48,000 for 100,000 SMS. | Do not silently invent a commercial price. Use package totals as existing displayed figures and derive arithmetic unit costs consistently, or suppress disputed rates/discount claims until the owner confirms them. All UI must consume one data source. |
| High | `src/components/testimonials/TestimonialCarousel.tsx` | Three named customers and performance quotes have no evidence in the repo. | Remove from production unless approved source evidence exists. Replace with clearly labeled product examples or actual product demonstrations. |
| High | `src/components/contact/ContactForm.tsx:80–98` | Opens a WhatsApp draft, then claims “We Got Your Message!” and response within hours without observing a sent message. | State “Continue in WhatsApp” and “Send the prepared message in WhatsApp.” Provide a link fallback. Do not claim receipt or a response-time SLA. |
| Medium | `src/app/page.tsx` | “Never lose a message” and onboarding “in minutes” are unsupported guarantees. | Explain retries and delivery-status visibility without absolute or timed claims. |
| Medium | `src/app/pricing/page.tsx` | “Most popular,” “best value,” no hidden fees, free setup, priority/dedicated support, unlimited sender masks are unverified commercial commitments. | Confirm against actual policy before retaining. Distinguish supported product capabilities from commercial promises. |
| Medium | `src/app/pricing/page.tsx`; calculator | Tier display rounds unlike rates into single labels; recommended-pack savings use a different cost basis from estimated totals. | Show actual cost of the selected pack, quantity supplied and effective unit cost. Avoid presenting a fractional-pack estimate as checkout cost. |
| Medium | `src/components/layout/MobileMenu.tsx` | Drawer lacks dialog semantics, focus containment, Escape handling, focus restoration and scroll locking. | Implement these or replace with a simpler accessible disclosure navigation. |
| Medium | Pricing FAQ, calculator, ContactForm | FAQ lacks expanded/control semantics, slider lacks accessible name, contact labels lack linked IDs, selected option buttons lack exposed selection state. | Add `aria-expanded`/`aria-controls`, slider label, input IDs + `htmlFor`, and radio/checkbox semantics or `aria-pressed` as appropriate. |
| Medium | `src/app/layout.tsx`, individual pages | Root layout main wraps pages that render another main. | Keep one main landmark and a skip link. |
| Medium | `src/components/ui/AnimatedEntry.tsx`, global floating styles | Entry content begins hidden and some ambient animation ignores reduced motion. | Keep primary copy/CTA visible on initial render, honor reduced motion and avoid animation dependency for navigation. |
| Medium | Button primary color | White text on initial coral #FF6B54 needs contrast validation and is a poor normal-text pairing. | Use a darker CTA fill or dark text and verify computed contrast. |

## Measurement boundary

The marketing repo initially contains no analytics collector, provider configuration or confirmed signup event. It is a static Next.js export. Adding a browser event or `dataLayer.push` without a configured collector only supplies an integration hook; it does **not** produce a live analytics dashboard.

### Events and truthful meanings

| Event | Fired from | Trigger | Measures |
|---|---|---|---|
| `get_started_click` | Marketing site | Activation of a signup CTA | Intent to open registration. Include placement and source page, never account completion. |
| `registration_view` | Portal | Registration form actually loads | Reached registration; distinguishes click from successful destination load. |
| `registration_started` | Portal | First meaningful form interaction | Form engagement. Do not include entered values. |
| `registration_otp_sent` | Portal | Server confirms email OTP issuance | Reached verification. Distinct from account creation. |
| `sign_up` | Portal/backend | Server has successfully created the verified account | The user’s stated conversion. Dedupe by a non-sensitive event ID. |
| `first_credit_purchase` / `first_sms_sent` | Portal/backend | Confirmed purchase / first accepted send | Downstream quality and revenue indicators. |

Marketing-site JavaScript cannot read the different-origin portal DOM or reliably observe account creation. A tab opening, return visit, query-string flag, or Get Started click must never be counted as verified signup. Completed-signup measurement requires portal/backend instrumentation or a trusted callback from that system.

### Recommended setup

1. Implement a provider-neutral CTA hook and stable placement labels now. Do not attach names, addresses, email, phone, message bodies, passwords, OTPs or API keys to events.
2. Choose/configure the actual analytics destination and consent behavior appropriate to the deployed site. A dormant hook should be documented as dormant.
3. Instrument both marketing and portal with a consistent measurement setup. Preserve original acquisition attribution across the handoff; do not overwrite acquisition UTMs with internal CTA labels. Use a separate placement parameter only if the portal supports it.
4. If using GA4, use the same tag ID/web stream and verify cookie-domain and cross-domain configuration across marketing and portal. Google specifically notes subdomain self-referral risk when cookie domains differ. Linker parameters must survive redirects. See [Google Analytics cross-domain setup](https://support.google.com/analytics/answer/10071811?hl=en).
5. Record verified account creation from the portal’s successful server response or backend, with retry-safe deduplication. Record verification failures as coarse categories without personal data.
6. Compare `verified new accounts / eligible marketing visitors` as the primary conversion rate, and separately inspect click-through and portal completion rates. Record the baseline before experiments; report uplift only with actual observations and adequate sample size.

## Proposed next portal experiment

The current registration asks for full business/address details before email verification. Consider an experiment with the portal owner: contact name + business email first, then business/address details at the point they are actually required for activation or compliance. This is a hypothesis, not permission to remove required operational checks, and this marketing repo cannot implement it.

Success criteria for this website change: clear audience/use case, one direct verified signup destination, truthful proof and price presentation, fast readable mobile layout, accessible interaction, and measurable signup intent. Proving revenue lift still requires production traffic and trusted portal completion data.
