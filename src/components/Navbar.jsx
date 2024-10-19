import React from 'react'
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { BiFilter } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import Profile from '../assets/nav/profile.svg'
import Home from '../assets/nav/home.svg'
import Heart from '../assets/nav/heart.svg'
import { Link } from 'react-router-dom';



const Navbar = () => {
    return (
        <div className="fixed bottom-0 w-full bg-white drop-shadow-2xl  py-4 flex justify-between items-center px-8 shadow-2xl">
            <div className="text-center">
                <img src={Home} alt="Home" />
            </div>
            <div className="text-center">
                <img src={Profile} alt="Profile" />
            </div>
            <div className="text-center">
                <img src={Heart} alt="Profile" />
            </div>
            <div className="text-center">

            </div>
            <Link to='/cart' >
                <div className="text-center bg-[#6CC51D] p-[25px] absolute shadow-md drop-shadow-md right-2 bottom-4 rounded-full ">
                    <FiShoppingCart />
                </div>
            </Link>
        </div>
    )
}

export default Navbar