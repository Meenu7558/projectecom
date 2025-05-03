import React, { useEffect, useState } from "react";
import { Navbar } from "../components/user/Navbar";
import { UserHeader } from "../components/user/UserHeader";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axioInstance";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
    const { isUserAuth, userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const [loading, setLoading] = useState(true); // Track the loading state

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
                withCredentials: true,
            });
            if (response.data) {
                dispatch(saveUser(response.data)); // Save the user data if response is valid
            } else {
                dispatch(clearUser()); // If no data, clear user
            }
        } catch (error) {
            dispatch(clearUser()); // In case of error, clear user data
            console.error("Error checking user:", error); // Log the error for better debugging
        } finally {
            setLoading(false); // Set loading to false after the check is done
        }
    };

    
    
    
    useEffect(() => {
        checkUser();
    }, [location.pathname]); // Re-run when the location changes

    if (loading) {
        return <div className="text-center py-10">Loading...</div>; // Add a more user-friendly loading state
    }

    return (
        <div>
          {/* Show Navbar as default during loading */}
          {loading ? <Navbar /> : isUserAuth ? <UserHeader /> : <Navbar />}
      
          <div className="min-h-screen">
            {loading ? <div className="text-center py-10">Loading...</div> : <Outlet />}
          </div>
      
          <Footer />
        </div>
      );
    }