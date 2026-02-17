import type { Page } from "../App";

const TrustedTools = () => {
    return (
        <>
        <p>Trusted Tools</p>
        </>
    );
}

/// Create a page property based on the Contact element.
const TrustedToolsPage: Page = {
    element: <TrustedTools/>,
    title: "Trusted Tools",
    path: "/trusted-tools"
};

export default TrustedToolsPage;
