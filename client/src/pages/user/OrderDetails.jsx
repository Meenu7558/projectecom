import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";


const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      if (sessionId) {
        try {
          const response = await axiosInstance.get(`/payment/session-status?session_id=${sessionId}`);
          setOrderDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch order details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/"); // Redirect if no session_id
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {orderDetails?.order ? (
        <div>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {orderDetails.status}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong> {orderDetails.customer_email}
          </p>
          <ul className="space-y-4">
            {orderDetails.order.products.map((product, index) => (
              <li key={index} className="border p-4 rounded">
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover mt-2"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
