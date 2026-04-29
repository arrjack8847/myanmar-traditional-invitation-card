import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const StorySection = () => {
  const { stories, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {stories.map((story, i) => {
        const isCenter = i === 0;
        const isLeftCard = i === 1;
        const isFinal = i === 2;

        const chapterLabel = isCenter
          ? ui.chapterOne
          : isLeftCard
            ? ui.chapterTwo
            : ui.finalChapter;

        return (
          <section key={i} className="relative overflow-hidden bg-[#fbf5eb]">
            {/* Mobile layout keeps the full photo visible. */}
            <div className="block px-4 py-12 sm:hidden">
              <motion.div
                className="mx-auto max-w-[420px]"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE }}
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Photo card */}
                <div className="relative overflow-hidden rounded-[30px] border border-[#e8d7b4] bg-[#f6ecdc] shadow-[0_24px_60px_rgba(111,84,42,0.14)]">
                  {/* soft blurred fill behind image */}
                  <img
                    src={story.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                  />

                  {/* full visible image */}
                  <img
                    src={story.image}
                    alt={story.title}
                    className="relative z-10 block h-auto w-full object-contain"
                  />

                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
                </div>

                {/* Text card */}
                <motion.div
                  className="relative z-10 mx-auto -mt-7 w-[92%] rounded-[28px] border border-[#ead9b8] bg-[#fffaf2]/95 px-5 py-7 text-center shadow-[0_18px_50px_rgba(111,84,42,0.13)] backdrop-blur-md"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <p className="mb-3 text-[8.5px] uppercase tracking-[0.32em] text-[#b99245]">
                    {chapterLabel}
                  </p>

                  <div className="mx-auto mb-4 flex items-center justify-center gap-2.5">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c89d43]/70" />
                    <div className="h-[4px] w-[4px] rounded-full bg-[#c89d43]" />
                    <div className="h-px w-10 bg-[#c89d43]/80" />
                    <div className="h-[4px] w-[4px] rounded-full bg-[#c89d43]" />
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c89d43]/70" />
                  </div>

                  <h2 className="font-display mb-4 text-[2rem] leading-[1.05] text-[#3d3128]">
                    {story.title}
                  </h2>

                  {isFinal && (
                    <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                      <div className="h-px w-10 bg-[#c89d43]/45" />
                      <Sparkles className="h-4 w-4 text-[#c89d43]" />
                      <div className="h-px w-10 bg-[#c89d43]/45" />
                    </div>
                  )}

                  <p className="mx-auto max-w-[19rem] text-[13.5px] font-light leading-[1.85] text-[#5f5249]">
                    {story.text}
                  </p>

                  <div className="mx-auto mt-6 h-px w-14 bg-gradient-to-r from-transparent via-[#c89d43] to-transparent" />
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop and tablet layout uses the photo as a cinematic background. */}
            <div className="relative hidden min-h-screen w-full items-center overflow-hidden sm:flex">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduceMotion ? 1 : 1.08 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 12,
                  ease: "linear",
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35" />

                {isCenter && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,180,0.12),transparent_22%,rgba(0,0,0,0.34)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
                  </>
                )}

                {isLeftCard && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                  </>
                )}

                {isFinal && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,223,160,0.15),transparent_24%,rgba(0,0,0,0.36)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/18 to-background/95" />
                  </>
                )}
              </motion.div>

              <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-16 md:px-10">
                {isCenter && (
                  <div className="mx-auto max-w-3xl text-center">
                    <motion.div
                      className="mx-auto mb-8 flex items-center justify-center gap-3"
                      initial={{ opacity: 0, scaleX: 0.85 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.8, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
                      <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
                      <div className="h-px w-16 bg-gold" />
                      <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
                    </motion.div>

                    <motion.h2
                      className="font-display mb-6 text-5xl leading-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] md:text-6xl"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      {story.title}
                    </motion.h2>

                    <motion.p
                      className="mx-auto max-w-2xl text-lg font-light leading-8 text-white/85"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.25, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      {story.text}
                    </motion.p>

                    <motion.div
                      className="mx-auto mt-8 h-px w-16 bg-gold"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                      viewport={{ once: true }}
                    />
                  </div>
                )}

                {isLeftCard && (
                  <div className="flex justify-start">
                    <motion.div
                      className="w-full max-w-xl rounded-[30px] border border-white/10 bg-black/30 p-9 text-left shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-md"
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : -36,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <motion.p
                        className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/80"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        viewport={{ once: true }}
                      >
                        {ui.chapterTwo}
                      </motion.p>

                      <motion.h2
                        className="font-display mb-5 text-5xl leading-tight text-white"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
                        viewport={{ once: true }}
                      >
                        {story.title}
                      </motion.h2>

                      <motion.div
                        className="mb-6 h-px w-16 bg-gold"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                        viewport={{ once: true }}
                      />

                      <motion.p
                        className="text-lg font-light leading-8 text-white/85"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                        viewport={{ once: true }}
                      >
                        {story.text}
                      </motion.p>
                    </motion.div>
                  </div>
                )}

                {isFinal && (
                  <div className="mx-auto max-w-3xl text-center">
                    <motion.p
                      className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/80"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      {ui.finalChapter}
                    </motion.p>

                    <motion.h2
                      className="font-display mb-6 text-5xl leading-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] md:text-6xl"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      {story.title}
                    </motion.h2>

                    <motion.div
                      className="mx-auto mb-7 flex items-center justify-center gap-3"
                      initial={{ opacity: 0, scaleX: 0.85 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <div className="h-px w-16 bg-gold/40" />
                      <Sparkles className="h-5 w-5 text-gold" />
                      <div className="h-px w-16 bg-gold/40" />
                    </motion.div>

                    <motion.p
                      className="mx-auto max-w-2xl text-lg font-light leading-8 text-white/85"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.95, delay: 0.25, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      {story.text}
                    </motion.p>

                    <motion.div
                      className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                      viewport={{ once: true }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default StorySection;
