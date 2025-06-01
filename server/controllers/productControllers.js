import { cloudinaryInstance } from "../config/cloudinaryconfig.js";
import { Product } from "../models/productModel.js";
import dotenv from "dotenv";
dotenv.config();

export const getProducts = async (req, res) => {
  try {
    const productList = await Product.find();

    
    console.log("productList ===>", productList);


    res.json({ success: true, data: productList, message: "Product list fetched" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    
   const product = await Product.findById(productId).populate("seller");




    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, data: product, message: "Product details" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, seller, featured} = req.body;

    if (!name || !description || !price || !category || !stock || !req.file) {
      return res.status(400).json({ message: "All fields including image are required" });
    }

  

    // ✅ Upload to Cloudinary
    const result = await cloudinaryInstance.uploader.upload(req.file.path);

    // ✅ ADD THIS LINE TO DEBUG
    console.log("Cloudinary upload result:", result);

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      seller,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      featured: featured === "true", 
    });

    await product.save();
    res.status(201).json({ success: true, data: product, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

 console.log("Received product id:", id);
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);


    const { name, description, price, category, stock, seller,featured } = req.body;
console.log("Received description:", description);
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.file) {
      // Delete old image
      if (product.image?.public_id) {
        await cloudinaryInstance.uploader.destroy(product.image.public_id);
      }

      // Upload new image
      const result = await cloudinaryInstance.uploader.upload(req.file.path);
      product.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.featured = featured === "true" ? true : false;
    product.seller = seller;

    const updatedProduct = await product.save();
    res.json({ success: true, data: updatedProduct, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image?.public_id) {
      await cloudinaryInstance.uploader.destroy(product.image.public_id);
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(6); // Adjust limit if needed
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// controller/productController.js

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "name description price category stock image featured"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};


export const addProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  console.log("Product found:", product);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: 'Product already reviewed' });
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: 'Review added' });
};