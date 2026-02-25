import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const getVariants = (direction: RevealDirection) => {
  const hidden: { opacity: number; y?: number; x?: number; scale?: number } = { opacity: 0 };
  const visible: { opacity: number; y?: number; x?: number; scale?: number } = { opacity: 1 };

  switch (direction) {
    case "up":
      hidden.y = 80;
      visible.y = 0;
      break;
    case "down":
      hidden.y = -80;
      visible.y = 0;
      break;
    case "left":
      hidden.x = -80;
      visible.x = 0;
      break;
    case "right":
      hidden.x = 80;
      visible.x = 0;
      break;
    case "scale":
      hidden.scale = 0.85;
      hidden.y = 40;
      visible.scale = 1;
      visible.y = 0;
      break;
    case "fade":
    default:
      hidden.y = 30;
      visible.y = 0;
      break;
  }

  return { hidden, visible };
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const variants = getVariants(direction);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
