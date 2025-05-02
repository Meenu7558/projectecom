import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const { sellerData } = useSelector((state) => state.seller); // Get seller data from Redux
  const [products, setProducts] = useState([]); // Initialize products state as an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/seller/products"); // Fetch products from your API
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Only set if the response is an array
        } else {
          setError("Unexpected response format for products.");
        }
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once after component mounts

  return (
    <div>
      <h1>Welcome, {sellerData.name}</h1>
      <p>Manage your products and orders from here.</p>
      {loading && <p>Loading products...</p>} {/* Show loading text while fetching products */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if something goes wrong */}
      
      <div className="space-y-4">
        {/* Check if products array is populated */}
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              <Link
                to={`/seller/products/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit Product
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p> // Fallback message if no products
        )}
      </div>
      <div className="flex space-x-4 mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          View Products
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          View Orders
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;
