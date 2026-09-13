import { PageIntro, RFQBanner } from "@/components/ui/Primitives";
import { InsightsSection } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Insights & Material Notes",
  "Practical notes on material enquiries, specification clarity and project procurement planning from Ramdev Enterprises.",
  "/insights",
);
export default function InsightsPage() {
  return (
    <>
      <PageIntro
        eyebrow="INSIGHTS & MATERIAL NOTES"
        title="Clarity for the next decision."
        description="Practical reading for a better material enquiry. These general guides support a conversation and do not replace project-specific engineering advice."
      />
      <InsightsSection />
      <RFQBanner />
    </>
  );
}
