import React from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

export const FeatureProducts = () => {
  const { allProducts } = useSelector((state) => state?.product);
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.headings}`}>
        <h1>Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {allProducts?.allProducts &&
          allProducts?.allProducts?.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
      </div>
    </div>
  );
};
