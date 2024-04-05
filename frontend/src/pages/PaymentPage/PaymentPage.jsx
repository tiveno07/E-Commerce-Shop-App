import React from "react";
import { Footer } from "../../components/Layout/Footer";
import { Header } from "../../components/Layout/Header";
import { Payment } from "../../components/Payment/Payment";

export const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};
