import { motion } from "framer-motion";
import type { WeddingContent } from "@/data/wedding";
import { EASE, INVITATION_CARD_SRC } from "./openingConfig";
import {
  getCardAnimate,
  getCardInitial,
  getCardTransition,
} from "./openingMotion";
import type { Stage } from "./openingTypes";

interface InvitationCardStageProps {
  cardLayout: {
    width: string;
    aspectRatio: string;
  };
  intro: WeddingContent["intro"];
  isCardRising: boolean;
  isExpandedLike: boolean;
  isInvitationHold: boolean;
  isMobile: boolean;
  onContinue: () => void;
  stage: Stage;
  ui: WeddingContent["ui"];
}

const InvitationCardStage = ({
  cardLayout,
  intro,
  isCardRising,
  isExpandedLike,
  isInvitationHold,
  isMobile,
  onContinue,
  stage,
  ui,
}: InvitationCardStageProps) => {
  /**
   * Keep the Myanmar text and CTA visually attached to the same PNG card.
   * This value must stay positive so the stack always sits below the card.
   */
  const underCardGap = isMobile ? "clamp(10px, 1.6svh, 14px)" : "16px";

  /**
   * Responsive content width inside the same card width.
   * This keeps the sentence centered and safe on all devices.
   */
  const sentenceWidth = isMobile ? "84%" : "78%";
  const buttonMinWidth = isMobile ? "178px" : "210px";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      initial={getCardInitial(isMobile)}
      animate={getCardAnimate(stage, isMobile)}
      transition={getCardTransition(stage)}
      style={{
        width: cardLayout.width,
        aspectRatio: cardLayout.aspectRatio,
        transformOrigin: "center center",
        zIndex: isExpandedLike ? 45 : 8,
      }}
    >
      <motion.img
        src={INVITATION_CARD_SRC}
        alt="Wedding invitation card"
        className="h-full w-full select-none object-contain"
        draggable={false}
        initial={{ opacity: 0.96 }}
        animate={{
          opacity: 1,
          scale: isInvitationHold ? [1, 1.012, 1] : 1,
        }}
        transition={
          isInvitationHold
            ? {
                scale: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.95,
                  ease: EASE,
                },
              }
            : {
                duration: 0.95,
                ease: EASE,
              }
        }
        style={{
          filter: isExpandedLike
            ? `
              drop-shadow(0 34px 84px rgba(93,70,28,0.20))
              drop-shadow(0 12px 28px rgba(93,70,28,0.12))
            `
            : isCardRising
              ? `
                drop-shadow(0 34px 68px rgba(93,70,28,0.22))
                drop-shadow(0 10px 22px rgba(93,70,28,0.12))
              `
              : `
                drop-shadow(0 22px 50px rgba(93,70,28,0.16))
                drop-shadow(0 6px 16px rgba(93,70,28,0.08))
              `,
        }}
      />

      {isInvitationHold && (
        <motion.div
          className="absolute left-0 right-0 z-[20] flex flex-col items-center text-center"
          style={{
            top: `calc(100% + ${underCardGap})`,
            width: "100%",
          }}
          initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(7px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.35, ease: EASE }}
        >
          <motion.p
            className="pointer-events-none uppercase text-[#9f7937]"
            style={{
              width: sentenceWidth,
              fontSize: isMobile ? "8.5px" : "10px",
              letterSpacing: isMobile ? "0.12em" : "0.18em",
              lineHeight: 1.45,
              marginInline: "auto",
              textAlign: "center",
              wordBreak: "break-word",
            }}
            initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 0.88, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: EASE, delay: 0.12 }}
          >
            {intro.welcomeEyebrow}
          </motion.p>

          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onContinue();
            }}
            className="mt-3 rounded-full border border-[#d8b869]/70 bg-white/72 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#806026] shadow-[0_18px_45px_rgba(93,70,28,0.14)] backdrop-blur-md transition-colors duration-300 hover:bg-white/88"
            style={{
              minWidth: buttonMinWidth,
            }}
            initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(7px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.025, 1],
              filter: "blur(0px)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{
              opacity: { duration: 1.2, ease: EASE, delay: 0.22 },
              y: { duration: 1.2, ease: EASE, delay: 0.22 },
              filter: { duration: 1.2, ease: EASE, delay: 0.22 },
              scale: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {ui.viewDetails}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvitationCardStage;
