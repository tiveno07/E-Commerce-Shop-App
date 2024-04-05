import React, { useState } from "react";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import { ProductCard } from "../Route/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { Rating } from "../Product/Rating";

export const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { allProducts } = useSelector((state) => state?.product);
  const { allEvent } = useSelector((state) => state?.events);
  const allEvents = allEvent.events;

  const products = allProducts?.allProducts;
  console.log(products);
  const allReviews =
    products && products?.map((product) => product?.reviews).flat();
  console.log(allReviews);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
      </div>
      {isOwner && (
        <div>
          <Link to="/dashboard">
            <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
              <span className="text-white">Go Dashboard</span>
            </div>
          </Link>
        </div>
      )}

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {allProducts?.allProducts &&
            allProducts?.allProducts?.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allEvents &&
            allEvents?.map((i, index) => (
              <ProductCard data={i} isEvent={true} key={index} />
            ))}
        </div>
      )}
      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews?.map((item, index) => (
              <div className="w-full flex my-3">
                <img
                  src={`${backend_url}${item?.user?.user?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item?.user?.name}</h1>
                    <Rating rating={item?.rating} />
                  </div>
                  <p className="font-[400] tet-[#000000a7]">{item?.comment}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
