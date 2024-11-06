import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BiFilter } from 'react-icons/bi';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Offer from '../assets/home/offer.png';
import Categories from '../components/Categories';
import Cat from '../assets/home/cat.svg';
import Fruits from '../assets/home/fruits.svg';
import Groc from '../assets/home/groc.svg';
import Oil from '../assets/home/oil.svg';
import Beve from '../assets/home/beve.svg';
import { setName } from '../Redux/Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const [data, setData] = useState(null);
  const UserName = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/product'); // Adjust the URL if needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        dispatch(setName(result.name));

        localStorage.setItem('userId', result._id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity: 1 }), // Default quantity set to 1
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Product added to cart:', result);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[100vw] h-[100vh] overflow-scroll bg-white">
      {/* Search Bar */}
      <div className='p-4'>
        <h1 className='text-xl font-semibold'>Namaste, {UserName}</h1>
      </div>
      <div className="flex items-center justify-between bg-white p-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-gray-100 py-2 px-4 rounded-full text-sm"
            placeholder="Search keywords..."
            value={searchTerm} // Bind searchTerm to input value
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          <FiSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
        <BiFilter className="ml-4 text-2xl text-gray-500" />
      </div>

      {/* Banner */}
      <div className="w-full h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${Offer})` }}>
        <div className="absolute top-0 left-0 bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">20% off on your first purchase</h2>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4 px-4">
        <h2 className="font-bold text-lg mb-3">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <Categories Name="Vegetables" path={Cat} />
          <Categories Name="Fruits" path={Fruits} />
          <Categories Name="Beverages" path={Beve} />
          <Categories Name="Grocery" path={Groc} />
          <Categories Name="Edible Oil" path={Oil} />
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-4 px-4">
        <h2 className="font-bold text-lg mb-3">Featured products</h2>
        <div className="grid grid-cols-2 mb-20 gap-4">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            filteredProducts.map((product) => (
              <Product
                key={product._id} // Use the correct product id (_id)
                id={product._id} // Pass the product ID
                path={product.image}
                price={product.price}
                Name={product.name}
                onAddtocart={handleAddToCart} // Add to Cart functionality
              />
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Home;
