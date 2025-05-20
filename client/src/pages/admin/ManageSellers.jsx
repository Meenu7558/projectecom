import { axiosInstance } from "../../config/axioInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";


export const ManageSellers = () => {
  const [refresh, setRefresh] = useState(false);

  // Fetch sellers list from backend
  const [sellers, isLoading, error] = useFetch("/admin/getsellers", refresh);

  // Block seller handler
  const handleBlock = async (id) => {
    try {
      await axiosInstance.put(`/admin/block-seller/${id}`);
      toast.success("Seller blocked successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Failed to block seller");
    }
  };

  // Unblock seller handler
  const handleUnlock = async (id) => {
    try {
      await axiosInstance.put(`/admin/unblock-seller/${id}`);
      toast.success("Seller unblocked successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Failed to unblock seller");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-pink-600">
        Manage Sellers
      </h2>

      {isLoading ? (
        <p className="text-gray-800 dark:text-white">Loading sellers...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-300">Error loading sellers</p>
      ) : sellers.length === 0 ? (
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
                    <button
                      onClick={() => handleBlock(seller._id)}
                      disabled={seller.isBlocked}
                      className={`px-4 py-2 rounded text-white ${
                        seller.isBlocked
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                      }`}
                    >
                      Block
                    </button>
                


                <button
               onClick={() => handleUnlock(seller._id)}
               disabled={!seller.isBlocked}
                className={`px-4 py-2 rounded text-white ml-4 ${
                !seller.isBlocked
               ? "bg-blue-300 cursor-not-allowed"
               : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                   }`}
              >
                  Unblock
               </button>

                    
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
