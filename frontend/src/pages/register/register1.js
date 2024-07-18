import React from 'react';
import bg from "./../../images/Kiri.png";
import google  from "./../../images/google.png"
import { Link } from 'react-router-dom';

export default function Register1() {
    return (
        <div className="flex h-screen">
            {/* Left Side */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            </div>
            
            {/* Right Side */}
            <div className="w-1/2 bg-primary-1 flex justify-center items-center">
                <div className="w-full max-w-lg px-6 py-8 rounded-lg shadow-lg text-white">
                    <h1 className="text-4xl font-bold mb-8 text-center">Join With Google Account</h1>
                    <Link to="./register2">
                        <button className="w-auto px-5 py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex">
                            <img src={google} alt='google-logo' className='w-5 mr-2 my-auto'/>
                            Sign Up With Google
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
