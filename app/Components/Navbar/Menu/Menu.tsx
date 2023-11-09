"use client";
import React, { useCallback, useState } from "react";
import styles from "./Menu.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import MenuItems from "./MenuItems/MenuItems";
import useRegister from "@/app/hooks/useRegister";

const Menu = () => {
  const { onOpen } = useRegister();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.menu}>
      <p className={styles.message}>your home</p>
      <div className={styles.toggle} onClick={toggle}>
        <AiOutlineMenu className={styles.menuIcon} />
        <IoPersonOutline
          className={`${styles.menuIcon} ${styles.menuIconAlt}`}
        />
      </div>
      {isOpen ? (
        <div className={styles.menuItemsContainer}>
          <div className={styles.menuContainer}>
            <>
              <MenuItems close={setIsOpen} label="Login" onClick={onOpen} />
              <MenuItems close={setIsOpen} label="Singup" />
            </>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default Menu;
