import { notFound } from "next/navigation";
import MakingPageContent from "@/components/MakingPageContent";
import { makingCategories, type MakingCategory } from "@/lib/makingProjects";
export function generateStaticParams() { return Object.keys(makingCategories).map(category => ({ category })); }
export default async function MakingCollection({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!Object.hasOwn(makingCategories, category)) notFound();
  return <MakingPageContent category={category as MakingCategory} />;
}
