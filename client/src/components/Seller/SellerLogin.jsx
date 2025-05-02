import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axioInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { saveSeller, clearSeller } from "../../redux/features/sellerSlice";

const SellerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/seller/login", data,{withCredentials: true,});
      dispatch(saveSeller(response?.data?.data));
      toast.success("Login successful");
      navigate("/seller/dashboard");
    } catch (error) {
      dispatch(clearSeller());
      toast.error("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Seller Login</h1>
          <p className="py-6">
            Welcome back, seller! Please login to access your dashboard and manage your store.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="input input-bordered"
                required
              />
              <div className="flex items-center justify-between">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <Link to="/seller/signup" className="label-text-alt link link-hover">
                    New Seller?
                  </Link>
                </label>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
