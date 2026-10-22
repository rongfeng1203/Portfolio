import { notFound } from "next/navigation";
import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import GamesShowcase from "@/components/GamesShowcase";
import { getPortfolioSection } from "@/lib/portfolioSections";
const categories = ["play", "releases", "demos"] as const;
export function generateStaticParams() { return categories.map(category => ({ category })); }
export default async function GameCollection({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as typeof categories[number])) notFound();
  const section = getPortfolioSection("games")!;
  const bucket = section.buckets[categories.indexOf(category as typeof categories[number])];
  return <PortfolioSectionPage section={{ ...section, title: bucket.title, intro: bucket.copy }} feature={<GamesShowcase category={category as typeof categories[number]} />} />;
}
