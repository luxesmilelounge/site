import { motion } from "motion/react";
import React, { useEffect, useRef, useState, type JSX, type ReactNode } from "react";

/// Describes a single slide within a slideshow.
export interface Slide {
    content: JSX.Element;
}

export interface SlideshowProps {
    slides: Slide[];
    // the amount of time till next transition. By default 5 seconds.
    durationMs?: number;
    // if the slide should not transition until there is no interaction.
    stopOnInteraction?: boolean;
}

const ScrollButton = (props: {onClick: React.MouseEventHandler<HTMLButtonElement>, buttonContent: JSX.Element}) => {
    return ( 
    <motion.button initial={{ scale: .4 }} animate={{ scale: 1 }} whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }} className="text-4xl text-white font-bold cursor-pointer" onClick={props.onClick}>{props.buttonContent}</motion.button>
    );
}

const Slideshow = (props: SlideshowProps) => {

    const maxSlides = props.slides.length;


    if (maxSlides === 0) {
        return (<></>)
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
        }
        else if (index < 0) { //user wants to do infinite scroll to other end
            setCurrentSlideIndex(maxSlides - 1);
            return;
        }

        const div = slideshowRef.current;
        const singleSlideWith = div.scrollWidth / maxSlides;

        const nextPosition = singleSlideWith * currentSlideIndex;

        let options: ScrollToOptions = {
            left: nextPosition,
            top: 0,
            behavior: "smooth"
        }

        div.scrollTo(options);
    }

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
            setCurrentSlideIndex(prev => prev + 1);
        }, props.durationMs || 5000); //5 seconds or chosen by user.

    }

    //setup auto slide 
    useEffect(() => {
        restartAutoSlide();
    }, []);


    const moveNext = () => {
        setCurrentSlideIndex(prev => prev + 1);
        restartAutoSlide();
    }

    const movePrev = () => {
        setCurrentSlideIndex(prev => prev - 1);
        restartAutoSlide();
    }

    //handles window resize event, which can cause issues with how this component becomes rendered.
    window.addEventListener('resize', () => scrollToIndex(currentSlideIndex));

    return (
        <>
            <div onMouseOver={() => {
                if (props.stopOnInteraction)
                    restartAutoSlide()
            }} ref={slideshowRef} className="scroll-smooth w-full h-110 bg-red-400 flex flex-nowrap overflow-hidden">

                {props.slides.map((slide) => {
                    return slide.content;
                })
                }

                <div className="flex justify-between items-center px-12 absolute w-full top-80">
                    <ScrollButton onClick={() => movePrev()} buttonContent={<>{"<"}</>} />
                    <ScrollButton onClick={() => moveNext()} buttonContent={<>{">"}</>} />
                </div>
            </div>



        </>
    )

}

export default Slideshow;