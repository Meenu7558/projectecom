import express from "express";
import { addReview, getProductReviews, deleteReview ,getAverageRating, getSingleProduct} from "../controllers/reviewController.js";
import { userAuth } from "../middlewares/userAuth.js";
import { adminAuth } from "../middlewares/adminAuth.js";


const router = express.Router();

//add
router.post("/add/:productId", userAuth, addReview);

// Get all reviews 
router.get("/product/:productId", getProductReviews);



// Delete a review
router.delete("/delreview/:reviewId", [userAuth,adminAuth], deleteReview);

// Get average rating 
router.get("/average/:productId", getAverageRating);

// Product details with reviews
router.get("/productsdetails/:productId", getSingleProduct);


export {router as reviewRouter}
