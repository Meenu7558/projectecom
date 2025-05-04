import { useFetch } from "../../hooks/usefetch";

const ManageOrders = () => {
  const [data, isLoading, error] = useFetch("/admin/orders");

  const orders = Array.isArray(data) ? data : data?.orders || [];

  return (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-pink-800 dark:text-pink-300 mb-8">Manage Orders</h2>

      

      {isLoading ? (
        <div className="flex flex-col items-center text-gray-500">
          <span className="mb-2">Loading orders...</span>
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">Error loading orders</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-2">
                <span className="block text-sm text-gray-400">Order ID</span>
                <p className="font-medium text-gray-800 dark:text-gray-100">{order._id}</p>
              </div>
              <div className="mb-2">
                <span className="block text-sm text-gray-400">User</span>
                <p className="text-gray-700 dark:text-gray-300">{order.user?.name || "N/A"}</p>
              </div>
              <div className="mb-2">
                <span className="block text-sm text-gray-400">Total Amount</span>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">₹ {order.totalAmount}</p>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
