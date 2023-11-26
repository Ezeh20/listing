import React from "react";
import Container from "../Container/Container";
import styles from "./Categories.module.scss";
import CategoryBox from "../CategoryBox/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categoriesItems } from "./CategoriesItems";

const Categories = () => {
  //get the pathName cause we only need to show the categories in the main page
  //also for the sake to know our current selected category we can get the active category form the params
  const params = useSearchParams();
  const pathName = usePathname();
  const category = params?.get("category");
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className={styles.categories}>
        {categoriesItems.map((itm) => (
          <CategoryBox
            key={itm.label}
            label={itm.label}
            icon={itm.icon}
            selected={category === itm.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
