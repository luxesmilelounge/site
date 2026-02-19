import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";

//button properties
export interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: "primary" | "secondary";
    size?: 'small' | 'medium' | 'large' | 'xl';
    children: ReactNode;
}

const Button = (props: ButtonProps) => {

    if(!props.size){
    }

    if (!props.variant) {
    }

    const size = props.size || 'medium';
    const variant = props.variant || 'primary';

    let sizeDesign;

   

    switch (size) {
        case 'small':
            sizeDesign = 'px-12 py-2 text-md';
            break;
        case 'medium':
            sizeDesign = 'px-12 py-2.5 text-lg';
            break;
        case "large":
            sizeDesign = 'px-12 py-3 text-xl';
            break;
        case "xl":
            sizeDesign = 'px-16 py-3 text-2xl font-bold';
            break;
    }

    let variantDesign;

    switch (variant) {
        case 'primary':
            variantDesign = 'bg-sub';
            break;

        case 'secondary':
            variantDesign = 'bg-sub-blue text-sub'
            break;
    }

  return <motion.button initial={{ opacity: .7, boxShadow: "0px 3px 4px 2px rgba(0,0,0,0)", y:'25px'}}  whileTap={{scale: 0.95,  boxShadow: "0px 1px 6px 5px rgba(0,0,0,.05)"}}  whileInView={{opacity: 1, y: "0px"}} whileHover={{scale: 1.05, boxShadow: "0px 1px 4px 2px rgba(0,0,0,.06)"}} className={ `${variantDesign} ${sizeDesign} w-fit font-semibold cursor-pointer rounded-sm uppercase` } {...props}>{props.children}</motion.button>;
};

export default Button;
