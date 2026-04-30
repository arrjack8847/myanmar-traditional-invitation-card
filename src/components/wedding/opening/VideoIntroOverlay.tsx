import { motion } from "framer-motion";
import type { WeddingContent } from "@/data/wedding";
import { EASE } from "./openingConfig";
import { getVideoOverlayOpacity } from "./openingMotion";
import type { Stage } from "./openingTypes";

interface VideoIntroOverlayProps {
  intro: WeddingContent["intro"];
  isMobile: boolean;
  isSiteReveal: boolean;
  isVideoIntro: boolean;
  stage: Stage;
}

const VideoIntroOverlay = ({
  intro,
  isMobile,
  isSiteReveal,
  isVideoIntro,
  stage,
}: VideoIntroOverlayProps) => {
  const videoScale = isMobile ? 1.12 : 1.06;
  const videoRevealScale = isMobile ? 1.04 : 1.015;

  return (
    <motion.div
      className="absolute inset-0 z-[25] overflow-hidden"
      initial={{ opacity: 0, filter: "blur(16px)" }}
      animate={{
        opacity: getVideoOverlayOpacity(stage),
        filter: isSiteReveal
          ? "blur(10px)"
          : isVideoIntro
            ? "blur(0px)"
            : "blur(16px)",
      }}
      transition={{ duration: isSiteReveal ? 1.65 : 1.7, ease: EASE }}
    >
      <div className="absolute inset-0">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: videoScale, opacity: 0.86 }}
          animate={{
            scale: isSiteReveal ? videoScale + 0.035 : videoRevealScale,
            opacity: isSiteReveal ? 0.48 : 1,
          }}
          transition={{ duration: isSiteReveal ? 1.65 : 3.1, ease: EASE }}
          style={{ objectPosition: "center center" }}
          src="/luxury-bg.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(19,14,10,0.12), rgba(19,14,10,0.42)),
            radial-gradient(circle at center, rgba(255,233,190,0.18), transparent 48%),
            radial-gradient(circle at 50% 82%, rgba(212,175,95,0.20), transparent 42%)
          `,
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSiteReveal ? 0.82 : 0.18 }}
        transition={{ duration: isSiteReveal ? 1.55 : 2.2, ease: EASE }}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,250,241,0.10), rgba(255,244,218,0.48) 54%, rgba(255,251,246,0.92))",
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6 md:px-10"
        initial={{ opacity: 0, y: 26, scale: 0.96, filter: "blur(12px)" }}
        animate={{
          opacity: isVideoIntro ? 1 : 0,
          y: isVideoIntro ? 0 : -18,
          scale: isVideoIntro ? 1 : 1.025,
          filter: isVideoIntro ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: isSiteReveal ? 1.25 : 1.6, ease: EASE }}
        style={{
          paddingTop: isMobile ? "5vh" : "0",
        }}
      >
        <div
          className="mx-auto"
          style={{
            width: isMobile ? "88vw" : "min(92vw, 720px)",
            maxWidth: isMobile ? "340px" : "720px",
          }}
        >
          <p
            className="mb-3 uppercase text-[#f0dba8] sm:mb-4"
            style={{
              fontSize: isMobile ? "9px" : "12px",
              letterSpacing: isMobile ? "0.22em" : "0.36em",
            }}
          >
            {intro.welcomeEyebrow}
          </p>

          <div
            className="mx-auto mb-4 h-px bg-gradient-to-r from-transparent via-[#e3c37a] to-transparent opacity-90 sm:mb-5"
            style={{
              width: isMobile ? "72px" : "96px",
            }}
          />

          <motion.h2
            className="font-display text-white"
            animate={{
              textShadow: isVideoIntro
                ? [
                    "0 12px 38px rgba(0,0,0,0.22), 0 0 0 rgba(239,212,154,0)",
                    "0 16px 48px rgba(0,0,0,0.28), 0 0 28px rgba(239,212,154,0.18)",
                    "0 12px 38px rgba(0,0,0,0.22), 0 0 0 rgba(239,212,154,0)",
                  ]
                : "0 12px 38px rgba(0,0,0,0.22)",
            }}
            transition={{
              duration: 3.2,
              repeat: isVideoIntro ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{
              fontSize: isMobile ? "28px" : "46px",
              lineHeight: isMobile ? "1.12" : "1.15",
            }}
          >
            {intro.welcomeTitle}
          </motion.h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoIntroOverlay;
