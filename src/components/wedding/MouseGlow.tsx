import { useEffect, useState } from "react";

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full mix-blend-screen"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, hsla(43,76%,52%,0.08) 0%, transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
};

export default MouseGlow;
