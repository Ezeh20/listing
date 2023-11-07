"use client"
import React from "react";
import Container from "../Container/Container";
import styles from "./Navbar.module.scss";
import Search from "./Search/Search";
import Menu from "./Menu/Menu";

const Navbar = () => {
  return (
    <header
      className={`${styles.header} sticky top-0 w-full bg-white py-6 shadow-sm`}>
      <Container>
        <nav className={styles.nav}>
          <p className={styles.logo}>Logo</p>
          <Search />
          <Menu />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
