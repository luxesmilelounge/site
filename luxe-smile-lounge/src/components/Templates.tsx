import { Link } from "react-router-dom";
import Logo from "/logo.png";
import InstagramLogo from "/instagram.svg";
import type { ReactNode } from "react";
import type { Page } from "../App";
import { PaddedContainer } from "./Containers";
import { motion } from "motion/react";

const RouterLink = (props: {
  to: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`group text-xl text-sub transition-all duration-300 hover:text-sub-hover flex flex-col gap-0 items-center ${props.className}`}
    >
      <Link to={props.to}>{props.children}</Link>

      <div className="group-hover:border-sub group-hover:w-full transition-all duration-300 w-0 border border-transparent "></div>
    </div>
  );
};

export const SocialMedia = (props: {
  className?: string;
  type: "instagram";
}) => {
  let logo: string;
  switch (props.type) {
    case "instagram":
      logo = InstagramLogo;
      break;
  }

  return (
    <motion.a
      title="View Instagram Profile"
      href="https://www.instagram.com/luxesmilelounge/?hl=en"
      target="_blank"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
    >
      <img className={`w-8 ${props.className}`} src={logo} />
    </motion.a>
  );
};

export interface HeaderProps {
  pages: Page[];
}

export interface FooterProps {
  pages: Page[];
}

export const Header = (props: HeaderProps) => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 25, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <PaddedContainer className="bg-linear-to-r from-sub-back-grad  to-sub-back w-full h-24 justify-between flex items-center py-14">
      <div className="flex items-center justify-baseline gap-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <Link title="Return to home" to="/">
            <img className="w-40" src={Logo} />
          </Link>
        </motion.div>

        <motion.div>
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-12"
          >
            {props.pages.map((page) => (
              <motion.div key={page.path} variants={itemVariants}>
                <RouterLink to={page.path}>{page.title}</RouterLink>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      </div>

      <div>
        <SocialMedia type="instagram" />
      </div>
    </PaddedContainer>
  );
};

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full text-sub flex justify-end text-lg">
      <p>
        Copyright © {year} <b>Luxe Smile Lounge, Inc.</b> - Pennsylvania
      </p>
    </div>
  );
};

export const Footer = (props: FooterProps) => {
  return (
    <PaddedContainer className="flex items-center justify-between bg-linear-to-r from-sub-back-grad  to-sub-back w-full h-40 py-24">
      <div className="flex gap-20 flex-1">
        <div className="flex flex-col flex-wrap h-36 items-start justify-start gap-x-8 gap-y-1">
          {props.pages.map((page, index) => {
            return (
              <RouterLink key={`${page.path}-${index}`} className={"text-lg"} to={page.path}>
                {page.title}
              </RouterLink>
            );
          })}
        </div>
        <div>
          <SocialMedia type="instagram" className="w-8" />
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        <Link title="Return to home" to="/">
          <img className="w-60" src={Logo} />
        </Link>
      </motion.div>

      <div className="flex-1">
        <Copyright />
      </div>
    </PaddedContainer>
  );
};
