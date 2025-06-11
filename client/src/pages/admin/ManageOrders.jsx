import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axioInstance";
import { toast } from "react-hot-toast";



const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState({});
  const [updatingStatusId, setUpdatingStatusId] = useState(null); // For loading spinner

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/orders");
      setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

const handleStatusChange = async (orderId) => {
  const newStatus = statusUpdate[orderId]?.trim();

  if (!newStatus) {
    toast.error("Please select a valid status.");
    return;
  }

  const currentStatus = orders.find((order) => order._id === orderId)?.orderStatus;

  if (newStatus === currentStatus) {
    toast("No change in status.");
    return;
  }

  try {
    setUpdatingStatusId(orderId);

    const response = await axiosInstance.put(
      `/admin/orders/${orderId}/status`,
      { status: newStatus },
      { withCredentials: true }
    );

    console.log("✅ Response from backend:", response.data);

    if (response?.data?.success) {
      toast.success("Order status updated successfully!");
      await fetchOrders();
      setStatusUpdate((prev) => ({ ...prev, [orderId]: "" }));
    } else {
      toast.error(response?.data?.message || "Status update failed!");
    }
  } catch (error) {
    console.error("❌ Error during status update:", error);
    const message = error?.response?.data?.message || "Update failed!";
    toast.error(message);
  } finally {
    setUpdatingStatusId(null);
  }
};

  


  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-800 dark:text-gray-100">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md bg-white dark:bg-gray-800"
            >
              <div className="mb-2">
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className="mb-2">
                <strong>User:</strong> {order.userId?.name} ({order.userId?.email})
              </div>
              <div className="mb-2">
                <strong>Status:</strong>{" "}
                <span className="capitalize text-blue-600 dark:text-blue-400">
                  {order.orderStatus}
                </span>
              </div>

              <div className="mb-2">
                <strong>Products:</strong>
                <div className="mt-2 space-y-3">
                  {order.products.map((p, idx) => {
                    const product = p.product || p;
                    const name = product?.name || p.name || "Unnamed Product";
                    const price = product?.price || p.price || "N/A";
                    const quantity = p.quantity ?? "N/A";
             

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const rawImage = p.image;

let image = null;
if (typeof rawImage === "string") {
  image = rawImage.startsWith("http")
    ? rawImage
    : `${BASE_URL}/${rawImage.replace(/^\/+/, "")}`;
}




                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 border border-gray-200 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500">
                            No Image
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            ₹{price} × {quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                <select
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded p-2"
                  value={statusUpdate[order._id] || order.orderStatus}
                  onChange={(e) =>
                    setStatusUpdate({ ...statusUpdate, [order._id]: e.target.value })
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button
                  onClick={() => handleStatusChange(order._id)}
                  className={`flex items-center gap-2 ${
                    updatingStatusId === order._id
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 rounded transition duration-200`}
                  disabled={
                    updatingStatusId === order._id ||
                    statusUpdate[order._id]?.trim() === order.orderStatus ||
                    !statusUpdate[order._id]
                  }
                >
                  {updatingStatusId === order._id ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
