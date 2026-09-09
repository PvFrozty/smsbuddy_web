import { createMetadata } from "@/lib/metadata";
import { SegmentPage } from "@/components/segments/SegmentPage";

export const metadata = createMetadata("/for-developers");

export default function ForDevelopersPage() {
  return (
    <SegmentPage
      page="developers"
      headline="An SMS API for your Sri Lankan application."
      introduction="Add SMS to the moments that matter in your application: a verification code, an order update, or an account alert. SMS Buddy combines API access with help planning your integration."
      preview={{ sender: "YOURAPP", message: "Your verification code is 482916. If you didn’t request this code, ignore this message. Never share your code with anyone.", context: "An example of a transactional message triggered by an action in your application." }}
      useCaseHeading="Build messaging into the right moments."
      useCases={[
        { icon: "lock", title: "Verification messages", description: "Send a code as part of your application’s verification flow. Your application remains responsible for code validation, expiry, and access controls." },
        { icon: "box", title: "Order and delivery updates", description: "Use application events to trigger confirmations and status messages that keep customers informed." },
        { icon: "message", title: "Account notifications", description: "Bring important account activity, reminders, and service updates into your existing product workflow." },
      ]}
      capabilityHeading="Work through the integration with a team."
      capabilities={[
        { icon: "code", title: "API access", description: "Connect your backend to SMS Buddy. Confirm the current authentication, request format, and supported operations with the team before integrating." },
        { icon: "message", title: "Delivery visibility", description: "Use delivery information to understand message outcomes. Review available statuses and how to handle unsuccessful messages in your application." },
        { icon: "box", title: "Queue management", description: "Plan how queued messages and retries fit your workflow. Confirm sending limits and retry behavior for your use case before going live." },
      ]}
      setupDescription="Create your account, confirm the integration details, and plan a controlled test. Live branded messaging may depend on sender-name approval."
      steps={[
        { title: "Create your account", description: "Open the portal and arrange API access for the application you’re building." },
        { title: "Confirm the sending requirements", description: "Review sender-name approval, credentials, message formats, and current pricing with the team." },
        { title: "Test before going live", description: "Validate a controlled send, error handling, and delivery status behavior before enabling customer-facing traffic." },
      ]}
      finalHeading="Give your next product update a direct line."
      finalDescription="Create your account and start planning your SMS integration."
    />
  );
}
