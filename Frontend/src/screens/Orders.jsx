import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/order/getorders', {
                    method: 'POST', // Use POST method as per your API requirement
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId in request body
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.orders); // Assuming the API returns an array of orders
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
        };

        if (userId) {
            fetchOrders(); // Fetch orders only if userId exists
        } else {
            setError('User ID not found');
        }
    }, [userId]);

    return (
        <div className="max-w-4xl h-[100vh] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul>
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No orders found</p>
                    ) : (
                        orders.map((order) => (
                            <li key={order._id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
                                <div className="mb-2">
                                    <strong className="text-gray-700">Order ID:</strong> {order._id}
                                </div>
                                <div className="mb-2">
                                    <strong className="text-gray-700">Total Amount:</strong> ${order.totalAmount}
                                </div>
                                <div className="mb-2">
                                    <strong className="text-gray-700">Products:</strong>
                                    <ul className="ml-4 mt-2 list-disc list-inside">
                                        {order.products.map((product) => (
                                            <li key={product.product} className="text-gray-600">
                                                <strong>Product ID:</strong> {product.product}, <strong>Quantity:</strong> {product.quantity}, <strong>Price:</strong> ${product.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Orders;
