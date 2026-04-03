import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const stateRef     = useRef({
    particles:   [] as Particle[],
    animId:      0,
    mouse:       { x: -999, y: -999 },
    isInView:    true,
    lastMouse:   0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([e]) => { state.isInView = e.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Fewer particles on mobile
    const isMobile = window.innerWidth < 768;
    const COUNT    = isMobile ? 20 : 35;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recreate particles on resize
      state.particles = Array.from({ length: COUNT }, () => ({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.18,
        vy:      (Math.random() - 0.5) * 0.18,
        size:    Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      state.animId = requestAnimationFrame(draw);
      if (!state.isInView) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { mouse } = state;
      for (const p of state.particles) {
        const dx   = mouse.x - p.x;
        const dy   = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,255,136,${0.07 * (1 - dist / 90)})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${p.opacity * 0.55})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
    };

    // Throttle mouse to ~30fps equivalent
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - state.lastMouse < 32) return;
      state.lastMouse = now;
      state.mouse = { x: e.clientX, y: e.clientY };
    };

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(state.animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticleBackground;
