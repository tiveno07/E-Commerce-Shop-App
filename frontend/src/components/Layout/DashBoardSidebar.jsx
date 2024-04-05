import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiAlarmOn, CiBag1, CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

export const DashBoardSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-scroll sticky top-0 left-0 z-10">
      {/* Single Item*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={32}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            DashBoard
          </h5>
        </Link>
      </div>

      {/* All Orders Item*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={32}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      {/* All Products Item*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage size={32} color={`${active === 3 ? "crinson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      {/* All Products Created*/}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-products"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={32}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Products
          </h5>
        </Link>
      </div>

      {/* All Event*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-event" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={32}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      {/* Create Event*/}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-events"
          className="w-full flex items-center"
        >
          <VscNewFile
            size={32}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Events
          </h5>
        </Link>
      </div>

      {/* Withdraw Money*/}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={32}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      {/*Inbox*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-message" className="w-full flex items-center">
          <CiAlarmOn size={32} color={`${active === 8 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      {/*Discount Codes*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={32}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      {/*Refunds*/}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <CiBag1 size={32} color={`${active === 10 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Refund
          </h5>
        </Link>
      </div>

      {/*Settings*/}
      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={32}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[19px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};
