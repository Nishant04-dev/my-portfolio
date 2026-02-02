import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
}

const CursorTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<TrailParticle[]>([]);
  const animationRef = useRef<number>();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Check if device supports hover (not touch-only)
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let particleId = 0;
    let hue = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add new particles
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          id: particleId++,
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          opacity: 1,
          hue: hue,
        });
      }

      // Limit particles
      if (particles.current.length > 50) {
        particles.current = particles.current.slice(-50);
      }

      hue = (hue + 2) % 360;
    };

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.opacity -= 0.02;
        p.size *= 0.98;
        p.y -= 0.5;

        if (p.opacity <= 0) return false;

        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size
        );
        
        // Use red/orange hues matching the theme
        const particleHue = (357 + (p.hue % 30) - 15);
        gradient.addColorStop(0, `hsla(${particleHue}, 83%, 47%, ${p.opacity})`);
        gradient.addColorStop(0.5, `hsla(${particleHue}, 83%, 47%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${particleHue}, 83%, 47%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.remove();
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Glowing cursor follower */}
      <motion.div
        ref={containerRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(357 83% 47% / 0.8), transparent 70%)",
          boxShadow: "0 0 20px hsl(357 83% 47% / 0.5), 0 0 40px hsl(357 83% 47% / 0.3)",
        }}
      />
    </>
  );
};

export default CursorTrail;
