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
   * EXPANDED CARD PAGE CONTROLS
   *
   * Sentence + button are centered under the card.
   * They use the SAME X center as the card because they are inside
   * the same card wrapper and use width: "100%".
   */
  const underCardGap = isMobile ? "10px" : "14px";

  /**
   * X adjustment.
   *
   * 0px = exactly same center as card.
   * Positive = move right.
   * Negative = move left.
   *
   * Example:
   * const contentXOffset = isMobile ? "-4px" : "0px";
   */
  const contentXOffset = "-190px";

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
                  duration: 0.4,
                  ease: EASE,
                },
              }
            : {
                duration: 0.4,
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
          className="absolute z-[20] flex flex-col items-center text-center"
          style={{
            top: `calc(100% + ${underCardGap})`,
            left: `calc(50% + ${contentXOffset})`,
            width: "100%",
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.p
            className="pointer-events-none uppercase text-[#9f7937]"
            style={{
              width: isMobile ? "86%" : "82%",
              fontSize: isMobile ? "8.5px" : "10px",
              letterSpacing: isMobile ? "0.16em" : "0.22em",
              lineHeight: 1.35,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.88, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          >
            {intro.welcomeEyebrow}
          </motion.p>

          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onContinue();
            }}
            className="mt-3 rounded-full border border-[#d8b869]/70 bg-white/72 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#806026] shadow-[0_18px_45px_rgba(93,70,28,0.14)] backdrop-blur-md transition-colors duration-300 hover:bg-white/88"
            style={{
              minWidth: isMobile ? "178px" : "210px",
            }}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.025, 1],
            }}
            whileTap={{ scale: 0.96 }}
            transition={{
              opacity: { duration: 0.55, ease: EASE, delay: 0.12 },
              y: { duration: 0.55, ease: EASE, delay: 0.12 },
              scale: {
                duration: 2.2,
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