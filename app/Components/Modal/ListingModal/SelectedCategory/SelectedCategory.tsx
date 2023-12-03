"use client";
import React from "react";
import { IconType } from "react-icons";
import styles from "./SelectedCategory.module.scss";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: () => void;
}
const SelectedCategory: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={
        !selected
          ? `${styles.selectedCategory}`
          : `${styles.selectedCategory} ${styles.selected}`
      }
      onClick={onClick}>
      <Icon size={24} />
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default SelectedCategory;
