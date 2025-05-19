import React, { useState } from "react";
import { useFetch } from "../../hooks/usefetch";
import { EditProfileForm } from "../../components/user/EditProfileForm";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";



export const Profile = () => {
  const [profileData, isLoading, error] = useFetch("/user/profile");
  const [isProfileEdit, setisProfileEdit] = useState(false);
  const navigate = useNavigate();
  const handleOrdersClick = () => {
    // Navigate to orders page
    navigate("/user/orders"); // 
  };
  


  const handleLogOut = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axiosInstance({
        method: "POST",
        url: "/user/logout",
        withCredentials: true, // Ensure cookies are included in the request
      });
      console.log("Logout successful:", response.data);
      navigate("/"); // Redirect to home page or login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  return (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
    
    {/* Header + Buttons */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* Welcome Text */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            Welcome, {profileData?.name || "Loading..."}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{profileData?.email || "Loading..."}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-600 transition"
            onClick={handleOrdersClick}
          >
            Orders
          </button>

          <button
            className="bg-pink-200 text-pink-900 px-5 py-2 rounded-lg hover:bg-pink-300 dark:bg-pink-600 dark:text-white dark:hover:bg-pink-500 transition"
            onClick={() => setisProfileEdit(!isProfileEdit)}
          >
            {isProfileEdit ? "Cancel Edit" : "Edit Profile"}
          </button>

          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    {/* Edit Form */}
    {isProfileEdit && (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <EditProfileForm 
          setisProfileEdit={setisProfileEdit} 
          initialProfileData={profileData} 
        />
      </div>
    )}

    {/* Profile Info Card */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center space-y-4">
      <div className="flex justify-center">

        <img
  src={
    profileData?.profilePic ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
  alt="Profile"
  className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 shadow"
/>

      </div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {profileData?.name || "No Name Available"}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Email: {profileData?.email || "No Email Available"}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Mobile: {profileData?.mobile || "No Mobile Available"}
       </p>
    </div>
  </div>
);

}