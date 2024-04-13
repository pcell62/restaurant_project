import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
