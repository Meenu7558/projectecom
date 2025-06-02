import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axioInstance";
import { toast } from "react-hot-toast";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState({});

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/orders");
      setOrders(data.orders);
       console.log("Fetched orders:", data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (orderId) => {
  try {
    // Use statusUpdate value or fallback to current order status
    const newStatus =
      (statusUpdate[orderId] || orders.find((o) => o._id === orderId)?.orderStatus || "")
        .trim();

    if (!newStatus) {
      toast.error("Please select a valid status.");
      return;
    }

    console.log("Updating Order:", orderId, "with Status:", newStatus);

    const res = await axiosInstance.put(`/admin/orders/${orderId}/status`, {
      status: newStatus,
    });

    toast.success("Order status updated successfully!");
    fetchOrders();
  } catch (error) {
    console.error("Failed to update status", error.response?.data || error);
    const message = error?.response?.data?.message || "Update failed!";
    toast.error(message);
  }
};



  useEffect(() => {
  if (!loading && orders.length > 0) {
    const initialStatus = {};
    orders.forEach((order) => {
      initialStatus[order._id] = order.orderStatus;
    });
    setStatusUpdate(initialStatus);
  }
}, [loading, orders]);

  

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
                <ul className="list-disc list-inside ml-4 mt-1">
          {order.products.map((p, idx) => (
           <li key={idx}>
          {p.product?.name || p.name} — ₹{p.product?.price || p.price} × {p.quantity}
        </li>
         ))}


                </ul>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
                >
                  Update Status
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
