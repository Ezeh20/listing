import React from "react";
import { IconType } from "react-icons";
import styles from "./SelectedCategory.module.scss";

interface CategoryProps {
  label: string;
  icon: IconType;
  onClick: () => void;
}
const SelectedCategory: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className={styles.selectedCategory}>
      <Icon size={24}/>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default SelectedCategory;
