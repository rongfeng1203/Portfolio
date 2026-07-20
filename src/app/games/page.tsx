import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import GamesShowcase from "@/components/GamesShowcase";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function GamesPage() {
  return <PortfolioSectionPage section={getPortfolioSection("games")!} feature={<GamesShowcase />} />;
}
