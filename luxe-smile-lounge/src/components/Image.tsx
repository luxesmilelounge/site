import { motion } from "motion/react";

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
      size = "w-full h-1full";
      break;
  }

  const fadeInPx = props.fadeInPx || "50px";
  const x = props.fadeIn === "left" ? `-${fadeInPx}` : fadeInPx;

  return (
    <motion.div
      initial={{
        opacity: 0.8,
        x: x,
        boxShadow: "0px 3px 4px 2px rgba(0,0,0,.15)",
      }}
      whileInView={{ opacity: 1, x: "0px" }}
      whileHover={{ scale: 1.01, boxShadow: "0px 3px 4px 3px rgba(0,0,0,.2)" }}
      className="w-fit h-full group overflow-hidden rounded-lg"
    >
      <img className={`${size} object-cover`} src={props.src} />
    </motion.div>
  );
};

export default Image;
