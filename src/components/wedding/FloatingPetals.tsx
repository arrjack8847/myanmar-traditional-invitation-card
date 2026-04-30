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

    const isTouchLayout = window.matchMedia("(max-width: 1024px)").matches;
    const count = isTouchLayout ? 4 : 14;

    const generated: Petal[] = Array.from({ length: count }, (_, i) => {
      const edgeX = i % 2 === 0 ? 3 + Math.random() * 14 : 83 + Math.random() * 14;

      return {
        id: i,
        x: isTouchLayout ? edgeX : 6 + Math.random() * 88,
        delay: Math.random() * 8,
        duration: isTouchLayout
          ? 34 + Math.random() * 18
          : 9 + Math.random() * 12,
        size: isTouchLayout ? 7 + Math.random() * 7 : 8 + Math.random() * 16,
        opacity: isTouchLayout
          ? 0.08 + Math.random() * 0.08
          : 0.15 + Math.random() * 0.25,
        drift: isTouchLayout
          ? (i % 2 === 0 ? 5 : -5) + Math.random() * 8
          : -28 + Math.random() * 56,
      };
    });
    setPetals(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      style={{ contain: "layout paint" }}
    >
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
