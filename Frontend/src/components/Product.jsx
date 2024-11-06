import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';



const Product = ({ path, price, Name, Quantity,bigImage,onAddtocart,id,pic }) => {

    const navigate = useNavigate();
    const data = {
        name: Name,
        price: price,
        Quantity: Quantity,
        id,
        path,

    };

    const handleNavigate = () => {
        navigate('/prodet', { state: data });
    }

    return (
        <div className="bg-white rounded-lg shadow-lg drop-shadow-md relative p-4">
            <div onClick={handleNavigate}>
                <AiOutlineHeart className="absolute top-2 right-2 text-gray-300" />
                <div className='flex items-center justify-center'>
                    <img src={path} alt="Fresh Peach" className="w-[80px] justify-center h-[80px] object-cover" />

                </div>
                <h3 className="text-xl text-center font-semibold mt-3">{Name}</h3>
                <hr></hr>
                <p className="text-green-600 text-center font-bold">₹{price}</p>
                <p className="text-gray-400 text-xs">{Quantity}</p>
            </div>
            <div>
                <button onClick={()=>{onAddtocart(id)}} className="bg-green-500 text-white text-sm mt-2 py-1 px-4 rounded-full w-full">Add to cart</button>
            </div>
        </div>
    )
}

export default Product