import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },

  checkoutInfo: {
  name: String,
  address: String,
  phone: String
},

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Adjust to your actual product model
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
