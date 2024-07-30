import React, { useState } from 'react';
import Navbar from "../../components/navbar";

const TeamCode = ({ TeamCode }) => (
    <div>
        <Navbar />
        <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>{TeamCode}</h1>
            </div>
        </div>
    </div>
);

export default TeamCode;