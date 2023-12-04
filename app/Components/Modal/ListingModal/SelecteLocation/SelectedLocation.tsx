"use client";
import React from "react";
import styles from "./SelectedLocation.module.scss";
import useCountries from "@/app/hooks/useCountry";
import Select from "react-select";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChange: (e: CountrySelectValue) => void;
}
const SelectedLocation: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAllCountries } = useCountries();

  return (
    <div>
      <Select
        value={value && value}
        onChange={(e) => onChange(e as CountrySelectValue)}
        placeholder="pick a location"
        isClearable
        options={getAllCountries()}
        formatOptionLabel={(option) => (
          <div className={styles.optionLabel}>
            <p>{option.flag}</p>
            <div className={styles.optionName}>
              <p className={styles.label}>{option.label}</p>,
              <span className={styles.region}>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => `${styles.control}`,
          input: () => `${styles.input}`,
          option: () => `${styles.option}`,
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#eee",
            primary: "black",
          },
        })}
      />
    </div>
  );
};

export default SelectedLocation;
