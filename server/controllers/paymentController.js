import Stripe from "stripe";
import { Order } from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);

const client_domain = process.env.CLIENT_DOMAIN;

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, checkoutInfo } = req.body;

    console.log("createCheckoutSession called");
    console.log("Received products:", products);
    console.log("Received checkoutInfo:", checkoutInfo);

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products found for checkout" });
    }

    if (!checkoutInfo || !checkoutInfo.name || !checkoutInfo.address || !checkoutInfo.phone) {
      return res.status(400).json({ message: "Checkout information is incomplete" });
    }

    const lineItems = products.map((product) => {
      const productDetails = product.product;

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: productDetails.name,
            images: [productDetails.image?.url],
            description: productDetails.description || 'No description available',
          },
          unit_amount: Math.round(productDetails.price * 100),
        },
        quantity: product.quantity || 1,
      };
    });

    console.log("Line items ready for Stripe:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${client_domain}/user/payment/cancel`,
    });

    console.log("Stripe session created:", session.id);

    const newOrder = new Order({
      userId,
      products: products.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image?.url,
      })),
      status: "pending", 
      stripeSessionId: session.id, 
      checkoutInfo,
      paymentStatus: "pending",
    });

    await newOrder.save();

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

export const getSessionStatus = async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 1. Find the order by sessionId
    const order = await Order.findOne({ sessionId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. Update order status if payment is completed
    if (session.payment_status === "paid") {
      order.status = "paid";
      await order.save();
    }

    res.status(200).json({
      message: "Session fetched successfully",
      status: session.payment_status,
      order,
    });
  } catch (error) {
    console.error("Error fetching session status:", error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    console.log("Reached getUserOrders with userId:", req.user.id); 

    const orders = await Order.find({ userId: req.user.id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    console.log("Orders fetched:", orders.length); 

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getUserOrders:", error); 
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const verifyPaymentAndUpdateOrder = async (req, res) => {
  const { sessionId } = req.params;
  console.log("verifyPaymentAndUpdateOrder called with sessionId:", sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const order = await Order.findOne({ stripeSessionId: sessionId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (session.payment_status === 'paid') {
      order.status = 'paid';
      order.paymentStatus = 'succeeded';
      await order.save();
      console.log("Order updated to paid successfully");
      return res.status(200).json({ message: 'Order updated successfully' });
    } else {
      order.status = 'failed';
      order.paymentStatus = 'failed';
      await order.save();
      return res.status(400).json({ message: 'Payment not completed yet' });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
