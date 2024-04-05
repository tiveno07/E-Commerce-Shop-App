import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import { ProductCard } from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

export const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);
  const { allProducts } = useSelector((state) => state?.product);

  useEffect(() => {
    const d =
      allProducts?.allProducts &&
      allProducts?.allProducts.filter((i) => i?.category === data?.category);
    setProducts(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`${styles.section} p-4`}>
          <h2
            className={`${styles.headings} text-[25px] font-[500] border mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 last:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products?.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};
