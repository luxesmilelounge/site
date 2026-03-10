import { useState } from "react"

export interface Formspree<T> {
    send: (data: T) => Promise<Response | undefined>,
    isSubmitted: boolean,
}

/*
Use Formspree

Custom hook that allows for async request submission to Formspree.

To use, simply add the id of the form.

<T> can be used to confine the types of the data that is stringified and sent to formspree.
*/
function useFormspree<T>(id: string): Formspree<T> {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const submitForm = async (data: T) => {

        if (isSubmitted) {
            console.warn("form spree already submitted");
            return undefined;
        }

        const response = await fetch(`https://formspree.io/f/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setIsSubmitted(true);

        }

        return response;
    }

    return {
        send: submitForm,
        isSubmitted: isSubmitted
    }
}

export default useFormspree;