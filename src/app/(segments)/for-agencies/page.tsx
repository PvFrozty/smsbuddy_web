import { smsPackages, transactionalPricing } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { SegmentPage } from "@/components/segments/SegmentPage";

export const metadata = createMetadata("/for-agencies");

export default function ForAgenciesPage() {
  return (
    <SegmentPage
      page="agencies"
      headline="Every client’s message. Their own brand."
      introduction="Bring your clients’ SMS campaigns and customer updates into one place. Manage sender names and shared credits with SMS Buddy, with help getting each brand set up."
      preview={{ sender: "CLIENTBRAND", message: "A little something for our regulars: explore the new collection in store this weekend. Thank you for shopping with us.", context: "A campaign can feel like it came directly from your client—because their sender name is what customers see." }}
      useCaseHeading="Make SMS part of your client service."
      useCases={[
        { icon: "message", title: "Launch a campaign", description: "Build promotional messages around your client’s next collection, event, or seasonal offer, using their approved sender name." },
        { icon: "people", title: "Keep appointments visible", description: "Help service businesses remind customers about bookings and share changes before an appointment." },
        { icon: "box", title: "Keep customers updated", description: "Connect order confirmations and delivery updates to the client’s customer journey through an API integration." },
      ]}
      capabilityHeading="A clearer way to manage brand messaging."
      capabilities={[
        { icon: "message", title: "Sender names for each brand", description: "Keep messages recognizable with the right sender name for each client. Sender-name requests are subject to approval." },
        { icon: "box", title: "Credits across your brands", description: "Use a shared credit pool across sender names on your account. Credits don’t expire, so you can buy ahead of busy seasons." },
        { icon: "message", title: "Volume top-ups", description: `Buy packages from ${smsPackages[0].smsCount.toLocaleString("en-LK")} SMS, down to LKR ${transactionalPricing.volumeRate.toFixed(2)} per SMS with ${transactionalPricing.volumePackage.name}. One credit pool covers every client brand.` },
        { icon: "people", title: "Help with the setup", description: "Talk through your client brands, sending workflow, and integration needs with the team before launching." },
      ]}
      setupDescription="Opening an account is the first step. Plan sender-name approval and credit purchases before committing to a client’s launch date."
      steps={[
        { title: "Create your account", description: "Open the portal and set up the account you’ll use for your agency’s messaging." },
        { title: "Arrange your sender names", description: "Share the client brands you need to send for and confirm the documents and approvals required." },
        { title: "Prepare the first campaign", description: "Review the audience, message, and credit use. Complete a controlled send before expanding the campaign." },
      ]}
      finalHeading="Bring your next client campaign to SMS."
      finalDescription="Start with an account and a conversation about your brands."
    />
  );
}
