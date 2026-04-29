import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Language } from "@/data/wedding";
import {
  LANGUAGE_STORAGE_KEY,
  LanguageContext,
  getInitialLanguage,
  getWeddingContent,
  type LanguageContextValue,
} from "@/context/language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "my" ? "my" : "en";
    document.documentElement.dataset.language = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "en" ? "my" : "en")),
      content: getWeddingContent(language),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
