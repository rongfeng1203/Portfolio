import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WritingReader from "@/components/WritingReader";
import { getWritingDocument, writingDocuments } from "@/lib/writingDocuments";
import { getWritingTranslation } from "@/lib/writingTranslations";

type WritingDocumentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writingDocuments
    .filter((document) => document.slug !== "mad-scientist-first-emotional-ai")
    .map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: WritingDocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getWritingDocument(slug);

  if (!document) return {};

  return {
    title: `${document.title} — Rong Feng`,
    description: document.excerpt,
  };
}

export default async function WritingDocumentPage({ params }: WritingDocumentPageProps) {
  const { slug } = await params;
  const document = getWritingDocument(slug);

  if (!document) notFound();

  const index = writingDocuments.findIndex((item) => item.slug === slug);

  return (
    <WritingReader
      document={document}
      translation={getWritingTranslation(document.slug)}
      index={index}
      total={writingDocuments.length}
      previous={writingDocuments[index - 1]}
      next={writingDocuments[index + 1]}
    />
  );
}
