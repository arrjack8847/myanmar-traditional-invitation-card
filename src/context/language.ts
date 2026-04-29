import { createContext, useContext } from "react";
import {
  weddingContent,
  type Language,
  type WeddingContent,
} from "@/data/wedding";

export const LANGUAGE_STORAGE_KEY = "wedding-language";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  content: WeddingContent;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === "my" ? "my" : "en";
};

export const getWeddingContent = (language: Language) =>
  weddingContent[language];

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};

export const useWeddingContent = () => useLanguage().content;
