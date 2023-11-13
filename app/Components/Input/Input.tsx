import React from "react";
import styles from './Input.module.scss'

interface InputProps {
  label?: string;
  id: string;
  placeholder: string;
  value: string;
  type: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label="Some label",
  id,
  placeholder="Placeholder",
  value,
  type="text",
  error,
  onChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? `${styles.input} ${styles.error}` : `${styles.input}`}
      />
    </div>
  );
};

export default Input;
