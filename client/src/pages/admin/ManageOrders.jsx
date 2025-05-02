import { useFetch } from "../../hooks/usefetch";

const ManageOrders = () => {
    const [data, isLoading, error] = useFetch("/admin/orders");

    // Check if response is array or wrapped in an object
    const orders = Array.isArray(data) ? data : data?.orders || [];

    console.log("Orders fetched:", orders);
    console.log("Is loading:", isLoading);
    console.log("Error:", error);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

            {isLoading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">Error loading orders</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order._id}</p>
                            <p className="text-gray-700 mb-2"><strong>User:</strong> {order.user?.name || 'N/A'}</p>
                            <p className="text-gray-700 mb-2"><strong>Status:</strong> {order.status}</p>
                            <p className="text-gray-700"><strong>Total Amount:</strong> ₹ {order.totalAmount}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
