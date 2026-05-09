import { motion, useReducedMotion } from "framer-motion";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  placement?: "site" | "opening";
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LanguageToggle = ({ placement = "site" }: LanguageToggleProps) => {
  const { language, toggleLanguage, content } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const isOpening = placement === "opening";
  const compact = !isOpening && isScrolled && isMobileViewport;

  const activeLabel = language === "en" ? "EN" : "MY";
  const desktopLabel = language === "en" ? "English" : "မြန်မာ";

  const nextLabel =
    language === "en" ? content.ui.switchToMyanmar : content.ui.switchToEnglish;

  useEffect(() => {
    if (isOpening) return;

    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 84);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, [isOpening]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  const containerClassName = cn(
    "fixed z-[70]",
    isOpening
      ? "right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 origin-right -translate-y-1/2 sm:right-6 sm:top-6 sm:-translate-y-0"
      : "right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] origin-top-right sm:right-6 sm:top-6",
  );

  return (
    <motion.div
      className={containerClassName}
      initial={
        reduceMotion
          ? false
          : isOpening
            ? { opacity: 0, x: 16, scale: 0.94, filter: "blur(8px)" }
            : { opacity: 0, y: -12, scale: 0.94, filter: "blur(8px)" }
      }
      animate={
        isOpening
          ? {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {
              opacity: compact ? 0.88 : 1,
              y: compact ? -4 : 0,
              scale: compact ? 0.9 : 1,
              filter: "blur(0px)",
            }
      }
      transition={{ duration: 1.05, ease: EASE }}
    >
      <motion.button
        type="button"
        aria-label={nextLabel}
        title={nextLabel}
        onClick={toggleLanguage}
        whileHover={reduceMotion ? undefined : { y: -1 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full",
          "h-10 min-w-10 gap-1.5 px-3 sm:h-11 sm:min-w-[6.7rem] sm:px-3.5",
          "border border-gold/30",
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,247,225,0.68))]",
          "text-white shadow-[0_14px_36px_rgba(74,48,18,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "backdrop-blur-2xl transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "before:pointer-events-none before:absolute before:inset-[1px] before:z-0 before:rounded-full before:border before:border-white/45",
          "after:pointer-events-none after:absolute after:left-4 after:right-4 after:top-1 after:z-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/85 after:to-transparent",
          compact && "h-9 min-w-9 px-2",
        )}
      >
        {/* Gold base */}
        <span className="absolute inset-0 z-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_34%),linear-gradient(135deg,rgba(177,124,36,0.96),rgba(216,179,97,0.96),rgba(146,93,24,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]" />

        {/* Soft inner glow */}
        <span className="pointer-events-none absolute inset-[2px] z-0 rounded-full bg-gradient-to-b from-white/18 to-transparent" />

        {/* Moving shine */}
        {!reduceMotion && (
          <motion.span
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ["-130%", "130%"] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icon */}
        <span className="relative z-10 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] sm:flex">
          <Languages className="h-3.5 w-3.5" />
        </span>

        {/* Mobile label */}
        <span
          className={cn(
            "relative z-10 text-[10px] font-extrabold tracking-[0.16em] text-white sm:hidden",
            compact && "text-[9px]",
          )}
        >
          {activeLabel}
        </span>

        {/* Desktop label */}
        <span className="relative z-10 hidden flex-col items-start leading-none sm:flex">
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/65">
            {content.ui.languageToggleLabel || "Language"}
          </span>

          <span
            className={cn(
              "mt-0.5 text-[11px] font-bold tracking-[0.08em] text-white",
              language === "my" && "font-myanmar tracking-normal",
            )}
          >
            {desktopLabel}
          </span>
        </span>

        {/* Active badge */}
        <span className="relative z-10 hidden rounded-full bg-white/18 px-2 py-1 text-[9px] font-black tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] sm:inline-flex">
          {activeLabel}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageToggle;