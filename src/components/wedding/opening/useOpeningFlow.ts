import { useCallback, useEffect, useRef, useState } from "react";
import { DURATIONS } from "./openingConfig";
import type { Stage } from "./openingTypes";

interface UseOpeningFlowOptions {
  onOpen: () => void;
}

export function useOpeningFlow({ onOpen }: UseOpeningFlowOptions) {
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
        (timeoutId) => timeoutId !== id,
      );
    }, delay);

    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const isBusy =
    stage === "ribbonDrop" ||
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "expanding" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  const handleClick = useCallback(() => {
    if (isBusy) return;

    if (stage === "sealed") {
      clearAllTimeouts();
      setStage("ribbonDrop");

      schedule(() => {
        setStage("openingFade");
      }, DURATIONS.ribbonDrop * 1000);

      schedule(() => {
        setStage("cardRising");
      }, (DURATIONS.ribbonDrop + DURATIONS.openFade + DURATIONS.cardRiseDelay) * 1000);

      schedule(() => {
        setStage("expanding");
      }, (DURATIONS.ribbonDrop + DURATIONS.openFade + DURATIONS.cardRiseDelay + DURATIONS.cardRise) * 1000);

      schedule(() => {
        setStage("invitationHold");
      }, (DURATIONS.ribbonDrop + DURATIONS.openFade + DURATIONS.cardRiseDelay + DURATIONS.cardRise + DURATIONS.expand) * 1000);

      return;
    }

    if (stage === "invitationHold") {
      clearAllTimeouts();
      setStage("videoIntro");

      schedule(() => {
        setStage("siteReveal");
      }, DURATIONS.videoIntro * 1000);

      schedule(() => {
        setStage("done");
        onOpen();
      }, (DURATIONS.videoIntro + DURATIONS.siteReveal) * 1000);
    }
  }, [stage, isBusy, schedule, clearAllTimeouts, onOpen]);

  return { stage, handleClick };
}
