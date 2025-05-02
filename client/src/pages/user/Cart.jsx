
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/usefetch';
import { CartCards } from '../../components/user/Cards';
import { axiosInstance } from '../../config/axioInstance';
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch('/cart/getcart', refreshState);
    console.log("cartDetails=== ", cartDetails);

    const makePayment = async () => {
        try {
            if (!cartDetails?.items || cartDetails.items.length === 0) {
                toast.error("No items in cart");
                return;
            }

            // Logging cart items before making the request to the backend
            console.log("Sending cart items to backend:", cartDetails.items);

            // Load Stripe with the public key
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            // Send the cart items to the server for payment session creation
            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                 data: { products: cartDetails.items }

            });

            console.log("Session response:", session);

            // Redirect to Stripe checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });

            if (result.error) {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.error("Error during payment process:", error);
            toast.error(error?.response?.data?.message || "Payment failed");
        }
    };

    const handleRemoveCartItem = async (productId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove",
                data: { productId },
            });
            toast.success("Product removed");
            setRefreshState((prev) => !prev);
        } catch (error) {
            console.error("Error removing product:", error);
            toast.error(error?.response?.data?.message || "Failed to remove");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading cart</div>;

    return (
        <>
            <section>
                <h1>Cart Page</h1>
            </section>
            <section className="flex flex-wrap">
                <div className="w-full md:w-6/12">
                    <h2 className="text-2xl font-semibold mb-4">Items in Cart</h2>
                    {cartDetails?.items?.map((item) => (
                        <CartCards
                            item={item}
                            key={`${item?._id}`} // Unique key based on item._id
                            handleRemove={handleRemoveCartItem}
                        />
                    ))}
                </div>
                <div className="w-6/12 px-20 py-20">
                    {cartDetails?.items?.map((item, index) => (
                        <h2 key={`${item.productId}-${index}`}>Price: {item?.price}</h2> // Unique key for each price
                    ))}
                    <h2>Total Price: {cartDetails?.totalPrice}</h2>
                    <button
                        className="btn btn-success mt-20"
                        onClick={makePayment}
                    >
                        Make payment
                    </button>
                </div>
            </section>
        </>
    );
}