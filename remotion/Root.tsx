import { Composition } from "remotion";
import { WhiteLuxuryBackground } from "./WhiteLuxuryBackground";

export const VIDEO_WIDTH = 1250;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_IN_FRAMES = 120;

export const RemotionRoot = () => {
  return (
    <Composition
      id="WhiteLuxuryBackground"
      component={WhiteLuxuryBackground}
      durationInFrames={VIDEO_DURATION_IN_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
