import { motion } from "motion/react";
import React, { useEffect, useRef, useState, type JSX } from "react";
import { PaddedContainer } from "./Containers";

export interface SlideProps {
  children: React.ReactNode;
  imgSrc?: string;
}

export const Slide = (props: SlideProps) => {
  return (
      <div className="min-w-full h-full bg-transparent relative">
        <div className="bg-black/60 min-w-full  min-h-full absolute z-10">
          <PaddedContainer className="absolute bg-transparent py-20">
            {props.children}
          </PaddedContainer>
        </div>
        <img src={props.imgSrc} className="w-full h-full object-cover" />
      </div>
    );
};

export interface SlideshowProps {
  slides: JSX.Element[];
  // the amount of time till next transition. By default 5 seconds.
  durationMs?: number;
  // if the slide should not transition until there is no interaction.
  stopOnInteraction?: boolean;
}

const ScrollButton = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonContent: JSX.Element;
  ref?: React.Ref<HTMLButtonElement | null>;
}) => {
  return (
    <motion.button
      initial={{ scale: 0.4 }}
      whileInView={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="text-4xl text-white font-bold cursor-pointer"
      onClick={props.onClick}
      ref={props.ref}
    >
      {props.buttonContent}
    </motion.button>
  );
};

const Slideshow = (props: SlideshowProps) => {
  const maxSlides = props.slides.length;

  if (maxSlides === 0) {
    return <></>;
  }

  const slideshowRef = useRef<HTMLDivElement | null>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  //scrolls to a certain index of the slideshows
  const scrollToIndex = (index: number) => {
    if (!slideshowRef || !slideshowRef.current) {
      console.warn("No ref to slideshow reference.");
      return;
    }

    //restart the slideshow from the start.
    if (index >= maxSlides) {
      setCurrentSlideIndex(0);
      return;
    } else if (index < 0) {
      //user wants to do infinite scroll to other end
      setCurrentSlideIndex(maxSlides - 1);
      return;
    }

    const div = slideshowRef.current;
    const singleSlideWith = div.scrollWidth / maxSlides;

    const nextPosition = singleSlideWith * index;

    let options: ScrollToOptions = {
      left: nextPosition,
      top: 0,
      behavior: "smooth",
    };

    div.scrollTo(options);
  };

  useEffect(() => {
    scrollToIndex(currentSlideIndex);
  }, [currentSlideIndex]);

  //reference to the interval.
  const interval = useRef<number | null>(null);

  //set the interval and restart if needed.
  const restartAutoSlide = () => {
    //clear only when applicable.
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      setCurrentSlideIndex((prev) => prev + 1);
    }, props.durationMs || 5000); //5 seconds or chosen by user.
  };

  //setup auto slide
  useEffect(() => {
    restartAutoSlide();
  }, []);

  const moveNext = () => {
    setCurrentSlideIndex((prev) => prev + 1);
    restartAutoSlide();
  };

  const movePrev = () => {
    setCurrentSlideIndex((prev) => prev - 1);
    restartAutoSlide();
  };

  //handles window resize event, which can cause issues with how this component becomes rendered.
  window.addEventListener("resize", () => scrollToIndex(currentSlideIndex));

  return (
    <>
      <div
        onMouseOver={() => {
          if (props.stopOnInteraction) restartAutoSlide();
        }}
        ref={slideshowRef}
        className="scroll-smooth w-full h-110  flex flex-nowrap overflow-hidden relative shadow-black shadow-sm"
      >
        {props.slides.map((slide, index) => {
          return (
            <div key={index} className="w-full shrink-0 relative">
              {slide}

              <div className="absolute z-100 inset-0 flex justify-between items-center px-12">
                <ScrollButton onClick={movePrev} buttonContent={<>{"<"}</>} />
                <ScrollButton onClick={moveNext} buttonContent={<>{">"}</>} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slideshow;
