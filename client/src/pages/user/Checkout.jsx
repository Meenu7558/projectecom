import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";



const Checkout = ({ products }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/payment/create-checkout-session", {products });
      if (response.data.success) {
        const sessionId = response.data.sessionId;
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`; // Redirect to Stripe Checkout page
      }
    } catch (error) {
      console.error("Error in checkout process", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
