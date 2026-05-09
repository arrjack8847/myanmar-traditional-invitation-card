import { createContext, useContext } from "react";
import {
  weddingContent,
  type Language,
  type WeddingContent,
} from "@/data/wedding";

export const LANGUAGE_STORAGE_KEY = "wedding-language";
export const DEFAULT_LANGUAGE: Language = "my";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  content: WeddingContent;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const isValidLanguage = (value: unknown): value is Language => {
  return value === "en" || value === "my";
};

export const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isValidLanguage(savedLanguage)) {
      return savedLanguage;
    }

    return DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

export const getWeddingContent = (language: Language): WeddingContent => {
  return weddingContent[language] ?? weddingContent[DEFAULT_LANGUAGE];
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};

export const useWeddingContent = () => useLanguage().content;