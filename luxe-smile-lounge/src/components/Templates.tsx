import { Link } from "react-router-dom";
import Logo from "/logo.png";
import InstagramLogo from "/instagram.svg";
import type { ReactNode } from "react";
import type { Page } from "../App";
import { PaddedContainer } from "./Containers";

const RouterLink = (props: { to: string; children: ReactNode, className?: string }) => {
  return (
    <div className={`group text-xl text-sub transition-all duration-300 hover:text-sub-hover flex flex-col gap-0 items-center ${props.className}`}>
      <Link to={props.to}>{props.children}</Link>

      <div className="group-hover:border-sub group-hover:w-full transition-all duration-300 w-0 border border-transparent "></div>
    </div>
  );
};

export const SocialMedia = (props :{className?: string, type: "instagram"}) => {

  let logo: string;
  switch (props.type) {
    case "instagram":
      logo = InstagramLogo;
      break;
  }

  return (
    <a
      title="View Instagram Profile"
      href="https://www.instagram.com/luxesmilelounge/?hl=en"
      target="_blank"
    >
      <img className={`w-8 ${props.className}`} src={logo} />
    </a>
  );
};

export interface HeaderProps {
  pages: Page[];
}

export interface FooterProps {
  pages: Page[];
}

export const Header = (props: HeaderProps) => {
  return (
    <PaddedContainer className="bg-sub-back w-full h-24 justify-between flex items-center py-14">
      <div className="flex items-center justify-baseline gap-24">
        <div>
          <Link title="Return to home" to="/">
            <img className="w-40" src={Logo} />
          </Link>
        </div>

        <div>
          <nav className="flex gap-12">
            {props.pages.map((page) => {
              return <RouterLink to={page.path}>{page.title}</RouterLink>;
            })}
          </nav>
        </div>
      </div>

      <div>
        <SocialMedia type="instagram"/>
      </div>
    </PaddedContainer>
  );
};

const Copyright = () => {

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full text-sub flex justify-end text-lg">
      <p>Copyright © {year} <b>Luxe Smile Lounge, Inc.</b> - Pennsylvania</p>
    </div>
  )
}

export const Footer = (props: FooterProps) => {
  return (
    <PaddedContainer className="flex items-center justify-between bg-sub-back w-full h-40 py-24">
      <div className="flex gap-20 flex-1">
        <div className="flex flex-col flex-wrap h-36 items-start justify-start gap-x-8 gap-y-1">
           {
            props.pages.map((page)=>{
              return (
                <RouterLink className={"text-lg"} to={page.path}>{page.title}</RouterLink>
              )
            })
          }
         
        </div>
        <div>
          <SocialMedia type="instagram" className="w-8"/>
        </div>
      </div>


      <div className="">
        <Link title="Return to home" to="/">
          <img className="w-60" src={Logo} />
        </Link>
      </div>


      <div className="flex-1">
        <Copyright/>
      </div>
    </PaddedContainer>
  );
};
