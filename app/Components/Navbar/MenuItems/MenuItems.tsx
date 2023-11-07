import React from "react";
import styles from "./MenuItems.module.scss";

interface MenuItemsProps {
  onClick: () => void;
  label: string;
}
const MenuItems: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div className={styles.menus} onClick={() => {}}>
      {label}
    </div>
  );
};

export default MenuItems;
