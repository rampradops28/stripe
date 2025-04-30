import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RJW2EGfJx2u4k9CqX0VK2pJlG4a6Ckr2daPCHXgEjmdwBHM6FF0AbSsi7Ipd634ppxSOx27iBKufrt9Xu5DFsRx00BOGhgo3f'); // your publishable key

const CheckoutButton = ({ cartItems }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state for UI feedback

  const handleClick = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      // Send cart items to the backend to create a checkout session
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }), // Pass cart items to the backend
      });

      if (!response.ok) {
        throw new Error(`Failed to create checkout session: ${response.statusText}`);
      }

      const session = await response.json();

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe redirection error:', result.error.message);
        alert('An error occurred while redirecting to the checkout page. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      alert('An error occurred while processing your checkout. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>
  );
};

export default CheckoutButton;