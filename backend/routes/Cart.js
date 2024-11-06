const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   POST /api/cart/add
// @desc    Add a product to the cart
// @access  Public or Private (depending on your setup)
router.post('/add', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate request
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: "Please provide all fields" });
        }

        // Find product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the cart exists for the user
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // If the cart exists, check if the product is already in the cart
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

            if (productIndex > -1) {
                // If product exists, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If product does not exist, add it to the cart
                cart.products.push({ product: productId, quantity });
            }
        } else {
            // If no cart exists, create a new one
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
            });
        }

        // Save the updated or new cart
        await cart.save();
        res.status(201).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// @route   GET /api/cart
// @desc    Get all products in the cart for a user
// @access  Public or Private (depending on your setup)
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch the cart by user ID
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Return the cart with populated product details
        res.status(200).json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


// @route   DELETE /api/cart/remove
// @desc    Remove a product from the cart
// @access  Public or Private (depending on your setup)
router.delete('/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Validate request
        if (!userId || !productId) {
            return res.status(400).json({ error: "Please provide all fields" });
        }

        // Find the cart by user ID
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: "Product not found in the cart" });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/clear', async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate request
        if (!userId) {
            return res.status(400).json({ error: "Please provide userId" });
        }

        // Find the cart by user ID
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Clear all items in the cart
        cart.products = [];

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: "All products removed from cart successfully", cart });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
