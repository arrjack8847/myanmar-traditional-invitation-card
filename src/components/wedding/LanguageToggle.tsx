import { motion } from "framer-motion";
import { useLanguage } from "@/context/language";
import { cn } from "@/lib/utils";
import type { Language } from "@/data/wedding";

const options: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "my", label: "မြန်မာ" },
];

const LanguageToggle = () => {
  const { language, setLanguage, content } = useLanguage();

  return (
    <motion.div
      className="fixed left-4 top-4 z-[70] rounded-full border border-gold/20 bg-white/60 p-1 shadow-[0_12px_34px_rgba(88,63,27,0.14)] backdrop-blur-xl sm:left-6 sm:top-6"
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
              "min-h-9 rounded-full px-3 text-[11px] font-semibold leading-tight text-foreground/70 transition-all duration-300 sm:min-h-10 sm:px-4",
              option.value === "my" && "font-myanmar text-[10px] sm:text-[11px]",
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
