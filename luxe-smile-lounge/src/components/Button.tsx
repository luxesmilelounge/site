import { type HTMLMotionProps, motion, type Transition } from "motion/react";
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

    let sizeTransition: Transition<any> = {
        type: 'spring',
        damping: 15, 
        stiffness: 300
    };

    switch (size) {
        case 'small':
            sizeDesign = 'px-12 py-2 text-md';
            break;
        case 'medium':
            sizeDesign = 'px-12 py-2.5 text-lg';
            sizeTransition.stiffness = 250;
            break;
        case "large":
            sizeDesign = 'px-12 py-3 text-xl';
            sizeTransition.stiffness = 225;
            break;
        case "xl":
            sizeDesign = 'px-16 py-3 text-2xl font-bold';
            sizeTransition.stiffness = 200;
            sizeTransition.damping = 20;
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

  return <motion.button initial={{opacity: .7, boxShadow: "0px 3px 4px 2px rgba(0,0,0,.15)"}} transition={{...sizeTransition}} whileTap={{scale: 0.9,  boxShadow: "0px 1px 8px 4px rgba(0,0,0,.1)"}}  animate={{opacity: 1}} whileHover={{scale: 1.1, boxShadow: "0px 1px 4px 2px rgba(0,0,0,.22)"}} className={ `${variantDesign} ${sizeDesign} w-fit font-semibold cursor-pointer rounded-sm uppercase` } {...props}>{props.children}</motion.button>;
};

export default Button;
