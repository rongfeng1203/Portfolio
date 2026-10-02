"use client";

import { useSyncExternalStore } from "react";

export type WritingLanguage = "en" | "zh-CN";
const storageKey = "writing-language";
let currentLanguage: WritingLanguage = "zh-CN";

function getSnapshot(): WritingLanguage {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "zh-CN") currentLanguage = saved;
  } catch {
    // The selector still works when browser storage is unavailable.
  }
  return currentLanguage;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("writing-language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("writing-language-change", callback);
  };
}

export function useWritingLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, () => "zh-CN" as const);
  const setLanguage = (value: WritingLanguage) => {
    currentLanguage = value;
    try { window.localStorage.setItem(storageKey, value); } catch { /* Use in-memory preference. */ }
    window.dispatchEvent(new Event("writing-language-change"));
  };
  return [language, setLanguage] as const;
}
