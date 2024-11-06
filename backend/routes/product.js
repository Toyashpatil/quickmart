const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import the Product model

// @route   POST /api/products/add
// @desc    Add a new product
// @access  Public or Private (if authentication needed)
router.get('/', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Return the list of products
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { name, price, quantity, image, category } = req.body;

        // Validate request body
        if (!name || !price || !quantity || !image || !category) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        // Create a new product instance
        const product = new Product({
            name,
            price,
            quantity,
            image,
            category
        });

        // Save product to the database
        await product.save();

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;







module.exports = router;