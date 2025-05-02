import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";


export const Navbar = () => {
    
        
          return (
            <header className="w-full bg-white shadow-md fixed top-0 z-50">
            <nav className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center">
              
              {/* Logo */}
              <div className="text-2xl font-bold text-pink-500">
                <Link to="/">
                  Pretty<span className="text-gray-800">Pink</span>
                </Link>
              </div>
        
              {/* Navigation Links */}
              <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/Shop">Shop</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/About">About Us</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
              <DarkMode />
              {/* Nav Icons */}
              <div className="flex items-center gap-6 text-xl text-gray-700">
                <Link to="/user/search" className="hover:text-pink-500 transition">
                  <i className="ri-search-line"></i>
                </Link>
        
                <div className="flex gap-4">
  <Link
    to="/signup"
    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    <i className="ri-user-add-line"></i>
    <span>Sign Up</span>
  </Link>

  <Link
    to="/login"
    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
  >
    <i className="ri-login-box-line"></i>
    <span>Login</span>
  </Link>
</div>

              </div>
            </nav>
          </header>
          );
        };
        
        
        