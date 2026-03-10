import { motion } from "motion/react";
import Button from "../components/Button";
import { PaddedContainer } from "../components/Containers";
import Image from "../components/Image";
import Slideshow, { Slide } from "../components/Slideshow";
import PlaceHolder from "/placeholder.png";
import { ServiceImage } from "../components/ServiceImage";
import Headshot from "/headshot_square.png";
import { useNavigate } from "react-router-dom";

import GemService from "/gem_service.jpeg";
import BookSmile from "/header_book_smile.mp4";

const Home = () => {
  const navigate = useNavigate();

  const mySlides = [
    <Slide itemSrc={BookSmile} isVideo={true}>
      <div className="flex flex-col justify-between h-full gap-12">
        <div className="flex flex-col gap-4">
          <motion.h1
            initial={{ y: "-25px" }}
            whileInView={{ y: "0px" }}
            className="text-sub text-4xl font-bold uppercase"
          >
            Luxe Smile Lounge
          </motion.h1>
          <motion.p
            initial={{ x: "25px" }}
            whileInView={{ x: "0px" }}
            className="text-2xl text-white"
          >
            Welcome to Luxe Smile Lounge, where elevated aesthetics meet expert
            care. We specialize in modern smile enhancements designed to help
            you look and feel your absolute best— in the comfort of your own
            home or at our lounge.
          </motion.p>
        </div>
        <Button href="contact-us" variant="primary" size="large">
          Get In Touch
        </Button>
      </div>
    </Slide>,
    
  ];

  return (
    <>
      <Slideshow
        slides={mySlides}
        durationMs={12000}
        stopOnInteraction={true}
      />

      <div className="flex flex-col gap-18">
        <PaddedContainer className="pt-18 flex flex-col gap-26">
          <div className="flex flex-row gap-40">
            <div className="">
              <Image fadeIn="left" size="md" src={Headshot} />
            </div>
            <motion.div
              initial={{ x: "50px" }}
              whileInView={{ x: "0px" }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl uppercase font-bold">ABOUT US</h1>
                <p className="text-2xl text-primary">
                  At Luxe Smile Lounge, we believe every smile deserves a touch
                  of sparkle. Our specialty is professional tooth gem
                  applications, offered both in-studio and through mobile
                  services that bring luxury right to your door. Whether you
                  want a subtle shimmer or a bold statement, we make it
                  effortless for every client to express their unique style.
                </p>
              </div>

              <Button size="xl" onClick={() => navigate("about-us")}>
                ABOUT US
              </Button>
            </motion.div>
          </div>
        </PaddedContainer>

        <PaddedContainer className="py-18 flex flex-col gap-26 bg-linear-to-r from-sub-back  to-sub-back-grad">
          <div className="flex flex-row gap-x-25">
            <ServiceImage
              link="/services"
              service="GEM PLACEMENT"
              src={GemService}
            >
              Tooth gem placement is a quick, non-invasive cosmetic service that
              adds a small sparkling gem to the surface of your tooth for a
              unique and stylish look. The gem is carefully bonded using a safe
              dental adhesive—no drilling or damage to the tooth is required.
              The process typically takes about 10–15 minutes and can last for
              weeks or even months with proper care.
            </ServiceImage>

            <ServiceImage
              link="/services"
              service="TEETH WHITENING"
              src={PlaceHolder}
            >
              Teeth whitening is a cosmetic treatment designed to brighten and
              enhance your smile by removing stains and discoloration from the
              teeth. Using professional-grade whitening products, the process
              safely lifts years of staining caused by coffee, tea, wine, and
              everyday habits. The treatment is quick, comfortable, and can
              noticeably lighten teeth several shades in a single session,
              leaving you with a cleaner, more radiant smile.
            </ServiceImage>

            <ServiceImage
              link="/services"
              service="VIDEO RECORDING"
              src={PlaceHolder}
            >
              Video recording of the procedure allows you to capture your smile
              transformation from start to finish. During the service, the
              process of tooth gem placement and teeth whitening is
              professionally recorded, highlighting each step and the final
              results. This service is perfect for creating memorable content
              for personal keepsakes or social media, showcasing your smile
              upgrade in a clear and engaging way.
            </ServiceImage>
          </div>

          <div className="flex flex-row gap-40">
            <motion.div
              initial={{ x: "-50px", display: "hidden" }}
              whileInView={{ x: "0px" }}
              className="flex-1 flex flex-col justify-between gap-5"
            >
              <h1 className="text-4xl uppercase font-bold text-sub">
                SERVICES
              </h1>
              <p className="text-2xl text-white">
                Our services include application of Swarovski tooth gems and
                luxury dental jewelry, expertly applied for a flawless,
                eye-catching sparkle that’s safe, stylish, and completely
                customizable. If you have something different in mind, a custom
                order can be considered. Soon, we will also offer professional
                teeth whitening treatments to brighten your smile by several
                shades, delivering radiant results with comfort and precision.
              </p>

              <Button
                onClick={() => navigate("services")}
                variant="secondary"
                size="xl"
              >
                VIEW SERVICES
              </Button>
            </motion.div>

            <Image fadeIn="right" size="md" src={PlaceHolder} />
          </div>
        </PaddedContainer>

        <PaddedContainer className="pb-20 flex flex-col">
          <motion.div
            initial="init"
            whileInView="view"
            className="gap-4 flex flex-col items-center bg-white/20 p-4 py-8 rounded-2xl"
          >
            <motion.h1 className="text-primary text-5xl font-bold tracking-wider">
              Contact Us
            </motion.h1>

            <motion.div className="flex gap-12 items-center">
              <p className="text-2xl text-primary text-center">
                Ready to upgrade your smile? Contact us today to book your
                appointment!
              </p>
            </motion.div>
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              Contact Us
            </Button>
          </motion.div>
        </PaddedContainer>
      </div>
    </>
  );
};

export default Home;
