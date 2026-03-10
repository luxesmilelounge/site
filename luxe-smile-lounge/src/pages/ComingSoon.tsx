import type { Page } from "../App";

const ComingSoon = () => {
    return (
        <>
        <p>Coming Soon</p>
        </>
    );
}

/// Create a page property based on the Contact element.
export const ComingSoonPage: Page = {
    element: <ComingSoon/>,
    title: "Coming Soon",
    path: "/coming-soon"
};
