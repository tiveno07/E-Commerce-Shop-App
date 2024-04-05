import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { DashboardHero } from "../../components/Shop/DashboardHero.jsx";

export const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashBoardSidebar active={1} />
        </div>
        <DashboardHero active={1} />
      </div>
    </div>
  );
};
