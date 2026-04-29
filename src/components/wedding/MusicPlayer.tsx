import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
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
  minHeight: "100dvh",

  paddingX: "clamp(14px, 4vw, 24px)",
  paddingTop: "max(18px, env(safe-area-inset-top))",
  paddingBottom: "max(18px, env(safe-area-inset-bottom))",

  contentMaxWidth: "min(100%, 430px)",

  contentX: "0px",
  contentY: "clamp(-30px, -4dvh, -12px)",

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
  y: "0px",
  scale: 1,
  width: "clamp(150px, 44vw, 270px)",

  opacity: 0.8,
  marginBottom: -18,

  animationDelay: 0.04,
};

/* TITLE IMAGE CONTROL */
const TITLE = {
  show: true,

  x: "0px",
  y: "-22px",
  scale: 1,
  width: "clamp(218px, 70vw, 350px)",

  marginBottom: -28,

  animationDelay: 0.08,
};

/* PHOTO CARD CONTROL */
const PHOTO_CARD = {
  show: true,

  x: 0,
  y: 0,

  width: "min(100%, clamp(240px, calc(100dvh - 292px), 430px))",
  padding: 7,

  borderRadius: 28,
  innerBorderRadius: 22,

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

/* MUSIC PLAYER CONTROL */
const PLAYER = {
  show: true,

  marginTop: 8,

  timeFontSize: 11,
  progressMarginTop: 3,

  controlsMarginTop: 6,
  controlsGap: 18,

  smallIconSize: 14,
  bigIconSize: 20,

  playButtonSize: 42,

  darkColor: "#2f251b",
  lightColor: "#fffaf0",

  progressActiveColor: "#c89424",
  progressTrackColor: "#d8c38d",
};

/* CONTINUE BUTTON CONTROL */
const CTA_BUTTON = {
  show: true,

  marginTop: 6,

  minHeight: 36,
  paddingX: 18,

  fontSize: 12,
  borderRadius: 999,

  color: "#b78728",
  backgroundOpacity: 0.45,
  borderOpacity: 0.35,

  shake: true,
  shakeDistance: 4,
  shakeDuration: 1.8,
};

/* VOLUME ICON CONTROL */
const VOLUME_ICON = {
  show: false,

  marginTop: 10,
  size: 16,
  opacity: 0.7,
};

/* ========================================================= */

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "00:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const MusicIntroHero = () => {
  const { language, content } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isMyanmar = language === "my";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(MUSIC.loop);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = MUSIC.loop;
    audio.volume = MUSIC.volume;
    audio.muted = MUSIC.startMuted;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
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

      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
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

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const restartSong = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const toggleLoop = () => {
    setIsLooping((current) => {
      const next = !current;

      if (audioRef.current) {
        audioRef.current.loop = next;
      }

      return next;
    });
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      audio.currentTime + 10,
      duration || audio.currentTime
    );
  };

  const goToInvitation = () => {
    const nextSection =
      document.getElementById("main-invitation") ||
      document.getElementById("top");
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        {/* Myanmar traditional divider */}
        {DIVIDER.show && (
          <motion.div
            className="flex w-full justify-center overflow-visible"
            style={{
              marginBottom: DIVIDER.marginBottom,
            }}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: DIVIDER.opacity, y: 0 }}
            transition={{
              delay: DIVIDER.animationDelay,
              duration: 0.75,
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
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: TITLE.animationDelay,
              duration: 0.8,
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
                  fontSize: "clamp(2.5rem, 12vw, 4.6rem)",
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
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
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
            className="w-full"
            style={{
              marginTop: PLAYER.marginTop,
            }}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75, ease: EASE }}
          >
            <div
              className="flex items-center justify-between px-3 font-display font-semibold"
              style={{
                fontSize: PLAYER.timeFontSize,
                color: PLAYER.darkColor,
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div
              className="relative px-3"
              style={{
                marginTop: PLAYER.progressMarginTop,
              }}
            >
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="1"
                value={Math.min(currentTime, duration || currentTime)}
                onChange={(e) => handleSeek(e.target.value)}
                className="music-range h-1 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, ${PLAYER.progressActiveColor} ${progress}%, ${PLAYER.progressTrackColor} ${progress}%)`,
                }}
                aria-label="Music progress"
              />
            </div>

            <div
              className="flex items-center justify-center"
              style={{
                marginTop: PLAYER.controlsMarginTop,
                gap: PLAYER.controlsGap,
                color: PLAYER.darkColor,
              }}
            >
              <button
                type="button"
                onClick={toggleLoop}
                aria-label={isLooping ? "Disable loop" : "Enable loop"}
                aria-pressed={isLooping}
                className="transition active:scale-95"
              >
                <Repeat
                  style={{
                    width: PLAYER.smallIconSize,
                    height: PLAYER.smallIconSize,
                    opacity: isLooping ? 1 : 0.45,
                  }}
                />
              </button>

              <button
                type="button"
                onClick={restartSong}
                aria-label="Restart music"
                className="transition active:scale-95"
              >
                <SkipBack
                  style={{
                    width: PLAYER.bigIconSize,
                    height: PLAYER.bigIconSize,
                    fill: PLAYER.darkColor,
                  }}
                />
              </button>

              <button
                type="button"
                onClick={toggleMusic}
                className="flex items-center justify-center rounded-full shadow-[0_12px_28px_rgba(47,37,27,0.2)] transition active:scale-95"
                style={{
                  width: PLAYER.playButtonSize,
                  height: PLAYER.playButtonSize,
                  backgroundColor: PLAYER.darkColor,
                  color: PLAYER.lightColor,
                }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <Pause
                    style={{
                      width: PLAYER.bigIconSize,
                      height: PLAYER.bigIconSize,
                      fill: PLAYER.lightColor,
                    }}
                  />
                ) : (
                  <Play
                    className="ml-1"
                    style={{
                      width: PLAYER.bigIconSize,
                      height: PLAYER.bigIconSize,
                      fill: PLAYER.lightColor,
                    }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={skipForward}
                aria-label="Skip forward 10 seconds"
                className="transition active:scale-95"
              >
                <SkipForward
                  style={{
                    width: PLAYER.bigIconSize,
                    height: PLAYER.bigIconSize,
                    fill: PLAYER.darkColor,
                  }}
                />
              </button>

              <button
                type="button"
                disabled
                aria-label="Shuffle unavailable"
                className="cursor-not-allowed opacity-45"
              >
                <Shuffle
                  style={{
                    width: PLAYER.smallIconSize,
                    height: PLAYER.smallIconSize,
                  }}
                />
              </button>
            </div>
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

        {/* Volume icon */}
        {VOLUME_ICON.show && (
          <div
            className="flex justify-center text-gold"
            style={{
              marginTop: VOLUME_ICON.marginTop,
              opacity: VOLUME_ICON.opacity,
            }}
          >
            <Volume2
              style={{
                width: VOLUME_ICON.size,
                height: VOLUME_ICON.size,
              }}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default MusicIntroHero;
