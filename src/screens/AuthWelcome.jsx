import React from 'react';
import Welcome from '../assets/auth/welcome.png'
import Google from '../assets/auth/google.svg'
import { Link } from 'react-router-dom';
const AuthWelcome = () => {
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Top section with image and title */}
            <div className="relative w-full h-[50vh]">
                <img
                    src={Welcome}
                    alt="Welcome"
                    className="w-full h-full object-cover"
                />
                {/* Overlay title */}
            </div>

            {/* Bottom section */}
            <div className="flex flex-col items-center justify-between flex-1 px-6 py-8 bg-gray-100 rounded-t-3xl shadow-lg">
                {/* Title and description */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>
                    <p className="text-gray-500 mt-2">
                        Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy
                    </p>
                </div>

                {/* Google login button */}
                <button className="flex items-center justify-center w-full py-3 px-4 mt-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                </button>

                {/* Create an account button */}
                <Link to='/home' className='w-full'>
                    <button className="w-full py-3 px-4 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors">
                        Create an account
                    </button>
                </Link>

                {/* Login link */}
                <div className="mt-6">
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-green-500 font-semibold hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthWelcome;
