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
  return (
    <motion.div
      className="absolute inset-0 z-[25] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: getVideoOverlayOpacity(stage) }}
      transition={{ duration: isSiteReveal ? 0.95 : 0.85, ease: EASE }}
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: isMobile ? "scale(1.08)" : "scale(1)",
            objectPosition: "center center",
          }}
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
            linear-gradient(to bottom, rgba(19,14,10,0.18), rgba(19,14,10,0.48)),
            radial-gradient(circle at center, rgba(255,233,190,0.10), transparent 46%)
          `,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6 md:px-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: isVideoIntro ? 1 : 0,
          y: isVideoIntro ? 0 : 10,
        }}
        transition={{ duration: 0.95, ease: EASE }}
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

          <h2
            className="font-display text-white"
            style={{
              fontSize: isMobile ? "28px" : "46px",
              lineHeight: isMobile ? "1.12" : "1.15",
            }}
          >
            {intro.welcomeTitle}
          </h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoIntroOverlay;
