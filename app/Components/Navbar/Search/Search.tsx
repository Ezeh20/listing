"use client";
import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.filterContainer}>
        <p className={styles.anywhere}>Anywhere</p>
        <p className={styles.anyweek}>Anyweek</p>
        <div className={styles.guest}>
          <p className={styles.add}>Add guest</p>
          <BiSearch  className={styles.searchIcon}/>
        </div>
      </div>
    </div>
  );
};

export default Search;
