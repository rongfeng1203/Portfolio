import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function DigitalPage() {
  return <PortfolioSectionPage section={getPortfolioSection("digital")!} />;
}
