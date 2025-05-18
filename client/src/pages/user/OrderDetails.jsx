import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";


const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");

      try {
        let response;

        if (sessionId) {
          response = await axiosInstance.get(`/payment/session-status?session_id=${sessionId}`);
          setOrderDetails([response.data.order]); // wrap in array for consistency
        } else {
          response = await axiosInstance.get("/payment/my-orders");
          setOrderDetails(response.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Order Details</h1>
      {orderDetails.length > 0 ? (
        orderDetails.map((order, idx) => (
          <div key={idx} className="mb-6 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>Status:</strong> {order.status || "Paid"}
            </p>
            <ul className="space-y-4">
              {order.products.map((product, index) => (
                <li key={index} className="border border-gray-200 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-700">
                  <p className="text-gray-800 dark:text-gray-100">
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100">
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover mt-2 rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No order details found.</p>
      )}
    </div>
  );
  
};

export default OrderDetails;
