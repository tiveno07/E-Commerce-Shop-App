import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { AllRefundOrders } from "../../components/Shop/AllRefundOrders.jsx";

export const ShopAllRefunds = ({ seller }) => {
  return (
    <div>
      <div>
        <DashboardHeader seller={seller} />
        <div className="flex justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashBoardSidebar active={10} />
          </div>
          <div className="w-full justify-center flex">
            <AllRefundOrders />
          </div>
        </div>
      </div>
    </div>
  );
};
