import React from "react";
import styles from "./Counter.module.scss";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onSub = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <div className={styles.Counter}>
      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sub} onClick={onSub}>
          <FiMinus size={17} />
        </div>
        <p className={styles.value}>{value}</p>
        <div className={styles.add} onClick={onAdd}>
          <IoMdAdd size={17} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
