import React, { useState } from 'react';
import bg from "./../../images/Kiri.png";
import { Link } from 'react-router-dom';

const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z0-9._%+-@]/g, '');
};

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [institution, setInstitution] = useState('');
    const [major, setMajor] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const sanitizedFullName = sanitizeInput(fullName);
        const sanitizedGender = sanitizeInput(gender);
        const sanitizedInstitution = sanitizeInput(institution);
        const sanitizeMajor = sanitizeInput(major);

        // use sanitized values for registration logic
        console.log('Sanitized Input:', { sanitizedFullName, sanitizedGender, sanitizedInstitution, sanitizeMajor });
    };

    return (
        <div className="flex h-screen">
            {/* Left Side */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            </div>
            
            {/* Right Side */}
            <div className="w-1/2 bg-primary-1 flex justify-center items-center">
                <form onSubmit={handleRegister} className="w-full max-w-md px-6 py-8 rounded-lg shadow-lg text-white">
                    <h1 className="text-4xl font-bold mb-4 text-left">Let Us Know More About You</h1>
                    <input 
                        className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <input 
                        className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" 
                        type="text" 
                        placeholder="Gender" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                    />
                    <input 
                        className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" 
                        type="text" 
                        placeholder="Institution" 
                        value={institution} 
                        onChange={(e) => setInstitution(e.target.value)} 
                    />
                    <input 
                        className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" 
                        type="text" 
                        placeholder="Major" 
                        value={major} 
                        onChange={(e) => setMajor(e.target.value)} 
                    />
                    <Link to="./home">
                        <button className="w-full py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        Submit
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
