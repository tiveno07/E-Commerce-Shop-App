import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { DashboardMessages } from "../../components/Shop/DashboardMessages.jsx";

export const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashBoardSidebar active={8} />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
};
