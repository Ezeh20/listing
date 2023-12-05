import React from "react";
import styles from "./TextArea.module.scss";

interface InputProps {
  label?: string;
  id: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<InputProps> = ({
  label = "Some label",
  id,
  placeholder = "Placeholder",
  value,
  error,
  errorMessage,
  onChange,
}) => {
  return (
    <div className={styles.textContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.content}>
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? `${styles.input} ${styles.error}` : `${styles.input}`}
        />
        {error && <small className={styles.small}>{errorMessage}</small>}
      </div>
    </div>
  );
};

export default TextArea;
