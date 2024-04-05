import React, { useEffect } from "react";
import { AiFillShopping, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import lion from "../../Assests/lion.jpeg";

export const DashboardHeader = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller } = useSelector((state) => state?.seller);

  const sellerId = seller?.seller?._id;
  console.log(sellerId);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img src={lion} className="w-[55px] h-[55px]" alt="sfdgfb" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard-coupons" className="800px:block hidden">
            <AiOutlineGift
              size={30}
              color="#365"
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-event" className="800px:block hidden">
            <MdOutlineLocalOffer
              size={30}
              color="#365"
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              size={30}
              color="#365"
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage size={30} color="#365" className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              size={30}
              color="#365"
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${sellerId}`}>
            <img
              src={`${seller?.seller?.avatar[0]?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
