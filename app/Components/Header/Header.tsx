import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const Header: React.FC<HeaderProps> = ({ centered, title, subtitle }) => {
  const classes = () => {
    if (centered) {
      return `${styles.header} ${styles.center}`;
    } else {
      return `${styles.header}`;
    }
  };

  return (
    <div className={classes()}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default Header;
