import { axiosInstance } from "../../config/axioInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";

export const ManageSellers = () => {
  const [refresh, setRefresh] = useState(false);

  // Fetch all sellers (Assuming your backend API is ready)
  const [sellers, isLoading, error] = useFetch("/admin/getsellers", refresh);

  // Approve seller
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/approve-seller/${id}`);
      toast.success("Seller approved successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve seller");
    }
  };

  // Block seller
  const handleBlock = async (id) => {
    try {
      await axiosInstance.put(`/admin/block-seller/${id}`);
      toast.success("Seller blocked successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      toast.error("Failed to block seller");
    }
  };

  // Unlock seller
  const handleUnlock = async (id) => {
    try {
      await axiosInstance.put(`/admin/unblock-seller/${id}`);
      toast.success("Seller unblocked successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      toast.error("Failed to unblock seller");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-pink-600">Manage Sellers</h2>

      {isLoading ? (
        <p className="text-gray-800 dark:text-white">Loading sellers...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-300">Error loading sellers</p>
      ) : sellers?.length === 0 ? (
        <p className="text-gray-800 dark:text-white">No sellers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
            <thead className="bg-gray-800 text-white dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b dark:border-gray-700">
                  <td className="py-4 px-6 text-gray-800 dark:text-white">{seller.name}</td>
                  <td className="py-4 px-6 text-gray-800 dark:text-white">{seller.email}</td>
                  <td className="py-4 px-6">
                    {seller.isBlocked ? (
                      <span className="text-red-500 font-semibold dark:text-red-300">Blocked</span>
                    ) : (
                      <span className="text-green-500 font-semibold dark:text-green-300">Active</span>
                    )}
                  </td>
                  <td className="py-4 px-6 space-x-4">
                    {!seller.isBlocked && (
                      <button
                        onClick={() => handleBlock(seller._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        Block
                      </button>
                    )}
                    {seller.isBlocked && (
                      <div>
                        <button
                          onClick={() => handleApprove(seller._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUnlock(seller._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ml-4"
                        >
                          Unlock
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
