import React from "react";
import { DashboardHeader } from "../../components/Layout/DashboardHeader";
import { DashBoardSidebar } from "../../components/Layout/DashBoardSidebar";
import { WithdrawMoney } from "../../components/Shop/WithdrawMoney.jsx";

export const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashBoardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};
