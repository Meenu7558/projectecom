import React from "react";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";
import { useFetch } from "../../hooks/usefetch";


export const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, isLoading, error] = useFetch(`product/productsdetails/${productId}`);
  const [reviews, reviewsLoading, reviewsError] = useFetch(`review/product/${productId}`);


  if (isLoading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">Error: {error.message}</p>;
  if (!productDetails) return <p className="text-center mt-6">Product not found.</p>;

  const addToCart = async () => {
    try {
      const response = await axiosInstance({
        url: "/cart/add",
        method: "POST",
        data: {
          productId,
          quantity: 1,
        },
      });

      console.log("response====", response);
      toast.success("Product added to cart");
    } catch (error) {
      console.log("❌ Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <section className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-6 dark:bg-gray-800 dark:text-gray-200">
        {productDetails.image?.url ? (
          <img
            src={productDetails.image.url}
            alt={productDetails.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{productDetails.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{productDetails.description}</p>
        <p className="text-lg font-semibold text-green-600 dark:text-green-400">₹{productDetails.price}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Category: {productDetails.category}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Stock: {productDetails.stock}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ratings: {productDetails.ratings} ⭐</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Reviews: {productDetails.numReviews}</p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={addToCart}
            className="btn btn-primary text-white bg-pink-600 hover:bg-pink-800 transition-all duration-300 py-2 px-4 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </section>

      <section className="mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Customer Reviews</h3>

  {reviewsLoading ? (
    <p className="text-gray-500">Loading reviews...</p>
  ) : reviewsError ? (
    <p className="text-red-500">Failed to load reviews.</p>
  ) : Array.isArray(reviews) && reviews.length > 0 ? (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          <p className="font-semibold text-gray-700 dark:text-white">{review.user?.name || "Anonymous"}</p>
          <p className="text-yellow-500">
            {"⭐".repeat(review.rating)}{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-800 dark:text-gray-200 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
  )}
</section>


      
    </div>
  );
};
