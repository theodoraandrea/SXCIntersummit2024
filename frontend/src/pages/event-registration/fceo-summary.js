import React, { useState } from 'react';
import Navbar from "../../components/navbar";

const TeamCode = () => (
    <div>
        <Navbar />
        <div className='bg-primary-2 w-full min-h-screen '>
            <div className='grid grid-cols-4'>
                <div>
                    <p>hai</p>
                </div>
                <div className='col-span-2'>
                    <p>hai</p>
                </div>
                <div>
                    <p>hai</p>
                </div>
            </div>
        </div>
    </div>
);

export default TeamCode;