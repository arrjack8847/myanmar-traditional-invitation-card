import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ContactSection = () => {
  const { contact, couple } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* BACKGROUND */}
      <div className="section-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(212,175,108,0.16),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-white/45 to-transparent" />

      {/* DECOR */}
      <div className="pointer-events-none absolute left-8 top-24 h-2 w-2 rounded-full bg-gold/45" />
      <div className="pointer-events-none absolute right-10 top-36 h-3 w-3 rounded-full bg-gold/35" />
      <div className="pointer-events-none absolute bottom-36 left-10 h-3 w-3 rounded-full bg-gold/25" />
      <div className="pointer-events-none absolute bottom-28 right-8 h-2 w-2 rounded-full bg-gold/45" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gold/10 blur-[90px] sm:h-[460px] sm:w-[460px]"
        animate={
          reduceMotion
            ? { opacity: 0.14 }
            : { opacity: [0.1, 0.24, 0.1], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="mb-4 flex items-center justify-center gap-3 text-gold/75"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="h-px w-10 bg-gold/35" />
            <Sparkles className="h-4 w-4" />
            <div className="h-px w-10 bg-gold/35" />
          </motion.div>

          <motion.p
            className="mb-3 text-[9px] uppercase tracking-[0.38em] text-gold/80 sm:text-[11px] sm:tracking-[0.45em]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {contact.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-[2.7rem] font-medium leading-[0.95] tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {contact.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-5 h-px w-24 sm:w-28"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-5 max-w-[22rem] text-[13.5px] leading-[1.8] text-muted-foreground sm:max-w-2xl sm:text-base sm:leading-8"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {contact.description}
          </motion.p>
        </div>

        {/* CONTACT CARDS */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-12 md:grid-cols-2">
          {contact.people.map((person, i) => (
            <motion.a
              key={person.name}
              href={`https://wa.me/${person.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/40 p-5 text-left shadow-[0_24px_65px_rgba(111,84,42,0.12)] backdrop-blur-xl sm:p-7"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: EASE }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,108,0.14),transparent_45%)]" />
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/12 ring-1 ring-green-500/20">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-background/50 text-gold transition duration-300 group-hover:bg-gold group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <p className="text-[9px] uppercase tracking-[0.34em] text-gold/80 sm:text-[10px]">
                  {person.role}
                </p>

                <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-foreground sm:text-3xl">
                  {person.name}
                </h3>

                <p className="mt-3 text-[13.5px] leading-7 text-muted-foreground sm:text-sm">
                  {contact.ctaText}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-gold/35" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                  <span className="h-px w-8 bg-gold/25" />
                </div>

                <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/80 sm:text-[11px]">
                  {contact.buttonText}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* FOOTER SIGNATURE */}
        <motion.div
          className="mx-auto mt-12 max-w-2xl rounded-[32px] border border-gold/15 bg-white/35 px-5 py-8 text-center shadow-[0_20px_60px_rgba(111,84,42,0.08)] backdrop-blur-xl sm:mt-14 sm:px-8 sm:py-10"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex items-center justify-center gap-3 text-gold/75">
            <div className="h-px w-10 bg-gold/30" />
            <Heart className="h-4 w-4 fill-gold/20" />
            <div className="h-px w-10 bg-gold/30" />
          </div>

          <p className="mt-5 font-display text-[2rem] leading-tight text-foreground sm:text-4xl">
            {couple.display}
          </p>

          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
            {contact.footerDate}
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <p className="mt-6 text-[10px] tracking-[0.18em] text-muted-foreground/70 sm:text-xs">
            Crafted with love by{" "}
            <span className="text-gold/90">{contact.footerCredit}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
