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
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now! </h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" {...register("email")} className="input input-bordered" required />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
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
                            <Link to={user.signupRoute} className="label-text-alt link link-hover">
                             New User?
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

export default Login;

