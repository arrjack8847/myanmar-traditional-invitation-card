import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";

interface Props {
  onOpen: () => void;
}

type Stage =
  | "sealed"
  | "openingFade"
  | "cardRising"
  | "revealed"
  | "fullscreen"
  | "transitioning"
  | "done";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DURATIONS = {
  openFade: 0.8,
  cardRise: 1.8,
  fullscreen: 1.0,
  enter: 0.75,
  cardRiseDelay: 0.22,
  quick: 0.35,
  medium: 0.7,
  soft: 0.9,
  long: 1.1,
} as const;

const FLOAT_TRANSITION: Transition = {
  duration: 3.8,
  repeat: Infinity,
  ease: "easeInOut",
};

const SCENE = {
  envelope: {
    closed: {
      mobileMaxWidth: 300,
      desktopMaxWidth: 500,
      y: 0,
      scale: 1,
    },
    opened: {
      widthPercent: 112,
      mobileMaxWidth: 340,
      desktopMaxWidth: 560,
      scale: 1.38,
      x: 0,
      backY: -18,
      frontY: -20,
    },
  },

  card: {
    small: {
      widthPercent: 60,
      maxWidth: 400,
      aspectRatio: "5 / 4",
      radius: "34px 34px 16px 16px",
      startY: -25,
      revealY: -82,
      x: 0,
      rotate: -0.6,
      scale: 1.02,
    },
    fullscreen: {
      width: "min(90vw, 820px)",
      maxWidth: "820px",
      aspectRatio: "16 / 10",
      radius: "34px",
    },
  },

  glow: {
    size: 260,
    yOffset: -28,
    blur: 26,
  },

  hintText: {
    bottomOffset: -80,
  },
} as const;

const TRANSITIONS = {
  quick: { duration: DURATIONS.quick, ease: EASE } satisfies Transition,
  medium: { duration: DURATIONS.medium, ease: EASE } satisfies Transition,
  fadeBlur: { duration: DURATIONS.soft, ease: EASE } satisfies Transition,
  scaleSoft: { duration: DURATIONS.long, ease: EASE } satisfies Transition,
  rise: { duration: DURATIONS.cardRise, ease: EASE } satisfies Transition,
  fullscreen: { duration: DURATIONS.fullscreen, ease: EASE } satisfies Transition,
};

function getHintText(stage: Stage) {
  if (stage === "sealed") return "Tap to Open";
  if (stage === "revealed") return "Tap to Expand";
  if (stage === "fullscreen") return "Tap to Enter";
  return "";
}

function getCardLayout(isFullscreenLike: boolean) {
  return {
    width: isFullscreenLike
      ? SCENE.card.fullscreen.width
      : `${SCENE.card.small.widthPercent}%`,
    maxWidth: isFullscreenLike
      ? SCENE.card.fullscreen.maxWidth
      : `${SCENE.card.small.maxWidth}px`,
    aspectRatio: isFullscreenLike
      ? SCENE.card.fullscreen.aspectRatio
      : SCENE.card.small.aspectRatio,
    radius: isFullscreenLike
      ? SCENE.card.fullscreen.radius
      : SCENE.card.small.radius,
  };
}

function getCardAnimate(stage: Stage) {
  const isFullscreenLike =
    stage === "fullscreen" || stage === "transitioning";
  const isVisible =
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "revealed" ||
    stage === "fullscreen" ||
    stage === "transitioning";

  const yValue = isFullscreenLike
    ? "-50%"
    : `calc(-50% + ${
        stage === "cardRising" || stage === "revealed"
          ? SCENE.card.small.revealY
          : SCENE.card.small.startY
      }px)`;

  return {
    opacity: isVisible ? 1 : 0,
    scale: isFullscreenLike ? 1 : SCENE.card.small.scale,
    filter: isVisible ? "blur(0px)" : "blur(6px)",
    x: isFullscreenLike
      ? "-50%"
      : `calc(-50% + ${SCENE.card.small.x}px)`,
    y: yValue,
    rotate: isFullscreenLike ? 0 : SCENE.card.small.rotate,
    width: isFullscreenLike
      ? SCENE.card.fullscreen.width
      : `${SCENE.card.small.widthPercent}%`,
    maxWidth: isFullscreenLike
      ? SCENE.card.fullscreen.maxWidth
      : `${SCENE.card.small.maxWidth}px`,
  };
}

function getCardInitial() {
  return {
    opacity: 0,
    scale: SCENE.card.small.scale + 0.02,
    filter: "blur(6px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: `calc(-50% + ${SCENE.card.small.startY}px)`,
    rotate: SCENE.card.small.rotate,
    width: `${SCENE.card.small.widthPercent}%`,
    maxWidth: `${SCENE.card.small.maxWidth}px`,
  };
}

function getCardTransition(stage: Stage) {
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";
  const isFullscreenLike =
    stage === "fullscreen" || stage === "transitioning";

  return {
    opacity: isOpeningFade ? TRANSITIONS.fadeBlur : TRANSITIONS.quick,
    filter: isOpeningFade ? TRANSITIONS.fadeBlur : TRANSITIONS.quick,
    scale: isOpeningFade
      ? TRANSITIONS.scaleSoft
      : isCardRising
      ? TRANSITIONS.rise
      : isFullscreenLike
      ? TRANSITIONS.fullscreen
      : TRANSITIONS.quick,
    y: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
      ? TRANSITIONS.rise
      : isFullscreenLike
      ? TRANSITIONS.fullscreen
      : TRANSITIONS.quick,
    rotate: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
      ? TRANSITIONS.rise
      : isFullscreenLike
      ? TRANSITIONS.fullscreen
      : TRANSITIONS.quick,
    width: isFullscreenLike ? TRANSITIONS.fullscreen : TRANSITIONS.quick,
    maxWidth: isFullscreenLike ? TRANSITIONS.fullscreen : TRANSITIONS.quick,
  };
}

const EnvelopeOpening = ({ onOpen }: Props) => {
  const [stage, setStage] = useState<Stage>("sealed");
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      callback();
      timeoutsRef.current = timeoutsRef.current.filter(
        (timeoutId) => timeoutId !== id
      );
    }, delay);

    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const isSealed = stage === "sealed";
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";
  const isRevealed = stage === "revealed";
  const isFullscreen = stage === "fullscreen";
  const isTransitioning = stage === "transitioning";

  const isBusy =
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "transitioning";

  const cardLayout = useMemo(
    () => getCardLayout(isFullscreen || isTransitioning),
    [isFullscreen, isTransitioning]
  );

  const handleClick = useCallback(() => {
    if (isBusy) return;

    if (stage === "sealed") {
      clearAllTimeouts();
      setStage("openingFade");

      schedule(() => {
        setStage("cardRising");
      }, (DURATIONS.openFade + DURATIONS.cardRiseDelay) * 1000);

      schedule(() => {
        setStage("revealed");
      }, (DURATIONS.openFade + DURATIONS.cardRiseDelay + DURATIONS.cardRise) * 1000);

      return;
    }

    if (stage === "revealed") {
      setStage("fullscreen");
      return;
    }

    if (stage === "fullscreen") {
      clearAllTimeouts();
      setStage("transitioning");

      schedule(() => {
        setStage("done");
        onOpen();
      }, DURATIONS.enter * 1000);
    }
  }, [stage, isBusy, schedule, clearAllTimeouts, onOpen]);

  if (stage === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 18%, rgba(255, 231, 184, 0.22), transparent 28%),
          radial-gradient(circle at 20% 10%, rgba(255,255,255,0.70), transparent 18%),
          linear-gradient(135deg, #fffdfa 0%, #f8f0e3 42%, #f5ead8 60%, #fffdf9 100%)
        `,
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-[680px] sm:w-[680px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.52, 0.72, 0.52],
        }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(212,177,92,0.22) 0%, rgba(212,177,92,0.10) 36%, rgba(212,177,92,0) 72%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.20), rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.00) 60%)",
        }}
      />

      {(isFullscreen || isTransitioning) && (
        <motion.div
          className="absolute inset-0 z-[4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.92 : 0.55 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.68), rgba(245,234,216,0.84))",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          className="relative flex w-full max-w-[320px] items-center justify-center sm:max-w-[520px]"
          onClick={handleClick}
          animate={
            isSealed
              ? { y: [0, -8, 0] }
              : isTransitioning
              ? { opacity: 0, scale: 1.02 }
              : { opacity: 1, scale: 1 }
          }
          transition={isSealed ? FLOAT_TRANSITION : TRANSITIONS.medium}
          style={{ cursor: isBusy ? "default" : "pointer" }}
        >
          {!isTransitioning && getHintText(stage) && (
            <motion.div
              key={stage}
              className="absolute left-1/2 z-[20] -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{ bottom: `${SCENE.hintText.bottomOffset}px` }}
            >
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#af8d42] sm:text-[11px]">
                {getHintText(stage)}
              </p>
            </motion.div>
          )}

          {isSealed && (
            <motion.img
              src="/Envelope Closed.png"
              alt="Closed envelope"
              className="envelope-closed relative z-[6] w-full drop-shadow-[0_26px_50px_rgba(93,70,28,0.16)]"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{
                opacity: 1,
                scale: SCENE.envelope.closed.scale,
                y: SCENE.envelope.closed.y,
              }}
              transition={TRANSITIONS.medium}
              style={{
                maxWidth: `${SCENE.envelope.closed.mobileMaxWidth}px`,
              }}
            />
          )}

          {!isSealed && (
            <>
              <motion.img
                src="/Envelope Opened.png"
                alt="Opened envelope back"
                className="envelope-opened-back absolute left-1/2 top-1/2 z-[1]"
                initial={{
                  opacity: 0,
                  scale: SCENE.envelope.opened.scale + 0.02,
                  filter: "blur(6px)",
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.backY}px)`,
                }}
                animate={{
                  opacity: isFullscreen || isTransitioning ? 0.18 : 1,
                  scale: SCENE.envelope.opened.scale,
                  filter: "blur(0px)",
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.backY}px)`,
                }}
                transition={{
                  opacity: TRANSITIONS.fadeBlur,
                  scale: TRANSITIONS.scaleSoft,
                  filter: TRANSITIONS.fadeBlur,
                }}
                style={{
                  width: `${SCENE.envelope.opened.widthPercent}%`,
                  maxWidth: `${SCENE.envelope.opened.mobileMaxWidth}px`,
                  top: "50%",
                  left: "50%",
                  filter: isOpeningFade
                    ? "drop-shadow(0 30px 50px rgba(91,67,28,0.11)) blur(0px)"
                    : "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-[2] rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    isCardRising || isRevealed
                      ? 0.24
                      : isFullscreen
                      ? 0.34
                      : 0.16,
                  x: "-50%",
                  y:
                    isCardRising || isRevealed
                      ? `calc(-50% + ${SCENE.glow.yOffset}px)`
                      : "-50%",
                  scale: isFullscreen ? 1.6 : 1,
                }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                style={{
                  width: `${SCENE.glow.size}px`,
                  height: `${SCENE.glow.size}px`,
                  background:
                    "radial-gradient(circle, rgba(255,225,170,0.40) 0%, rgba(255,225,170,0.16) 38%, rgba(255,225,170,0) 72%)",
                  filter: `blur(${SCENE.glow.blur}px)`,
                  pointerEvents: "none",
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-[8]"
                initial={getCardInitial()}
                animate={getCardAnimate(stage)}
                transition={getCardTransition(stage)}
                style={{
                  aspectRatio: cardLayout.aspectRatio,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: cardLayout.radius,
                    background:
                      "linear-gradient(180deg, #fffdf8 0%, #fbf4e8 55%, #f8eedf 100%)",
                    border: "1px solid #e7d7b4",
                    boxShadow:
                      isFullscreen || isTransitioning
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.05),
                          0 30px 70px rgba(93,70,28,0.16),
                          0 10px 24px rgba(93,70,28,0.10)
                        `
                        : isCardRising
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.06),
                          0 30px 60px rgba(93,70,28,0.18),
                          0 8px 18px rgba(93,70,28,0.10)
                        `
                        : `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.06),
                          0 20px 45px rgba(93,70,28,0.15),
                          0 5px 14px rgba(93,70,28,0.08)
                        `,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at top, rgba(255,255,255,0.92), rgba(255,255,255,0) 42%)",
                    }}
                  />

                  <div
                    className="absolute left-0 top-0 h-[52px] w-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.74), rgba(255,255,255,0.16), transparent)",
                    }}
                  />

                  <div
                    className={`absolute border border-[#ede1ca] ${
                      isFullscreen || isTransitioning
                        ? "inset-[18px]"
                        : "inset-[8px]"
                    }`}
                    style={{
                      borderRadius:
                        isFullscreen || isTransitioning
                          ? "28px"
                          : "26px 26px 12px 12px",
                    }}
                  />
                  <div
                    className={`absolute border border-[#f6eddd] ${
                      isFullscreen || isTransitioning
                        ? "inset-[28px]"
                        : "inset-[14px]"
                    }`}
                    style={{
                      borderRadius:
                        isFullscreen || isTransitioning
                          ? "22px"
                          : "20px 20px 10px 10px",
                    }}
                  />

                  <div
  className={`relative flex h-full flex-col items-center justify-center text-center ${
    isFullscreen || isTransitioning
      ? "px-8 py-8 sm:px-12"
      : "px-3 py-4 sm:px-4"
  }`}
>
  {/* TITLE */}
  <p
    className={`uppercase tracking-[0.32em] text-[#ba9650] ${
      isFullscreen || isTransitioning
        ? "mb-3 text-[10px] sm:text-[12px]"
        : "mb-2 text-[7px]"
    }`}
  >
    Wedding Invitation
  </p>

  {/* LINE */}
  <div
    className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
      isFullscreen || isTransitioning
        ? "mb-4 h-px w-20"
        : "mb-3 h-px w-10"
    }`}
  />

  {/* NAMES ROW (SIDE BY SIDE FEEL) */}
  <div className="flex flex-col items-center">
    <p
      className={`font-display text-[#3e332b] leading-[1.05] ${
        isFullscreen || isTransitioning
          ? "text-[26px] sm:text-[38px]"
          : "text-[15px] sm:text-[18px]"
      }`}
    >
      Myo Myat Khine
    </p>

    <p
      className={`text-[#c59d46] ${
        isFullscreen || isTransitioning
          ? "my-2 text-[18px]"
          : "my-1 text-[12px]"
      }`}
    >
      &
    </p>

    <p
      className={`font-display text-[#3e332b] leading-[1.05] ${
        isFullscreen || isTransitioning
          ? "text-[26px] sm:text-[38px]"
          : "text-[15px] sm:text-[18px]"
      }`}
    >
      Than Htay Hlaing
    </p>
  </div>

  {/* DECOR */}
  <div
    className={`flex items-center gap-2 ${
      isFullscreen || isTransitioning ? "my-4" : "my-2"
    }`}
  >
    <span className="h-px w-6 bg-[#dcc27d]/75" />
    <span className="text-[#c8a042] text-[10px]">✦</span>
    <span className="h-px w-6 bg-[#dcc27d]/75" />
  </div>

  {/* DESCRIPTION */}
  <p
    className={`text-[#7d6c5f] ${
      isFullscreen || isTransitioning
        ? "max-w-[420px] text-[12px] leading-[1.7]"
        : "max-w-[140px] text-[8px] leading-[1.5]"
    }`}
  >
    Together with our families, we invite you to celebrate our love and the
    beginning of our forever.
  </p>

  {/* LINE */}
  <div
    className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
      isFullscreen || isTransitioning
        ? "mt-4 h-px w-20"
        : "mt-3 h-px w-10"
    }`}
  />

  {/* DATE */}
  <div
    className={`${
      isFullscreen || isTransitioning ? "mt-3 space-y-1" : "mt-2 space-y-[2px]"
    }`}
  >
    <p className="uppercase tracking-[0.2em] text-[#af8a39] text-[9px]">
      Sunday
    </p>
    <p className="text-[#8c6a2f] text-[11px] tracking-[0.1em]">
      29 January 2027
    </p>
  </div>
</div>
                  
                </div>
              </motion.div>

              <motion.img
                src="/Envelope Opened Cutted.png"
                alt="Opened envelope front pocket"
                className="envelope-opened-front absolute left-1/2 top-1/2 z-[10]"
                initial={{
                  opacity: 0,
                  scale: SCENE.envelope.opened.scale + 0.02,
                  filter: "blur(6px)",
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.frontY}px)`,
                }}
                animate={{
                  opacity: isFullscreen || isTransitioning ? 0 : 1,
                  scale: SCENE.envelope.opened.scale,
                  filter: "blur(0px)",
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.frontY}px)`,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: EASE },
                  scale: TRANSITIONS.scaleSoft,
                  filter: TRANSITIONS.fadeBlur,
                }}
                style={{
                  width: `${SCENE.envelope.opened.widthPercent}%`,
                  maxWidth: `${SCENE.envelope.opened.mobileMaxWidth}px`,
                  top: "50%",
                  left: "50%",
                  filter: "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
                }}
              />

              {isTransitioning && (
                <motion.div
                  className="absolute inset-0 z-[30] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.55 }}
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

      <style>{`
        @media (min-width: 640px) {
          .envelope-closed {
            max-width: ${SCENE.envelope.closed.desktopMaxWidth}px !important;
          }

          .envelope-opened-back,
          .envelope-opened-front {
            max-width: ${SCENE.envelope.opened.desktopMaxWidth}px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EnvelopeOpening;