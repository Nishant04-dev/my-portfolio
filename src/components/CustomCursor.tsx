import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cyberpunk custom cursor:
 * - Inner dot: 6px neon green square (chamfered)
 * - Outer ring: 28px chamfered square border that lags behind
 * - On hover over interactive elements: ring expands + color shifts to cyan
 * - On click: ring compresses
 * - Desktop only — hidden on touch devices
 */
const CustomCursor = () => {
  const [visible,   setVisible]   = useState(false);
  const [hovering,  setHovering]  = useState(false);
  const [clicking,  setClicking]  = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring lags behind the dot
  const springCfg = { damping: 22, stiffness: 280, mass: 0.4 };
  const ringX = useSpring(mouseX, springCfg);
  const ringY = useSpring(mouseY, springCfg);

  useEffect(() => {
    // Skip on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    const onOver  = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.classList.contains("cursor-pointer") ||
        el.closest("[data-cursor-hover]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  const dotColor  = hovering ? "#00d4ff" : "#00ff88";
  const ringColor = hovering ? "#00d4ff" : "#00ff88";
  const ringGlow  = hovering
    ? "0 0 8px #00d4ff, 0 0 16px #00d4ff60"
    : "0 0 6px #00ff88, 0 0 12px #00ff8840";

  const ringSize  = clicking ? 20 : hovering ? 36 : 28;
  const dotSize   = clicking ? 4  : 6;

  return (
    <>
      {/* ── Outer chamfered ring (lagging) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: `-${ringSize / 2}px`,
          translateY: `-${ringSize / 2}px`,
          width:  ringSize,
          height: ringSize,
          border: `1.5px solid ${ringColor}`,
          boxShadow: ringGlow,
          clipPath: "polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px))",
          transition: "width 0.12s, height 0.12s, border-color 0.12s, box-shadow 0.12s",
        }}
      />

      {/* ── Inner dot (exact position) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: `-${dotSize / 2}px`,
          translateY: `-${dotSize / 2}px`,
          width:  dotSize,
          height: dotSize,
          background: dotColor,
          boxShadow: `0 0 6px ${dotColor}`,
          clipPath: "polygon(0 2px, 2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px))",
          transition: "width 0.08s, height 0.08s, background 0.12s",
        }}
      />

      {/* ── Crosshair lines (subtle, only on hover) ── */}
      {hovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: mouseX, y: mouseY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Horizontal */}
          <div
            className="absolute"
            style={{
              width: 16, height: 1,
              background: `linear-gradient(90deg, transparent, ${dotColor}, transparent)`,
              top: 0, left: -8,
            }}
          />
          {/* Vertical */}
          <div
            className="absolute"
            style={{
              width: 1, height: 16,
              background: `linear-gradient(180deg, transparent, ${dotColor}, transparent)`,
              top: -8, left: 0,
            }}
          />
        </motion.div>
      )}

      {/* Hide native cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
