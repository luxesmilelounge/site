import type { Page } from "../App";

const Services = () => {
    return (
        <>
        <p>Services</p>
        </>
    );
}

/// Create a page property based on the Contact element.
const ServicesPage: Page = {
    element: <Services/>,
    title: "Services",
    path: "/services"
};

export default ServicesPage;
