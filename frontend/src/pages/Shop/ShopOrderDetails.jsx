import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { Footer } from "../../components/Layout/Footer";
import { OrderDetails } from "../../components/Shop/OrderDetails.jsx";

export const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};
