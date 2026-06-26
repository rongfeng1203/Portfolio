import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function VisualPage() {
  return <PortfolioSectionPage section={getPortfolioSection("visual")!} />;
}
