"use client";
import React, { useCallback, useState } from "react";
import styles from "./Menu.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import MenuItems from "./MenuItems/MenuItems";
import useRegister from "@/app/hooks/useRegister";
import useLoginModal from "@/app/hooks/useLogin";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { SafeUser } from "@/app/types";
import Avatar from "../../Avatar/Avatar";
interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const { onOpen } = useRegister();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.menu}>
      <p className={styles.message}>your home</p>
      <div className={styles.toggle} onClick={toggle}>
        <AiOutlineMenu className={styles.menuIcon} />
        <Avatar src={currentUser?.image} />
      </div>
      {isOpen ? (
        <div className={styles.menuItemsContainer}>
          <div className={styles.menuContainer}>
            {currentUser ? (
              <>
                <MenuItems
                  close={setIsOpen}
                  label="My trips"
                  onClick={() => {}}
                />
                <MenuItems
                  close={setIsOpen}
                  label="My favorites"
                  onClick={() => {}}
                />
                <MenuItems
                  close={setIsOpen}
                  label="My reservations"
                  onClick={() => {}}
                />
                <MenuItems
                  close={setIsOpen}
                  label="My properties"
                  onClick={() => {}}
                />
                <MenuItems close={setIsOpen} label="Airbnb your home" />
                <hr />
                <MenuItems
                  close={setIsOpen}
                  label="Logout"
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItems
                  close={setIsOpen}
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                />
                <MenuItems close={setIsOpen} label="Singup" onClick={onOpen} />
              </>
            )}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default Menu;
