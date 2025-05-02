import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
import { DarkMode } from "../shared/Darkmode";

export const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/admin/login");
  };

  const isAuthPage =
    location.pathname.includes("/admin/login") ||
    location.pathname.includes("/admin/signup");

  return (
    <header className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md fixed top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-500">
          <Link to="/admin/dashboard">
            Pretty<span className="text-gray-800 dark:text-white">Admin</span>
          </Link>
        </div>

        {isAuthPage ? (
          <div className="flex gap-4">
            <Link to="/admin/login" className="hover:text-pink-500 transition">
              Login
            </Link>
            <Link to="/admin/signup" className="hover:text-pink-500 transition">
              Signup
            </Link>
          </div>
        ) : (
          <nav className="flex gap-6 items-center font-medium">
            <Link to="/admin/dashboard" className="hover:text-pink-500 transition">
              Dashboard
            </Link>
            <Link to="/admin/products" className="hover:text-pink-500 transition">
              Products
            </Link>
            <Link to="/admin/users" className="hover:text-pink-500 transition">
              Users
            </Link>
            <Link to="/admin/orders" className="hover:text-pink-500 transition">
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm text-white"
            >
              Logout
            </button>
            <DarkMode />
          </nav>
        )}
      </nav>
    </header>
  );
};
