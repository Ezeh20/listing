"use client";
import { SafeUser } from "@/app/types";
import React from "react";
import styles from "./Liked.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorites from "@/app/hooks/useFavorites";
interface Props {
  id: string;
  currentUser?: SafeUser | null;
}
const Liked: React.FC<Props> = ({ id, currentUser }) => {
  const { hasLiked, toggleLike, disabled } = useFavorites({
    id,
    currentUser,
  });

  return (
    <button disabled={disabled} onClick={toggleLike} className={styles.heartContainer}>
      <AiOutlineHeart size={28} className={styles.heartOutline} />
      <AiFillHeart
        size={24}
        className={hasLiked ? `${styles.liked} ${styles.heart}` : `${styles.heart}`}
      />
    </button>
  );
};

export default Liked;
