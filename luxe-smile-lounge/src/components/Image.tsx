import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export interface ImageProps {
  src: string;
  size: "sm" | "md" | "lg" | "xl" | "full";
  fadeIn: "left" | "right";
  fadeInPx?: string;
}

const Image = (props: ImageProps) => {
  const propSize = props.size || "md";
  let size;

  switch (propSize) {
    case "sm":
      size = "w-40 h-40";
      break;
    case "md":
      size = "w-80 h-80";
      break;
    case "lg":
      size = "w-100 h-100";
      break;
    case "xl":
      size = "w-120 h-120";
      break;
    case "full":
      size = "w-full h-full";
      break;
  }

  const fadeInPx = props.fadeInPx || "50";
  const fadeX = props.fadeIn === "left" ? -Number(fadeInPx) : Number(fadeInPx);

  // Mouse reactive motion
  const ref = useRef<HTMLDivElement>(null);

  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);

  const springX = useSpring(xMotion, { stiffness: 350, damping: 20 });
  const springY = useSpring(yMotion, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / 15; // lower = heavier
    const distanceY = (e.clientY - centerY) / 15;

    xMotion.set(distanceX);
    yMotion.set(distanceY);
  };

  const handleMouseLeave = () => {
    xMotion.set(0);
    yMotion.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0.8, x: fadeX }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-fit h-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transform-gpu will-change-transform"
    >
      <img className={`${size} object-cover`} src={props.src} />
    </motion.div>
  );
};

export default Image;
