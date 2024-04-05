import React, { useEffect } from "react";
import { Signup } from "../components/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadAUser } from "../redux/user/userSlice.js";

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(loadAUser());
  }, [dispatch]);

  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated === true) {
      return navigate("/");
    }
  });

  return <Signup />;
};
