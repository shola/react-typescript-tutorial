import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick: MouseEventHandler;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
