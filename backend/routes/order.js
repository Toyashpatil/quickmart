const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order'); // Import the Order model
const Cart = require('../models/Cart'); // Import the Cart model (if you need to fetch cart items)
const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// POST route to add an order
router.post('/orders', async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    // Validate input
    if (!userId || !products || products.length === 0 || !totalAmount) {
        return res.status(400).json({ error: 'Please provide userId, products, and totalAmount' });
    }

    try {
        // Create a new order
        const newOrder = new Order({
            user: userId,
            products: products.map((product) => ({
                product: product.productId, // Assuming productId is sent in the request
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount: totalAmount,
        });

        // Save the order to the database
        await newOrder.save();

        // Optionally, you can clear the user's cart after placing an order
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { products: [] } } // Clear the cart products
        );

        // Send a success response
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
});

// GET route to fetch orders for a specific user
router.post('/getorders', async (req, res) => {
    const { userId } = req.body; // Get userId from the request body

    if (!userId) {
        return res.status(400).json({ error: 'Please provide userId' });
    }

    try {
        // Fetch orders for the specific user from the database
        const orders = await Order.find({ user: userId })// Populate user details if needed

        // Send a success response with the orders
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
});

module.exports = router;
