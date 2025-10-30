const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity = 1 } = req.body;
    const newItem = new CartItem({ name, price, quantity });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update quantity
router.patch("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.quantity = quantity;
    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
