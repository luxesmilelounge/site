import { motion, stagger, type Variants } from "motion/react";
import type { Page } from "../App";
import { PaddedContainer } from "../components/Containers";

const Services = () => {
    const containerVariant: Variants = {
        init: {},
        view: {
            transition: {
                delayChildren: stagger(0.03)
            }
        }
    }

    const containerItemVariant: Variants = {
        init: { opacity: 0, x: -50 },
        view: { opacity: 1, x: 0 }
    }


    return (
        <div className="flex flex-col gap-20">
            <PaddedContainer className="pt-12 flex flex-col">
                <motion.div variants={containerVariant} initial="init" whileInView="view" className="gap-8 flex flex-col">
                    <motion.h1
                        variants={containerItemVariant}
                        className="text-primary text-5xl font-bold tracking-wider">
                        Services We Offer
                    </motion.h1>

                    <motion.div
                        className="flex flex-col gap-4 items-center">
                        <motion.p variants={containerItemVariant} className="text-2xl text-primary">
                            Welcome to Luxe Smile Lounge, where elevated aesthetics meet expert care. We specialize in modern smile enhancements designed to help you look and feel your absolute best— in the comfort of your own home or at our lounge.
                        </motion.p>

                        <motion.p variants={containerItemVariant} className="text-2xl text-primary">
                            Our services include application of Swarovski tooth gems and luxury dental jewelry, expertly applied for a flawless, eye-catching sparkle that’s safe, stylish, and completely customizable. If you have something different in mind, a custom order can be considered. Soon, we will also offer professional teeth whitening treatments to brighten your smile by several shades, delivering radiant results with comfort and precision.
                        </motion.p>

                        <motion.p variants={containerItemVariant} className="text-2xl text-primary">
                            At Luxe Smile Lounge, every appointment is a curated experience. From personalized consultations to meticulous attention to detail, we focus on enhancing your natural beauty while prioritizing oral safety and long-lasting results. Whether you’re going for subtle elegance or bold shine, we’re here to help you express your smile—luxuriously
                        </motion.p>

                    </motion.div>



                </motion.div>
            </PaddedContainer>

        </div>

    );
}

/// Create a page property based on the Contact element.
const ServicesPage: Page = {
    element: <Services />,
    title: "Services",
    path: "/services"
};

export default ServicesPage;
