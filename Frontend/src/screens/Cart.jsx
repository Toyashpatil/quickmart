import React, { useState, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi'; // Import trash icon from react-icons
import Peach from '../assets/home/peach.svg';
import Grapes from '../assets/home/Grapes.svg';
import Ava from '../assets/home/ava.svg';
import Pine from '../assets/home/pine.svg';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
    const userId = localStorage.getItem('userId');
    const [orderId, setOrderId] = useState('');
    const [Amount, setAmount] = useState(0);
    const URL = 'http://localhost:5000/payment/create';
    const orderURL = 'http://localhost:5000/order/orders'; // Order creation API
    const [productId, setProductId] = useState("");

    const handlePayment = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                amount: Amount * 100,
            }),
        });
        const data = await response.json();
        setOrderId(data.id);
        setIsModalOpen(true);
        await displayRazorpay(); // Call displayRazorpay after opening the modal
    };

    var options = {
        key: 'rzp_test_xee3l2g0TEEHZM', // Enter the Key ID generated from the Dashboard
        amount: Amount * 100, // Amount in subunits
        currency: 'INR',
        name: 'Caprise Pvt.Ltd',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: orderId,
        handler: async (response) => {
            const data = await fetch('http://localhost:5000/payment/success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    trancid: response.razorpay_payment_id,
                }),
            });

            const redirectData = await data.json();

            if (redirectData.redirectTo) {
                window.location.href = redirectData.redirectTo;
            }

            // Call the create order API after a successful payment

        },
        prefill: {
            name: 'Gaurav Kumar',
            email: 'gaurav.kumar@example.com',
            contact: '9098162141',
        },
        theme: {
            color: '#3399cc',
        },
    };

    const createOrder = async () => {
        const products = cartItems.map(item => ({
            productId: item.id, // Assuming id corresponds to productId in your order schema
            quantity: item.quantity,
            price: item.price
        }));

        try {
            const response = await fetch(orderURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    products,
                    totalAmount: Amount,
                }),
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                console.log('Order placed successfully:', result);
                setCartItems([]); // Clear cart items in the frontend
            } else {
                console.error('Error placing order:', result.error);
            }
        } catch (error) {
            console.error('Request failed:', {error});
        }
    };

    const displayRazorpay = async () => {
        await createOrder();
        await clearCart(); // Call clearCart before displaying Razorpay
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay failed to load!!');
            return;
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert(response.error.description);
        });

        paymentObject.open();
    };

    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${userId}`);
            if (response.ok) {
                const data = await response.json();
                const formattedItems = data.products.map((item) => ({
                    id: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    weight: item.product.weight,
                    image: item.product.image,
                }));
                setCartItems(formattedItems);
            } else {
                console.error('Failed to fetch cart');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

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
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeItem = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/cart/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId: id,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Product removed successfully:', result);
            } else {
                console.error('Error removing product:', result.error);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const clearCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/cart/clear', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Cart cleared successfully:', result);
                setCartItems([]); // Clear the local state
            } else {
                console.error('Error clearing cart:', result.error);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 1.6; // Flat shipping charge
    const total = subtotal + shipping;

    useEffect(() => {
        setAmount(total.toFixed(2));
    }, [total]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 ml-4">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.weight}</p>
                        <p className="text-sm text-green-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button onClick={() => decrementQuantity(item.id)} className="bg-gray-200 p-2 rounded-md">
                            -
                        </button>
                        <div>{item.quantity}</div>
                        <button onClick={() => incrementQuantity(item.id)} className="bg-gray-200 p-2 rounded-md">
                            +
                        </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">
                        <FiTrash />
                    </button>
                </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h3 className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</h3>
                <button
                    onClick={handlePayment}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                >
                    Proceed to Payment
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <h2>Payment Successful!</h2>
                    <p>Your payment of ₹{Amount} has been processed successfully.</p>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
