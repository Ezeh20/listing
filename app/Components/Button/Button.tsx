import React from "react";
import styles from "./Button.module.scss";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: IconType;
  small?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
  small,
}) => {

  return (
    <button className={`${styles.btn} 
    ${small ? `${styles.small}`:`${styles.normal}`}
    ${outline ? `${styles.outline}` : `${styles.noOutline}`}
    `}>
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
