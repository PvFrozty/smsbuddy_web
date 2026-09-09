# SMS Buddy: next steps to grow signups

## Current deliverable
The marketing site now leads to the verified registration page, demonstrates useful SMS scenarios, explains onboarding, and presents owner-confirmed package prices and separate extra-SMS rates. Signup click hooks are installed. Actual account creation happens in the separate portal, so conversion lift has not yet been measured.

## Do these next, in order

| Priority | Decision / action | Done when |
|---|---|---|
| 1 | Confirm the commercial truth: pack quantities/totals, taxes, sender registration costs, expiry, current supported features | Marketing and portal show the same authoritative values |
| 2 | Connect analytics across marketing and portal | A test user can be followed from landing to successful verified account creation, without logging personal fields |
| 3 | Make registration easier based on actual field requirements | Nonessential fields move after account creation if operations permits; email verification and useful errors work |
| 4 | Collect actual proof | Permission-backed customer quotes or a reproducible product walkthrough replaces illustrative content where useful |
| 5 | Run one focused acquisition experiment | Traffic source, spend limit, completed accounts, first sends and paid activations are measured |

The initial audience hypothesis is Sri Lankan small businesses. Agencies and developers have dedicated routes. Validate the lead audience with existing paying-customer data before allocating a campaign budget.

## Copy-ready prompts

**Commercial verification — run after supplying the authoritative price list:**

> Reconcile SMS Buddy’s marketing prices with the current portal price list I supply. Use one typed source for package totals, credit quantities, taxes and validity. Add consistency checks. Remove indicative-price wording only where the supplied evidence supports a final price. Do not invent discounts or fees.

**Portal conversion — run in the portal repository:**

> Audit and improve /register for completed verified accounts. Read the marketing site's docs/conversion-measurement.md. Map required fields and operational dependencies, move nonessential details after account creation where permitted, preserve email verification, and implement accessible validation plus signup_started and signup_completed events. Emit completion only after backend-confirmed account creation. Test with authorized test accounts; do not create production accounts or send emails without the needed authorization.

**Measurement integration — supply your analytics provider/property:**

> Connect the existing get_started_click hook to my specified analytics property and implement matching portal signup_started and signup_completed events. Preserve appropriate consent behavior. Do not log names, phone numbers, email addresses, message contents, full URLs or OTPs. Verify event delivery, deduplication, same-browser attribution and the completed-account funnel. Clearly distinguish clicks from actual signups.

**Conversion experiment — once measurement works:**

> Use the observed SMS Buddy funnel data I provide to choose one experiment. State the audience, evidence, hypothesis, primary metric (completed accounts per eligible visitor), guardrails and stopping rule before changing code. Implement one variation without changing unrelated factors. Do not claim a winner until the observed result supports it.

## Available skill commands

Use the installed skill syntax rather than an assumed standalone slash command:

- `$impeccable critique` — review conversion clarity and hierarchy.
- `$impeccable audit` — accessibility, responsiveness and technical quality.
- `$impeccable onboard` — improve the portal’s signup and first-use flow.
- `$impeccable clarify` — improve confusing labels, guidance and errors.

Suggested prompt with the onboarding command:

> $impeccable onboard /register. Optimize for a completed, verified SMS Buddy account. Inspect the actual portal workflow before changing its required fields; preserve verified product and security requirements.

Standalone `/audit`, `/polish` and similar commands are not assumed to be installed. The skill invocation above is the known available entry point.

## Local commands

```sh
npm run dev
npm run lint
npm run build
```

The website uses Next.js static export, with output in `out/`. Development and build use webpack after a Turbopack module-resolution failure in this environment. Fonts are bundled locally. Deployment has not been performed in this task.

## References

- [Research and source comparisons](conversion-research.md)
- [Funnel findings](funnel-audit.md)
- [Measurement contract](conversion-measurement.md)
- [Motion Sites adaptation](motion-sites-reference.md)

No revenue, conversion-lift, delivery-rate or customer-proof claims have been established by this redesign alone.
