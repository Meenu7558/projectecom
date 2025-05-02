import React from "react";
import { Outlet } from "react-router-dom";
import SellerHeader from "../components/Seller/SellerHeader";


const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Seller Header */}
      <SellerHeader />

      {/* Main Content */}
      <main className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </main>

      
      
    </div>
  );
};

export default SellerLayout;
