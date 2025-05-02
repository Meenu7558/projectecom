import React from "react";
import { Outlet } from "react-router-dom";
import {AdminHeader} from "../components/Admin/AdminHeader";
import { AdminSidebar } from "../components/Admin/AdminSidebar";

export const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


