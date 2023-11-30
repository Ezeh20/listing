"use client"
import Image from "next/image";
import React from "react";
import avt from "../../../public/assets/avatar.png";
import styles from './Avatar.module.scss'

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className={styles.avatarContainer}>
      <Image width={30} height={30} src={src || avt} alt="avatar" className={styles.avatar} />
    </div>
  );
};

export default Avatar;
