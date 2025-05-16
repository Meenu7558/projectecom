import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../config/axioInstance";
import { ShopCards } from "../../../components/user/Cards";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axiosInstance.get("/product/featured");
        setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="px-6 py-12 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ShopCards key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
