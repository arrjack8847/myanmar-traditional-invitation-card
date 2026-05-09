import type { Transition } from "framer-motion";

export const INVITATION_CARD_SRC = "/wedding-card.webp";
export const EN_INVITATION_CARD_SRC = "/eng-photo.webp";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATIONS = {
  ribbonDrop: 1.05,
  openFade: 1.25,
  cardRise: 1.75,
  expand: 1.35,
  invitationHold: 1.05,
  videoIntro: 2.85,
  siteReveal: 1.65,
  cardRiseDelay: 0.16,
  quick: 0.75,
  medium: 1.15,
  soft: 1.45,
  long: 1.75,
} as const;

export const FLOAT_TRANSITION: Transition = {
  duration: 4.2,
  repeat: Infinity,
  ease: "easeInOut",
};

export const SCENE = {
  envelope: {
    closed: {
      y: 12,
      scale: 1,
      mobileScale: 1.05,
    },
    opened: {
      scale: 1.2,
      mobileScale: 1.28,
      x: 0,
      backY: -8,
      frontY: -10,
      mobileBackY: -4,
      mobileFrontY: -6,
    },
  },

  card: {
    small: {
      aspectRatio: "2 / 3",
      startY: -10,
      revealY: -46,
      mobileStartY: -4,
      mobileRevealY: -26,
      x: 0,
      rotate: -0.2,
      scale: 1.015,
      width: "min(46vw, 180px)",
      mobileWidth: "min(42vw, 150px)",
    },
    fullscreen: {
      aspectRatio: "2 / 3",
      mobileAspectRatio: "2 / 3",
      width: "min(72vw, 380px, 52svh)",
      mobileWidth: "min(78vw, 330px, 52svh)",
    },
  },

  glow: {
    size: 270,
    mobileSize: 195,
    yOffset: -26,
    mobileYOffset: -12,
    blur: 30,
  },

  sceneOffset: {
    mobileY: -12,
    desktopY: 10,
  },
} as const;

export const TRANSITIONS = {
  quick: { duration: DURATIONS.quick, ease: EASE } satisfies Transition,
  medium: { duration: DURATIONS.medium, ease: EASE } satisfies Transition,
  fadeBlur: { duration: DURATIONS.soft, ease: EASE } satisfies Transition,
  scaleSoft: { duration: DURATIONS.long, ease: EASE } satisfies Transition,
  rise: { duration: DURATIONS.cardRise, ease: EASE } satisfies Transition,
  expand: { duration: DURATIONS.expand, ease: EASE } satisfies Transition,
};
