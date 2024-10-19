import React from 'react'

const Categories = ({ path, Name }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-green-100 w-[65px] h-[65px] p-3 rounded-full flex items-center justify-center">
                <img src={path} alt={Name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm mt-2">{Name}</p>
        </div>

    )
}

export default Categories