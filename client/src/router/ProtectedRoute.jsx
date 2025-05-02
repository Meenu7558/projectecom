import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axioInstance";
import { clearUser, saveUser } from "../redux/features/userSlice";


export const ProtectedRoute = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get("/user/profile", {
          withCredentials: true,
        });
        dispatch(saveUser(res.data)); // ✅ set user data and auth = true
      } catch (err) {
        dispatch(clearUser());        // ❌ clear user on error
        navigate("/login");           // 🔁 redirect to login
      } finally {
        setCheckingAuth(false);       // ✅ done checking
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  if (checkingAuth) return <div className="text-center p-4">Checking authentication...</div>;

  return isUserAuth ? <Outlet /> : null;
};

