import { useState, useCallback, MouseEvent } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const useTilt = (maxTilt = 15) => {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    
    setTilt({ rotateX, rotateY, scale: 1.05 });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: tilt.scale === 1 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
  };

  return { tiltStyle, handleMouseMove, handleMouseLeave };
};
