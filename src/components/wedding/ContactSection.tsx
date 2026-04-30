import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ContactSection = () => {
  const { contact, couple } = useWeddingContent();
  const reduceMotion = useReducedMotion();
  const motionDisabled = Boolean(reduceMotion);

  return (
    <section className="myanmar-paper-bg relative flex items-center overflow-hidden px-4 py-14 sm:min-h-screen sm:px-6 sm:py-24">
      {/* BACKGROUND */}
      <div className="section-glow absolute inset-0" />

      {/* DECOR */}
      <div className="pointer-events-none absolute left-8 top-24 hidden h-2 w-2 rounded-full bg-gold/45 sm:block" />
      <div className="pointer-events-none absolute right-10 top-36 hidden h-3 w-3 rounded-full bg-gold/35 sm:block" />
      <div className="pointer-events-none absolute bottom-36 left-10 hidden h-3 w-3 rounded-full bg-gold/25 sm:block" />
      <div className="pointer-events-none absolute bottom-28 right-8 hidden h-2 w-2 rounded-full bg-gold/45 sm:block" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gold/10 blur-[90px] sm:h-[460px] sm:w-[460px]"
        animate={
          motionDisabled
            ? { opacity: 0.14 }
            : { opacity: [0.1, 0.24, 0.1], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="mb-2 flex items-center justify-center gap-2 text-gold/75 sm:mb-4 sm:gap-3"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 12,
              scale: reduceMotion ? 1 : 0.98,
              filter: reduceMotion ? "blur(0px)" : "blur(6px)",
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.35, ease: EASE }}
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="h-px w-8 bg-gold/35 sm:w-10" />
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <div className="h-px w-8 bg-gold/35 sm:w-10" />
          </motion.div>

          <motion.p
            className="mb-2 text-[8px] uppercase tracking-[0.32em] text-gold/80 sm:mb-3 sm:text-[11px] sm:tracking-[0.45em]"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
              scale: reduceMotion ? 1 : 0.98,
              filter: reduceMotion ? "blur(0px)" : "blur(6px)",
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.35, ease: EASE }}
            viewport={{ once: true, amount: 0.18 }}
          >
            {contact.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-[clamp(1.85rem,8.5vw,2.35rem)] font-medium leading-[1.08] tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 24,
              scale: reduceMotion ? 1 : 0.97,
              filter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.45, ease: EASE }}
            viewport={{ once: true, amount: 0.18 }}
          >
            {contact.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-4 h-px w-20 sm:mt-5 sm:w-28"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.35, delay: 0.12, ease: EASE }}
            viewport={{ once: true, amount: 0.18 }}
          />

          <motion.p
            className="mx-auto mt-3 max-w-[19rem] text-[12.5px] leading-[1.55] text-muted-foreground sm:mt-5 sm:max-w-2xl sm:text-base sm:leading-8"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
              scale: reduceMotion ? 1 : 0.98,
              filter: reduceMotion ? "blur(0px)" : "blur(6px)",
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.18, duration: 1.4, ease: EASE }}
            viewport={{ once: true, amount: 0.18 }}
          >
            {contact.description}
          </motion.p>
        </div>

        {/* CONTACT CARDS */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-2.5 sm:mt-12 sm:gap-4 md:grid-cols-2">
          {contact.people.map((person, i) => (
            <motion.a
              key={person.name}
              href={`https://wa.me/${person.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group relative overflow-hidden rounded-[20px] border border-white/50 bg-white/40 p-3.5 text-left shadow-[0_18px_45px_rgba(111,84,42,0.1)] backdrop-blur-xl sm:rounded-[30px] sm:p-7 sm:shadow-[0_24px_65px_rgba(111,84,42,0.12)]"
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 24,
                scale: reduceMotion ? 1 : 0.96,
                filter: reduceMotion ? "blur(0px)" : "blur(7px)",
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: i * 0.14, duration: 1.35, ease: EASE }}
              viewport={{ once: true, amount: 0.16 }}
              whileHover={motionDisabled ? undefined : { y: -5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,108,0.14),transparent_45%)]" />
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:h-32 sm:w-32" />

              <div className="relative z-10 sm:block">
                <div className="flex items-center gap-4 sm:mb-6 sm:justify-between">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/12 ring-1 ring-green-500/20 sm:h-14 sm:w-14">
                    <MessageCircle className="h-[18px] w-[18px] text-green-600 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1 sm:hidden">
                    <p className="text-[8px] uppercase tracking-[0.24em] text-gold/80">
                      {person.role}
                    </p>
                    <h3 className="mt-1 truncate font-display text-[1.35rem] leading-tight text-foreground">
                      {person.name}
                    </h3>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-background/50 text-gold transition duration-300 group-hover:bg-gold group-hover:text-white sm:h-10 sm:w-10">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                  </div>
                </div>

                <p className="hidden text-[9px] uppercase tracking-[0.34em] text-gold/80 sm:block sm:text-[10px]">
                  {person.role}
                </p>

                <h3 className="mt-3 hidden font-display text-[1.75rem] leading-tight text-foreground sm:block sm:text-3xl">
                  {person.name}
                </h3>

                <p className="mt-3 hidden text-[12.5px] leading-5 text-muted-foreground sm:block sm:text-sm sm:leading-7">
                  {contact.ctaText}
                </p>

                <div className="mt-4 hidden items-center gap-3 sm:mt-6 sm:flex">
                  <span className="h-px w-12 bg-gold/35" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                  <span className="h-px w-8 bg-gold/25" />
                </div>

                <p className="mt-2 text-[8.5px] font-medium uppercase tracking-[0.16em] text-foreground/80 sm:mt-6 sm:text-[11px] sm:tracking-[0.25em]">
                  {contact.buttonText}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* FOOTER SIGNATURE */}
        <motion.div
          className="mx-auto mt-6 max-w-2xl rounded-[22px] border border-gold/15 bg-white/35 px-5 py-4 text-center shadow-[0_16px_44px_rgba(111,84,42,0.07)] backdrop-blur-xl sm:mt-14 sm:rounded-[32px] sm:px-8 sm:py-10 sm:shadow-[0_20px_60px_rgba(111,84,42,0.08)]"
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
            scale: reduceMotion ? 1 : 0.97,
            filter: reduceMotion ? "blur(0px)" : "blur(8px)",
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.24, ease: EASE }}
          viewport={{ once: true, amount: 0.16 }}
        >
          <div className="flex items-center justify-center gap-3 text-gold/75">
            <div className="h-px w-10 bg-gold/30" />
            <Heart className="h-4 w-4 fill-gold/20" />
            <div className="h-px w-10 bg-gold/30" />
          </div>

          <p className="mt-3 font-display text-[1.45rem] leading-tight text-foreground sm:mt-5 sm:text-4xl">
            {couple.display}
          </p>

          <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.18em] text-muted-foreground sm:mt-3 sm:text-xs sm:tracking-[0.28em]">
            {contact.footerDate}
          </p>

          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent sm:mt-6 sm:w-20" />

          <p className="mt-3 text-[8.5px] tracking-[0.1em] text-muted-foreground/70 sm:mt-6 sm:text-xs sm:tracking-[0.18em]">
            {contact.footerCreditPrefix}{" "}
            <span className="text-gold/90">{contact.footerCredit}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
