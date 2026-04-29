import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setPetals([]);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const count = isMobile ? 7 : 14;

    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 6 + Math.random() * 88,
      delay: Math.random() * 8,
      duration: isMobile ? 15 + Math.random() * 10 : 9 + Math.random() * 12,
      size: isMobile ? 7 + Math.random() * 10 : 8 + Math.random() * 16,
      opacity: isMobile
        ? 0.12 + Math.random() * 0.18
        : 0.15 + Math.random() * 0.25,
      drift: isMobile ? -18 + Math.random() * 36 : -28 + Math.random() * 56,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.x}%`,
            top: -24,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, petal.drift],
            rotate: [0, 360 * (petal.id % 2 === 0 ? 1 : -1)],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: petal.opacity, display: "block" }}
          >
            <path
              d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12z"
              fill="hsl(var(--gold))"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;
