import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Loading } from "../components/Loading/Loading";

export const SellerProtectedRoute = ({ children }) => {
  const { isSuccess, isLoading } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loading />;
  } else {
    if (!isSuccess) {
      return <Navigate to={`/shop-login`} replace />;
    }
  }
  return children;
};
