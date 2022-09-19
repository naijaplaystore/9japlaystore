import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-[#72F239] hover:bg-green-500 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
