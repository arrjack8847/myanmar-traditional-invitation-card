import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language";
import { cn } from "@/lib/utils";
import type { Language } from "@/data/wedding";

const options: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "my", label: "မြန်မာ" },
];

const LanguageToggle = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const compact = isScrolled && isMobileViewport;

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 84);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <motion.div
      className="fixed left-3 top-[max(0.65rem,env(safe-area-inset-top))] z-[60] origin-top-left rounded-full border border-gold/20 bg-white/55 p-0.5 shadow-[0_10px_26px_rgba(88,63,27,0.12)] backdrop-blur-xl sm:left-6 sm:top-6 sm:p-1"
      initial={{ opacity: 0, y: -10, scale: 0.96, filter: "blur(7px)" }}
      animate={{
        opacity: compact ? 0.62 : 1,
        y: compact ? -5 : 0,
        scale: compact ? 0.84 : 1,
        filter: "blur(0px)",
      }}
      transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      role="group"
      aria-label={content.ui.languageToggleLabel}
    >
      {options.map((option) => {
        const active = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={
              option.value === "en"
                ? content.ui.switchToEnglish
                : content.ui.switchToMyanmar
            }
            onClick={() => setLanguage(option.value)}
            className={cn(
              "min-h-8 rounded-full px-2.5 text-[10px] font-semibold leading-tight text-foreground/70 transition-all duration-300 sm:min-h-10 sm:px-4 sm:text-[11px]",
              compact && "min-h-7 px-2 text-[9px] sm:min-h-10 sm:px-4 sm:text-[11px]",
              option.value === "my" && "font-myanmar text-[9px] sm:text-[11px]",
              active
                ? "bg-gold text-white shadow-[0_8px_20px_rgba(201,162,92,0.26)]"
                : "hover:bg-white/65 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default LanguageToggle;
