import type { Page } from "../App";

const AboutUs = () => {
    return (
        <>
        <p>About Us</p>
        </>
    );
}

/// Create a page property based on the Contact element.
const AboutUsPage: Page = {
    element: <AboutUs/>,
    title: "About Us",
    path: "/about-us"
};

export default AboutUsPage;
