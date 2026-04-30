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
const DIVIDER_IMAGE_SRC = "/boarder.png";
const TITLE_IMAGE_SRC = "/v2.png";
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

  paddingX: "clamp(12px, 4vw, 24px)",
  paddingTop: "max(12px, env(safe-area-inset-top))",
  paddingBottom: "max(12px, env(safe-area-inset-bottom))",

  contentMaxWidth: "min(100%, 410px)",

  contentX: "0px",
  contentY: "clamp(-22px, -3svh, -6px)",

  verticalAlign: "center" as "flex-start" | "center",
};

/* BACKGROUND GLOW CONTROL */
const BACKGROUND = {
  showGlow: true,

  topGlowSize: 280,
  topGlowOpacity: 0.1,
  topGlowY: 80,

  leftGlowSize: 280,
  leftGlowOpacity: 0.6,

  rightGlowSize: 280,
  rightGlowOpacity: 0.1,
};

/* DIVIDER CONTROL */
const DIVIDER = {
  show: true,

  x: "0px",
  y: "-60px",
  scale: 2,
  width: "clamp(120px, 34vw, 230px)",

  opacity: 1,
  marginBottom: -20,

  animationDelay: 0.04,
};

/* TITLE IMAGE CONTROL */
const TITLE = {
  show: true,

  x: "0px",
  y: "-50px",
  scale: 1.4,
  width: "clamp(170px, 54vw, 300px)",

  marginBottom: -30,

  animationDelay: 0.08,
};

/* PHOTO CARD CONTROL */
const PHOTO_CARD = {
  show: true,

  x: 0,
  y: 0,

  width: "min(100%, clamp(205px, calc(100svh - 340px), 380px))",
  padding: 6,

  borderRadius: 24,
  innerBorderRadius: 19,

  borderOpacity: 0.3,
  backgroundOpacity: 0.45,

  shadow: "0 18px 45px rgba(111,84,42,0.13)",
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

  marginTop: 8,
  maxWidth: 352,

  fontSize: 12,
  lineHeight: 1.5,
  color: "#b78728",
};

/* PREMIUM MUSIC PILL CONTROL */
const PLAYER = {
  show: true,

  marginTop: 8,
  minHeight: 34,
  paddingX: 12,
  iconButtonSize: 25,
  iconSize: 13,
  fontSize: 11,

  color: "#7a5620",
  darkColor: "#3a2a1d",
  lightColor: "#fffaf0",

  backgroundOpacity: 0.5,
  borderOpacity: 0.38,
};

/* CONTINUE BUTTON CONTROL */
const CTA_BUTTON = {
  show: true,

  marginTop: 7,

  minHeight: 36,
  paddingX: 18,

  fontSize: 12,
  borderRadius: 999,

  color: "#b78728",
  backgroundOpacity: 0.45,
  borderOpacity: 0.35,

  shake: true,
  shakeDistance: 2,
  shakeDuration: 4.2,
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
      } catch (error) {
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
      document.getElementById("top") ||
      document.getElementById("main-invitation");

    if (!nextSection) return;

    const introSection = document.getElementById("music-intro");
    const targetTop =
      introSection && nextSection.id === "top"
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
      className="myanmar-paper-bg relative flex justify-center overflow-hidden text-[#6d5226]"
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

      {/* Background glow */}
      {BACKGROUND.showGlow && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-gold blur-[90px]"
            style={{
              top: BACKGROUND.topGlowY,
              width: BACKGROUND.topGlowSize,
              height: BACKGROUND.topGlowSize,
              opacity: BACKGROUND.topGlowOpacity,
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
            className="pointer-events-none absolute bottom-0 right-0 rounded-full bg-gold blur-[80px]"
            style={{
              width: BACKGROUND.rightGlowSize,
              height: BACKGROUND.rightGlowSize,
              opacity: BACKGROUND.rightGlowOpacity,
            }}
          />
        </>
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
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
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
              className="h-auto object-contain"
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
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
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
                className="h-auto object-contain"
                style={{
                  width: TITLE.width,
                  transform: `translate(${TITLE.x}, ${TITLE.y}) scale(${TITLE.scale})`,
                  transformOrigin: "center",
                }}
              />
            ) : (
              <h1
                className="font-display font-semibold leading-[0.95] text-[#b78728] text-shadow-gold"
                style={{
                  fontSize: "clamp(2.15rem, 10vw, 4.4rem)",
                  transform: `translate(${TITLE.x}, ${TITLE.y}) scale(${TITLE.scale})`,
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
            className="mx-auto overflow-hidden border border-gold bg-white"
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
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 1.6, ease: EASE }}
          >
            <div
              className="overflow-hidden"
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
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.32, duration: 1.45, ease: EASE }}
          >
            <button
              type="button"
              onClick={toggleMusic}
              className={`inline-flex items-center justify-center gap-2 rounded-full border shadow-[0_12px_28px_rgba(111,84,42,0.11)] backdrop-blur-md transition active:scale-[0.97] ${
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
              aria-label={isPlaying ? content.ui.muteMusic : content.ui.unmuteMusic}
            >
              <span
                className="flex shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(47,37,27,0.18)]"
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
              <span className="max-w-[8.5rem] truncate">
                {isPlaying ? content.ui.muteMusic : content.ui.unmuteMusic}
              </span>
            </button>
          </motion.div>
        )}

        {/* Continue button */}
        {CTA_BUTTON.show && (
          <motion.button
            type="button"
            onClick={goToInvitation}
            className={`mx-auto inline-flex items-center justify-center gap-2 border font-bold shadow-[0_10px_22px_rgba(184,135,36,0.10)] backdrop-blur-md transition active:scale-[0.98] ${
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
              backgroundColor: `rgba(255, 255, 255, ${CTA_BUTTON.backgroundOpacity})`,
              borderColor: `rgba(212, 175, 55, ${CTA_BUTTON.borderOpacity})`,
            }}
            animate={
              !reduceMotion && CTA_BUTTON.shake
                ? { y: [0, CTA_BUTTON.shakeDistance, 0] }
                : {}
            }
            transition={{
              duration: CTA_BUTTON.shakeDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {content.ui.viewInvitation}
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        )}

      </motion.div>
    </section>
  );
};

export default MusicIntroHero;
