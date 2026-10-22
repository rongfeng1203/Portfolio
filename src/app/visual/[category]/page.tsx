import { notFound } from "next/navigation";
import VisualSketchbookPage from "@/components/VisualSketchbookPage";
const categories = ["charcoal", "colors", "ideation"] as const;
export function generateStaticParams() { return categories.map((category) => ({ category })); }
export default async function VisualCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as typeof categories[number])) notFound();
  return <VisualSketchbookPage category={category as typeof categories[number]} />;
}
