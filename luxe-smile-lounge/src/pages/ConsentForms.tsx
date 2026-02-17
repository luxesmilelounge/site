import type { Page } from "../App";

const ConsentForms = () => {
    return (
        <>
        <p>Consent Forms</p>
        </>
    );
}

/// Create a page property based on the Contact element.
const ConsentFormsPage: Page = {
    element: <ConsentForms/>,
    title: "Consent Forms",
    path: "/consent-form"
};

export default ConsentFormsPage;
