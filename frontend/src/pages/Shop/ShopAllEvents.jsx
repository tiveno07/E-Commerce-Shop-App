import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { AllEvents } from "../../components/Shop/AllEvents.jsx";

export const ShopAllEvents = ({ seller }) => {
  return (
    <div>
      <DashboardHeader seller={seller} />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSidebar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};
