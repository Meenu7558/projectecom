
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axioInstance";


const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axiosInstance.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500">{stats.totalUsers}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Total Products</h2>
          <p className="text-4xl font-bold text-green-500">{stats.totalProducts}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Total Orders</h2>
          <p className="text-4xl font-bold text-purple-500">{stats.totalOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
