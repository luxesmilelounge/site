import { motion } from "motion/react";
import Button from "../components/Button";
import { PaddedContainer } from "../components/Containers";
import Image from "../components/Image";
import Slideshow, { Slide } from "../components/Slideshow";
import PlaceHolder from "/placeholder.png";
import SlidePlaceholder from "/slide.jpg";
import { ServiceImage } from "../components/ServiceImage";

const Home = () => {
  const mySlides = [
    
    <Slide imgSrc={SlidePlaceholder}>
      <div className="flex flex-col justify-between h-full gap-12">
        <div className="flex flex-col gap-4">
          <motion.h1 initial={{y: "-25px"}} whileInView={{y: '0px'}} className="text-sub text-4xl font-bold uppercase">
            PRODUCT INFORMATION
          </motion.h1>
          <motion.p initial={{x: "25px"}} whileInView={{x: '0px'}} className="text-2xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sed ultricies eros. Aenean suscipit ex lacinia volutpat aliquet.
            Nullam a volutpat mi. Aenean molestie felis a sem hendrerit
            lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl posuere
            accumsan. Ut tincidunt, diam vel commodo posuere, lacus magna
            rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
          </motion.p>
        </div>
        <Button variant="primary" size="large">
          ABOUT US
        </Button>
      </div>
    </Slide>,
    <Slide imgSrc={SlidePlaceholder}>
      <div className="flex flex-col justify-between h-full gap-12">
        <div className="flex flex-col gap-4">
          <motion.h1 initial={{y: "-25px"}} whileInView={{y: '0px'}} className="text-sub text-4xl font-bold uppercase">
            PRODUCT INFORMATION
          </motion.h1>
          <motion.p initial={{x: "25px"}} whileInView={{x: '0px'}} className="text-2xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sed ultricies eros. Aenean suscipit ex lacinia volutpat aliquet.
            Nullam a volutpat mi. Aenean molestie felis a sem hendrerit
            lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl posuere
            accumsan. Ut tincidunt, diam vel commodo posuere, lacus magna
            rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
          </motion.p>
        </div>
        <Button variant="primary" size="large">
          ABOUT US
        </Button>
      </div>
    </Slide>,
    <Slide imgSrc={SlidePlaceholder}>
      <div className="flex flex-col justify-between h-full gap-12">
        <div className="flex flex-col gap-4">
          <motion.h1 initial={{y: "-25px"}} whileInView={{y: '0px'}} className="text-sub text-4xl font-bold uppercase">
            PRODUCT INFORMATION
          </motion.h1>
          <motion.p initial={{x: "25px"}} whileInView={{x: '0px'}} className="text-2xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sed ultricies eros. Aenean suscipit ex lacinia volutpat aliquet.
            Nullam a volutpat mi. Aenean molestie felis a sem hendrerit
            lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl posuere
            accumsan. Ut tincidunt, diam vel commodo posuere, lacus magna
            rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
          </motion.p>
        </div>
        <Button variant="primary" size="large">
          ABOUT US
        </Button>
      </div>
    </Slide>
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
              <Image fadeIn="left" size="md" src={PlaceHolder} />
            </div>
            <motion.div
              initial={{ x: "50px" }}
              whileInView={{ x: "0px" }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl uppercase font-bold">
                  ABOUT US HEADER
                </h1>
                <p className="text-2xl text-primary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum sed ultricies eros. Aenean suscipit ex lacinia
                  volutpat aliquet. Nullam a volutpat mi. Aenean molestie felis
                  a sem hendrerit lobortis. Cras eu tincidunt augue. Nunc vel
                  neque a nisl posuere accumsan. Ut tincidunt, diam vel commodo
                  posuere, lacus magna rhoncus enim, vitae fringilla augue justo
                  ullamcorper dolor.
                </p>
              </div>

              <Button size="xl">ABOUT US</Button>
            </motion.div>
          </div>
        </PaddedContainer>

        <PaddedContainer className="py-18 flex flex-col gap-26 bg-linear-to-r from-sub-back  to-sub-back-grad">
          <div className="flex flex-row gap-x-25">
            <ServiceImage
              link="/services"
              service="SERVICE NEEDED"
              src={PlaceHolder}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sed ultricies eros. Aenean suscipit ex lacinia volutpat
              aliquet. Nullam a volutpat mi. Aenean molestie felis a sem
              hendrerit lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl
              posuere accumsan. Ut tincidunt, diam vel commodo posuere, lacus
              magna rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
            </ServiceImage>
            <ServiceImage
              link="/services"
              service="SERVICE NEEDED"
              src={PlaceHolder}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sed ultricies eros. Aenean suscipit ex lacinia volutpat
              aliquet. Nullam a volutpat mi. Aenean molestie felis a sem
              hendrerit lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl
              posuere accumsan. Ut tincidunt, diam vel commodo posuere, lacus
              magna rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
            </ServiceImage>
            <ServiceImage
              link="/services"
              service="SERVICE NEEDED"
              src={PlaceHolder}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sed ultricies eros. Aenean suscipit ex lacinia volutpat
              aliquet. Nullam a volutpat mi. Aenean molestie felis a sem
              hendrerit lobortis. Cras eu tincidunt augue. Nunc vel neque a nisl
              posuere accumsan. Ut tincidunt, diam vel commodo posuere, lacus
              magna rhoncus enim, vitae fringilla augue justo ullamcorper dolor.
            </ServiceImage>
          </div>

          <div className="flex flex-row gap-40">
            <motion.div
              initial={{ x: "-50px", display: "hidden" }}
              whileInView={{ x: "0px" }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl uppercase font-bold text-sub">
                  ABOUT US HEADER
                </h1>
                <p className="text-2xl text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum sed ultricies eros. Aenean suscipit ex lacinia
                  volutpat aliquet. Nullam a volutpat mi. Aenean molestie felis
                  a sem hendrerit lobortis. Cras eu tincidunt augue. Nunc vel
                  neque a nisl posuere accumsan. Ut tincidunt, diam vel commodo
                  posuere, lacus magna rhoncus enim, vitae fringilla augue justo
                  ullamcorper dolor.
                </p>
              </div>

              <Button variant="secondary" size="xl">
                ABOUT US
              </Button>
            </motion.div>

            <div className="">
              <Image fadeIn="right" size="md" src={PlaceHolder} />
            </div>
          </div>
        </PaddedContainer>

        <PaddedContainer className="pb-18 flex flex-col gap-26">
          <div className="flex flex-row gap-40">
            <div className="">
              <Image fadeIn="left" size="md" src={PlaceHolder} />
            </div>
            <motion.div
              initial={{ x: "50px" }}
              whileInView={{ x: "0px" }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl uppercase font-bold">
                  ABOUT US HEADER
                </h1>
                <p className="text-2xl text-primary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum sed ultricies eros. Aenean suscipit ex lacinia
                  volutpat aliquet. Nullam a volutpat mi. Aenean molestie felis
                  a sem hendrerit lobortis. Cras eu tincidunt augue. Nunc vel
                  neque a nisl posuere accumsan. Ut tincidunt, diam vel commodo
                  posuere, lacus magna rhoncus enim, vitae fringilla augue justo
                  ullamcorper dolor.
                </p>
              </div>

              <Button size="xl">ABOUT US</Button>
            </motion.div>
          </div>
        </PaddedContainer>
      </div>
    </>
  );
};

export default Home;
