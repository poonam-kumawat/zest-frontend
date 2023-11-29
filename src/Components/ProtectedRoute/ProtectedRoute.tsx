import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { rootType } from "../../Redux/rootReducer";

const ProtectedRoute = ({ children }: any) => {
  const { accessToken } = useSelector((state: rootType) => state.user);
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
