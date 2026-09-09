import type { Metadata } from "next";
import { SegmentPage } from "@/components/segments/SegmentPage";

export const metadata: Metadata = {
  title: "SMS for Small Businesses",
  description: "Send branded campaigns, appointment reminders, and customer updates with SMS Buddy’s web portal for Sri Lankan businesses.",
};

export default function ForSmesPage() {
  return (
    <SegmentPage
      page="businesses"
      headline="Keep your customers in the loop."
      introduction="A new offer. An appointment reminder. An order ready to collect. Send the message your customers need from your business name, using a web portal that doesn’t require code."
      preview={{ sender: "YOURSTORE", message: "Hi Nimal, your order is ready to collect. Visit us before 6 pm today. Thank you for choosing our store!", context: "A recognizable sender name helps a customer understand who their update is from." }}
      useCaseHeading="One useful message can make a difference."
      useCases={[
        { icon: "message", title: "Share your next offer", description: "Tell customers about a new arrival, a seasonal promotion, or an event. Send to people who have agreed to hear from your business." },
        { icon: "people", title: "Remind them what’s coming", description: "Keep bookings, class schedules, and payment due dates visible with a timely reminder." },
        { icon: "box", title: "Answer “is it ready?”", description: "Let customers know when an order is confirmed, ready for collection, or out for delivery." },
      ]}
      capabilityHeading="Your message, without a development project."
      capabilities={[
        { icon: "message", title: "Compose in the portal", description: "Write and review your campaign from the web portal. Choose the sender name that represents your business." },
        { icon: "people", title: "Bring your contacts", description: "Import your contact list from Excel or CSV and organize recipients for the message you’re sending." },
        { icon: "box", title: "Plan with credits", description: "Buy credits for your expected usage without a monthly subscription. Credits remain valid for 3 months from purchase." },
      ]}
      setupDescription="You can start with the portal and get help with the setup. Have your business details and a small, agreed test audience ready before your first campaign."
      steps={[
        { title: "Create your account", description: "Open the SMS Buddy portal and set up your business account." },
        { title: "Arrange your business sender name", description: "Confirm the required details and approval process so customers see your business name on messages." },
        { title: "Prepare and review your message", description: "Add your contacts, choose credits for your needs, and check the message and recipient list before sending." },
      ]}
      finalHeading="Your next customer update starts here."
      finalDescription="Create your account and get your business ready to send."
    />
  );
}
