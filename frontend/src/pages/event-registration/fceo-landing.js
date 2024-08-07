import React, { useState } from 'react';
import Navbar from "../../components/navbar";
import { Link } from 'react-router-dom';
import { FCEO_REGIST_LEADER, FCEO_REGIST_MEMBER_1, FCEO_REGIST_SUMMARY } from '../../constants/routes';

const Fceo = () => (
    <div>
        <Navbar />
        <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-white text-4xl font-bold my-4'>What role are you?</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <Link to={FCEO_REGIST_LEADER}>
                        <button className='bg-primary-3 text-white px-6 py-2 rounded-full'>Team Leader</button>
                    </Link>
                    <Link to={FCEO_REGIST_MEMBER_1}>
                        <button className='bg-primary-3 text-white px-6 py-2 rounded-full'>Team Member</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default Fceo;