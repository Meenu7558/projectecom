import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";

const AdminProduct = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock || !formData.image) {
      toast.error("Please fill in all fields");
      return;
    }

    // Ensure price and stock are positive numbers
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
      data.append("category", formData.category);  // Added category to FormData
      data.append("stock", formData.stock);        // Added stock to FormData
      data.append("image", formData.image);

      const response = await axiosInstance.post("/product/createproducts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: null,
        });
        setRefresh((prev) => !prev); // Refresh the product list
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="mb-10 bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
      <input
        type="text"
        placeholder="Name"
        className="block w-full border p-2 mb-3"
        value={formData.name || ""} // Make sure value is never undefined
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="block w-full border p-2 mb-3"
        value={formData.description || ""} // Make sure value is never undefined
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="block w-full border p-2 mb-3"
        value={formData.price || ""} // Make sure value is never undefined
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
        min="0"
      />
      <input
        type="text"
        placeholder="Category"
        className="block w-full border p-2 mb-3"
        value={formData.category || ""} // Make sure value is never undefined
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        className="block w-full border p-2 mb-3"
        value={formData.stock || ""} // Make sure value is never undefined
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        required
        min="1"
      />
      <input
        type="file"
        className="block mb-4"
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProduct;
