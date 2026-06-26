import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function GamesPage() {
  return <PortfolioSectionPage section={getPortfolioSection("games")!} />;
}
