import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Increment and Decrement functions for quantity
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  console.log(receivedData.id)

  // Handle Add to Cart / Go to Cart button click
  const handleAddToCart = async () => {
    if (isAddedToCart) {
      navigate('/cart'); // Navigate to cart page if already added
    } else {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage

        // Check if userId exists
        if (!userId) {
          alert("Please log in to add products to your cart.");
          return;
        }
        
        // Make the API request to add the product to the cart
        const response = await fetch('http://localhost:5000/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: receivedData?.id, // Use the product's ID from received data
            quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }

        const result = await response.json();
        console.log(result);

        // Update state to reflect that the product has been added to the cart
        setIsAddedToCart(true);
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error adding the product to your cart.");
      }
    }
  };

  return (
    <div className="space-y-[5px] h-[100vh] bg-gradient-to-b from-green-50 to-transparent">
      {/* Product Image */}
      <div className="bg-gradient-to-b from-green-50 to-transparent bg-red-500 rounded-lg flex justify-center items-center">
        <img
          src={receivedData?.path || 'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/651fa0c2f6e21414eda7ac9e/peach-640x640.jpg'}
          alt="Product"
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <p className="text-green-500 text-xl font-bold">₹{receivedData?.price || '2.22'}</p>
        <h2 className="text-2xl font-semibold mt-2">{receivedData?.name}</h2>
        <p className="text-gray-500">{receivedData?.Quantity}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 text-lg">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          <p className="ml-2 text-gray-500 text-sm">
            4.5 <span className="text-gray-400">({receivedData?.reviews || 89} reviews)</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3">
          Your Favourite Grocery from your nearest favourite General Store.
          {/* <span className="text-green-500 font-medium"> more</span> */}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-4">
          <p className="mr-2 text-gray-600">Quantity</p>
          <div className="flex items-center border rounded-lg p-2">
            <button
              className="px-2 py-1 text-gray-600"
              onClick={handleDecrement}
            >
              -
            </button>
            <p className="px-4">{quantity}</p>
            <button
              className="px-2 py-1 text-gray-600"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart / Go to Cart Button */}
        <button
          className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center ${isAddedToCart ? 'bg-blue-500' : 'bg-green-500'
            } text-white`}
          onClick={handleAddToCart}
        >
          {isAddedToCart ? 'Go to cart' : 'Add to cart'}
          <i className={`ml-2 fas fa-${isAddedToCart ? 'shopping-cart' : 'plus-circle'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
