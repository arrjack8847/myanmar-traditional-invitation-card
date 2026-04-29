import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CORNER_IMAGE = "/detail-corner.png";

const Divider = () => (
  <div className="mx-auto my-4 flex items-center justify-center gap-2 text-gold">
    <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/55 to-gold/75" />
    <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
    <span className="h-px w-16 bg-gradient-to-l from-transparent via-gold/55 to-gold/75" />
  </div>
);

const CornerImage = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const base =
    "pointer-events-none absolute z-[2] h-[72px] w-[72px] opacity-65 sm:h-[120px] sm:w-[120px]";

  const config = {
    "top-left": {
      className: "left-3 top-3 sm:left-5 sm:top-5",
      transform: "none",
    },
    "top-right": {
      className: "right-3 top-3 sm:right-5 sm:top-5",
      transform: "scaleX(-1)",
    },
    "bottom-left": {
      className: "bottom-3 left-3 sm:bottom-5 sm:left-5",
      transform: "scaleY(-1)",
    },
    "bottom-right": {
      className: "bottom-3 right-3 sm:bottom-5 sm:right-5",
      transform: "scale(-1, -1)",
    },
  }[position];

  return (
    <img
      src={CORNER_IMAGE}
      alt=""
      aria-hidden="true"
      className={`${base} ${config.className}`}
      style={{
        transform: config.transform,
        objectFit: "contain",
      }}
    />
  );
};

const VenueSection = () => {
  const { venue, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  const mainPhoto = venue.photos[0];
  const sidePhotos = venue.photos.slice(1, 3);

  return (
    <section
      id="venue"
      className="myanmar-paper-bg relative overflow-hidden px-4 pb-[calc(env(safe-area-inset-bottom)+7rem)] pt-36 sm:px-6 sm:py-24"
    >
      <div className="section-glow absolute inset-0" />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative overflow-hidden rounded-[30px] border border-gold/45 bg-[#fffaf0]/88 px-4 py-9 shadow-[0_28px_80px_rgba(111,84,42,0.14)] backdrop-blur-sm sm:rounded-[36px] sm:px-10 sm:py-16">
          {/* Double border */}
          <div className="pointer-events-none absolute inset-3 z-[1] rounded-[22px] border border-gold/35 sm:inset-5 sm:rounded-[28px]" />
          <div className="pointer-events-none absolute inset-5 z-[1] rounded-[18px] border border-gold/15 sm:inset-8 sm:rounded-[22px]" />

          {/* Corner ornaments */}
          <CornerImage position="top-left" />
          <CornerImage position="top-right" />
          <CornerImage position="bottom-left" />
          <CornerImage position="bottom-right" />

          {/* Small paper petals */}
          <div className="pointer-events-none absolute left-[18%] top-[14%] h-3 w-2 rotate-45 rounded-full bg-gold/15" />
          <div className="pointer-events-none absolute right-[14%] top-[24%] h-3 w-2 -rotate-12 rounded-full bg-gold/15" />
          <div className="pointer-events-none absolute bottom-[25%] left-[12%] h-3 w-2 rotate-12 rounded-full bg-gold/15" />

          <div className="relative z-10 mx-auto max-w-xl text-center">
            {/* Header */}
            <motion.div
              className="mx-auto mb-4 flex justify-center text-[#b78728]"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <motion.p
              className="font-myanmar text-[13px] font-bold leading-relaxed text-[#b78728] sm:text-base"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
            >
              {venue.eyebrow}
            </motion.p>

            <motion.h2
              className="mx-auto mt-2 max-w-[20rem] font-myanmar text-[2.65rem] font-bold leading-[1.08] text-[#3f2d1f] sm:max-w-none sm:text-[4rem]"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true }}
            >
              {venue.title}
            </motion.h2>

            <Divider />

            <motion.p
              className="mx-auto max-w-[20rem] font-myanmar text-[13px] leading-[1.9] text-[#7a6034] sm:max-w-xl sm:text-base"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.75, ease: EASE }}
              viewport={{ once: true }}
            >
              {venue.description}
            </motion.p>

            {/* Main venue image */}
            {mainPhoto && (
              <motion.div
                className="mx-auto mt-9 overflow-hidden rounded-[28px] border border-gold/35 bg-white/55 p-2 shadow-[0_20px_60px_rgba(111,84,42,0.16)]"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: EASE }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src={mainPhoto}
                    alt={ui.venueAlt}
                    className="h-[330px] w-full object-cover sm:h-[460px]"
                  />
                </div>
              </motion.div>
            )}

            {/* Small venue photos */}
            {sidePhotos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {sidePhotos.map((src, index) => (
                  <motion.div
                    key={src}
                    className="overflow-hidden rounded-[22px] border border-gold/25 bg-white/50 p-1.5 shadow-[0_12px_34px_rgba(111,84,42,0.12)]"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + index * 0.06,
                      duration: 0.7,
                      ease: EASE,
                    }}
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <div className="overflow-hidden rounded-[17px]">
                      <img
                        src={src}
                        alt={ui.venueDetailAlt}
                        className="h-[150px] w-full object-cover sm:h-[220px]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Location button */}
            <motion.div
              className="mb-10 mt-8"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mm-gold-button inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-2xl px-6 font-myanmar text-[15px] font-bold transition active:scale-[0.98] sm:w-auto sm:min-w-[260px]"
              >
                <Navigation className="h-5 w-5" />
                {ui.viewLocation}
              </a>
            </motion.div>

            <div className="pb-4">
              <Divider />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VenueSection;