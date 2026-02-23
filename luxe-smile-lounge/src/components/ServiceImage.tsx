import { motion } from "motion/react";
import { Link } from "react-router-dom";

export interface ServiceImageProps {
  src: string;
  service: string;
  children: React.ReactNode;
  link: string;
}

export const ServiceImage = (props: ServiceImageProps) => {
  const cardVariants = {
    initial: { y: -150, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const textVariants = {
    initial: { height: 0, opacity: 0 },
    hover: { height: "auto", opacity: 1 },
  };

  const iconVariants = {
    initial: { height: "auto", opacity: 1, },
    hover: { height: 0, opacity: 0 },
  };

   const labelVariants = {
    initial: { opacity: 0.7, scale: 1 },
    hover: { opacity: 1, scale: 1.05 },
  };

  return (
    <Link to={props.link} className="flex-1">
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileInView="animate"
        whileHover="hover"
        viewport={{ once: true }}
        className="flex flex-col items-center shadow-md shadow-black/20 bg-back rounded-t-md flex-1 h-fit cursor-pointer overflow-hidden rounded-b-md"
      >
        <motion.div
          variants={textVariants}
          className="overflow-hidden w-full bg-white/5 h-full"
        >
          <p className="p-4 text-md font-bold text">{props.children}</p>
        </motion.div>

        <motion.div
          variants={iconVariants}
          className="flex justify-center items-center overflow-clip"
        >
          <img
            className="rounded-t-md w-full h-auto"
            src={props.src}
            alt={props.service}
          />
        </motion.div>

        <motion.div className="bg-sub w-full flex flex-col items-center border-t-2 border-black/10 font-semibold py-4 rounded-b-md z-10">
          <motion.p variants={labelVariants} className="text-2xl">{props.service}</motion.p>
        </motion.div>
      </motion.div>
    </Link>
  );
};
