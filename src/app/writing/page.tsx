import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function WritingPage() {
  return <PortfolioSectionPage section={getPortfolioSection("writing")!} />;
}
