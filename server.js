const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Stripe = require('stripe');

// Load environment variables
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Configure CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

// POST endpoint to create a Stripe Checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  console.log('Request body:', req.body);

  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "'items' must be an array" });
  }

  for (const item of items) {
    if (!item.name || typeof item.name !== 'string') {
      return res.status(400).json({ error: "Each item must have a valid 'name'" });
    }
    if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
      return res.status(400).json({ error: "Each item must have a valid 'price' greater than 0" });
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({ error: "Each item must have a valid 'quantity' greater than 0" });
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Enable card payments (includes Google Pay)
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd', // Replace with your desired currency
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: process.env.SUCCESS_URL || 'http://localhost:5173/success',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));