import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import UnityWebGLEmbed from "@/components/UnityWebGLEmbed";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function GamesPage() {
  return <PortfolioSectionPage section={getPortfolioSection("games")!} feature={<UnityWebGLEmbed />} />;
}
