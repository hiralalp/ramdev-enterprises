import { PageIntro, RFQBanner } from "@/components/ui/Primitives";
import { IndustriesSection } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Industries & Applications",
  "Explore material enquiry considerations for engineering, construction, process applications and industrial maintenance.",
  "/industries",
);
export default function IndustriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="APPLICATION-LED THINKING"
        title="The application comes first."
        description="Every operating environment brings different material considerations. These application areas are a guide for discussion, not a claim of completed projects or existing customers."
      />
      <IndustriesSection />
      <RFQBanner />
    </>
  );
}
