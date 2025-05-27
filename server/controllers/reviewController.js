import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import mongoose from "mongoose";


export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const newReview = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await newReview.save();

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      numReviews: reviews.length,
    });

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error in addReview:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    res.status(200).json({ data: reviews, message: "Reviews fetched successfully" });
  } catch (error) {
    console.error("Error in getProductReviews:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

    await Product.findByIdAndUpdate(review.product, {
      rating: reviews.length ? Number(avgRating.toFixed(1)) : 0,
      numReviews: reviews.length,
    });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReview:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0, message: "No reviews yet" });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    res.status(200).json({ averageRating: averageRating.toFixed(1), totalReviews: reviews.length });
  } catch (error) {
    console.error("Error in getAverageRating:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

