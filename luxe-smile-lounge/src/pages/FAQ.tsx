import type { Page } from "../App";

const Faq = () => {
    return (
        <>
        <p>FAQs</p>
        </>
    );
}

/// Create a page property based on the Contact element.
const FaqPage: Page = {
    element: <Faq/>,
    title: "FAQ",
    path: "/faq"
};

export default FaqPage;
