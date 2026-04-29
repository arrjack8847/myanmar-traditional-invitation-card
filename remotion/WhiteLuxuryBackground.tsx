import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { CSSProperties } from "react";

type LightColumn = {
  left: number;
  width: number;
  opacity: number;
  delay: number;
  blur: number;
};

type Garland = {
  left: number;
  length: number;
  opacity: number;
  delay: number;
  blossoms: number;
  sway: number;
};

type FallingPetal = {
  x: number;
  size: number;
  duration: number;
  offset: number;
  drift: number;
  amplitude: number;
  phase: number;
  spin: number;
  opacity: number;
  blur: number;
};

type FloorPetal = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
  tint: number;
};

const lightColumns: LightColumn[] = Array.from({ length: 18 }, (_, index) => {
  const sideBias = index < 9 ? -1 : 1;
  const lane = index < 9 ? index : index - 9;
  return {
    left:
      3 +
      lane * 5.3 +
      (sideBias > 0 ? 50 : 0) +
      random(`column-${index}`) * 2.1,
    width: 0.38 + random(`column-width-${index}`) * 0.72,
    opacity: 0.36 + random(`column-opacity-${index}`) * 0.36,
    delay: random(`column-delay-${index}`) * 60,
    blur: 4 + random(`column-blur-${index}`) * 9,
  };
});

const garlands: Garland[] = Array.from({ length: 20 }, (_, index) => ({
  left: 10 + index * 4.2 + random(`garland-left-${index}`) * 1.2,
  length: 250 + random(`garland-length-${index}`) * 360,
  opacity: 0.36 + random(`garland-opacity-${index}`) * 0.36,
  delay: random(`garland-delay-${index}`) * 160,
  blossoms: 5 + Math.floor(random(`garland-blossoms-${index}`) * 6),
  sway: 7 + random(`garland-sway-${index}`) * 16,
}));

const fallingPetals: FallingPetal[] = Array.from({ length: 38 }, (_, index) => ({
  x: random(`fall-x-${index}`) * 1250,
  size: 8 + random(`fall-size-${index}`) * 24,
  duration: 5.2 + random(`fall-duration-${index}`) * 8.8,
  offset: random(`fall-offset-${index}`) * 900,
  drift: -120 + random(`fall-drift-${index}`) * 240,
  amplitude: 16 + random(`fall-amplitude-${index}`) * 70,
  phase: random(`fall-phase-${index}`) * Math.PI * 2,
  spin: random(`fall-spin-${index}`) > 0.5 ? 1 : -1,
  opacity: 0.32 + random(`fall-opacity-${index}`) * 0.44,
  blur: random(`fall-blur-${index}`) * 1.8,
}));

const floorPetals: FloorPetal[] = Array.from({ length: 88 }, (_, index) => {
  const centerPull = Math.pow(random(`floor-center-${index}`), 0.46);
  const side = random(`floor-side-${index}`) > 0.5 ? 1 : -1;

  return {
    x: 625 + side * centerPull * 540 + (random(`floor-x-${index}`) - 0.5) * 120,
    y: 493 + Math.pow(random(`floor-y-${index}`), 0.72) * 175,
    size: 8 + random(`floor-size-${index}`) * 28,
    rotate: random(`floor-rotate-${index}`) * 360,
    opacity: 0.52 + random(`floor-opacity-${index}`) * 0.42,
    tint: random(`floor-tint-${index}`),
  };
});

const sparkleDots = Array.from({ length: 72 }, (_, index) => ({
  left: random(`spark-left-${index}`) * 100,
  top: random(`spark-top-${index}`) * 72,
  size: 1.2 + random(`spark-size-${index}`) * 3.8,
  delay: random(`spark-delay-${index}`) * 160,
  opacity: 0.18 + random(`spark-opacity-${index}`) * 0.56,
}));

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const flowerPetalStyle = (index: number): CSSProperties => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "48%",
  height: "66%",
  borderRadius: "58% 42% 58% 42%",
  transform: `translate(-50%, -88%) rotate(${index * 72}deg)`,
  transformOrigin: "50% 92%",
  background:
    "radial-gradient(circle at 42% 18%, rgba(255,255,255,0.99), rgba(244,248,246,0.94) 46%, rgba(196,210,202,0.62) 100%)",
  boxShadow:
    "0 1px 8px rgba(146, 160, 152, 0.32), inset -1px -2px 5px rgba(150, 165, 156, 0.16)",
});

const Flower = ({
  size,
  opacity,
  rotate,
  blur = 0,
}: {
  size: number;
  opacity: number;
  rotate: number;
  blur?: number;
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        opacity,
        filter: `${blur ? `blur(${blur}px) ` : ""}drop-shadow(0 7px 12px rgba(125, 141, 133, 0.18))`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={flowerPetalStyle(index)} />
      ))}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "22%",
          height: "22%",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #ffffff 0%, #f5f1db 48%, rgba(211, 203, 163, 0.42) 100%)",
          boxShadow: "0 0 12px rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
};

const Petal = ({
  size,
  opacity,
  rotate,
  tint,
  blur = 0,
}: {
  size: number;
  opacity: number;
  rotate: number;
  tint: number;
  blur?: number;
}) => {
  const shadowColor =
    tint > 0.72
      ? "rgba(196, 210, 199, 0.3)"
      : tint > 0.38
        ? "rgba(222, 216, 197, 0.3)"
        : "rgba(214, 222, 226, 0.28)";

  return (
    <div
      style={{
        width: size * 0.72,
        height: size,
        borderRadius: "72% 16% 72% 18%",
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        transform: `rotate(${rotate}deg)`,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.99) 0%, rgba(246,249,247,0.94) 42%, rgba(204,216,209,0.82) 100%)",
        boxShadow: `0 4px 18px ${shadowColor}, inset -2px -2px 6px rgba(157, 172, 164, 0.18)`,
      }}
    />
  );
};

const LightCorridor = ({ frame }: { frame: number }) => {
  const { fps } = useVideoConfig();
  const pushIn = interpolate(frame, [0, fps * 51], [1, 1.085], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const glowPulse = 0.88 + Math.sin(frame / 54) * 0.09;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${pushIn})`,
        background:
          "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.88) 0%, rgba(250,251,248,0.58) 20%, transparent 47%), linear-gradient(90deg, #d4ded8 0%, #f0f5f1 17%, #fbfcfa 50%, #eff4f0 83%, #d5dfda 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(101,116,108,0.34) 0%, transparent 18%, transparent 82%, rgba(101,116,108,0.3) 100%), radial-gradient(ellipse at 50% 82%, rgba(255,255,255,0.82) 0%, rgba(230,239,234,0.66) 34%, rgba(185,199,191,0.34) 70%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          clipPath: "polygon(0 0, 24% 0, 39% 100%, 0 100%)",
          background:
            "linear-gradient(90deg, rgba(181,187,179,0.34), rgba(255,255,255,0.08)), repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 86px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          clipPath: "polygon(76% 0, 100% 0, 100% 100%, 61% 100%)",
          background:
            "linear-gradient(270deg, rgba(181,187,179,0.34), rgba(255,255,255,0.08)), repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 86px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 260,
          background:
            "linear-gradient(180deg, rgba(245,249,246,0.16) 0%, rgba(236,244,239,0.76) 22%, rgba(217,229,222,0.96) 100%), repeating-linear-gradient(90deg, transparent 0 155px, rgba(129,145,137,0.18) 156px 158px), repeating-linear-gradient(0deg, transparent 0 78px, rgba(129,145,137,0.17) 79px 81px)",
          boxShadow: "inset 0 54px 88px rgba(255,255,255,0.56)",
        }}
      />

      {lightColumns.map((column, index) => {
        const pulse =
          column.opacity +
          Math.sin((frame + column.delay) / 38) * 0.08 +
          Math.sin((frame + index * 9) / 91) * 0.04;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              bottom: 76,
              left: `${column.left}%`,
              width: `${column.width}%`,
              opacity: Math.max(0.18, pulse) * glowPulse,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.98) 18%, rgba(247,249,247,0.96) 62%, rgba(232,239,235,0.06))",
              boxShadow: `0 0 ${column.blur}px rgba(255,255,255,0.98), 0 0 ${column.blur * 4}px rgba(207,223,217,0.62)`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: "23%",
          right: "23%",
          bottom: 62,
          height: 92,
          opacity: 0.68,
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.76) 0%, rgba(226,239,232,0.54) 40%, rgba(255,255,255,0) 72%)",
          filter: "blur(2px)",
          transform: "perspective(500px) rotateX(58deg)",
        }}
      />
    </AbsoluteFill>
  );
};

const HangingGarlands = ({ frame }: { frame: number }) => {
  return (
    <>
      {garlands.map((garland, index) => {
        const sway = Math.sin((frame + garland.delay) / 78) * garland.sway;
        const twinkle = 0.82 + Math.sin((frame + garland.delay) / 22) * 0.18;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${garland.left}%`,
              top: -14,
              width: 2,
              height: garland.length,
              transform: `translateX(${sway}px)`,
              opacity: garland.opacity * twinkle,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(231,240,235,0.54), rgba(255,255,255,0))",
              boxShadow: "0 0 14px rgba(255,255,255,0.82)",
            }}
          >
            {Array.from({ length: garland.blossoms }, (_, flowerIndex) => {
              const top = 26 + (flowerIndex / garland.blossoms) * (garland.length - 34);
              const offset =
                Math.sin((frame + flowerIndex * 31 + garland.delay) / 34) * 7;
              const flowerSize = 9 + random(`garland-size-${index}-${flowerIndex}`) * 10;

              return (
                <div
                  key={flowerIndex}
                  style={{
                    position: "absolute",
                    top,
                    left: offset,
                    width: flowerSize,
                    height: flowerSize,
                    transform: `translate(-50%, -50%) rotate(${frame * 0.06 + flowerIndex * 23}deg)`,
                  }}
                >
                  <Flower
                    size={flowerSize}
                    opacity={0.9}
                    rotate={flowerIndex * 21}
                    blur={flowerSize < 12 ? 0.2 : 0}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const Sparkles = ({ frame }: { frame: number }) => {
  return (
    <>
      {sparkleDots.map((dot, index) => {
        const shimmer = interpolate(
          Math.sin((frame + dot.delay) / 11),
          [-1, 1],
          [0.14, dot.opacity],
          { easing: EASE }
        );

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              opacity: shimmer,
              background: "#ffffff",
              boxShadow:
                "0 0 10px rgba(255,255,255,0.96), 0 0 24px rgba(209,225,219,0.62)",
            }}
          />
        );
      })}
    </>
  );
};

const FallingPetals = ({ frame }: { frame: number }) => {
  const { fps, height } = useVideoConfig();

  return (
    <>
      {fallingPetals.map((petal, index) => {
        const period = petal.duration * fps;
        const localFrame = (frame + petal.offset) % period;
        const progress = localFrame / period;
        const y = interpolate(progress, [0, 1], [-80, height + 86]);
        const x =
          petal.x +
          Math.sin(progress * Math.PI * 2 + petal.phase) * petal.amplitude +
          petal.drift * (progress - 0.5);
        const fade = interpolate(progress, [0, 0.12, 0.78, 1], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rotate =
          petal.phase * 57.2958 +
          progress * 420 * petal.spin +
          Math.sin(progress * Math.PI * 5) * 22;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${0.72 + Math.sin(progress * Math.PI) * 0.28})`,
            }}
          >
            <Petal
              size={petal.size}
              opacity={petal.opacity * fade}
              rotate={0}
              tint={random(`fall-tint-${index}`)}
              blur={petal.blur}
            />
          </div>
        );
      })}
    </>
  );
};

const FloorFlowers = ({ frame }: { frame: number }) => {
  const breath = 0.96 + Math.sin(frame / 68) * 0.04;

  return (
    <>
      {floorPetals.map((petal, index) => {
        const scale = breath * (0.82 + random(`floor-scale-${index}`) * 0.42);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: petal.x,
              top: petal.y,
              transform: `translate(-50%, -50%) rotate(${petal.rotate}deg) scale(${scale})`,
            }}
          >
            <Petal
              size={petal.size}
              opacity={petal.opacity}
              rotate={0}
              tint={petal.tint}
              blur={random(`floor-blur-${index}`) * 0.65}
            />
          </div>
        );
      })}

      {Array.from({ length: 14 }, (_, index) => {
        const x = 150 + index * 74 + random(`front-flower-x-${index}`) * 38;
        const y = 594 + random(`front-flower-y-${index}`) * 88;
        const size = 32 + random(`front-flower-size-${index}`) * 28;
        const opacity = 0.68 + random(`front-flower-opacity-${index}`) * 0.22;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${breath})`,
            }}
          >
            <Flower
              size={size}
              opacity={opacity}
              rotate={random(`front-flower-rotate-${index}`) * 360}
              blur={0.1}
            />
          </div>
        );
      })}
    </>
  );
};

export const WhiteLuxuryBackground = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const bloom = interpolate(
    frame,
    [0, fps * 6, fps * 38, fps * 51],
    [0.78, 1, 1.06, 0.94],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#fbfcfa",
        opacity: fadeIn,
      }}
    >
      <LightCorridor frame={frame} />
      <HangingGarlands frame={frame} />
      <Sparkles frame={frame} />
      <FloorFlowers frame={frame} />
      <FallingPetals frame={frame} />

      <AbsoluteFill
        style={{
          opacity: 0.42,
          background:
            "radial-gradient(circle at 50% 14%, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.34) 24%, transparent 52%), radial-gradient(circle at 50% 76%, rgba(255,255,255,0.92) 0%, rgba(246,251,248,0.38) 30%, transparent 58%)",
          mixBlendMode: "normal",
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.58,
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 62%, rgba(160,170,166,0.18) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${bloom})`,
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.14) 28%, rgba(255,255,255,0) 62%)",
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
};
