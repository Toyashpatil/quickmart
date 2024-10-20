import React from 'react';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { BiFilter } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Offer from '../assets/home/offer.png'
import Categories from '../components/Categories';
import Peach from '../assets/home/peach.svg'
import Cat from '../assets/home/cat.svg'
import Fruits from '../assets/home/fruits.svg'
import Groc from '../assets/home/groc.svg'

import Oil from '../assets/home/oil.svg'

import Beve from '../assets/home/beve.svg'
import Ava from '../assets/home/ava.svg'
import Pine from '../assets/home/pine.svg'

import Grapes from '../assets/home/Grapes.svg'



const Home = () => {
  return (
    <div className="w-[100vw]overflow-scroll bg-gray-50">
    
      {/* Search Bar */}
      <div className="flex items-center justify-between bg-white p-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-gray-100 py-2 px-4 rounded-full text-sm"
            placeholder="Search keywords..."
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
          {/* Example categories */}
          <Categories Name="Vegetables" path={Cat} />
          <Categories Name="Fruits" path={Fruits} />
          <Categories Name="Beverages" path={Beve} />
          <Categories Name="Grocery" path={Groc} />
          <Categories Name="Edible Oil" path={Oil} />         
          {/* Add more categories similarly */}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-4 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">Featured products</h2>
          <button className="text-sm text-gray-500">View All</button>
        </div>

        <div className="grid grid-cols-2 mb-20  gap-4">
          {/* Example Product Card */}
          <div>
            <Product path={Peach} price='100' Quantity='Dozen' Name='Peach' />
          </div>
          <div>
          <Product path={Ava} price='200' Quantity='Dozen' Name='Avacado' />

          </div>
          <div>
          <Product path={Pine} price='150' Quantity='Dozen' Name='Pineapple' />

          </div>
          <div>
          <Product path={Grapes} price='70' Quantity='Dozen' Name='Grapes' />

          </div>
          
          {/* Add more product cards in a similar format */}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Home;
