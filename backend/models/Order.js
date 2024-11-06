const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user who placed the order
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the product
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1, // Default quantity
            },
            price: {
                type: Number,
                required: true, // Capture the price at the time of order
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true, // Total amount for the order
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'], // Order statuses
        default: 'Pending', // Default status
    },
    createdAt: {
        type: Date,
        default: Date.now, // Date the order was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Date the order was last updated
    },
});

// Update the updatedAt field before saving the document
orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
