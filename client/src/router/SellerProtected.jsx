import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteSeller = () => {
  const { isSellerAuth } = useSelector((state) => state.seller);

  // Show nothing (or a loader) while auth status is unknown
  if (typeof isSellerAuth === "undefined") return null;

  // Redirect to login if not authenticated
  return isSellerAuth ? <Outlet /> : <Navigate to="/seller/login" replace />;
};

export default ProtectedRouteSeller;
