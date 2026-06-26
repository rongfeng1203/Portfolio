import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function TheatrePage() {
  return <PortfolioSectionPage section={getPortfolioSection("theatre")!} />;
}
