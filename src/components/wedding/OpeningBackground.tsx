import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Props {
  isFullscreen: boolean;
  isTransitioning: boolean;
}

/* 🎛️ CONTROL PANEL */
const BG = {
  video: {
    src: "/luxury-bg1.mp4",
  },

  videoStyle: {
    scale: 1.01,
    brightness: 0.96,
    contrast: 1.08,
    saturate: 1.08,
  },

  blur: {
    amount: "0.35px",
  },

  overlay: {
    opacity: 0.06,
  },

  lightWash: {
    opacity: 0.02,
  },

  centerGlow: {
    opacity: 0.18,
  },

  glow: {
    sizeMobile: 360,
    sizeDesktop: 680,
    opacityMin: 0.12,
    opacityMax: 0.22,
  },

  floralFrame: {
    desktopSrc: "/floral-frame-desktop.webp",
    mobileSrc: "/floral-frame-mobile.webp",

    // ✅ main flower visibility
    opacity: 1,

    // ✅ when card becomes fullscreen
    opacityFullscreen: 1,

    // ✅ when video transition starts
    opacityTransition: 0,

    // ✅ desktop frame size
    desktopScale: 1.08,

    // ✅ mobile: crop flowers outward slightly
    mobileScale: 1.05,

    // ✅ position
    desktopY: 0,
    mobileY: 0,

    // ✅ soft luxury depth
    filter: "drop-shadow(0 14px 24px rgba(110, 82, 38, 0.08))",
  },

  transitionOverlay: {
    opacityFullscreen: 0.1,
    opacityTransition: 0.88,
  },
};

const OpeningBackground = ({ isFullscreen, isTransitioning }: Props) => {
  const floralOpacity = isTransitioning
    ? BG.floralFrame.opacityTransition
    : isFullscreen
      ? BG.floralFrame.opacityFullscreen
      : BG.floralFrame.opacity;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7efe3]">
      {/* VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={BG.video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          transform: `scale(${BG.videoStyle.scale})`,
          filter: `
            brightness(${BG.videoStyle.brightness})
            contrast(${BG.videoStyle.contrast})
            saturate(${BG.videoStyle.saturate})
          `,
        }}
      />

      {/* VERY LIGHT LUXURY OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255,253,250,${BG.overlay.opacity}) 0%,
              rgba(248,240,227,${BG.overlay.opacity}) 42%,
              rgba(245,234,216,${BG.overlay.opacity}) 60%,
              rgba(255,253,249,${BG.overlay.opacity}) 100%
            )
          `,
          backdropFilter: `blur(${BG.blur.amount})`,
        }}
      />

      {/* SOFT CENTER FOCUS GLOW */}
      <div
        className="absolute inset-0"
        style={{
          opacity: BG.centerGlow.opacity,
          background: `
            radial-gradient(
              circle at center,
              rgba(255, 247, 230, 0.72) 0%,
              rgba(255, 243, 222, 0.36) 24%,
              rgba(255, 243, 222, 0.12) 42%,
              rgba(255, 243, 222, 0) 68%
            )
          `,
        }}
      />

      {/* SMALL TOP LIGHT WASH */}
      <div
        className="absolute inset-0"
        style={{
          opacity: BG.lightWash.opacity,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 28%, rgba(255,255,255,0) 58%)",
        }}
      />

      {/* BREATHING GOLD GLOW */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [
            BG.glow.opacityMin,
            BG.glow.opacityMax,
            BG.glow.opacityMin,
          ],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: `min(${BG.glow.sizeDesktop}px, 78vw)`,
          height: `min(${BG.glow.sizeDesktop}px, 78vw)`,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(212,177,92,0.16) 0%, rgba(212,177,92,0.08) 36%, rgba(212,177,92,0) 72%)",
        }}
      />

      {/* SOFT EDGE VIGNETTE */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 62%, rgba(98,72,38,0.08) 100%)",
        }}
      />

      {/* ✅ LUXURY FLORAL BORDER OVERLAY */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: floralOpacity }}
        transition={{ duration: 1.35, ease: EASE }}
        style={{
          filter: BG.floralFrame.filter,
        }}
      >
        {/* Desktop frame */}
        <img
          src={BG.floralFrame.desktopSrc}
          alt=""
          aria-hidden="true"
          className="hidden h-full w-full sm:block"
          style={{
            objectFit: "fill",
            transform: `translateY(${BG.floralFrame.desktopY}px) scale(${BG.floralFrame.desktopScale})`,
            transformOrigin: "center center",
          }}
        />

        {/* Mobile frame */}
        <img
          src={BG.floralFrame.mobileSrc}
          alt=""
          aria-hidden="true"
          className="block h-full w-full sm:hidden"
          style={{
            objectFit: "fill",
            transform: `translateY(${BG.floralFrame.mobileY}px) scale(${BG.floralFrame.mobileScale})`,
            transformOrigin: "center center",
          }}
        />
      </motion.div>

      {/* FULLSCREEN / TRANSITION OVERLAY */}
      {(isFullscreen || isTransitioning) && (
        <motion.div
          className="absolute inset-0 z-[4]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isTransitioning
              ? BG.transitionOverlay.opacityTransition
              : BG.transitionOverlay.opacityFullscreen,
          }}
          transition={{ duration: 1.25, ease: EASE }}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.2), rgba(245,234,216,0.24))",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default OpeningBackground;
