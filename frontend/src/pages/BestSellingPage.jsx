import React, { useEffect, useState } from "react";
import { Header } from "../components/Layout/Header";
import styles from "../styles/styles";
import { ProductCard } from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

export const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state?.product);
  const products = allProducts?.allProducts;
  useEffect(() => {
    const d =
      products && products?.slice()?.sort((a, b) => a?.sold_out - b?.sold_out);
    setData(d);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data?.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};
