import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { CreatedProduct } from "../../components/Shop/CreatedProduct.jsx";

export const ShopCreatedProduct = () => {
  return(
    <div>
        <DashboardHeader /> 
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashBoardSidebar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreatedProduct />
            </div>
        </div>
    </div>
  )
};
