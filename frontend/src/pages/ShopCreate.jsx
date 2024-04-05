import React, { useEffect } from "react";
import { ShopCreated } from "../components/Shop/ShopCreated.jsx";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export const ShopCreate = ({ sellers, isSuccess }) => {
  const navigate = useNavigate();
  // const { isSuccess, seller } = useSelector((state) => state?.seller);
  // const sellers = seller?.seller?._id;

  useEffect(() => {
    if (isSuccess === true) {
      navigate(`/shop/${sellers}`);
    }
  }, [navigate, isSuccess, sellers]);

  console.log(sellers);
  return (
    <div>
      <ShopCreated />
    </div>
  );
};
