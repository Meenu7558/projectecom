import { useState } from "react";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/usefetch";

import { useNavigate } from "react-router-dom";
import AdminProduct from "../../components/Admin/AdminPoduct";
import { axiosInstance } from "../../config/axioInstance";


export const ManageProducts = () => {
  const [refresh, setRefresh] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // Product to edit
  const [products, isLoading, error] = useFetch("/product/getproducts", refresh);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/product/productsdelete/${id}`);
      toast.success("Product deleted successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = async (productId) => {
    try {
      const response = await axiosInstance.get(`/product/productsdetails/${productId}`);
      setEditProduct(response.data?.data); // ✅ Fix: set editProduct
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product for editing");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Manage Products</h2>

      <AdminProduct
        setRefresh={setRefresh}
        editProduct={editProduct}
        setEditProduct={setEditProduct} // Pass setter to reset form after edit
      />

      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products</p>
      ) : (
        <div>
          {products?.map((product) => (
            <div key={product._id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};