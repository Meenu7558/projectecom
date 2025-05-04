import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";
import { axiosInstance } from "../../config/axioInstance";
import AdminProduct from "../../components/Admin/AdminPoduct";

export const ManageProducts = () => {
  const [refresh, setRefresh] = useState(false);
  const [products, isLoading, error] = useFetch("/product/getproducts", refresh);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/product/productsdelete/${id}`);
      toast.success("Product deleted successfully!");
      setRefresh(prev => !prev);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error("Failed to delete product");
    }
  };
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Manage Products</h2>

      {/* Add Product Form */}
      <AdminProduct setRefresh={setRefresh} />

      {/* Product List */}
      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Error loading products</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products?.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col justify-between transition-colors"
              >
                <div>
                {product.image && (
                  <img
                   src={typeof product.image === "string" ? product.image : product.image?.url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
  />
)}


                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                  <p className="text-pink-600 dark:text-pink-400 font-bold mb-2">₹ {product.price}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
  
};
