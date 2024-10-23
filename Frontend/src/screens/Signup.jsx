import React,{useState} from 'react'
import Welcome from '../assets/auth/welcome.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();
    // Create state to store form input values
    const [user, setUser] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        navigate('/'); // Log user object to the console
    };
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Top section with image and title */}
            <div className="relative w-full h-[60vh]">
                <img
                    src={Welcome}
                    alt="Welcome"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Bottom section */}
            <div className="px-6 bg-white absolute rounded-tr-[30px] rounded-tl-[30px] bottom-0 w-[100vw] py-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Welcome back!
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Quickly Create Your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">
                            Set Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Set your password"
                                value={user.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-3 top-3 cursor-pointer text-gray-600">
                                👁️ {/* Eye icon can go here */}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={user.rememberMe}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup