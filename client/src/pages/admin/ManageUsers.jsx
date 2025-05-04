import { axiosInstance } from "../../config/axioInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";

const ManageUsers = () => {
  const [refresh, setRefresh] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [users, isLoading, error] = useFetch("/admin/users", refresh);

  if (!Array.isArray(users) || !users) {
    return <p className="text-red-500">Error: Invalid data format for users</p>;
  }

  const handleBlockUser = async (id) => {
    try {
      await axiosInstance.put(`/admin/block-user/${id}`);
      toast.success("User blocked successfully!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      await axiosInstance.put(`/admin/unblock-user/${id}`);
      toast.success("User unblocked successfully!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      await axiosInstance.delete(`/admin/delete-user/${id}`);
      toast.success("User deleted successfully!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Manage Users</h2>

      {isLoading ? (
        <div className="flex flex-col items-center text-gray-500">
          <span className="mb-2">Loading...</span>
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-400 border-t-transparent"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">Error loading users: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Phone: {user.phone}</p>
              </div>

              {user.isBlocked ? (
                <div>
                  <p className="text-sm text-red-500 font-medium">Status: Blocked</p>
                  <button
                    onClick={() => handleUnblockUser(user._id)}
                    className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition"
                  >
                    Unblock User
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleBlockUser(user._id)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md transition mb-3"
                >
                  Block User
                </button>
              )}

              <button
                onClick={() => handleDeleteUser(user._id)}
                disabled={deleting === user._id}
                className={`w-full ${
                  deleting === user._id ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                } text-white py-2 rounded-md transition`}
              >
                {deleting === user._id ? "Deleting..." : "Delete User"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
