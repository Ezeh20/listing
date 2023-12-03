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
<<<<<<< HEAD:app/Components/Modal/ListingModal/SelectedCategory/SelectedCategory.tsx
        !selected
          ? `${styles.selectedCategory}`
          : `${styles.selectedCategory} ${styles.selected}`
      }
      onClick={onClick}>
      <Icon size={24} />
=======
        selected
          ? `${styles.selected} ${styles.selectedCategory}`
          : `${styles.selectedCategory}`
      }
      onClick={onClick}
    >
      <Icon size={22} />
>>>>>>> 651845c9f9bcbc91ab163848ba2499d6abee3bae:app/Components/SelectedCategory/SelectedCategory.tsx
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default SelectedCategory;
