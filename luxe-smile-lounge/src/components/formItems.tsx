import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export interface BasicFormItemProps {
    name: string;
    placeHolder: string;
    textArea?: boolean;
    error?: string;
    size?: "full" | "half";
    type?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    required?: boolean
}

export const TextFormItem = (props: BasicFormItemProps) => {

    const size =
        props.size === "half"
            ? "basis-[calc(50%-1.5rem)]"
            : "basis-full";

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex flex-col gap-1 ${size}`}
        >

            <AnimatePresence>
                {
                    props.error
                    &&
                    <motion.div
                        initial={{ opacity: 0, x: -50, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 50, height: 0 }}
                        className="bg-red-200 w-fit px-3 py-1.5 flex gap-4 shadow-sm rounded-sm pb-2"
                    >
                        <Info className="text-red-600" />
                        <p className="text-red-600">{props.error}</p>
                    </motion.div>
                }
            </AnimatePresence>

            <div className={`flex ${props.textArea ? 'items-start min-h-48' : 'items-center'} gap-4 bg-white rounded-md p-4 py-2 border-2 border-black/20 text-xl`}>
                {props.icon}
                {props.textArea ?
                    <textarea
                        className="outline-0 w-full"
                        name={props.name}
                        placeholder={props.placeHolder} />
                    :
                    <input
                        className="outline-0 w-full"
                        type={props.type}
                        name={props.name}
                        placeholder={props.placeHolder} />
                }
            </div>


            <label htmlFor={props.name} className="ml-2 text-xl text-primary/80">
                <span>{props.children} {props.required && <span className="text-red-500">*</span>}</span>
            </label>
        </motion.div>
    );
}