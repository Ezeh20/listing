import React, { useCallback } from "react";
import { IconType } from "react-icons";
import styles from "./CategoryBox.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(()=>{

    //define an empty object as the current query
    let currentQuery = {};

    //check if there is a query in the url then parse(change) it to an object
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    //udapdate the query by including the category query in the url
    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    //if that category is already selected then remove it from the query
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    //form the url query string to be used, it is convert to a string from an object and also skip null queries
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    //push the updatedString to the url
    router.push(url);
  },[label, params, router
  ])
  
  return (
    <div
      className={
        selected
          ? `${styles.category} ${styles.selected}`
          : `${styles.category}`
      }
      onClick={handleClick}>
      <Icon size={24} className={styles.icon} />
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default CategoryBox;
