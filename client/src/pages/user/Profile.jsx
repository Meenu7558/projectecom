import React, { useState } from "react";
import { axiosInstance } from "../../config/axioInstance";

import { EditProfileForm } from "../../components/user/EditProfileForm";
import { useFetch } from "../../hooks/usefetch";


export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");
    const [isProfileEdit, setisProfileEdit] = useState(false);

    const handleLogOut = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/logout",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
          {/* Action Buttons */}
          <section className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary w-full sm:w-auto">Orders</button>
            <button
              className="btn btn-secondary w-full sm:w-auto"
              onClick={() => setisProfileEdit(!isProfileEdit)}
            >
              {isProfileEdit ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button className="btn btn-accent w-full sm:w-auto" onClick={handleLogOut}>
              Logout
            </button>
          </section>
      
          {/* Edit Profile Form */}
          {isProfileEdit && (
            <section className="border p-6 rounded-lg shadow-md bg-gray-50">
              <EditProfileForm />
            </section>
          )}
      
          {/* Profile Details */}
          <section className="text-center space-y-4">
            <div className="flex justify-center">
              <img
                src={profileData?.profilePic}
                className="w-40 h-40 rounded-full object-cover shadow-lg"
                alt="Profile"
              />
            </div>
            <h1 className="text-2xl font-semibold">{profileData?.name}</h1>
            <p className="text-gray-600">Email: {profileData?.email}</p>
            <p className="text-gray-600">Mobile: {profileData?.mobile}</p>
          </section>
        </div>
      );
    }