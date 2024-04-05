import React, { useEffect, useState } from "react";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import { SuggestedProduct } from "../components/Product/SuggestedProduct.jsx";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export const EventDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allEvent } = useSelector((state) => state?.events);

  const event = allEvent?.events;

  useEffect(() => {
    const data = event && event?.find((i) => i?._id === id);
    setData(data);
  }, [event, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};
