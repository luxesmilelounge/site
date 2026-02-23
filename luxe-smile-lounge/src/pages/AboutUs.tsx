import { motion, stagger, type Variants } from "motion/react";
import type { Page } from "../App";
import { PaddedContainer } from "../components/Containers";
import Logo from '/logo.png';
import HeadshotImage from '/headshot.png';
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

    const containerVariant: Variants = {
        init: {},
        view: {
            transition: {
                delayChildren: stagger(0.03)
            }
        }
    }

    const containerItemVariant: Variants = {
        init: { opacity: 0.5, x: -50 },
        view: { opacity: 1, x: 0 }
    }

    const containerUpVariantParent: Variants = {
        init: {},
        view: {
            transition: {
                delayChildren: stagger(0.05)
            }
        }
    }

    const containerUpVariant: Variants = {
        init: { opacity: 0, y: 100 },
        view: { opacity: 1, y: 0 }
    }


    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-20">
            <PaddedContainer className="pt-12 flex flex-col">
                <motion.div variants={containerVariant} initial="init" whileInView="view" className="gap-0 flex flex-col">
                    <motion.h1
                        variants={containerItemVariant}
                        className="text-primary text-5xl font-bold tracking-wider">
                        About Us
                    </motion.h1>

                    <motion.div
                        variants={containerItemVariant}
                        className="flex gap-12 items-center">
                        <p className="text-2xl text-primary">
                            At Luxe Smile Lounge, we believe every smile deserves a touch of sparkle. Our specialty is professional tooth gem applications, offered both in-studio and through mobile services that bring luxury right to your door. Whether you want a subtle shimmer or a bold statement, we make it effortless for every client to express their unique style.
                        </p>
                        <img src={Logo} className="max-w-lg object-cover" />

                    </motion.div>



                </motion.div>
            </PaddedContainer>

            <PaddedContainer className="bg-linear-to-r from-sub-back via-sub-back-grad to-sub-back-grad py-12">
                <motion.div
                    variants={containerUpVariantParent}
                    className="flex gap-12 items-start"
                    initial="init"
                    whileInView="view"
                >

                    <motion.img variants={containerUpVariant} src={HeadshotImage} className="max-w-xs flex-1 object-cover object-top rounded-md shadow-md" />

                    <motion.div variants={containerUpVariant} className="flex flex-col gap-4 flex-1 w-full">
                        <h1 className="text-3xl font-bold text-sub">
                            Meet the Founder – Lauren Salamon, B.S., RDH, PHDH
                        </h1>
                        
                        <p className="text-2xl text-white">
                            Lauren has been a registered dental hygienist since 2006. She graduated from Manor College Dental Hygiene program at just 19 years old. Her passion for dentistry prompted her to further her education by obtaining her bachelor's degree in biology from Temple University. Subsequently, Lauren graduated from The Kornberg School of Dentistry’s inaugural post-baccalaureate program in 2015.
                        </p>

                        <p className="text-2xl text-white">
                            Lauren started Luxe Smile Lounge with a passion for creativity, self-expression, and confidence. Combining an eye for detail with a love for helping clients shine, Lauren ensures every tooth gem design is personalized and safe, turning each appointment into a fun, luxurious experience. From traveling to clients’ homes to welcoming them in-studio, Lauren is committed to making every smile unforgettable.
                        </p>

                    </motion.div>
                </motion.div>
            </PaddedContainer>

            <PaddedContainer className="pb-20 flex flex-col">
                <motion.div variants={containerVariant} initial="init" whileInView="view" className="gap-4 flex flex-col items-center bg-white/20 p-4 py-8 rounded-2xl">
                    <motion.h1
                        variants={containerItemVariant}
                        className="text-primary text-5xl font-bold tracking-wider">
                        Our Philosophy
                    </motion.h1>

                    <motion.div
                        variants={containerItemVariant}
                        className="flex gap-12 items-center">
                        <p className="text-2xl text-primary text-center">
                            We celebrate individuality and glamour with every gem we apply. Safety, professionalism, and artistry are at the heart of what we do — because your smile is more than just teeth, it’s a reflection of who you are!
                        </p>
                    </motion.div>
                    <Button variant="secondary" onClick={() => {
                        navigate("/contact-us");
                    }}>Contact Us</Button>
                </motion.div>
            </PaddedContainer>
        </div>

    );
}

/// Create a page property based on the Contact element.
const AboutUsPage: Page = {
    element: <AboutUs />,
    title: "About Us",
    path: "/about-us"
};

export default AboutUsPage;
