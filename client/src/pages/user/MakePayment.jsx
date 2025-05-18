import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axioInstance';

export const MakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

  // Extract cartData and formData passed from CheckoutForm
  const { cartData, formData } = location.state || {};

  useEffect(() => {
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      toast.error("No items in cart");
      navigate('/user/cart'); // Redirect back to cart if no data
      return;
    }
    if (!formData || Object.values(formData).some(value => !value)) {
      toast.error("Checkout information incomplete");
      navigate('/user/checkout'); // Redirect back to checkout form
      return;
    }

    // Start payment session creation and redirect
    const initiatePayment = async () => {
      try {
        const stripe = await stripePromise;

        // Send cart items and checkout info to backend to create checkout session
        const { data } = await axiosInstance.post('/payment/create-checkout-session', {
          products: cartData.items,
          checkoutInfo: formData,
        });

        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (error) {
        console.error("Payment error:", error);
        toast.error(error?.response?.data?.message || "Payment failed");
      }
    };

    initiatePayment();
  }, [cartData, formData, navigate, stripePromise]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400">Redirecting to payment...</h2>
      <p>Please wait while we process your payment.</p>
    </div>
  );
};
