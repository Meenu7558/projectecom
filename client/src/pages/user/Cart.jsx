
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/usefetch';
import { CartCards } from '../../components/user/Cards';
import { axiosInstance } from '../../config/axioInstance';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export const Cart = () => {
   const navigate = useNavigate();
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch('/cart/getcart', refreshState);
    console.log("cartDetails=== ", cartDetails);

    
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


  const handleCheckout = () => {
  if (!cartDetails?.items || cartDetails.items.length === 0) {
    toast.error("No items in cart");
    return;
  }

  // Navigate to checkout form with cart data
  navigate("/user/checkout", { state: { cartData: cartDetails } });
};


    return (
        <>
          <section className="text-center my-10">
            <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400">Your Cart</h1>
          </section>
      
          <section className="flex flex-wrap justify-between gap-8 px-6">
            
            {/* Left Column: Items in Cart */}
            <div className="w-full md:w-7/12">
              <h2 className="text-2xl font-semibold mb-6 text-pink-700 dark:text-pink-400">Items in Cart</h2>
              {cartDetails?.items?.map((item) => (
                <CartCards
                  item={item}
                  key={`${item?._id}`} // Unique key based on item._id
                  handleRemove={handleRemoveCartItem}
                />
              ))}
            </div>
      
            {/* Right Column: Price Details and Payment */}
            <div className="w-full md:w-5/12 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-8 py-10">
              <h2 className="text-2xl font-semibold mb-4 text-pink-700 dark:text-pink-400">Price Details</h2>
              {cartDetails?.items?.map((item, index) => (
                <h3 key={`${item.productId}-${index}`} className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-300">
                  {item?.productName} - ${item?.price}
                </h3>
              ))}
              <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-gray-100">Total Price: ${cartDetails?.totalPrice}</h2>
      
              <button
  className="btn bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 mt-8 w-full py-2 font-semibold dark:bg-pink-600 dark:hover:bg-pink-500"
  onClick={handleCheckout}
>
  Proceed to Checkout
</button>



            </div>
      
          </section>
        </>
      );
      
}