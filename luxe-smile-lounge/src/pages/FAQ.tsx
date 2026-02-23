import { useEffect, useState } from "react";
import type { Page } from "../App";
import { PaddedContainer } from "../components/Containers";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { Minimize, Plus, Search } from "lucide-react";

export interface FaqItem {
    question: string;
    answer: string;
}

const FaqListItem = (props: { item: FaqItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerItemVariant: Variants = {
        init: { opacity: 0, x: 50 },
        view: { opacity: 1, x: 0 }
    }

    return (
        <motion.div className="flex flex-col gap-4" variants={containerItemVariant}>
            <div className="flex gap-4 items-center">

                <motion.button
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setIsOpen((prev) => !prev)
                    }}
                    className="w-7 h-7 bg-sub-back text-white text-md rounded-full shadow shadow-black cursor-pointer"
                    title="View answer">
                    <div className="flex flex-col items-center justify-center">
                        {isOpen ? <Minimize className="w-5" /> : <Plus className="w-5" />}
                    </div>
                </motion.button>

                <h1 className="text-3xl font-bold">{props.item.question}</h1>

            </div>
            <AnimatePresence>
                {
                    isOpen
                    &&
                    <motion.div
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="text-2xl bg-white p-4 px-6 rounded-md shadow-md overflow-hidden">
                        <p>{props.item.answer}</p>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    );
}

export interface FaqProps {
    items: FaqItem[]
}

const Faq = (props: FaqProps) => {

    //animation motion variant parent.
    const containerVariant: Variants = {
        init: {},
        view: {
            transition: { delayChildren: stagger(.03) }
        }
    }

    const [itemFaqs, setItemFaqs] = useState([...props.items]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {

        if (!searchInput || searchInput === '') {
            console.log("all");
            setItemFaqs(props.items);
            return;
        }

        const searched = props.items.filter((faq) => {
            const question = faq.question.toLowerCase();
            const answer = faq.answer.toLowerCase();
            const input = searchInput.toLowerCase();
            return question.includes(input) || answer.includes(input);
        });

        console.log(searched);
        setItemFaqs(searched);

    }, [searchInput, props.items]);

    return (
        <PaddedContainer className="pt-12 flex flex-col gap-6 pb-12">
            <motion.h1
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-primary text-5xl font-bold tracking-wider">
                FAQs
            </motion.h1>

            <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="flex gap-4 items-center border-2 w-fit px-4 py-2 rounded-md bg-white"
            >
                <Search className="w-5" />
                <input
                    className="outline-0 text-2xl w-90"
                    placeholder="Search for a question or answer..."
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}></input>
            </motion.div>


            <motion.div
                variants={containerVariant}
                initial="init"
                animate="view"
                className="flex-col flex gap-8">
                {itemFaqs.map((faq) => (
                    <FaqListItem item={faq} key={faq.question} />
                ))}
            </motion.div>

        </PaddedContainer>
    );
}

const faqs: FaqItem[] = [
    {
        question: "Where can I place a tooth gem?",
        answer: "Proper placement requires an evaluation specific to your mouth and bite. The most common teeth for gem placement are the maxillary and mandibular canines, lateral incisors, and central incisors. Placement is always determined based on function, safety, and aesthetics."
    },
    {
        question: "Is it painful?",
        answer: "No — there is zero pain involved. The procedure is non-invasive and does not require drilling."
    },
    {
        question: "How long does the appointment take?",
        answer: "Timing depends on the design and number of gems placed. A single tooth gem typically takes about 2 minutes from start to finish once placement begins."
    },
    {
        question: "How long do tooth gems last?",
        answer: "Longevity varies from person to person. Factors such as nail biting, teeth grinding, clenching, and oral hygiene all affect how long your gem will last. Tooth gems are semi-permanent, meaning they are designed to last but can be professionally removed."
    },
    {
        question: "If my gem falls off, can it be replaced?",
        answer: "If your gem falls off within 2 months, it can be replaced for a $20 fee. After 2 months, the full service fee will apply."
    },
    {
        question: "Can tooth gems be removed?",
        answer: "Yes. For your safety, removal by your dentist is strongly recommended. Dental offices have the proper instruments to safely remove the gem, and it can often be done during a routine cleaning. Your oral health is always the priority."
    },
    {
        question: "Which teeth look best with gems?",
        answer: "This varies from person to person. A design consultation can be scheduled to evaluate your smile and choose placement that enhances your natural features."
    },
    {
        question: "Does placement affect longevity?",
        answer: "Yes. Your bite plays a major role in determining where gems can safely be placed and how long they will last. Areas with heavy bite pressure may decrease longevity."
    },
    {
        question: "Can a gem be placed on a veneer, crown, or filling?",
        answer: "No. Tooth gems are not placed on crowns, veneers, or other dental restorations. Gems are only placed on natural enamel to protect your dental work and ensure proper adhesion."
    },
    {
        question: "Will a tooth gem affect my bite?",
        answer: "When properly placed, it should not affect your bite. However, improper placement can interfere with function and reduce longevity — which is why bite assessment is essential."
    },
    {
        question: "Can I choose the exact placement?",
        answer: "Placement is a collaborative process. While your preference is important, gems must be positioned in a way that does not interfere with proper function. Your bite will be evaluated and a safe, flattering location will be chosen together."
    },
    {
        question: "Can I move the gem later?",
        answer: "Once bonded, a gem cannot be repositioned. It can be professionally removed and replaced in a new location if desired."
    },
    {
        question: "What if I grind or clench my teeth?",
        answer: "Grinding and clenching create significant force on enamel and may reduce the lifespan of your gem. If you grind, the safest placement possible will be assessed, but longevity cannot be guaranteed."
    },
    {
        question: "What if I wear a retainer or Invisalign?",
        answer: "Depending on the size and placement of the gem, it may affect how your retainer fits. Mini gems typically do not interfere, but this will be assessed prior to placement."
    },
    {
        question: "Can I get multiple gems?",
        answer: "Yes. Multiple gems can be placed depending on your bite, tooth anatomy, and overall design plan. Your long-term oral health and gem longevity will always guide placement decisions."
    },
    {
        question: "How can I make my gem last longer?",
        answer: "Maintain excellent oral hygiene. Use an electric toothbrush (use code LauRDH14 at Burstoralcare.com for 25% off). Floss daily. Use an alcohol-free antimicrobial mouthwash. Attend regular dental cleanings. Healthy gums and bone are the foundation of a beautiful smile."
    },
    {
        question: "Are the gems safe?",
        answer: "Yes. All gems used are lead-free Swarovski crystals designed for intraoral use."
    },
    {
        question: "How can I prepare for my tooth gem appointment?",
        answer: "To ensure the best adhesion and longevity of your tooth gem, please follow these guidelines prior to your appointment: Brush and floss thoroughly before arriving. Avoid eating or drinking anything other than water for at least 1 hour prior. Do not schedule placement immediately before a dental cleaning — if you are due, complete the cleaning first. Inform your provider if you grind or clench, wear a retainer or Invisalign, or have crowns, veneers, or dental work on the tooth of interest. Arrive with bare, natural teeth and avoid temporary decorative adhesives or products on the enamel."
    }
];


/// Create a page property based on the Contact element.
const FaqPage: Page = {
    element: <Faq items={faqs} />,
    title: "FAQ",
    path: "/faq"
};

export default FaqPage;
