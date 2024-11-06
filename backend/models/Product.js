const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number, // Changed from String to Number
        required: true,
    },
    image: {
        type: String, // Store the image URL or path
        required: true,
    },
    category: {
        type: String, // Category like 'Fruits', 'Vegetables', etc.
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
