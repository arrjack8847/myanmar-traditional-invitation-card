import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeddingContent } from "@/context/language";

interface Props {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const HeroCountdown = ({ targetDate }: Props) => {
  const { ui } = useWeddingContent();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: ui.countdown.days, value: timeLeft.days },
    { label: ui.countdown.hours, value: timeLeft.hours },
    { label: ui.countdown.minutes, value: timeLeft.minutes },
    { label: ui.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid w-full max-w-[21rem] grid-cols-4 gap-1.5 sm:max-w-none sm:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex min-h-[4.7rem] flex-col items-center justify-center rounded-xl border border-white/15 bg-black/20 px-1.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:min-h-[6.25rem] sm:rounded-2xl sm:bg-white/5 sm:px-4 sm:py-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <motion.p
              key={item.value}
              className="font-display text-[1.65rem] leading-none text-white sm:text-3xl"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.value}
            </motion.p>

            <p className="mt-1.5 text-[7px] uppercase tracking-[0.12em] text-gold-light sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroCountdown;
