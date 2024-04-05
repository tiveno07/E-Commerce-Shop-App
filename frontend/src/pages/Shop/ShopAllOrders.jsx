import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { AllOrders } from "../../components/Shop/AllOrders.jsx";

export const ShopAllOrders = ({ seller }) => {
  return (
    <div>
      <DashboardHeader seller={seller} />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSidebar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};
