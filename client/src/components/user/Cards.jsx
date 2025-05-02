import React from 'react';
import { useNavigate } from 'react-router-dom';

// ShopCard component
export const ShopCards = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 w-96 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto mb-8">
      <figure>
        {/* Fallback image if product image is missing */}
        <img 
          src={product?.image?.url || "https://via.placeholder.com/200x200.png?text=No+Image"} 
          alt="product" 
          className="w-full h-48 object-cover rounded-t-md"
        />
      </figure>
      <div className="card-body p-4 space-y-4">
        <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-100">
          {product?.name}
        </h2>
        <p className="text-xl font-bold text-pink-600 dark:text-pink-400">
          Price: ₹{product?.price || "N/A"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{product?.description}</p>
        <div className="card-actions mt-4 flex justify-center">
          <button
            className="btn btn-primary bg-pink-600 hover:bg-pink-800 text-white dark:bg-pink-500 dark:hover:bg-pink-700"
            onClick={() => navigate(`/productdetails/${product?._id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
export const CartCards = ({ item, handleRemove }) => {
  return (
    <div className="flex w-full h-32 items-center gap-6 bg-base-300 mb-6 p-4 rounded-md shadow-sm dark:bg-gray-800">
      {/* Ensure product image exists */}
      <img src={item?.product?.image?.url || "https://via.placeholder.com/100x100.png?text=No+Image"} alt="cart-item" className="w-24 h-20 object-cover rounded-md" />
      
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item?.product?.name}</h2>
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">₹{item?.product?.price}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item?.quantity}</p>
      </div>

      <button
        className="btn btn-secondary bg-red-600 hover:bg-red-800 text-white dark:bg-red-500 dark:hover:bg-red-700"
        onClick={() => handleRemove(item?.product?._id)}
      >
        Remove
      </button>
    </div>
  );
};