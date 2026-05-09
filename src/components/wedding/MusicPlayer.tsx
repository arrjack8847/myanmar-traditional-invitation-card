import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* =========================================================
   🎛️ FULL CONTROL PANEL
   ========================================================= */

/* ASSETS */
const MUSIC_SRC = "/music.mp3";
const DIVIDER_IMAGE_SRC = "/boarder.webp";
const TITLE_IMAGE_SRC = "/v2.webp";
const INTRO_IMAGE = "/hero-couple.jpg";

/* MUSIC AUTO PLAY CONTROL */
const MUSIC = {
  autoPlay: true,
  loop: true,
  volume: 0.7,

  // Keep false because you want real music sound.
  // Some mobile browsers may still block sound until first tap.
  startMuted: false,

  // If autoplay is blocked, music starts when user taps anywhere once.
  unlockOnFirstTap: true,
};

/* PAGE / HERO CONTROL */
const HERO = {
  minHeight: "100svh",

  paddingX: "clamp(14px, 4vw, 26px)",
  paddingTop: "max(14px, env(safe-area-inset-top))",
  paddingBottom: "max(18px, env(safe-area-inset-bottom))",

  contentMaxWidth: "min(100%, 420px)",

  contentX: "0px",
  contentY: "clamp(-20px, -2.8svh, -4px)",

  verticalAlign: "center" as "flex-start" | "center",
};

/* BACKGROUND CONTROL */
const BACKGROUND = {
  showGlow: true,
  showTexture: true,
  showVignette: true,

  topGlowSize: 300,
  topGlowOpacity: 0.12,
  topGlowY: 70,

  centerGlowSize: 360,
  centerGlowOpacity: 0.3,

  leftGlowSize: 280,
  leftGlowOpacity: 0.52,

  rightGlowSize: 280,
  rightGlowOpacity: 0.12,
};

/* DIVIDER CONTROL */
const DIVIDER = {
  show: true,

  x: "0px",
  y: "-58px",
  scale: 2,
  width: "clamp(128px, 35vw, 235px)",

  opacity: 1,
  marginBottom: -22,

  animationDelay: 0.04,
};

/* TITLE IMAGE CONTROL */
const TITLE = {
  show: true,

  x: "0px",
  y: "-50px",
  scale: 1.42,
  width: "clamp(175px, 55vw, 305px)",

  marginBottom: -32,

  animationDelay: 0.08,
};

/* PHOTO CARD CONTROL */
const PHOTO_CARD = {
  show: true,

  x: 0,
  y: 0,

  width: "min(100%, clamp(215px, calc(100svh - 342px), 385px))",
  padding: 7,

  borderRadius: 28,
  innerBorderRadius: 21,

  borderOpacity: 0.42,
  backgroundOpacity: 0.58,

  shadow:
    "0 24px 60px rgba(95, 68, 31, 0.15), 0 8px 24px rgba(120, 83, 28, 0.08)",
};

/* PHOTO IMAGE CONTROL */
const PHOTO = {
  aspectRatio: "1242 / 1209",
  height: "auto",
  objectFit: "contain" as "cover" | "contain",
  objectPosition: "center center",
};

/* CAPTION CONTROL */
const CAPTION = {
  show: false,

  text: "အောက်ရှိသီချင်းကိုဖွင့်၍ မင်္ဂလာအခမ်းအနားဖိတ်စာကို ကြည့်ရှုနိုင်ပါသည်။",

  marginTop: 10,
  maxWidth: 352,

  fontSize: 12,
  lineHeight: 1.6,
  color: "#9f7222",
};

/* PREMIUM MUSIC PILL CONTROL */
const PLAYER = {
  show: true,

  marginTop: 10,
  minHeight: 38,
  paddingX: 13,
  iconButtonSize: 27,
  iconSize: 13,
  fontSize: 11,

  color: "#7a5620",
  darkColor: "#392719",
  lightColor: "#fffaf0",

  backgroundOpacity: 0.62,
  borderOpacity: 0.42,
};

/* CONTINUE BUTTON CONTROL */
const CTA_BUTTON = {
  show: true,

  marginTop: 9,

  minHeight: 39,
  paddingX: 20,

  fontSize: 12,
  borderRadius: 999,

  color: "#fffaf0",
  backgroundColor: "#b78728",
  borderOpacity: 0.5,

  glow: true,
  float: true,
  floatDistance: 3,
  floatDuration: 3.8,
};

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

const cinematicScrollTo = (targetTop: number, duration: number) => {
  const startTop = window.scrollY;
  const distance = targetTop - startTop;

  if (duration <= 0 || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    return;
  }

  const startTime = window.performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo({
      top: startTop + distance * eased,
      behavior: "auto",
    });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const MusicIntroHero = () => {
  const { language, content } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isMyanmar = language === "my";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = MUSIC.loop;
    audio.volume = MUSIC.volume;
    audio.muted = MUSIC.startMuted;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    let removeUnlockListeners = () => {};

    const unlockAudio = async () => {
      try {
        audio.muted = false;
        audio.volume = MUSIC.volume;
        await audio.play();
        removeUnlockListeners();
      } catch (error) {
        console.error("Music unlock failed:", error);
      }
    };

    const tryAutoPlay = async () => {
      if (!MUSIC.autoPlay) return;

      try {
        audio.muted = MUSIC.startMuted;
        audio.volume = MUSIC.volume;
        await audio.play();
      } catch {
        console.warn("Autoplay blocked. Waiting for first user tap.");

        if (MUSIC.unlockOnFirstTap) {
          window.addEventListener("pointerdown", unlockAudio, { once: true });
          window.addEventListener("touchstart", unlockAudio, { once: true });
          window.addEventListener("click", unlockAudio, { once: true });

          removeUnlockListeners = () => {
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            window.removeEventListener("click", unlockAudio);
          };
        }
      }
    };

    tryAutoPlay();

    return () => {
      audio.pause();

      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);

      removeUnlockListeners();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = false;
      audio.volume = MUSIC.volume;

      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Music play failed:", error);
    }
  };

  const goToInvitation = () => {
    const nextSection =
      document.getElementById("main-invitation") ||
      document.getElementById("top");

    if (!nextSection) return;

    const introSection = document.getElementById("music-intro");

    const targetTop =
      introSection && nextSection.id === "main-invitation"
        ? introSection.offsetTop + introSection.offsetHeight
        : nextSection.getBoundingClientRect().top + window.scrollY;

    const scrollDuration = reduceMotion ? 0 : 1450;

    cinematicScrollTo(Math.max(targetTop, 0), scrollDuration);
    window.history.replaceState(null, "", "#main-invitation");

    window.setTimeout(() => {
      if (Math.abs(window.scrollY - targetTop) > 2) {
        window.scrollTo({ top: targetTop, behavior: "auto" });
      }
    }, scrollDuration + 160);
  };

  return (
    <section
      id="music-intro"
      className="relative flex justify-center overflow-hidden bg-[#fffaf1] text-[#6d5226]"
      style={{
        minHeight: HERO.minHeight,
        paddingLeft: HERO.paddingX,
        paddingRight: HERO.paddingX,
        paddingTop: HERO.paddingTop,
        paddingBottom: HERO.paddingBottom,
        alignItems: HERO.verticalAlign,
      }}
    >
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="auto"
        autoPlay={MUSIC.autoPlay}
      />

      {/* Luxury background base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,250,239,0.78)_38%,rgba(247,231,198,0.44)_100%)]" />

      {/* Subtle texture */}
      {BACKGROUND.showTexture && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-soft-light [background-image:linear-gradient(115deg,rgba(183,135,40,0.18)_0px,transparent_1px),linear-gradient(245deg,rgba(255,255,255,0.9)_0px,transparent_1px)] [background-size:42px_42px]" />
      )}

      {/* Background glow */}
      {BACKGROUND.showGlow && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-gold blur-[95px]"
            style={{
              top: BACKGROUND.topGlowY,
              width: BACKGROUND.topGlowSize,
              height: BACKGROUND.topGlowSize,
              opacity: BACKGROUND.topGlowOpacity,
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[80px]"
            style={{
              width: BACKGROUND.centerGlowSize,
              height: BACKGROUND.centerGlowSize,
              opacity: BACKGROUND.centerGlowOpacity,
            }}
          />

          <div
            className="pointer-events-none absolute bottom-0 left-0 rounded-full bg-white blur-[80px]"
            style={{
              width: BACKGROUND.leftGlowSize,
              height: BACKGROUND.leftGlowSize,
              opacity: BACKGROUND.leftGlowOpacity,
            }}
          />

          <div
            className="pointer-events-none absolute bottom-0 right-0 rounded-full bg-gold blur-[85px]"
            style={{
              width: BACKGROUND.rightGlowSize,
              height: BACKGROUND.rightGlowSize,
              opacity: BACKGROUND.rightGlowOpacity,
            }}
          />
        </>
      )}

      {/* Soft vignette */}
      {BACKGROUND.showVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_52%,rgba(130,88,25,0.08)_100%)]" />
      )}

      <motion.div
        className="relative z-10 mx-auto flex w-full flex-col items-center text-center"
        style={{
          maxWidth: HERO.contentMaxWidth,
          transform: `translate(${HERO.contentX}, ${HERO.contentY})`,
        }}
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 24,
          scale: reduceMotion ? 1 : 0.97,
          filter: reduceMotion ? "blur(0px)" : "blur(9px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{ duration: 1.55, ease: EASE }}
      >
        {/* Myanmar traditional divider */}
        {DIVIDER.show && (
          <motion.div
            className="flex w-full justify-center overflow-visible"
            style={{
              marginBottom: DIVIDER.marginBottom,
            }}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
              scale: reduceMotion ? 1 : 0.96,
              filter: reduceMotion ? "blur(0px)" : "blur(7px)",
            }}
            animate={{
              opacity: DIVIDER.opacity,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: DIVIDER.animationDelay,
              duration: 1.45,
              ease: EASE,
            }}
          >
            <img
              src={DIVIDER_IMAGE_SRC}
              alt=""
              aria-hidden="true"
              className="h-auto object-contain drop-shadow-[0_10px_18px_rgba(151,105,29,0.12)]"
              style={{
                width: DIVIDER.width,
                opacity: DIVIDER.opacity,
                transform: `translate(${DIVIDER.x}, ${DIVIDER.y}) scale(${DIVIDER.scale})`,
                transformOrigin: "center",
              }}
            />
          </motion.div>
        )}

        {/* Language-aware title */}
        {TITLE.show && (
          <motion.div
            className="flex w-full justify-center overflow-visible"
            style={{
              marginBottom: TITLE.marginBottom,
            }}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 16,
              scale: reduceMotion ? 1 : 0.97,
              filter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: TITLE.animationDelay,
              duration: 1.5,
              ease: EASE,
            }}
          >
            {isMyanmar ? (
              <img
                src={TITLE_IMAGE_SRC}
                alt={content.intro.label}
                className="h-auto object-contain drop-shadow-[0_12px_22px_rgba(151,105,29,0.12)]"
                style={{
                  width: TITLE.width,
                  transform: `translate(${TITLE.x}, ${TITLE.y}) scale(${TITLE.scale})`,
                  transformOrigin: "center",
                }}
              />
            ) : (
              <h1
                className="mx-auto max-w-[18rem] text-balance font-display font-semibold leading-[1.02] text-[#b78728] text-shadow-gold sm:max-w-[30rem]"
                style={{
                  fontSize: "clamp(1.55rem, 7.2vw, 3.2rem)",
                  transform: `translate(${TITLE.x}, ${TITLE.y})`,
                  transformOrigin: "center",
                }}
              >
                {content.intro.label}
              </h1>
            )}
          </motion.div>
        )}

        {/* Main image card */}
        {PHOTO_CARD.show && (
          <motion.div
            className="relative mx-auto overflow-hidden border border-gold bg-white/60"
            style={{
              width: PHOTO_CARD.width,
              padding: PHOTO_CARD.padding,
              borderRadius: PHOTO_CARD.borderRadius,
              borderColor: `rgba(212, 175, 55, ${PHOTO_CARD.borderOpacity})`,
              backgroundColor: `rgba(255, 255, 255, ${PHOTO_CARD.backgroundOpacity})`,
              boxShadow: PHOTO_CARD.shadow,
              transform: `translate(${PHOTO_CARD.x}px, ${PHOTO_CARD.y}px)`,
            }}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
              scale: reduceMotion ? 1 : 0.97,
              filter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ delay: 0.2, duration: 1.6, ease: EASE }}
          >
            {/* outer glass shine */}
            <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/70" />
            <div className="pointer-events-none absolute left-8 right-8 top-1 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            <div
              className="relative overflow-hidden bg-[#fff8ea]"
              style={{
                borderRadius: PHOTO_CARD.innerBorderRadius,
              }}
            >
              <img
                src={INTRO_IMAGE}
                alt={content.couple.display}
                className="block w-full"
                style={{
                  aspectRatio: PHOTO.aspectRatio,
                  height: PHOTO.height,
                  objectFit: PHOTO.objectFit,
                  objectPosition: PHOTO.objectPosition,
                }}
              />

              {/* soft photo depth */}
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.48),inset_0_-30px_50px_rgba(94,64,22,0.05)]" />
            </div>
          </motion.div>
        )}

        {/* Caption */}
        {CAPTION.show && (
          <p
            className="mx-auto font-myanmar"
            style={{
              marginTop: CAPTION.marginTop,
              maxWidth: CAPTION.maxWidth,
              fontSize: CAPTION.fontSize,
              lineHeight: CAPTION.lineHeight,
              color: CAPTION.color,
            }}
          >
            {CAPTION.text}
          </p>
        )}

        {/* Music player */}
        {PLAYER.show && (
          <motion.div
            className="flex w-full justify-center"
            style={{
              marginTop: PLAYER.marginTop,
            }}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
              scale: reduceMotion ? 1 : 0.98,
              filter: reduceMotion ? "blur(0px)" : "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ delay: 0.32, duration: 1.45, ease: EASE }}
          >
            <button
              type="button"
              onClick={toggleMusic}
              className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border shadow-[0_14px_30px_rgba(111,84,42,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 active:scale-[0.97] ${
                isMyanmar ? "font-myanmar" : "font-display tracking-[0.04em]"
              }`}
              style={{
                minHeight: PLAYER.minHeight,
                paddingLeft: PLAYER.paddingX,
                paddingRight: PLAYER.paddingX,
                color: PLAYER.color,
                fontSize: PLAYER.fontSize,
                backgroundColor: `rgba(255, 255, 255, ${PLAYER.backgroundOpacity})`,
                borderColor: `rgba(212, 175, 55, ${PLAYER.borderOpacity})`,
              }}
              aria-label={
                isPlaying ? content.ui.muteMusic : content.ui.unmuteMusic
              }
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-[#fff4d7]/45 to-white/55 opacity-90" />
              <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/55" />

              <span
                className="relative z-10 flex shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(47,37,27,0.18)]"
                style={{
                  width: PLAYER.iconButtonSize,
                  height: PLAYER.iconButtonSize,
                  backgroundColor: PLAYER.darkColor,
                  color: PLAYER.lightColor,
                }}
              >
                {isPlaying ? (
                  <Pause
                    style={{
                      width: PLAYER.iconSize,
                      height: PLAYER.iconSize,
                      fill: PLAYER.lightColor,
                    }}
                  />
                ) : (
                  <Play
                    className="ml-0.5"
                    style={{
                      width: PLAYER.iconSize,
                      height: PLAYER.iconSize,
                      fill: PLAYER.lightColor,
                    }}
                  />
                )}
              </span>

              <span className="relative z-10 max-w-[8.8rem] truncate">
                {isPlaying ? content.ui.muteMusic : content.ui.unmuteMusic}
              </span>

              {/* Tiny luxury equalizer */}
              <span className="relative z-10 ml-0.5 flex h-4 items-end gap-[2px]">
                {[0, 1, 2].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[2px] rounded-full bg-[#b78728]/70"
                    animate={
                      isPlaying && !reduceMotion
                        ? {
                            height: [5, 12, 7, 14, 5],
                          }
                        : {
                            height: 5,
                          }
                    }
                    transition={{
                      duration: 1.1 + bar * 0.15,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut",
                      delay: bar * 0.12,
                    }}
                  />
                ))}
              </span>
            </button>
          </motion.div>
        )}

        {/* Continue button */}
        {CTA_BUTTON.show && (
          <motion.button
            type="button"
            onClick={goToInvitation}
            className={`group relative mx-auto inline-flex items-center justify-center gap-2 overflow-hidden border font-bold shadow-[0_16px_34px_rgba(184,135,36,0.22)] backdrop-blur-md transition hover:-translate-y-0.5 active:scale-[0.98] ${
              isMyanmar ? "font-myanmar" : "font-display tracking-[0.04em]"
            }`}
            style={{
              marginTop: CTA_BUTTON.marginTop,
              minHeight: CTA_BUTTON.minHeight,
              paddingLeft: CTA_BUTTON.paddingX,
              paddingRight: CTA_BUTTON.paddingX,
              fontSize: CTA_BUTTON.fontSize,
              borderRadius: CTA_BUTTON.borderRadius,
              color: CTA_BUTTON.color,
              backgroundColor: CTA_BUTTON.backgroundColor,
              borderColor: `rgba(255, 244, 210, ${CTA_BUTTON.borderOpacity})`,
            }}
            animate={
              !reduceMotion && CTA_BUTTON.float
                ? {
                    y: [0, CTA_BUTTON.floatDistance, 0],
                  }
                : {}
            }
            transition={{
              duration: CTA_BUTTON.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {CTA_BUTTON.glow && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                animate={
                  reduceMotion
                    ? {}
                    : {
                        x: ["-120%", "120%"],
                      }
                }
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.2,
                }}
              />
            )}

            <span className="relative z-10">{content.ui.viewInvitation}</span>

            <motion.span
              className="relative z-10"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, 2, 0],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default MusicIntroHero;