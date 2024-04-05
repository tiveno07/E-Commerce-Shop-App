import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { AllProducts } from "../../components/Shop/AllProducts.jsx";

export const ShopAllProducts = ({ seller }) => {
  return (
    <div>
      <DashboardHeader seller={seller} />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};
