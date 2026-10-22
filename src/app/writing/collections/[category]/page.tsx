import { notFound } from "next/navigation";
import WritingLibrary from "@/components/WritingLibrary";
const categories = ["chinese", "english", "drafts"] as const;
export function generateStaticParams() { return categories.map(category => ({ category })); }
export default async function WritingCollection({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as typeof categories[number])) notFound();
  return <WritingLibrary category={category as typeof categories[number]} />;
}
