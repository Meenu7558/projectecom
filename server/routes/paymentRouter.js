import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { createCheckoutSession, getSessionStatus, getUserOrders, verifyPaymentAndUpdateOrder } from "../controllers/paymentController.js"; // Import the controller

const router = express.Router();

// Route for creating a checkout session
router.post("/create-checkout-session", userAuth, createCheckoutSession);



// Route to get session status
router.get('/session-status', getSessionStatus);
  
router.get("/my-orders", userAuth, getUserOrders);

router.get('/payment/verify/:sessionId', verifyPaymentAndUpdateOrder);

export { router as paymentRouter };
