import { motion, stagger, type Variants } from "motion/react";
import type { Page } from "../App";
import { PaddedContainer } from "../components/Containers";

import * as z from "zod";
import { useState } from "react";
import { CircleQuestionMark, Contact2, Info, Mail, Phone } from "lucide-react";
import Button from "../components/Button";
import { TextFormItem } from "../components/formItems";

const ContactInfo = z.object({
    name: z.string().nonempty("Please provide your name"),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email").nonempty("Please provide a valid email"),
    phone: z.string().regex(/^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please provide a valid phone #").or(z.literal("")).optional(),
    reason: z.string().nonempty("Please provide a reason for contacting us.")
})

type ContactInfo = z.infer<typeof ContactInfo>;




const Contact = () => {
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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorMessage, setErrorMessage] = useState('');

    const contactFormSubmit = (formData: FormData) => {
        //phone, name, email, reason
        const info = {
            name: formData.get('name')?.toString(),
            email: formData.get('email')?.toString(),
            phone: formData.get('phone')?.toString(),
            reason: formData.get('reason')?.toString()
        };

        const sendForm = async (contactInfo: ContactInfo) => {
            const response = await fetch("https://formspree.io/f/xjgepjjy", {
                method: 'POST',
                body: JSON.stringify(contactInfo),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                setErrorMessage('Failed to submit form!');
                return;
            }

            setIsSubmitted(true);
        }

        try {
            const contactInfo = ContactInfo.parse(info);
            setErrors({});
            sendForm(contactInfo);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};

                error.issues.forEach((err) => {
                    const key = err.path[0].toString();

                    console.log(err);
                    newErrors[key] = err.message;
                });

                setErrors(newErrors);
            }
        }
    }


    return (
        <div className="flex flex-col gap-20">
            <PaddedContainer className="pt-12 flex flex-col">
                <motion.div variants={containerVariant} initial="init" whileInView="view" className="gap-8 flex flex-col">
                    <motion.h1
                        variants={containerItemVariant}
                        className="text-primary text-5xl font-bold tracking-wider">
                        Contact Us
                    </motion.h1>

                    <motion.div
                        className="flex flex-col gap-4 pb-12">


                        {isSubmitted ?
                            <div className="flex flex-col w-full items-center">
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="bg-green-200 shadow-md w-fit flex flex-col items-center p-8 py-4 gap-4">
                                    <h1 className="text-4xl uppercase font-bold text-green-800">Thank You!</h1>
                                    <p className="text-2xl text-green-700">We appreciate your submission and will be in contact with you soon!</p>
                                </motion.div>
                            </div>
                            :
                            <div className="flex gap-12">
                                <form className="flex flex-wrap w-full gap-12 items-end basis-3/4" onSubmit={(e) => {
                                    e.preventDefault();
                                    contactFormSubmit(new FormData(e.currentTarget));
                                }}>
                                    {errorMessage &&
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="bg-red-200 w-fit px-3 py-1.5 flex gap-4 shadow-sm rounded-sm pb-2"
                                        >
                                            <Info className="text-red-600" />
                                            <p className="text-red-600">{errorMessage}</p>
                                        </motion.div>
                                    }
                                    <TextFormItem error={errors['name']} required={true} icon={<Contact2 />} placeHolder="Please enter your full name..." name="name" size="full">Full Name</TextFormItem>
                                    <TextFormItem error={errors['email']} required={true} icon={<Mail />} placeHolder="Please enter your email..." name="email" type="email" size="half">Email</TextFormItem>
                                    <TextFormItem error={errors['phone']} icon={<Phone />} placeHolder="Please enter your phone #..." name="phone" type="tel" size="half">Phone</TextFormItem>
                                    <TextFormItem error={errors['reason']} required={true} icon={<CircleQuestionMark />} textArea={true} placeHolder="Reason for contacting..." name="reason" size="full">Reason</TextFormItem>
                                    <Button type="submit" variant="secondary">Submit</Button>
                                </form>

                                <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                
                                className="flex flex-col gap-4 basis-1/4 bg-white/70 rounded-md h-fit p-4">
                                    <h1 className="text-3xl font-bold text-primary">Contact Info</h1>
                                    <div className="flex gap-4 items-center justify-start">
                                        <div className="bg-sub-back rounded-full p-1">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <a
                                            href="mailto:luxesmilelounge@gmail.com"
                                            className="text-primary text-lg duration-300 hover:text-sub-back">
                                            luxesmilelounge@gmail.com
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                        }


                    </motion.div>



                </motion.div>
            </PaddedContainer>

        </div>

    );
}

/// Create a page property based on the Contact element.
const ContactPage: Page = {
    element: <Contact />,
    title: "Contact Us",
    path: "/contact-us"
};

export default ContactPage;
