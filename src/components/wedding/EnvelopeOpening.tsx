import { useMemo } from "react";
import { motion } from "framer-motion";
import { useWeddingContent } from "@/context/language";
import OpeningBackground from "./OpeningBackground";
import InvitationCardStage from "./opening/InvitationCardStage";
import VideoIntroOverlay from "./opening/VideoIntroOverlay";
import {
  DURATIONS,
  EASE,
  FLOAT_TRANSITION,
  SCENE,
  TRANSITIONS,
} from "./opening/openingConfig";
import { getHintText } from "./opening/openingMotion";
import { useOpeningFlow } from "./opening/useOpeningFlow";

interface Props {
  onOpen: () => void;
}

const EnvelopeOpening = ({ onOpen }: Props) => {
  const { stage, handleClick } = useOpeningFlow({ onOpen });
  const { intro, ui } = useWeddingContent();

  const isSealed = stage === "sealed";
  const isRibbonDrop = stage === "ribbonDrop";
  const isCardRising = stage === "cardRising";
  const isExpanding = stage === "expanding";
  const isInvitationHold = stage === "invitationHold";
  const isVideoIntro = stage === "videoIntro";
  const isSiteReveal = stage === "siteReveal";

  const isExpandedLike =
    isExpanding || isInvitationHold || isVideoIntro || isSiteReveal;

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  const openedEnvelopeScale = isMobile
    ? SCENE.envelope.opened.mobileScale
    : SCENE.envelope.opened.scale;

  const openedBackY = isMobile
    ? SCENE.envelope.opened.mobileBackY
    : SCENE.envelope.opened.backY;

  const openedFrontY = isMobile
    ? SCENE.envelope.opened.mobileFrontY
    : SCENE.envelope.opened.frontY;

  const closedEnvelopeScale = isMobile
    ? SCENE.envelope.closed.mobileScale
    : SCENE.envelope.closed.scale;

  const cardSmallWidth = isMobile
    ? SCENE.card.small.mobileWidth
    : SCENE.card.small.width;

  const cardFullscreenWidth = isMobile
    ? SCENE.card.fullscreen.mobileWidth
    : SCENE.card.fullscreen.width;

  const glowSize = isMobile ? SCENE.glow.mobileSize : SCENE.glow.size;

  const glowYOffset = isMobile
    ? SCENE.glow.mobileYOffset
    : SCENE.glow.yOffset;

  const sceneY = isMobile
    ? SCENE.sceneOffset.mobileY
    : SCENE.sceneOffset.desktopY;

  const hintText = getHintText(stage, intro);

  const cardLayout = useMemo(() => {
    return {
      width: isExpandedLike ? cardFullscreenWidth : cardSmallWidth,
      aspectRatio: isExpandedLike
        ? isMobile
          ? SCENE.card.fullscreen.mobileAspectRatio
          : SCENE.card.fullscreen.aspectRatio
        : SCENE.card.small.aspectRatio,
    };
  }, [isExpandedLike, cardFullscreenWidth, cardSmallWidth, isMobile]);

  if (stage === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 16%, rgba(255, 228, 176, 0.34), transparent 28%),
          radial-gradient(circle at 20% 10%, rgba(255,255,255,0.72), transparent 18%),
          radial-gradient(circle at 80% 18%, rgba(255,243,218,0.42), transparent 16%),
          linear-gradient(135deg, #fffdfa 0%, #f8f0e3 42%, #f3e7d4 60%, #fffdf9 100%)
        `,
      }}
    >
      <OpeningBackground
        isFullscreen={isExpandedLike}
        isTransitioning={isVideoIntro || isSiteReveal}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[28%] z-[1] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gold/10 blur-[100px] sm:h-[460px] sm:w-[460px]"
        animate={{ opacity: [0.16, 0.3, 0.16], scale: [1, 1.08, 1] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {(isVideoIntro || isSiteReveal) && (
        <VideoIntroOverlay
          intro={intro}
          isMobile={isMobile}
          isSiteReveal={isSiteReveal}
          isVideoIntro={isVideoIntro}
          stage={stage}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div
          className="relative flex w-full items-center justify-center"
          style={{
            transform: `translateY(${sceneY}px)`,
          }}
        >
          <motion.div
            className="relative flex w-full items-center justify-center"
            onClick={handleClick}
            style={{
              width: isMobile ? "min(88vw, 420px)" : "min(92vw, 500px)",
              cursor:
                stage === "sealed" || stage === "invitationHold"
                  ? "pointer"
                  : "default",
            }}
            animate={
              isSealed
                ? { y: [0, -9, 0] }
                : isSiteReveal
                  ? { opacity: 0, scale: 1.02 }
                  : { opacity: 1, scale: 1 }
            }
            transition={isSealed ? FLOAT_TRANSITION : TRANSITIONS.medium}
          >
            {!isSiteReveal && hintText && (
              <div
                className="pointer-events-none absolute left-1/2 z-[20] -translate-x-1/2 text-center"
                style={{
                  bottom: isMobile ? "-18px" : "-10px",
                  width: isMobile ? "220px" : "320px",
                  maxWidth: "82vw",
                }}
              >
                <motion.p
                  key={stage}
                  initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="uppercase text-[#af8d42]"
                  style={{
                    fontSize: isMobile ? "9px" : "11px",
                    letterSpacing: isMobile ? "0.16em" : "0.18em",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {hintText}
                </motion.p>
              </div>
            )}

            {(stage === "sealed" || stage === "ribbonDrop") && (
              <motion.img
                src={intro.ribbonImage}
                alt="Ribbon"
                className="pointer-events-none absolute left-1/2 top-1/2 z-[9]"
                initial={{
                  opacity: 1,
                  x: "-50%",
                  y: isMobile ? "calc(-50% + 28px)" : "calc(-50% + 35px)",
                  rotate: 0,
                  scale: 0.96,
                }}
                animate={
                  isRibbonDrop
                    ? {
                        x: "-50%",
                        y: isMobile
                          ? "calc(-50% + 114px)"
                          : "calc(-50% + 142px)",
                        opacity: 0,
                        rotate: 12,
                        scale: 0.9,
                      }
                    : {
                        x: "-50%",
                        y: isMobile
                          ? "calc(-50% + 28px)"
                          : "calc(-50% + 35px)",
                        opacity: 1,
                        rotate: [0, 360],
                        scale: [1, 1.025, 1],
                      }
                }
                transition={
                  isRibbonDrop
                    ? {
                        duration: DURATIONS.ribbonDrop,
                        ease: EASE,
                      }
                    : {
                        rotate: {
                          duration: 5.2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 4.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        opacity: {
                          duration: 1.1,
                          ease: EASE,
                        },
                      }
                }
                style={{
                  width: isMobile ? "32%" : "34%",
                  maxWidth: isMobile ? "110px" : "130px",
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 50%",
                  filter: "drop-shadow(0 10px 18px rgba(122,85,30,0.16))",
                }}
              />
            )}

            {isSealed && (
              <motion.img
                src={intro.envelopeClosedImage}
                alt="Closed envelope"
                className="relative z-[6] w-full drop-shadow-[0_28px_56px_rgba(93,70,28,0.16)]"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{
                  opacity: 1,
                  scale: closedEnvelopeScale,
                  y: SCENE.envelope.closed.y,
                }}
                transition={TRANSITIONS.medium}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
              />
            )}

            {!isSealed && (
              <>
                <motion.div
                  className="absolute left-1/2 top-1/2 z-[1]"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    top: "50%",
                    left: "50%",
                    filter: "drop-shadow(0 32px 56px rgba(91,67,28,0.12))",
                  }}
                  initial={{
                    opacity: 0,
                    scale: openedEnvelopeScale + 0.02,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedBackY}px)`,
                  }}
                  animate={{
                    opacity: isExpandedLike ? 0.16 : 1,
                    scale: openedEnvelopeScale,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedBackY}px)`,
                  }}
                  transition={{
                    opacity: TRANSITIONS.fadeBlur,
                    scale: TRANSITIONS.scaleSoft,
                  }}
                >
                  <motion.img
                    src={intro.envelopeOpenedBackImage}
                    alt="Opened envelope back"
                    className="w-full"
                    initial={{ filter: "blur(6px)" }}
                    animate={{ filter: "blur(0px)" }}
                    transition={TRANSITIONS.fadeBlur}
                  />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-1/2 z-[2] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      isCardRising
                        ? 0.28
                        : isExpandedLike
                          ? 0.38
                          : 0.18,
                    x: "-50%",
                    y: isCardRising
                      ? `calc(-50% + ${glowYOffset}px)`
                      : "-50%",
                    scale: isExpandedLike ? 1.55 : 1,
                  }}
                  transition={{ duration: 1.35, delay: 0.12, ease: EASE }}
                  style={{
                    width: `${glowSize}px`,
                    height: `${glowSize}px`,
                    background:
                      "radial-gradient(circle, rgba(255,225,170,0.48) 0%, rgba(255,225,170,0.18) 38%, rgba(255,225,170,0) 72%)",
                    filter: `blur(${SCENE.glow.blur}px)`,
                    pointerEvents: "none",
                  }}
                />

                <InvitationCardStage
                  cardLayout={cardLayout}
                  intro={intro}
                  isCardRising={isCardRising}
                  isExpandedLike={isExpandedLike}
                  isInvitationHold={isInvitationHold}
                  isMobile={isMobile}
                  onContinue={handleClick}
                  stage={stage}
                  ui={ui}
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 z-[10]"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    top: "50%",
                    left: "50%",
                    filter: "drop-shadow(0 32px 56px rgba(91,67,28,0.12))",
                  }}
                  initial={{
                    opacity: 0,
                    scale: openedEnvelopeScale + 0.02,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedFrontY}px)`,
                  }}
                  animate={{
                    opacity: isExpandedLike ? 0 : 1,
                    scale: openedEnvelopeScale,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedFrontY}px)`,
                  }}
                  transition={{
                    opacity: { duration: 1.1, ease: EASE },
                    scale: TRANSITIONS.scaleSoft,
                  }}
                >
                  <motion.img
                    src={intro.envelopeOpenedFrontImage}
                    alt="Opened envelope front pocket"
                    className="w-full"
                    initial={{ filter: "blur(6px)" }}
                    animate={{ filter: "blur(0px)" }}
                    transition={TRANSITIONS.fadeBlur}
                  />
                </motion.div>

                {(isVideoIntro || isSiteReveal) && (
                  <motion.div
                    className="absolute inset-0 z-[30] rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSiteReveal ? 0.68 : 0.48 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.65) 32%, rgba(255,255,255,0) 72%)",
                      transform: "scale(2)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeOpening;
