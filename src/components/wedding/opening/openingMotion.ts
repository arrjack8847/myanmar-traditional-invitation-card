import type { WeddingContent } from "@/data/wedding";
import { SCENE, TRANSITIONS } from "./openingConfig";
import type { Stage } from "./openingTypes";

export function getHintText(stage: Stage, intro: WeddingContent["intro"]) {
  if (stage === "sealed") return intro.hint;
  return "";
}

export function getVideoOverlayOpacity(stage: Stage) {
  if (stage === "videoIntro") return 0.9;
  return 0;
}

export function getCardAnimate(stage: Stage, isMobile: boolean) {
  const isExpandedLike =
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  const isVisible =
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "revealed" ||
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  const revealY = isMobile
    ? SCENE.card.small.mobileRevealY
    : SCENE.card.small.revealY;

  const startY = isMobile
    ? SCENE.card.small.mobileStartY
    : SCENE.card.small.startY;

  return {
    opacity: isVisible ? 1 : 0,
    scale: isExpandedLike ? 1 : SCENE.card.small.scale,
    filter:
      stage === "videoIntro" || stage === "siteReveal"
        ? "blur(2px)"
        : isVisible
          ? "blur(0px)"
          : "blur(7px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: isExpandedLike
      ? isMobile
        ? "calc(-50% - 56px)"
        : "-50%"
      : `calc(-50% + ${
          stage === "cardRising" || stage === "revealed" ? revealY : startY
        }px)`,
    rotate: isExpandedLike ? 0 : SCENE.card.small.rotate,
  };
}

export function getCardInitial(isMobile: boolean) {
  const startY = isMobile
    ? SCENE.card.small.mobileStartY
    : SCENE.card.small.startY;

  return {
    opacity: 0,
    scale: 1.045,
    filter: "blur(7px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: `calc(-50% + ${startY}px)`,
    rotate: SCENE.card.small.rotate,
  };
}

export function getCardTransition(stage: Stage) {
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";

  const isExpandedLike =
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  return {
    opacity:
      stage === "videoIntro" || stage === "siteReveal"
        ? TRANSITIONS.fadeBlur
        : isOpeningFade
          ? TRANSITIONS.fadeBlur
          : TRANSITIONS.quick,
    filter:
      stage === "videoIntro" || stage === "siteReveal"
        ? TRANSITIONS.fadeBlur
        : isOpeningFade
          ? TRANSITIONS.fadeBlur
          : TRANSITIONS.quick,
    scale: isOpeningFade
      ? TRANSITIONS.scaleSoft
      : isCardRising
        ? TRANSITIONS.rise
        : isExpandedLike
          ? TRANSITIONS.expand
          : TRANSITIONS.quick,
    y: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
        ? TRANSITIONS.rise
        : isExpandedLike
          ? TRANSITIONS.expand
          : TRANSITIONS.quick,
    rotate: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
        ? TRANSITIONS.rise
        : isExpandedLike
          ? TRANSITIONS.expand
          : TRANSITIONS.quick,
  };
}
