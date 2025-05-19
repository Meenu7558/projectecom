import { Product } from "../models/productModel.js";

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive

    const results = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    }).limit(20);

    // Return empty array if no results (not 404)
    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ message: error.message });
  }
};
