import React from 'react'
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../config/axioInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { clearUser, saveUser } from '../../redux/features/userSlice';


 const Login = ({role}) => {
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    loginAPI: "/user/login",
    profileRoute: "/user/profile",
    signupRoute: "/signup",
};

if (role == "admin") {
    user.role = "admin";
    user.loginAPI = "/admin/login";
    (user.profileRoute = "/admin/profile"),
     (user.signupRoute = "/admin/signup");
}

const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.loginAPI,
        data: data,
        withCredentials: true,
      });
      
        
        console.log("response====", response);
        dispatch(saveUser(response?.data?.data));
        toast.success("Login success");
        navigate(user.profileRoute);
      } catch (error) {
           dispatch(clearUser());
            toast.error("Login Failed");
            console.log(error);
        
    }
}; 

return (
    <div className="hero min-h-screen bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500">
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        {/* Left Side Text */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Login now!</h1>
          <p className="py-6 max-w-md text-lg">
            Access your personalized shopping dashboard, track orders, manage your wishlist, and enjoy a seamless beauty and makeup shopping experience — all in one place.
          </p>
        </div>
  
        {/* Login Form Card */}
        <div className="card bg-white bg-opacity-90 w-full max-w-sm shrink-0 shadow-2xl rounded-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            
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
              
              <div className="flex items-center justify-between mt-2">
                <a href="#" className="text-sm text-pink-600 hover:underline">Forgot password?</a>
                <Link to={user.signupRoute} className="text-sm text-pink-600 hover:underline">
                  New User?
                </Link>
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 font-semibold">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  

};

export default Login;

