import { notFound } from "next/navigation";
import TheatreContactSheetPage from "@/components/TheatreContactSheetPage";

const categories = ["dirtywork", "paperwork", "photos"] as const;

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export default async function TheatreCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as typeof categories[number])) notFound();
  return <TheatreContactSheetPage category={category as typeof categories[number]} />;
}
