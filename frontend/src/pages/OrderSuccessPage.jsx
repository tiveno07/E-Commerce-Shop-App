import React from "react";
import { OrderSuccess } from "../components/Payment/OrderSuccess";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";

export const OrderSuccessPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <OrderSuccess />
      <Footer />
    </div>
  );
};
