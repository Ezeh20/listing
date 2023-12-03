import React, { useCallback } from "react";
import styles from "./MenuItems.module.scss";

interface MenuItemsProps {
  close?: (prev: boolean) => void;
  onClick?: () => void;
  label?: string;
}
const MenuItems: React.FC<MenuItemsProps> = ({ close, onClick, label }) => {
  const menuClick = useCallback(() => {
    if (close) {
      close(false);
    }
    if (onClick) {
      onClick();
    }
  }, [close, onClick]);

  return (
    <div className={styles.menus} onClick={menuClick}>
      {label}
    </div>
  );
};

export default MenuItems;
