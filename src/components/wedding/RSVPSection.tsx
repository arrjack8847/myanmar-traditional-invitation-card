import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Check } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyzoYp_Yos1aALSnClTiQQbSXHCueAc6A7b9GM_ZnV0IyvKqr9UCmbfPI4QXQsvrRtnWg/exec";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const celebrationHearts = [
  { x: -42, y: -180, rotate: -28, scale: 0.62, delay: 0 },
  { x: -22, y: -205, rotate: 18, scale: 0.52, delay: 0.1 },
  { x: 4, y: -188, rotate: -8, scale: 0.56, delay: 0.2 },
  { x: 28, y: -215, rotate: 24, scale: 0.6, delay: 0.3 },
  { x: 46, y: -175, rotate: -16, scale: 0.5, delay: 0.4 },
  { x: -52, y: -225, rotate: 12, scale: 0.46, delay: 0.5 },
  { x: 54, y: -235, rotate: -22, scale: 0.48, delay: 0.6 },
  { x: 14, y: -245, rotate: 30, scale: 0.44, delay: 0.7 },
] as const;

const RSVPSection = () => {
  const { toast } = useToast();
  const { rsvp, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast({ title: rsvp.validationMessage, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        attending: form.attending,
        guests: form.attending === "yes" ? form.guests : "0",
        message: form.message.trim(),
      };

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);

      toast({
        title: `${rsvp.successTitle}!`,
        description: rsvp.toastDescription,
      });
    } catch (error) {
      toast({
        title: ui.submissionFailed,
        description: ui.submissionFailedDescription,
        variant: "destructive",
      });

      console.error("RSVP submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-3 py-10 sm:px-6 sm:py-24"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(212,175,108,0.16),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-white/45 to-transparent" />

      {/* SOFT GLOW */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gold/10 blur-[90px] sm:h-[460px] sm:w-[460px]"
        animate={
          reduceMotion
            ? { opacity: 0.16 }
            : { opacity: [0.1, 0.23, 0.1], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* DECOR DOTS */}
      <div className="pointer-events-none absolute left-8 top-24 h-2 w-2 rounded-full bg-gold/45" />
      <div className="pointer-events-none absolute right-8 top-40 h-3 w-3 rounded-full bg-gold/35" />
      <div className="pointer-events-none absolute bottom-28 left-10 h-3 w-3 rounded-full bg-gold/25" />
      <div className="pointer-events-none absolute bottom-40 right-9 h-2 w-2 rounded-full bg-gold/45" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-5 sm:gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* LEFT HEADER */}
          <div className="text-center lg:text-left">
            <motion.p
              className="mx-auto mb-2 max-w-[18rem] text-[9px] uppercase leading-5 tracking-[0.24em] text-gold/80 sm:mb-3 sm:max-w-none sm:text-[11px] sm:tracking-[0.45em] lg:mx-0"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {rsvp.eyebrow}
            </motion.p>

            <motion.h2
              className="mx-auto max-w-[20rem] text-balance font-display text-[2.35rem] leading-[1.08] text-foreground sm:max-w-none sm:text-6xl sm:leading-none md:text-7xl lg:mx-0"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {rsvp.title}
            </motion.h2>

            <motion.div
              className="gold-line mx-auto mt-3 h-px w-20 sm:mt-5 sm:w-24 lg:mx-0"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            />

            <motion.p
              className="mx-auto mt-3 line-clamp-2 max-w-[20rem] text-[13px] leading-[1.6] text-muted-foreground sm:mt-6 sm:line-clamp-none sm:max-w-lg sm:text-base sm:leading-8 lg:mx-0"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {ui.rsvpHelper}
            </motion.p>

            <motion.div
              className="mx-auto mt-7 hidden max-w-sm rounded-[28px] border border-gold/15 bg-white/35 p-5 text-left shadow-[0_20px_55px_rgba(111,84,42,0.08)] backdrop-blur-xl lg:block"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold/80">
                {ui.kindlyReply}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {ui.kindlyReplyText}
              </p>
            </motion.div>
          </div>

          {/* FORM / SUCCESS */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="glass relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[24px] border border-white/50 bg-white/40 p-4 text-left shadow-[0_24px_70px_rgba(111,84,42,0.12)] backdrop-blur-xl sm:max-w-xl sm:rounded-[32px] sm:p-8"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: EASE }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,108,0.14),transparent_45%)]" />
                <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/35 sm:rounded-[32px]" />

                <div className="relative z-10 space-y-3 sm:space-y-5">
                  {/* NAME */}
                  <div>
                    <label className="mb-1.5 block text-[12px] text-muted-foreground sm:mb-2 sm:text-sm">
                      {rsvp.nameLabel}
                    </label>

                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder={rsvp.namePlaceholder}
                      className="h-11 rounded-[16px] border-border/50 bg-background/75 px-4 text-[15px] text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/65 focus:border-gold focus:ring-1 focus:ring-gold/30 sm:h-12 sm:rounded-xl sm:px-5"
                      maxLength={100}
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                  </div>

                  {/* ATTENDING */}
                  <div>
                    <label className="mb-1.5 block text-[12px] text-muted-foreground sm:mb-2 sm:text-sm">
                      {rsvp.attendingLabel}
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {["yes", "no"].map((val) => {
                        const active = form.attending === val;

                        return (
                          <motion.button
                            key={val}
                            type="button"
                            whileTap={
                              isSubmitting ? undefined : { scale: 0.97 }
                            }
                            disabled={isSubmitting}
                            className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-[16px] px-2 py-2 text-center text-[11px] font-semibold leading-[1.25] transition-all sm:min-h-12 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm ${
                              active
                                ? "bg-gold text-primary-foreground shadow-[0_16px_34px_rgba(201,162,92,0.28)]"
                                : "border border-border/50 bg-background/65 text-muted-foreground active:bg-background/80 sm:hover:border-gold/30 sm:hover:bg-background/80"
                            } ${
                              isSubmitting
                                ? "cursor-not-allowed opacity-70"
                                : ""
                            }`}
                            onClick={() =>
                              setForm({ ...form, attending: val })
                            }
                          >
                            {active && val === "yes" && (
                              <Check className="h-4 w-4 shrink-0" />
                            )}
                            <span className="line-clamp-2 sm:line-clamp-none">
                              {val === "yes"
                                ? rsvp.acceptText
                                : rsvp.declineText}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* GUESTS */}
                  <AnimatePresence initial={false}>
                    {form.attending === "yes" && (
                      <motion.div
                        key="guests"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <label className="mb-1.5 block text-[12px] text-muted-foreground sm:mb-2 sm:text-sm">
                          {rsvp.guestsLabel}
                        </label>

                        <Input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="10"
                          value={form.guests}
                          onChange={(e) =>
                            setForm({ ...form, guests: e.target.value })
                          }
                          className="h-11 rounded-[16px] border-border/50 bg-background/75 px-4 text-[15px] text-foreground shadow-sm outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold/30 sm:h-12 sm:rounded-xl sm:px-5"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* MESSAGE */}
                  <div>
                    <label className="mb-1.5 block text-[12px] text-muted-foreground sm:mb-2 sm:text-sm">
                      {rsvp.messageLabel}{" "}
                      <span className="text-muted-foreground/60">
                        ({ui.optional})
                      </span>
                    </label>

                    <Textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder={rsvp.messagePlaceholder}
                      rows={3}
                      className="min-h-[82px] resize-none rounded-[18px] border-border/50 bg-background/75 px-4 py-3 text-[15px] leading-6 text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/65 focus:border-gold focus:ring-1 focus:ring-gold/30 sm:min-h-[112px] sm:rounded-xl sm:px-5 sm:py-3.5"
                      maxLength={500}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* SUBMIT */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`premium-button-shine min-h-[48px] w-full overflow-hidden rounded-full bg-gold px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-[0_16px_34px_rgba(201,162,92,0.26)] transition-all active:scale-[0.98] sm:min-h-12 sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.28em] sm:hover:-translate-y-0.5 sm:hover:brightness-105 ${
                      isSubmitting ? "cursor-not-allowed opacity-80" : ""
                    }`}
                    whileHover={isSubmitting ? undefined : { scale: 1.01 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.99 }}
                  >
                    {isSubmitting ? ui.sending : rsvp.submitText}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="glass relative mx-auto flex w-full max-w-[390px] flex-col items-center overflow-hidden rounded-[32px] border border-white/50 bg-white/40 px-6 py-10 text-center shadow-[0_24px_70px_rgba(111,84,42,0.12)] backdrop-blur-xl sm:max-w-xl sm:p-12"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.9 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,108,0.16),transparent_45%)]" />

                <motion.div
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/25"
                  animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <Heart className="h-10 w-10 fill-gold/30 text-gold" />
                </motion.div>

                <motion.h3
                  className="relative z-10 mb-2 mt-6 font-display text-[1.9rem] leading-tight text-foreground sm:text-3xl"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  {rsvp.successTitle}
                </motion.h3>

                <motion.p
                  className="relative z-10 max-w-sm text-[14px] leading-[1.8] text-muted-foreground sm:text-sm sm:leading-7"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                >
                  {rsvp.successText}
                </motion.p>

                <motion.div
                  className="relative z-10 mt-7 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.6 }}
                />

                {!reduceMotion &&
                  celebrationHearts.map((heart, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-gold/35"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: heart.scale,
                      }}
                      animate={{
                        x: heart.x,
                        y: heart.y,
                        opacity: 0,
                        rotate: heart.rotate,
                      }}
                      transition={{
                        duration: 2.2,
                        delay: heart.delay,
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
