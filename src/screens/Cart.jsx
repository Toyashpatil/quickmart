import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi'; // Import trash icon from react-icons
import Beve from '../assets/home/beve.svg'
import Ava from '../assets/home/ava.svg'
import Pine from '../assets/home/pine.svg'

import Grapes from '../assets/home/Grapes.svg'
import Peach from '../assets/home/peach.svg'

const Cart = () => {
    // Cart items state
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Peach', price: 100, quantity: 5, weight: '1.50 lbs', image: Peach },
        { id: 2, name: 'Black Grapes', price: 70, quantity: 5, weight: '5.0 lbs', image: Grapes },
        { id: 3, name: 'Avocado', price: 200, quantity: 5, weight: '1.50 lbs', image: Ava },
        { id: 4, name: 'Pineapple', price: 150, quantity: 5, weight: 'dozen', image: Pine },
    ]);

    // Functions to handle increment, decrement, and remove item
    const incrementQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Calculate subtotal and total
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 1.6; // Assume flat shipping charge
    const total = subtotal + shipping;

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            {/* Back button */}
            <button className="text-gray-600 mb-4">
                <i className="fas fa-arrow-left"></i>
            </button>

            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

            {/* Cart Items */}
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4">
                    {/* Product Image */}
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                    {/* Product Details */}
                    <div className="flex-1 ml-4">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.weight}</p>
                        <p className="text-sm text-green-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex gap-3  items-center">
                        <div className=''>
                            <button onClick={() => decrementQuantity(item.id)} className="text-gray-600 w-[20px] h-[30px] bg-gray-200 items-center justify-center flex p-2 rounded-md">
                                <div>
                                    <h1>-</h1>
                                </div>
                            </button>
                        </div>
                        <div className='flex items-center jus'>

                            <div>{item.quantity}</div>
                        </div>
                        <div className=''>
                            <button onClick={() => decrementQuantity(item.id)} className="text-gray-600 w-[20px] h-[30px] bg-gray-200 items-center justify-center flex p-2 rounded-md">
                                <div>
                                    <h1>+</h1>
                                </div>
                            </button>
                        </div>


                    </div>

                    {/* Remove Button */}
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">
                        <FiTrash size={20} /> {/* Trash icon for delete */}
                    </button>
                </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-600">₹{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p className="text-gray-600">Shipping charges</p>
                    <p className="text-gray-600">₹{shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-4 text-lg font-semibold">
                    <p>Total</p>
                    <p>₹{total.toFixed(2)}</p>
                </div>
            </div>

            {/* Checkout Button */}
            <button className="mt-6 bg-green-500 text-white w-full py-3 rounded-lg text-lg font-semibold">
                Checkout
            </button>
        </div>
    );
};

export default Cart;
