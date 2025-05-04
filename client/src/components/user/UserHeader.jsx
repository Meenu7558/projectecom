import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from "../shared/Darkmode";

export const UserHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md fixed top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-500 dark:text-pink-300">
          <Link to="/">
            Pretty<span className="text-gray-800 dark:text-white">Pink</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <li className="hover:text-pink-500 dark:hover:text-pink-400 transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-pink-500 dark:hover:text-pink-400 transition duration-300">
            <Link to="/Shop">Shop</Link>
          </li>
          <li className="hover:text-pink-500 dark:hover:text-pink-400 transition duration-300">
            <Link to="/About">About Us</Link>
          </li>
          <li className="hover:text-pink-500 dark:hover:text-pink-400 transition duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-6 text-xl text-gray-700 dark:text-gray-200">
          {/* Dark mode toggle */}
          <DarkMode />

          <Link
            to="/user/search"
            className="hover:text-pink-500 dark:hover:text-pink-400 transition"
          >
            <i className="ri-search-line"></i>
          </Link>

          <button
            onClick={() => navigate('/user/cart')}
            className="hover:text-pink-500 dark:hover:text-pink-400 transition"
          >
            <i className="ri-shopping-bag-line text-xl"></i>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-pink-500 dark:hover:text-pink-400 transition"
            >
              <i className="ri-user-line"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
