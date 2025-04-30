import React from 'react';
import CheckoutButton from './CheckoutButton.jsx';

const ParentComponent = () => {
  // Example of cartItems data
  const cartItems = [
    { name: 'Product 1', price: 1000, quantity: 1 }, // Price in cents ($10.00)
    { name: 'Product 2', price: 1500, quantity: 2 }, // Price in cents ($15.00 each)
  ];

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.name}>
            {item.name} - ${(item.price / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <CheckoutButton cartItems={cartItems} />
    </div>
  );
};

export default ParentComponent;