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
          const response = await axiosInstance.get(`/order/status?session_id=${sessionId}`);
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
    <div>
      <h1>Order Details</h1>
      {orderDetails ? (
        <div>
          <p>Status: {orderDetails.status}</p>
          <p>Email: {orderDetails.customer_email}</p>
          <ul>
            {orderDetails.order.courses.map((course, index) => (
              <li key={index}>
                {course.courseId.name}: ₹{course.price}
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
