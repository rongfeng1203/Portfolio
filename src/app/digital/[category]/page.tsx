import { notFound } from "next/navigation";
import DigitalContactSheetPage from "@/components/DigitalContactSheetPage";
const categories = ["videos", "graphics", "concept"] as const;
export function generateStaticParams() { return categories.map(category => ({ category })); }
export default async function DigitalCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as typeof categories[number])) notFound();
  return <DigitalContactSheetPage category={category as typeof categories[number]} />;
}
