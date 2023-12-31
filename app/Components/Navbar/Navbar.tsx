"use client";
import React from "react";
import Container from "../Container/Container";
import styles from "./Navbar.module.scss";
import Search from "./Search/Search";
import Menu from "./Menu/Menu";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Categories from "../Categories/Categories";
import { useRouter } from "next/navigation";

interface navbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<navbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <>
      <header
        className={`${styles.header} sticky top-0 w-full bg-white py-6 shadow-sm`}>
        <Container>
          <nav className={styles.nav}>
            <p className={styles.logo} onClick={() => router.push("/")}>
              Logo
            </p>
            <Search />
            <Menu currentUser={currentUser} />
          </nav>
        </Container>
      </header>
      <Categories />
    </>
  );
};

export default Navbar;
