"use client";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import styles from "./ImageUpload.module.scss";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {   
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset="wx0xkehn" options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className={styles.upload}>
            <TbPhotoPlus size={55} />
            <p className={styles.prompt}>Click to upload</p>
            {value && (
              <div className={styles.imgContainer}>
                <Image fill src={value} alt="uploaded" className={styles.img}/>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
