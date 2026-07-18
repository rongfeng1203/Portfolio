import type { Metadata } from "next";
import WritingReader from "@/components/WritingReader";
import { getWritingDocument, writingDocuments } from "@/lib/writingDocuments";

export const metadata: Metadata = {
  title: "瘋狂科学家 × 第一个拥有情感的AI — Rong Feng",
  description: "戏二 · 海岛对峙 / 第三幕 · 分割",
};

export default function WritingDocumentPage() {
  const document = getWritingDocument("mad-scientist-first-emotional-ai")!;
  const index = writingDocuments.findIndex((item) => item.slug === document.slug);

  return (
    <WritingReader
      document={document}
      index={index}
      total={writingDocuments.length}
      next={writingDocuments[index + 1]}
    />
  );
}
