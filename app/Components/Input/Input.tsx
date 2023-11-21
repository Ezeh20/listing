import React from "react";
import styles from "./Input.module.scss";
import { BsCurrencyDollar } from "react-icons/bs";

interface InputProps {
  label?: string;
  id: string;
  placeholder: string;
  value: string;
  type: string;
  error?: boolean;
  errorMessage?: string;
  formatPrice?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label = "Some label",
  id,
  placeholder = "Placeholder",
  value,
  type = "text",
  error,
  errorMessage,
  onChange,
  formatPrice,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.content}>
        <div>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={
              error ? `${styles.input} ${styles.error}` : `${styles.input}`
            }
          />
          {error && <small className={styles.small}>{errorMessage}</small>}
        </div>
        {formatPrice && <BsCurrencyDollar className={styles.dollar} />}
      </div>
    </div>
  );
};

export default Input;
