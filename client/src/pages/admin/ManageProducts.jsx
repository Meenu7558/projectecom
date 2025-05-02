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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Add Product Form */}
      <AdminProduct setRefresh={setRefresh} />

      {/* Product List */}
      {isLoading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Error loading products</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-blue-600 font-bold mb-2">₹ {product.price}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};
