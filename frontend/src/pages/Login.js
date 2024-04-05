import React, { useEffect } from "react";
import { Login } from "../components/Login/Login.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state?.user);

  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated === true) {
      return navigate("/");
    }
  });
  return <Login />;
};
