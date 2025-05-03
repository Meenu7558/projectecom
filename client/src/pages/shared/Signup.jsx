import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";

export const Signup = ({role='user'}) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            data.role = role;
            console.log("Signup data ===", data);

            const response = await axiosInstance({
                method: "POST",
                url: "/user/signup",
                data: data,
                withCredentials: true,
            });
            console.log("response====", response);
            navigate("/user/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="hero min-h-screen bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500">
          <div className="hero-content flex-col lg:flex-row">
            
            {/* Left Side Text */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-5xl font-extrabold drop-shadow-md">Signup now!</h1>
              <p className="py-6 max-w-md text-lg">
                Create your beauty and makeup shopping account to access personalized deals, save your favorites, and track all your orders in one place.
              </p>
            </div>
      
            {/* Signup Form Card */}
            <div className="card bg-white bg-opacity-90 w-full max-w-sm shrink-0 shadow-2xl rounded-2xl">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                
                {/* Username */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-pink-700 font-semibold">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("name")}
                    className="input input-bordered border-pink-300 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
      
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-pink-700 font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    {...register("email")}
                    className="input input-bordered border-pink-300 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
      
                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-pink-700 font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    {...register("password")}
                    className="input input-bordered border-pink-300 focus:border-pink-500 focus:outline-none"
                    required
                  />
                  <label className="label">
                    <Link to="/login" className="label-text-alt link link-hover text-pink-600 hover:underline">
                      Existing User?
                    </Link>
                  </label>
                </div>
      
                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button className="btn bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 font-semibold">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
      


};