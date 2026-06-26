import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function PhotographyPage() {
  return <PortfolioSectionPage section={getPortfolioSection("photography")!} />;
}
