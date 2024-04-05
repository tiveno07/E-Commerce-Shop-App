import React, { useEffect, useState } from "react";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import { SuggestedProduct } from "../components/Product/SuggestedProduct.jsx";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allProducts } = useSelector((state) => state?.product);

  const product = allProducts?.allProducts;

  useEffect(() => {
    const data = product && product?.find((i) => i?._id === id);
    setData(data);
  }, [product, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};
