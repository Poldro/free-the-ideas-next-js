import React from "react";

interface PrimaryButtonProps {
  onClick?: () => void;
  text: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  text,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center rounded-md border border-primary bg-dark px-3 py-2 text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-dark/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
