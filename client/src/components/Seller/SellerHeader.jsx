import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DarkMode } from "../shared/Darkmode";

const SellerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/seller/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const onLinkClick = (target) => {
    console.log(`Navigating to ${target}`);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md w-full sticky top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/seller/dashboard" className="text-2xl font-bold text-pink-500">
          Seller<span className="text-gray-800 dark:text-white">Panel</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <li className="hover:text-pink-500 transition duration-300">
            <Link to="/seller/dashboard" onClick={() => onLinkClick("Dashboard")}>Dashboard</Link>
          </li>
          <li className="hover:text-pink-500 transition duration-300">
            <Link to="/seller/products" onClick={() => onLinkClick("Products")}>Products</Link>
          </li>
          <li className="hover:text-pink-500 transition duration-300">
            <Link to="/seller/orders">Orders</Link>
          </li>
          <li className="hover:text-pink-500 transition duration-300">
            <Link to="/seller/profile">Profile</Link>
          </li>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-sm text-white rounded"
          >
            Logout
          </button>
          <DarkMode />
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col gap-4 px-6 py-4 shadow-md">
          <Link to="/seller/dashboard" onClick={() => { toggleMenu(); onLinkClick("Dashboard"); }}>
            Dashboard
          </Link>
          <Link to="/seller/products" onClick={() => { toggleMenu(); onLinkClick("Products"); }}>
            Products
          </Link>
          <Link to="/seller/orders" onClick={toggleMenu}>Orders</Link>
          <Link to="/seller/profile" onClick={toggleMenu}>Profile</Link>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="text-red-600 dark:text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default SellerHeader;
