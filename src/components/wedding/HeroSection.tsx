import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { CalendarCheck, Mail } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BRIDE_IMAGE = "/hero-couple.jpg";
const GROOM_IMAGE = "/hero-couple.jpg";
const FRAME_IMAGE = "/frame.png";
const FRAME_MASK_IMAGE = "/frame-mask.png";
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
type PortraitFrameStyle = CSSProperties & Record<`--${string}`, string | number>;

const PORTRAIT_FRAME = {
  frameAspect: "37 / 56",

  photoTop: "10.2%",
  photoLeft: "10.8%",
  photoRight: "10.8%",
  photoBottom: "6.8%",

  photoRadius: "999px 999px 16px 16px / 50% 50% 4% 4%",

  imageScale: 1.05,
  imageX: "0px",
  imageY: "-2px",

  frameScale: 1.1,
};

const ArchPortrait = ({
  src,
  alt,
  className = "",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
}) => {
  const frameStyle: PortraitFrameStyle = {
    "--frame-aspect": PORTRAIT_FRAME.frameAspect,
    "--frame-mask": `url("${FRAME_MASK_IMAGE}")`,
    "--photo-top": PORTRAIT_FRAME.photoTop,
    "--photo-left": PORTRAIT_FRAME.photoLeft,
    "--photo-right": PORTRAIT_FRAME.photoRight,
    "--photo-bottom": PORTRAIT_FRAME.photoBottom,
    "--photo-radius": PORTRAIT_FRAME.photoRadius,
    "--image-scale": PORTRAIT_FRAME.imageScale,
    "--image-x": PORTRAIT_FRAME.imageX,
    "--image-y": PORTRAIT_FRAME.imageY,
    "--frame-scale": PORTRAIT_FRAME.frameScale,
  };

  return (
    <motion.div
      className={`mm-ornamental-arch-frame ${className}`}
      style={frameStyle}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Photo cropped into the arch opening. */}
      <div className="mm-ornamental-arch-photo">
        <img
          src={src}
          alt={alt}
          style={{ objectPosition }}
        />
      </div>

      {/* PNG frame on top. */}
      <img
        src={FRAME_IMAGE}
        alt=""
        aria-hidden="true"
        className="mm-ornamental-arch-overlay"
      />
    </motion.div>
  );
};

const NameBlock = ({
  role,
  name,
  imageSrc,
  imageAlt,
  imageWidth = 220,
  imageY = 0,
  imageMarginTop = 6,
}: {
  role: string;
  name?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageY?: number;
  imageMarginTop?: number;
}) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      viewport={{ once: true, amount: 0.35 }}
    >
      <p className="font-myanmar text-[11px] font-bold leading-none text-gold/75 sm:text-sm">
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

const RingsOrnament = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="absolute h-px w-[68vw] max-w-[280px] gold-line" />

      <div className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-gold/20 bg-[#fbf7ec]/90 shadow-[0_14px_34px_rgba(184,135,36,0.14)] backdrop-blur-sm sm:h-[82px] sm:w-[82px] lg:h-[96px] lg:w-[96px]">
        <img
          src={RING_IMAGE}
          alt="Wedding rings"
          className="h-[50px] w-[50px] object-contain drop-shadow-[0_10px_20px_rgba(184,135,36,0.22)] sm:h-[66px] sm:w-[66px] lg:h-[76px] lg:w-[76px]"
        />
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { couple, hero, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="myanmar-paper-bg relative min-h-[100dvh] overflow-hidden px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-16 text-[#6d5226] sm:pt-8 lg:px-10 lg:pb-12 lg:pt-14"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-64 w-64 rounded-full bg-white/50 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 h-64 w-64 rounded-full bg-gold/10 blur-[70px]" />

      {/* Mobile-first one-page hero */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-36px)] max-w-6xl grid-cols-2 grid-rows-[1fr_auto_1fr_auto] gap-x-3 gap-y-2 lg:min-h-0 lg:grid-cols-[1fr_0.86fr_1fr] lg:grid-rows-none lg:items-center lg:gap-12">
        {/* Top-left photo */}
        <div className="flex items-start justify-end">
          <ArchPortrait
            src={BRIDE_IMAGE}
            alt={couple.bride}
            objectPosition="center"
            className="w-full max-w-[150px] sm:max-w-[240px] lg:max-w-[370px]"
          />
        </div>

        {/* Top-right groom name on mobile */}
        <div className="flex items-center justify-center lg:hidden">
          <NameBlock
            role="သတို့သား:"
            imageSrc={GROOM_NAME_IMAGE}
            imageAlt={couple.groom}
            imageWidth={GROOM_NAME_PNG.width}
            imageY={GROOM_NAME_PNG.y}
            imageMarginTop={GROOM_NAME_PNG.marginTop}
          />
        </div>

        {/* Desktop center content */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
          <NameBlock
            role="သတို့သား:"
            imageSrc={GROOM_NAME_IMAGE}
            imageAlt={couple.groom}
            imageWidth={GROOM_NAME_PNG.width}
            imageY={GROOM_NAME_PNG.y}
            imageMarginTop={GROOM_NAME_PNG.marginTop}
          />

          <div className="my-8">
            <RingsOrnament />
          </div>

          <NameBlock
            role="သတို့သမီး:"
            imageSrc={BRIDE_NAME_IMAGE}
            imageAlt={couple.bride}
            imageWidth={BRIDE_NAME_PNG.width}
            imageY={BRIDE_NAME_PNG.y}
            imageMarginTop={BRIDE_NAME_PNG.marginTop}
          />
        </div>

        {/* Mobile ring */}
        <div className="col-span-2 flex items-center justify-center py-1 lg:hidden">
          <RingsOrnament />
        </div>

        {/* Bottom-left bride name on mobile */}
        <div className="flex items-center justify-center lg:hidden">
          <NameBlock
            role="သတို့သမီး:"
            imageSrc={BRIDE_NAME_IMAGE}
            imageAlt={couple.bride}
            imageWidth={BRIDE_NAME_PNG.width}
            imageY={BRIDE_NAME_PNG.y}
            imageMarginTop={BRIDE_NAME_PNG.marginTop}
          />
        </div>

        {/* Bottom-right photo */}
        <div className="flex items-start justify-start">
          <ArchPortrait
            src={GROOM_IMAGE}
            alt={couple.groom}
            objectPosition="center"
            className="w-full max-w-[150px] sm:max-w-[240px] lg:max-w-[370px]"
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

          <p className="mx-auto mt-2 line-clamp-2 max-w-[21rem] font-myanmar text-[12px] leading-[1.65] text-[#8a6a35] sm:text-sm lg:line-clamp-none lg:text-lg">
            {hero.description}
          </p>

          <div className="mt-3 flex flex-col gap-2 px-1 sm:mx-auto sm:max-w-md">
            <a
              href="#details"
              className="mm-gold-button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 font-display text-base font-semibold transition active:scale-[0.98] sm:min-h-[54px] sm:text-lg"
            >
              <Mail className="h-4 w-4" />
              View Invitation
            </a>

            <a
              href="#rsvp"
              className="mm-outline-button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 font-myanmar text-base font-bold transition active:scale-[0.98] sm:min-h-[54px] sm:text-lg"
            >
              <CalendarCheck className="h-4 w-4" />
              {ui.rsvpShort || "RSVP"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
