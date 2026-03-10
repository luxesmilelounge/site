import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type HTMLInputTypeAttribute } from "react";

export interface InputWrapperItems {
    name: string;
    placeHolder: string;
    error?: string;
    size?: "full" | "half";
    icon?: React.ReactNode;
    children: React.ReactNode;
    required?: boolean;
    textArea?: boolean;
    label?: string | React.ReactNode;

}

export interface BasicFormItemProps {
    type?: HTMLInputTypeAttribute;
    children: React.ReactNode;
    required?: boolean
    value?: string | number | readonly string[];
    readOnly?: true;
    textArea?: boolean;
}

export const InputWrapper = (props: InputWrapperItems) => {

    let size;
    switch (props.size) {
        case 'half':
            size = "basis-[calc(50%-1.5rem)]";
            break;
        case 'full':
        default:
            size = 'basis-full';
            break;

    }

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
                        className="bg-red-200 w-fit px-3 py-1.5 flex gap-4 shadow-sm rounded-sm mb-4"
                    >
                        <Info className="text-red-600" />
                        <p className="text-red-600">{props.error}</p>
                    </motion.div>
                }
            </AnimatePresence>

            <div className={`flex ${props.textArea ? 'items-start min-h-48' : 'items-center'} gap-4 bg-white rounded-md p-4 py-2 border-2 border-black/20 focus-within:border-black/60 text-xl`}>
                {props.icon}
                {props.children}
            </div>


            <label htmlFor={props.name} className="ml-2 text-xl text-primary/80">
                <span>{props.label} {props.required && <span className="text-red-500">*</span>}</span>
            </label>
        </motion.div>
    );
}

export const TextFormItem = (props: InputWrapperItems & BasicFormItemProps) => {

    const wrapperProps = { ...props };
    wrapperProps.label = props.children;

    return (
        <InputWrapper {...wrapperProps}>
            {props.textArea ?
                <textarea
                    className="outline-0 w-full"
                    name={props.name}
                    placeholder={props.placeHolder}
                    defaultValue={props.value}
                    readOnly={props.readOnly}
                />
                :
                <input
                    className="outline-0 w-full"
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeHolder}
                    readOnly={props.readOnly}
                    value={props.value}
                />
            }
        </InputWrapper>
    )
}

export interface CheckboxItems {
    icon?: React.ReactNode;
    children: React.ReactNode
    required?: boolean
    name: string
    onValueChange?: (value: boolean) => void
    error?: string
    initialValue?: boolean
}

export const Checkbox = (props: CheckboxItems) => {

    const [value, setValue] = useState<boolean>(props.initialValue || false);

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex flex-col gap-1`}
        >
            <AnimatePresence>
                {
                    props.error
                    &&
                    <motion.div
                        initial={{ opacity: 0, x: -50, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 50, height: 0 }}
                        className="bg-red-200 w-fit px-3 py-1.5 flex gap-4 shadow-sm rounded-sm mb-4"
                    >
                        <Info className="text-red-600" />
                        <p className="text-red-600">{props.error}</p>
                    </motion.div>
                }
            </AnimatePresence>

            <div className={`flex 'items-center' gap-4 text-xl px-2 pb-2`}>
                {props.icon}
                <input onChange={(ev) => {
                    if (props.onValueChange) {
                        props.onValueChange(ev.target.checked)
                    }

                    setValue(ev.target.checked);
                }} className="scale-200 pb-2 accent-blue-500" type="checkbox" name={props.name} defaultValue={value ? 'true' : 'false'} />
            </div>


            <label htmlFor={props.name} className="ml-2 text-xl text-primary/80">
                <span>{props.children} {props.required && <span className="text-red-500">*</span>}</span>
            </label>
        </motion.div>
    );
}

