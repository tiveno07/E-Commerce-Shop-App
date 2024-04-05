import React from "react";
import { ShopSetting } from "../components/Shop/ShopSetting.jsx";
import { DashBoardSidebar } from "../components/Layout/DashBoardSidebar.jsx";
import { DashboardHeader } from "../components/Layout/DashboardHeader.jsx";

export const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashBoardSidebar active={11} />
        </div>
        <ShopSetting />
      </div>
    </div>
  );
};
