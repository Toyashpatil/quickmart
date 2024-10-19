import React, { useState } from 'react';
import SplashOne from '../assets/landing/splash1.png';
import SplashTwo from '../assets/landing/splash2.png';
import SplashThree from '../assets/landing/splash3.png';
import SplashFour from '../assets/landing/splash4.png';
import { Link } from 'react-router-dom';

const Landing1 = () => {
    // Sample JSON array of images with title and description
    const images = [
        {
            id: 1,
            src: SplashOne,
            alt: 'Apple',
            title: 'Get Discounts On All Products',
            description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy'
        },
        {
            id: 2,
            src: SplashTwo,
            alt: 'Banana',
            title: 'Buy Premium Quality Fruits',
            description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy'
        },
        {
            id: 3,
            src: SplashThree,
            alt: 'Orange',
            title: 'Buy Quality Dairy Products',
            description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy'
        },
        {
            id: 4,
            src: SplashFour,
            alt: 'Grapes',
            title: 'Welcome to',
            description: 'QUICK MART'
        }
    ];

    // State to track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to change the image when a dot is clicked
    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-[100vh] w-[100vw] overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${images[currentImageIndex].src})`,
            }}
        >
            <div className="bg-black bg-opacity-50 text-white w-full h-full flex flex-col items-center justify-center">
                <div className="text-center w-[100vw] space-y-[350px]">
                    <div>
                        {/* Dynamically change title and description based on the current image */}
                        <h1 className="text-2xl font-bold mb-4">{images[currentImageIndex].title}</h1>
                        {
                            images[currentImageIndex].description == 'QUICK MART' ? <p className="text-green-400 text-4xl mb-6">
                                {images[currentImageIndex].description}
                            </p> : <p className="text-gray-200 mb-6">
                                {images[currentImageIndex].description}
                            </p>
                        }

                    </div>

                    <div>
                        {/* Carousel Dots */}
                        <div className="flex justify-center mb-6">
                            {images.map((image, index) => (
                                <span
                                    key={image.id}
                                    className={`w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => handleDotClick(index)}
                                    style={{ cursor: 'pointer' }} // Adds pointer cursor for better UX
                                ></span>
                            ))}
                        </div>

                        {/* Get Started Button */}
                        <Link to='/welcome' >
                            <button className="bg-green-500 text-white w-[80%] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                                Get started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing1;
