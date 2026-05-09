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
    const count = isTouchLayout ? 9 : 24;

    const generated: Petal[] = Array.from({ length: count }, (_, i) => {
      const edgeX = i % 2 === 0 ? 3 + Math.random() * 14 : 83 + Math.random() * 14;

      return {
        id: i,
        x: isTouchLayout ? edgeX : 6 + Math.random() * 88,
        delay: Math.random() * 8,
        duration: isTouchLayout
          ? 30 + Math.random() * 16
          : 12 + Math.random() * 13,
        size: isTouchLayout ? 8 + Math.random() * 8 : 9 + Math.random() * 17,
        opacity: isTouchLayout
          ? 0.18 + Math.random() * 0.16
          : 0.22 + Math.random() * 0.26,
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
      className="pointer-events-none fixed inset-0 z-[6] overflow-hidden"
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
            filter:
              "drop-shadow(0 0 10px rgba(214, 169, 60, 0.42)) drop-shadow(0 8px 14px rgba(111, 84, 42, 0.12))",
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
            <path
              d="M12 4.7c-2.2 2.6-4.4 5.4-4.4 8.1 0 2.9 2 5.2 4.4 5.2"
              stroke="rgba(255,255,255,0.42)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;
