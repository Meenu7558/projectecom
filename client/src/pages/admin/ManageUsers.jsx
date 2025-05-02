import { axiosInstance } from "../../config/axioInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";

const ManageUsers = () => {
    const [refresh, setRefresh] = useState(false);
    const [deleting, setDeleting] = useState(null);  // Track which user is being deleted
    const [users, isLoading, error] = useFetch("/admin/users", refresh);

    // Check if users is an array before calling .map
    if (!Array.isArray(users) || !users) {
        return <p className="text-red-500">Error: Invalid data format for users</p>;
    }

    const handleBlockUser = async (id) => {
        try {
            await axiosInstance.put(`/admin/block-user/${id}`);
            toast.success("User blocked successfully!");
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Failed to block user");
        }
    };

    const handleUnblockUser = async (id) => {
        try {
            await axiosInstance.put(`/admin/unblock-user/${id}`);
            toast.success("User unblocked successfully!");
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Failed to unblock user");
        }
    };

    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        setDeleting(id);  // Set the user ID to be deleted
        try {
            await axiosInstance.delete(`/admin/delete-user/${id}`);
            toast.success("User deleted successfully!");
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Failed to delete user");
        } finally {
            setDeleting(null);  // Reset the deleting state
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            {isLoading ? (
                <div className="text-center">
                    <span>Loading...</span>
                    <div className="spinner-border animate-spin border-4 rounded-full w-6 h-6 border-t-transparent border-blue-500"></div>
                </div>
            ) : error ? (
                <p className="text-red-500">Error loading users: {error.message}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users?.map((user) => (
                        <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600 mt-2">Phone: {user.phone}</p>

                            {/* Block or Unblock button */}
                            {user.isBlocked ? (
                                <div>
                                    <p className="text-red-500 mt-2">This user is blocked</p>
                                    <button
                                        onClick={() => handleUnblockUser(user._id)}
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Unblock User
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleBlockUser(user._id)}
                                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Block User
                                </button>
                            )}

                            {/* Delete button */}
                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                disabled={deleting === user._id}  // Disable button while deleting
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
