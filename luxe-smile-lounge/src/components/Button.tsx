import { type HTMLMotionProps, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

//button properties
export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large" | "xl";
  children: ReactNode;
  href?: string;
}

const Button = (props: ButtonProps) => {
  const navigate = useNavigate();
  const clicked = () => {
    if (props.href) {
      navigate(props.href);
    }
  };

  const size = props.size || "medium";
  const variant = props.variant || "primary";

  let sizeDesign;
  switch (size) {
    case "small":
      sizeDesign = "px-12 py-2 text-md";
      break;
    case "medium":
      sizeDesign = "px-12 py-2.5 text-lg";
      break;
    case "large":
      sizeDesign = "px-12 py-3 text-xl";
      break;
    case "xl":
      sizeDesign = "px-16 py-3 text-2xl font-bold";
      break;
  }

  let variantDesign;

  switch (variant) {
    case "primary":
      variantDesign = "bg-sub";
      break;

    case "secondary":
      variantDesign = "bg-sub-blue text-sub";
      break;
  }

  const ref = useRef<HTMLButtonElement>(null);
  const skewX = useMotionValue(0);

  const skewXSpring = useSpring(skewX, { stiffness: 400, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / 75; 
    let distanceY = (e.clientY - centerY) / 25;

    if (distanceY <= 0) {
      distanceY = 0
    }

    const reverse = distanceX < 0 ? -1 : 1;
    skewX.set(distanceX + (distanceY * reverse));
  };

  const handleMouseLeave = () => {
    skewX.set(0);
  };


  return (
    <motion.button
      onClick={clicked}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
      initial={{
        opacity: 0.7,
        boxShadow: "0px 3px 4px 2px rgba(0,0,0,.02)",
        y: "25px",
      }}
      style={{ rotateZ: skewXSpring }}
      transition={{  duration: .2}}
      whileTap={{ scale: 0.95, boxShadow: "0px 1px 6px 5px rgba(0,0,0,.05)" }}
      whileInView={{ opacity: 1, y: "0px" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 1px 4px 2px rgba(0,0,0,.1)" }}
      className={`${variantDesign} ${sizeDesign} w-fit font-semibold cursor-pointer rounded-sm uppercase`}
      {...props}
    >
      {props.children}
    </motion.button>
  );
};

export default Button;
