import bg from "./../images/Kiri.png";

export default function Register() {
    return (
        <div className="flex h-screen">
            {/* Left Side */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            </div>
            
            {/* Right Side */}
            <div className="w-1/2 bg-primary-1 flex justify-center items-center">
                <div className="w-full max-w-md px-6 py-8 rounded-lg shadow-lg text-white">
                    <h1 className="text-4xl font-bold mb-4 text-center">Register</h1>
                    <a href="#" className="text-center text-white underline block mb-6">Have an account already?</a>
                    <input className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" type="text" placeholder="Full Name" />
                    <input className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white" type="text" placeholder="Nickname" />
                    <input className="w-full px-4 py-2 mb-6 border rounded-lg bg-opacity-25 bg-white" type="email" placeholder="Email" />
                    <button className="w-full py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Register</button>
                    <button className="w-full py-2 border border-primary-3 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-3">Login with Google</button>
                </div>
            </div>
        </div>
    );
}
