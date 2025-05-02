import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from "../shared/Darkmode";

export const UserHeader = () => {
  const navigate = useNavigate();

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

          <Link to="/user/search" className="hover:text-pink-500 dark:hover:text-pink-400 transition">
            <i className="ri-search-line"></i>
          </Link>

          <button
            onClick={() => navigate('/user/cart')}
            className="relative hover:text-pink-500 dark:hover:text-pink-400 transition"
          >
            <i className="ri-shopping-bag-line"></i>
            <sup className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1.5">
              2
            </sup>
          </button>

          <Link to="/login" className="hover:text-pink-500 dark:hover:text-pink-400 transition">
            <i className="ri-user-line"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};
