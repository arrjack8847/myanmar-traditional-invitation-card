import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLanguage } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BRIDE_IMAGE = "/hero-couple.jpg";
const GROOM_IMAGE = "/hero-couple.jpg";
const FRAME_IMAGE = "/frame.png";
const RING_IMAGE = "/ring.png";

/* 🎛️ NAME PNG FILES */
const GROOM_NAME_IMAGE = "/husband.png";
const BRIDE_NAME_IMAGE = "/wife.png";

/* 🎛️ GROOM NAME PNG CONTROL */
const GROOM_NAME_PNG = {
  width: 175,
  y: 0,
  marginTop: 6,
};

/* 🎛️ BRIDE NAME PNG CONTROL */
const BRIDE_NAME_PNG = {
  width: 165,
  y: 0,
  marginTop: 6,
};

const OrnamentLine = () => (
  <div className="mm-ornament-line scale-75">
    <span className="mm-ornament-dot" />
  </div>
);

/* 🎛️ PORTRAIT PHOTO + FRAME CONTROL */
const PORTRAIT_FRAME = {
  photoTop: "10.2%",
  photoSide: "10.8%",
  photoBottom: "4%",

  photoRadius: "999px 999px 16px 16px / 50% 50% 4% 4%",

  imageScale: 1.05,
  imageX: "0px",
  imageY: "0px",

  frameScale: 1.1,
};

const ArchPortrait = ({
  src,
  alt,
  className = "",
  objectPosition = "center",
  revealDelay = 0,
  revealX = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  revealDelay?: number;
  revealX?: number;
}) => {
  return (
    <motion.div
      className={`mm-ornamental-arch-frame will-change-transform ${className}`}
      initial={{ opacity: 0, x: revealX, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: revealDelay, ease: EASE }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Photo cropped into the arch opening. */}
      <div
        className="mm-ornamental-arch-photo"
        style={{
          top: PORTRAIT_FRAME.photoTop,
          left: PORTRAIT_FRAME.photoSide,
          right: PORTRAIT_FRAME.photoSide,
          bottom: PORTRAIT_FRAME.photoBottom,
          borderRadius: PORTRAIT_FRAME.photoRadius,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            objectPosition,
            transform: `translate(${PORTRAIT_FRAME.imageX}, ${PORTRAIT_FRAME.imageY}) scale(${PORTRAIT_FRAME.imageScale})`,
          }}
        />
      </div>

      {/* PNG frame on top. */}
      <img
        src={FRAME_IMAGE}
        alt=""
        aria-hidden="true"
        className="mm-ornamental-arch-overlay"
        style={{
          transform: `scale(${PORTRAIT_FRAME.frameScale})`,
        }}
      />
    </motion.div>
  );
};

const NameBlock = ({
  role,
  name,
  isMyanmar,
  imageSrc,
  imageAlt,
  imageWidth = 220,
  imageY = 0,
  imageMarginTop = 6,
  revealDelay = 0,
}: {
  role: string;
  name?: string;
  isMyanmar: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageY?: number;
  imageMarginTop?: number;
  revealDelay?: number;
}) => {
  return (
    <motion.div
      className="text-center will-change-transform"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: revealDelay, ease: EASE }}
      viewport={{ once: true, amount: 0.35 }}
    >
      <p
        className={`text-[11px] font-bold leading-none text-gold/75 sm:text-sm ${
          isMyanmar ? "font-myanmar" : "font-display uppercase tracking-[0.12em]"
        }`}
      >
        {role}
      </p>

      {imageSrc ? (
        <div
          className="mt-1 flex justify-center"
          style={{
            marginTop: imageMarginTop,
            transform: `translateY(${imageY}px)`,
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt || role}
            className="h-auto object-contain"
            style={{
              width: `min(${imageWidth}px, 70vw)`,
              maxWidth: "70vw",
            }}
          />
        </div>
      ) : (
        <h2 className="mm-title-main mt-1 text-[clamp(1.45rem,7.2vw,2.45rem)] leading-[1.08] sm:text-[clamp(2rem,7vw,3.2rem)]">
          {name}
        </h2>
      )}

      <div className="mt-2">
        <OrnamentLine />
      </div>
    </motion.div>
  );
};

const RingsOrnament = ({
  alt,
  revealDelay = 0,
}: {
  alt: string;
  revealDelay?: number;
}) => {
  return (
    <motion.div
      className="relative flex items-center justify-center will-change-transform"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: revealDelay, ease: EASE }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="absolute h-px w-[68vw] max-w-[280px] gold-line" />

      <div className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-gold/20 bg-[#fbf7ec]/90 shadow-[0_14px_34px_rgba(184,135,36,0.14)] backdrop-blur-sm sm:h-[82px] sm:w-[82px] lg:h-[96px] lg:w-[96px]">
        <img
          src={RING_IMAGE}
          alt={alt}
          className="h-[50px] w-[50px] object-contain drop-shadow-[0_10px_20px_rgba(184,135,36,0.22)] sm:h-[66px] sm:w-[66px] lg:h-[76px] lg:w-[76px]"
        />
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const {
    language,
    content: { couple, hero, ui },
  } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isMyanmar = language === "my";
  const groomNameImage = isMyanmar ? GROOM_NAME_IMAGE : undefined;
  const brideNameImage = isMyanmar ? BRIDE_NAME_IMAGE : undefined;

  return (
    <section
      id="top"
      className="myanmar-paper-bg relative min-h-[100dvh] overflow-hidden px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-16 text-[#6d5226] sm:pt-8 lg:px-10 lg:pb-12 lg:pt-14"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-64 w-64 rounded-full bg-white/50 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 h-64 w-64 rounded-full bg-gold/10 blur-[70px]" />
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[42dvh] bg-[radial-gradient(circle_at_50%_0%,rgba(255,241,198,0.42),transparent_58%)]"
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.025, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Mobile-first one-page hero */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-36px)] max-w-6xl grid-cols-2 grid-rows-[1fr_auto_1fr_auto] gap-x-3 gap-y-2 lg:min-h-0 lg:grid-cols-[1fr_0.86fr_1fr] lg:grid-rows-none lg:items-center lg:gap-12">
        {/* Top-left photo */}
        <div className="flex items-start justify-end">
          <ArchPortrait
            src={BRIDE_IMAGE}
            alt={couple.bride}
            objectPosition="center"
            revealDelay={0.08}
            revealX={-14}
            className="h-[clamp(165px,25dvh,220px)] w-full max-w-[150px] sm:h-[340px] sm:max-w-[240px] lg:h-[560px] lg:max-w-[370px]"
          />
        </div>

        {/* Top-right groom name on mobile */}
        <div className="flex items-center justify-center lg:hidden">
          <NameBlock
            role={`${couple.groomRole}:`}
            name={couple.groom}
            isMyanmar={isMyanmar}
            imageSrc={groomNameImage}
            imageAlt={couple.groom}
            imageWidth={GROOM_NAME_PNG.width}
            imageY={GROOM_NAME_PNG.y}
            imageMarginTop={GROOM_NAME_PNG.marginTop}
            revealDelay={0.18}
          />
        </div>

        {/* Desktop center content */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
          <NameBlock
            role={`${couple.groomRole}:`}
            name={couple.groom}
            isMyanmar={isMyanmar}
            imageSrc={groomNameImage}
            imageAlt={couple.groom}
            imageWidth={GROOM_NAME_PNG.width}
            imageY={GROOM_NAME_PNG.y}
            imageMarginTop={GROOM_NAME_PNG.marginTop}
            revealDelay={0.22}
          />

          <div className="my-8">
            <RingsOrnament alt={ui.weddingRingsAlt} revealDelay={0.34} />
          </div>

          <NameBlock
            role={`${couple.brideRole}:`}
            name={couple.bride}
            isMyanmar={isMyanmar}
            imageSrc={brideNameImage}
            imageAlt={couple.bride}
            imageWidth={BRIDE_NAME_PNG.width}
            imageY={BRIDE_NAME_PNG.y}
            imageMarginTop={BRIDE_NAME_PNG.marginTop}
            revealDelay={0.46}
          />
        </div>

        {/* Mobile ring */}
        <div className="col-span-2 flex items-center justify-center py-1 lg:hidden">
          <RingsOrnament alt={ui.weddingRingsAlt} revealDelay={0.3} />
        </div>

        {/* Bottom-left bride name on mobile */}
        <div className="flex items-center justify-center lg:hidden">
          <NameBlock
            role={`${couple.brideRole}:`}
            name={couple.bride}
            isMyanmar={isMyanmar}
            imageSrc={brideNameImage}
            imageAlt={couple.bride}
            imageWidth={BRIDE_NAME_PNG.width}
            imageY={BRIDE_NAME_PNG.y}
            imageMarginTop={BRIDE_NAME_PNG.marginTop}
            revealDelay={0.42}
          />
        </div>

        {/* Bottom-right photo */}
        <div className="flex items-start justify-start">
          <ArchPortrait
            src={GROOM_IMAGE}
            alt={couple.groom}
            objectPosition="center"
            revealDelay={0.2}
            revealX={14}
            className="h-[clamp(165px,25dvh,220px)] w-full max-w-[150px] sm:h-[340px] sm:max-w-[240px] lg:h-[560px] lg:max-w-[370px]"
          />
        </div>

        {/* Message + buttons */}
        <motion.div
          className="col-span-2 mx-auto w-full max-w-md text-center lg:col-span-3 lg:mt-10 lg:max-w-xl"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <OrnamentLine />

          <p
            className={`mx-auto mt-2 line-clamp-2 max-w-[21rem] text-[12px] leading-[1.65] text-[#8a6a35] sm:text-sm lg:line-clamp-none lg:text-lg ${
              isMyanmar ? "font-myanmar" : "font-display"
            }`}
          >
            {hero.description}
          </p>

          <div className="mt-3 flex flex-col gap-2 px-1 sm:mx-auto sm:max-w-md">
            <motion.a
              href="#details"
              className="mm-gold-button premium-button-shine inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 font-display text-base font-semibold transition active:scale-[0.98] sm:min-h-[54px] sm:text-lg"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {ui.viewInvitation}
            </motion.a>

            <motion.a
              href="#rsvp"
              className={`mm-outline-button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 text-base font-bold transition active:scale-[0.98] sm:min-h-[54px] sm:text-lg ${
                isMyanmar ? "font-myanmar" : "font-display"
              }`}
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarCheck className="h-4 w-4" />
              {ui.rsvpShort || "RSVP"}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
