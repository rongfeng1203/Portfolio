import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import TheatreShowcase from "@/components/TheatreShowcase";
import { getPhotographyCategoryMedia, getPortfolioSection, getTheatreCategoryMedia } from "@/lib/portfolioSections";

export default function TheatrePage() {
  const section = getPortfolioSection("theatre")!;
  const processItems = [...getTheatreCategoryMedia("dirtywork"), ...getTheatreCategoryMedia("paperwork")];
  return <PortfolioSectionPage section={section} feature={<TheatreShowcase photos={getPhotographyCategoryMedia("stage")} processItems={processItems} />} />;
}
