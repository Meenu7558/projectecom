import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearAdmin, saveAdmin } from "../redux/features/adminslice"
import { axiosInstance } from "../config/axioInstance";

export const AdminProtectedRoute = () => {
  const { isAdminAuth } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile", {
          withCredentials: true,
        });
        dispatch(saveAdmin(res.data));
      } catch (err) {
        dispatch(clearAdmin());
        navigate("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAdmin();
  }, [dispatch, navigate]);

  if (checkingAuth) return <div className="text-center p-4">Checking admin authentication...</div>;

  return isAdminAuth ? <Outlet /> : null;
};
