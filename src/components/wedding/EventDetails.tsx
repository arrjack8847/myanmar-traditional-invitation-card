import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* =========================================================
   🎛️ FULL CONTROL PANEL
   ========================================================= */

const CORNER_IMAGE = "/detail-corner.png";

/* 🎛️ DETAILS TITLE PNG CONTROL PANEL */
/* Put your file inside: public/mingalar-Photoroom.png */
const DETAILS_TITLE_IMAGE = "/mingalar-Photoroom.png";

const DETAILS_TITLE = {
  x: 0, // negative = left, positive = right
  y: 0, // negative = up, positive = down
  width: 250, // PNG title size
  marginTop: -10, // space above title
  marginBottom:-30, // space below title
};

/* 🎛️ DETAILS DIVIDER PNG CONTROL PANEL */
/* Put your file inside: public/details-divider.png */
const DETAILS_DIVIDER_IMAGE = "/boarder.png";

const DETAILS_DIVIDER = {
  show: true,

  x: 0,
  y: 0,
  scale: 1,
  opacity: 0.9,

  width: 220, // main divider width
  compactWidth: 140, // small divider width inside date/time/location

  marginTop: -10,
  marginBottom: 10,

  compactMarginTop: 6,
  compactMarginBottom: 6,
};

/* 🎛️ CARD SPACING CONTROL */
const DETAILS_CARD = {
  sectionPaddingTop: 24,
  sectionPaddingBottom: "calc(env(safe-area-inset-bottom) + 9rem)",

  cardPaddingX: 16,
  cardPaddingY: 36,

  contentMaxWidth: 576,

  iconMarginBottom: 20,
  descriptionMarginTop: 0,

  itemsMarginTop: 32,
  itemGap: 32,

  buttonMarginTop: 40,
  buttonMarginBottom: 48,
};

/* ========================================================= */

const Divider = ({ compact = false }: { compact?: boolean }) => {
  if (!DETAILS_DIVIDER.show) return null;

  return (
    <motion.div
      className="mx-auto flex origin-center items-center justify-center"
      initial={{ opacity: 0, clipPath: "inset(0% 50% 0% 50%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.8, ease: EASE }}
      viewport={{ once: true, amount: 0.6 }}
      style={{
        marginTop: compact
          ? DETAILS_DIVIDER.compactMarginTop
          : DETAILS_DIVIDER.marginTop,
        marginBottom: compact
          ? DETAILS_DIVIDER.compactMarginBottom
          : DETAILS_DIVIDER.marginBottom,
        opacity: DETAILS_DIVIDER.opacity,
        transform: `translate(${DETAILS_DIVIDER.x}px, ${DETAILS_DIVIDER.y}px) scale(${DETAILS_DIVIDER.scale})`,
        transformOrigin: "center",
      }}
    >
      <img
        src={DETAILS_DIVIDER_IMAGE}
        alt=""
        aria-hidden="true"
        className="h-auto object-contain"
        style={{
          width: `min(${
            compact ? DETAILS_DIVIDER.compactWidth : DETAILS_DIVIDER.width
          }px, 70vw)`,
          maxWidth: "70vw",
        }}
      />
    </motion.div>
  );
};

const CornerImage = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const base =
    "pointer-events-none absolute z-[2] h-[78px] w-[78px] opacity-80 sm:h-[132px] sm:w-[132px]";

  const config = {
    "top-left": {
      className: "left-3 top-3 sm:left-5 sm:top-5",
      transform: "none",
    },
    "top-right": {
      className: "right-3 top-3 sm:right-5 sm:top-5",
      transform: "scaleX(-1)",
    },
    "bottom-left": {
      className: "bottom-3 left-3 sm:bottom-5 sm:left-5",
      transform: "scaleY(-1)",
    },
    "bottom-right": {
      className: "bottom-3 right-3 sm:bottom-5 sm:right-5",
      transform: "scale(-1, -1)",
    },
  }[position];

  return (
    <img
      src={CORNER_IMAGE}
      alt=""
      aria-hidden="true"
      className={`${base} ${config.className}`}
      style={{
        transform: config.transform,
        objectFit: "contain",
      }}
    />
  );
};

const DetailItem = ({
  icon,
  label,
  value,
  isMyanmar,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  isMyanmar: boolean;
}) => (
  <motion.div
    className="mx-auto max-w-[19rem] text-center"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: EASE }}
    viewport={{ once: true, amount: 0.35 }}
  >
    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white/60 text-[#b78728] shadow-[0_10px_24px_rgba(184,135,36,0.10)]">
      {icon}
    </div>

    <p
      className={
        isMyanmar
          ? "font-myanmar text-[14px] font-bold text-[#b78728] sm:text-base"
          : "font-display text-[14px] font-bold tracking-[0.08em] text-[#b78728] sm:text-base"
      }
    >
      {label}
    </p>

    <Divider compact />

    <p
      className={
        isMyanmar
          ? "whitespace-pre-line break-words font-myanmar text-[0.98rem] font-bold leading-[1.9] text-[#91651c] sm:text-[1.55rem]"
          : "whitespace-pre-line break-words font-display text-[1.05rem] font-bold leading-[1.65] text-[#91651c] sm:text-[1.55rem]"
      }
    >
      {value}
    </p>
  </motion.div>
);

const ClickHereButton = ({
  href,
  label,
  reduceMotion,
  isMyanmar,
}: {
  href: string;
  label: string;
  reduceMotion: boolean | null;
  isMyanmar: boolean;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mm-gold-button group relative inline-flex min-h-[52px] w-full max-w-[260px] items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 text-[15px] font-bold transition active:scale-[0.98] sm:text-base ${
        isMyanmar ? "font-myanmar" : "font-display tracking-[0.04em]"
      }`}
      animate={
        reduceMotion
          ? {}
          : {
              scale: [1, 1.025, 1],
              boxShadow: [
                "0 16px 34px rgba(184,135,36,0.24), inset 0 1px 0 rgba(255,255,255,0.46)",
                "0 22px 52px rgba(184,135,36,0.42), inset 0 1px 0 rgba(255,255,255,0.56)",
                "0 16px 34px rgba(184,135,36,0.24), inset 0 1px 0 rgba(255,255,255,0.46)",
              ],
            }
      }
      transition={
        reduceMotion
          ? {}
          : {
              duration: 1.45,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      whileTap={{ scale: 0.96 }}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
          animate={{ x: ["-120%", "420%"] }}
          transition={{
            duration: 1.35,
            repeat: Infinity,
            repeatDelay: 0.55,
            ease: "easeInOut",
          }}
        />
      )}

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30"
          animate={{
            opacity: [0.25, 0.65, 0.25],
          }}
          transition={{
            duration: 1.45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <span className="relative z-10">
        {label}
      </span>
    </motion.a>
  );
};

const EventDetails = () => {
  const {
    language,
    content: { event },
  } = useLanguage();
  const reduceMotion = useReducedMotion();

  const isMyanmar = language === "my";

  const dateItem = event.items.find((item) => item.icon === "calendar");
  const timeItem = event.items.find((item) => item.icon === "clock");
  const venueItem = event.items.find((item) => item.icon === "mapPin");

  return (
    <section
      id="details"
      className="myanmar-paper-bg relative overflow-hidden px-4 sm:px-6 sm:py-24"
      style={{
        paddingTop: DETAILS_CARD.sectionPaddingTop,
        paddingBottom: DETAILS_CARD.sectionPaddingBottom,
      }}
    >
      <div className="section-glow absolute inset-0" />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className="relative overflow-hidden rounded-[30px] border border-gold/45 bg-[#fffaf0]/88 shadow-[0_28px_80px_rgba(111,84,42,0.14)] backdrop-blur-sm sm:rounded-[36px]"
          style={{
            paddingLeft: DETAILS_CARD.cardPaddingX,
            paddingRight: DETAILS_CARD.cardPaddingX,
            paddingTop: DETAILS_CARD.cardPaddingY,
            paddingBottom: DETAILS_CARD.cardPaddingY,
          }}
        >
          <div className="pointer-events-none absolute inset-3 z-[1] rounded-[22px] border border-gold/35 sm:inset-5 sm:rounded-[28px]" />
          <div className="pointer-events-none absolute inset-5 z-[1] rounded-[18px] border border-gold/15 sm:inset-8 sm:rounded-[22px]" />

          <CornerImage position="top-left" />
          <CornerImage position="top-right" />
          <CornerImage position="bottom-left" />
          <CornerImage position="bottom-right" />

          <div className="pointer-events-none absolute left-[18%] top-[14%] h-3 w-2 rotate-45 rounded-full bg-gold/15" />
          <div className="pointer-events-none absolute right-[14%] top-[24%] h-3 w-2 -rotate-12 rounded-full bg-gold/15" />
          <div className="pointer-events-none absolute bottom-[25%] left-[12%] h-3 w-2 rotate-12 rounded-full bg-gold/15" />
          <div className="pointer-events-none absolute bottom-[18%] right-[18%] h-3 w-2 -rotate-45 rounded-full bg-gold/15" />

          <div
            className="relative z-10 mx-auto text-center"
            style={{
              maxWidth: DETAILS_CARD.contentMaxWidth,
            }}
          >
            <motion.div
              className="mx-auto flex justify-center text-[#b78728]"
              style={{
                marginBottom: DETAILS_CARD.iconMarginBottom,
              }}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <motion.p
              className={
                isMyanmar
                  ? "font-myanmar text-[13px] font-bold leading-relaxed text-[#b78728] sm:text-base"
                  : "font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#b78728] sm:text-sm"
              }
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
            >
              {event.eyebrow}
            </motion.p>

            {/* Title PNG for Myanmar, normal text for English */}
            {isMyanmar ? (
              <motion.div
                className="mx-auto flex justify-center"
                style={{
                  marginTop: DETAILS_TITLE.marginTop,
                  marginBottom: DETAILS_TITLE.marginBottom,
                  transform: `translate(${DETAILS_TITLE.x}px, ${DETAILS_TITLE.y}px)`,
                }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true }}
              >
                <img
                  src={DETAILS_TITLE_IMAGE}
                  alt="မင်္ဂလာ အသေးစိတ်"
                  className="h-auto object-contain"
                  style={{
                    width: `min(${DETAILS_TITLE.width}px, 88vw)`,
                    maxWidth: "88vw",
                  }}
                />
              </motion.div>
            ) : (
              <motion.h2
                className="mx-auto mt-2 max-w-[16rem] font-display text-[2rem] font-bold leading-[1.15] text-[#b17d20] drop-shadow-[0_8px_24px_rgba(184,135,36,0.18)] sm:max-w-none sm:text-[3rem]"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true }}
              >
                {event.title}
              </motion.h2>
            )}

            <Divider />

            <motion.p
              className={
                isMyanmar
                  ? "mx-auto max-w-[18.5rem] font-myanmar text-[12.5px] leading-[1.95] text-[#7a6034] sm:max-w-xl sm:text-base"
                  : "mx-auto max-w-[18.5rem] font-display text-[13px] leading-[1.85] text-[#7a6034] sm:max-w-xl sm:text-base"
              }
              style={{
                marginTop: DETAILS_CARD.descriptionMarginTop,
              }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.75, ease: EASE }}
              viewport={{ once: true }}
            >
              {event.description}
            </motion.p>

            <div
              className="flex flex-col"
              style={{
                marginTop: DETAILS_CARD.itemsMarginTop,
                gap: DETAILS_CARD.itemGap,
              }}
            >
              {dateItem && (
                <DetailItem
                  icon={<CalendarDays className="h-5 w-5" />}
                  label={dateItem.label}
                  value={dateItem.value}
                  isMyanmar={isMyanmar}
                />
              )}

              {timeItem && (
                <DetailItem
                  icon={<Clock3 className="h-5 w-5" />}
                  label={timeItem.label}
                  value={timeItem.value}
                  isMyanmar={isMyanmar}
                />
              )}

              {venueItem && (
                <DetailItem
                  icon={<MapPin className="h-5 w-5" />}
                  label={venueItem.label}
                  value={venueItem.value}
                  isMyanmar={isMyanmar}
                />
              )}
            </div>

            <motion.div
              className="flex justify-center sm:mx-auto sm:max-w-md"
              style={{
                marginTop: DETAILS_CARD.buttonMarginTop,
                marginBottom: DETAILS_CARD.buttonMarginBottom,
              }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: EASE }}
              viewport={{ once: true }}
            >
              <ClickHereButton
                href={event.mapUrl}
                label={event.buttonText}
                reduceMotion={reduceMotion}
                isMyanmar={isMyanmar}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
