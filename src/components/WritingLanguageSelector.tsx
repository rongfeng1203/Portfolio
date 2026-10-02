"use client";

import { Languages } from "lucide-react";
import type { WritingLanguage } from "@/hooks/useWritingLanguage";

export default function WritingLanguageSelector({ language, onChange }: {
  language: WritingLanguage;
  onChange: (language: WritingLanguage) => void;
}) {
  return (
    <div className="writing-language-selector" role="group" aria-label="Story language">
      <Languages size={16} aria-hidden="true" />
      {([ ["en", "English"], ["zh-CN", "中文"] ] as const).map(([value, label]) => (
        <button key={value} type="button" lang={value}
          className="writing-translation-toggle" aria-pressed={language === value}
          onClick={() => onChange(value)}>{label}</button>
      ))}
    </div>
  );
}
