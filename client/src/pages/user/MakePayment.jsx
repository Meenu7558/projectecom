import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axioInstance';
 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

export const MakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartData, formData } = location.state || {};

  useEffect(() => {
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      toast.error("No items in cart");
      navigate('/user/cart');
      return;
    }
    if (!formData || Object.values(formData).some(value => !value)) {
      toast.error("Checkout information incomplete");
      navigate('/user/checkout');
      return;
    }

    const initiatePayment = async () => {
      try {
        const stripe = await stripePromise;

        const { data } = await axiosInstance.post('/payment/create-checkout-session', {
          products: cartData.items,
          checkoutInfo: formData,
        });

        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (error) {
        console.error("Payment error:", error);
        toast.error(error?.response?.data?.message || "Payment failed");
      }
    };

    initiatePayment();
  }, [cartData, formData, navigate]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400">Redirecting to payment...</h2>
      <p>Please wait while we process your payment.</p>
    </div>
  );
};