import React from "react";

export default function ProductList({ products, onAdd }) {
  return (
    <div className="card">
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} className="product">
          <div>
            <strong>{p.name}</strong>
            <p>Rs. {p.price}</p>
          </div>
          <button onClick={() => onAdd(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
