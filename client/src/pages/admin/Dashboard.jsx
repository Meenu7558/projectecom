import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('/admin/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(response.data);
            } catch (error) {
                console.log('Error fetching stats', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-500">{stats.totalUsers}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Products</h2>
                    <p className="text-3xl font-bold text-green-500">{stats.totalProducts}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold text-purple-500">{stats.totalOrders}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
