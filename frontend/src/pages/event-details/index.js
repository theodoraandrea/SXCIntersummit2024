import React, { useState } from 'react';
import Navbar from './../../components/navbar';
import { Link } from 'react-router-dom';

export default function DetailEvents() {
  const [openFAQ, setOpenFAQ] = useState(Array(5).fill(false));

  const toggleFAQ = (index) => {
    const newOpenFAQ = [...openFAQ];
    newOpenFAQ[index] = !newOpenFAQ[index];
    setOpenFAQ(newOpenFAQ);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-primary-1 text-white">
        {/* Competition Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Competition 01</h1>
            <p className="mt-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu vulputate. Phasellus ultrices non metus et interdum. Aliquam eleifend odio sed eleifend porttitor.
            </p>
            <Link to="/events/detail-events/regist-events">
              <button className="bg-primary-2 px-5 rounded-lg py-2 text-white mt-4">
                Regist Now
              </button>
            </Link>
          </div>
          <div className="bg-gray-200 rounded-lg h-64"></div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16 grid grid-cols-2 gap-20">
          <div className="my-auto">
            <h2 className="text-2xl font-bold">Timeline</h2>
            <p className="mt-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu vulputate. Phasellus ultrices non metus et interdum. Aliquam eleifend odio sed eleifend porttitor.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-bold">Open Registration</h3>
                <p>15 July 2024 - 19 July 2024</p>
                <Link to="/events/detail-events/regist-events">
                  <button className="bg-primary-2 px-4 py-2 rounded-lg text-white mt-2">
                    Regist Now
                  </button>
                </Link>
                <button className="bg-primary-3 px-4 py-2 rounded-lg text-white mt-2 ml-2">
                  View Booklet
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-bold">Technical Meeting</h3>
                <p>20 July 2024</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-bold">Project Progress</h3>
                <p>21 July 2024 - 30 July 2024</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-bold">Submit Project</h3>
                <p>31 July 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-8 space-y-4">
            {Array(5).fill("").map((_, index) => (
              <div key={index} className="bg-primary-5 text-black p-2">
                <button onClick={() => toggleFAQ(index)} className="w-full text-left text-lg flex items-center justify-between">
                  <span className='font-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper?</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${openFAQ[index] ? 'rotate-180' : 'rotate-90'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                {openFAQ[index] && (
                  <div className="mt-2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu vulputate. Phasellus ultrices non metus et interdum. Aliquam eleifend odio sed eleifend porttitor.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="mt-16 ">
          <h2 className="text-2xl font-bold text-center">Contact Person</h2>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className='mx-auto'>
              <p>Diandra Chandra Kusuma</p>
              <p>(+62) 85123 4567 890</p>
            </div>
            <div className='mx-auto'>
              <p>Diandra Chandra Kusuma</p>
              <p>(+62) 85123 4567 890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
