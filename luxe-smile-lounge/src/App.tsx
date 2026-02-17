import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { JSX } from "react";
import Home from "./pages/Home";
import { Footer, Header } from "./components/Templates";
import { PaddedContainer } from "./components/Containers";
import ContactPage from "./pages/Contact";
import AboutUsPage from "./pages/AboutUs";
import FaqPage from "./pages/FAQ";
import ServicesPage from "./pages/Services";
import TrustedToolsPage from "./pages/TrustedTools";
import ComingSoonPage from "./pages/ComingSoon";
import ConsentFormsPage from "./pages/ConsentForms";

export interface Page {
  element: JSX.Element;
  path: string;
  title: string;
}

function App() {
  //pages used in the nav, excludes the home page
  const pages: Page[] = [
    AboutUsPage,
    FaqPage,
    ServicesPage,
    TrustedToolsPage,
    ComingSoonPage,
    ConsentFormsPage,
    ContactPage,
  ];

  return (
    <div className="main h-screen flex flex-col justify-between">
      <BrowserRouter>
        <div>
          <Header pages={pages} />

          <PaddedContainer className="py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              {pages.map((page, id) => {
                return (
                  <Route
                    key={`route-${id}`}
                    path={page.path}
                    element={page.element}
                  />
                );
              })}
            </Routes>
          </PaddedContainer>
        </div>
        <Footer pages={pages}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
