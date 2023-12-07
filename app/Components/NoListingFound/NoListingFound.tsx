"use client";
import React from "react";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import styles from "./NoListingFound.module.scss";

interface NoListingFoundProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}
const NoListingFound: React.FC<NoListingFoundProps> = ({ title, subtitle, showButton }) => {
  const router = useRouter();
  return (
    <div className={styles.not}>
      <Header title={title} subtitle={subtitle} centered />
      {showButton && (
        <div className={styles.btnContainer}>
          <Button
            label="Reset Filters"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NoListingFound;
