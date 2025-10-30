import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import API from "./api";

const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 999 },
  { id: 2, name: "Smart Watch", price: 1999 },
  { id: 3, name: "Bluetooth Speaker", price: 799 },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const res = await API.post("/cart", {
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    setCart([res.data, ...cart]);
  };

  const removeFromCart = async (id) => {
    await API.delete(`/cart/${id}`);
    setCart(cart.filter((i) => i._id !== id));
  };

  const updateQuantity = async (id, qty) => {
    const res = await API.patch(`/cart/${id}`, { quantity: qty });
    setCart(cart.map((i) => (i._id === id ? res.data : i)));
  };

  return (
    <div className="container">
      <h1>🛒 IBM-NJ E-Commerce Cart System</h1>
      <div className="layout">
        <ProductList products={sampleProducts} onAdd={addToCart} />
        <Cart items={cart} onRemove={removeFromCart} onQtyChange={updateQuantity} />
      </div>
    </div>
  );
}
