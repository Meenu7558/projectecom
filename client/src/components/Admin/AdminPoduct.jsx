import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";
import { useEffect } from "react";


const AdminProduct = ({ setRefresh, editProduct = null, setEditProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
    featured: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        stock: editProduct.stock || "",
        image: null,
        featured: editProduct.featured || false,
      });
    }
  }, [editProduct]);

  const handleAddOrEditProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock || (!formData.image && !editProduct)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (parseFloat(formData.price) <= 0 || parseInt(formData.stock) <= 0) {
      toast.error("Price and stock should be positive numbers");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("featured", formData.featured);

      if (formData.image) {
        data.append("image", formData.image);
      }

      let response;
      if (editProduct) {
        response = await axiosInstance.put(`/product/productsupdate/${editProduct._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axiosInstance.post("/product/createproducts", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200) {
        toast.success(editProduct ? "Product updated successfully!" : "Product added successfully!");

        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: null,
          featured: false,
        });

        if (setEditProduct) setEditProduct(null); // ✅ Reset edit mode
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add/update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleAddOrEditProduct}
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-10 transition-all"
    >
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {editProduct ? "Edit Product" : "Add New Product"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
          <input
            type="text"
            className="input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <input
            type="text"
            className="input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
          <input
            type="number"
            className="input"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
          <input
            type="number"
            className="input"
            min="1"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded border"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-center mt-4">
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="form-checkbox h-5 w-5 text-pink-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">Mark as Featured Product</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
          <input
            type="file"
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          {editProduct?.image && (
            <img
              src={typeof editProduct.image === "string" ? editProduct.image : editProduct.image?.url}
              alt="Product Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        {isSubmitting ? "Processing..." : editProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProduct;
