import type { ReactNode } from "react";

interface PaddedContainerProps {
  children: ReactNode;
  className?: string;
}

export const PaddedContainer = (props: PaddedContainerProps) => {
  return <div className={`bg-back px-48 ${props.className}`}>{props.children}</div>;
};
