import React, { useEffect } from "react";
import { ShopLogin } from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const ShopLoginPage = ({ isSuccess }) => {
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state?.seller);
  const sellers = seller?.seller?._id;

  useEffect(() => {
    if (isSuccess === true) {
      navigate(`/shop/${sellers}`);
    }
  }, [navigate, isSuccess, sellers]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
};
