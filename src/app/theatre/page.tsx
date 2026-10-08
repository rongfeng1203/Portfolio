import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import TheatreShowcase from "@/components/TheatreShowcase";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function TheatrePage() {
  const section = getPortfolioSection("theatre")!;
  return <PortfolioSectionPage section={section} feature={<TheatreShowcase photos={section.mediaItems ?? []} />} />;
}
