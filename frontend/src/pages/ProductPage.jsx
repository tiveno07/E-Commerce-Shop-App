import React, { useEffect, useState } from "react";
import { Header } from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

export const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state?.product);

  console.log(isLoading);
  const dataCat = allProducts?.allProducts;
  useEffect(() => {
    if (categoryData === null) {
      const d =
        dataCat && dataCat?.slice()?.sort((a, b) => b?.sold_out - a?.sold_out);
      setData(d);
    } else {
      const d = dataCat && dataCat?.filter((i) => i?.category === categoryData);
      setData(d);
    }
  }, [dataCat, categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data?.map((i, index) => (
              <ProductCard isLoading={isLoading} data={i} key={index} />
            ))}
        </div>
        {data && data?.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Products Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};
