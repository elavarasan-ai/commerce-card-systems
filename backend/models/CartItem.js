const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);
