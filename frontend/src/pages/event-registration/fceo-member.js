import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar";
import { FCEO_REGIST_MEMBER_2 } from '../../constants/routes';

const TeamCode = () => {
    const [teamCode, setTeamCode] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(FCEO_REGIST_MEMBER_2);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Team Code</h1>
                    <input
                        type='text'
                        id='teamcode'
                        name='teamcode'
                        value={teamCode}
                        onChange={(e) => setTeamCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className='w-full px-3 py-2 rounded-lg'
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamCode;
