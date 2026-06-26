import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function MakingPage() {
  return <PortfolioSectionPage section={getPortfolioSection("making")!} />;
}
