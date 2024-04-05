import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { loadAUser } from "../redux/user/userSlice";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAUser());
  }, []);

  const { isAuthenticated, isLoading } = useSelector((state) => state?.user);

  if (isLoading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};
