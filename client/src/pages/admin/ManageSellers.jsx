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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Sellers</h2>

      {isLoading ? (
        <p>Loading sellers...</p>
      ) : error ? (
        <p className="text-red-500">Error loading sellers</p>
      ) : sellers?.length === 0 ? (
        <p>No sellers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b">
                  <td className="py-4 px-6">{seller.name}</td>
                  <td className="py-4 px-6">{seller.email}</td>
                  <td className="py-4 px-6">
                    {seller.isBlocked ? (
                      <span className="text-red-500 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-500 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="py-4 px-6 space-x-4">
                    {!seller.isBlocked && (
                      <button
                        onClick={() => handleBlock(seller._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Block
                      </button>
                    )}
                    {seller.isBlocked && (
                      <button
                        onClick={() => handleApprove(seller._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
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
