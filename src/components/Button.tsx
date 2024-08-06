import type  { FC, ButtonHTMLAttributes } from "react";
import  clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  return (
    <button
      className={clsx(
        "rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500": variant === "primary",
          "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300": variant === "secondary",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
