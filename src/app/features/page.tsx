import type { Metadata } from "next";
import { SegmentPage } from "@/components/segments/SegmentPage";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore SMS Buddy’s web portal, API access, sender names, shared credits, and delivery tools for business SMS in Sri Lanka.",
};

export default function FeaturesPage() {
  return (
    <SegmentPage
      page="features"
      headline="From your business to their inbox."
      introduction="Bring campaigns and application messages into one SMS workflow. Use the web portal, connect your software through the API, and keep your business name on the messages you send."
      preview={{ sender: "YOURBRAND", message: "Your appointment is confirmed for Thursday at 10:30 am. Please contact our team if you need to make a change. See you soon!", context: "A simple reminder is one way to put branded SMS to work for your business." }}
      useCaseHeading="Choose how you want to send."
      useCases={[
        { icon: "message", title: "Run a campaign", description: "Compose a message in the web portal, import contacts from Excel or CSV, and choose the audience for your update." },
        { icon: "code", title: "Connect your application", description: "Use API access for order updates, reminders, and verification messages triggered by your software." },
        { icon: "people", title: "Manage several brands", description: "Keep different sender names on your account and use a shared credit pool across the brands you manage." },
      ]}
      capabilityHeading="The tools behind the message."
      capabilities={[
        { icon: "message", title: "Recognizable sender names", description: "Send using your approved business or client sender name. The team can help you understand the request and approval process." },
        { icon: "box", title: "Credits and queue management", description: "Plan your sending around a shared credit balance and managed message queues. Confirm limits and retry behavior for your workflow with the team." },
        { icon: "check", title: "Delivery information", description: "Review message outcomes and use the available delivery information to follow up on your sending. Delivery depends on the network and recipient conditions." },
      ]}
      setupDescription="Pick the workflow that fits your business. The team can help you work through the portal, sender-name setup, and API integration requirements."
      steps={[
        { title: "Open your account", description: "Start in the SMS Buddy account portal and choose whether you’ll send through the portal, your software, or both." },
        { title: "Confirm your sender and credits", description: "Arrange any sender-name approvals and review the current credit options before making a purchase." },
        { title: "Review, test, and send", description: "Check your message, intended recipients, and credit count. Complete a controlled test before wider sending." },
      ]}
      finalHeading="Make SMS part of your customer experience."
      finalDescription="Create your account and choose the workflow that fits."
    />
  );
}
