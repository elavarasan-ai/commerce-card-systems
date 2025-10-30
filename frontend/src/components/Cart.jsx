import React from "react";

function total(items) {
  return items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
}

export default function Cart({ items, onRemove, onQtyChange }) {
  return (
    <div className="card">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map((i) => (
          <div key={i._id} className="cart-item">
            <div>
              <strong>{i.name}</strong> – Rs. {i.price}
            </div>
            <div className="cart-actions">
              <input
                type="number"
                min="1"
                value={i.quantity || 1}
                onChange={(e) => onQtyChange(i._id, Number(e.target.value))}
              />
              <button onClick={() => onRemove(i._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <hr />
      <h3>Total: Rs. {total(items)}</h3>
    </div>
  );
}
