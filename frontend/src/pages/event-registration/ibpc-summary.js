import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getFceoRegistrationData } from '../../service/services';

const IBPCSummary = () => {
    const { profileData, isLoggedIn, loading } = useUser();

    const [ teamData, setTeamData ] = useState({});
    const [ leaderData, setLeaderData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchRegistrationData();
        }
      }, [isLoggedIn]);

      useEffect(() => {
        if (!loading) {
            setLeaderData(profileData);
        }
      }, [loading, profileData]);

    const fetchRegistrationData = async () => {
        try {
            setIsLoading(true);
            const response = await getFceoRegistrationData();
            setTeamData(response);
          } catch (error) {
            // Handle error
          } finally {
            setIsLoading(false);
          }
    }

    const handleFileLinks = (link) => {
        return link.substring(2, link.length - 2);
    }

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen p-4 text-white'>
            { isLoading ? 
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner/>
            </div>    
            :
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 md:mx-auto md:mt-8 max-w-3xl'>
                    <h1 className='text-gradient font-bold md:col-span-3 text-4xl md:text-5xl text-center'>Business Plan Competition</h1>
                    <p className='md:col-span-3 text-sm md:text-base text-center mx-2 sm:mx-8 md:mx-32'>Congratulations! Your team has been registered for Business Plan Competition. Please check this page and your email for updates.</p>
                    <div className='md:col-span-2'>
                    <p className='text-xl text-gradient font-semibold mb-2'>Members Data</p>
                        <div className='bg-primary-4 mb-4 p-4 rounded-xl shadow-lg '>
                            <p className='text-lg'>Leader</p>
                            <div className='text-xs md:text-sm'>
                            <p><strong>Full Name:</strong> {leaderData.fullname}</p>
                            <p><strong>School:</strong> {leaderData.institution}</p>
                            <p><strong>Batch:</strong> {leaderData.batch}</p>
                            <p><strong>Phone:</strong> {leaderData.phoneNumber}</p>
                            <p><strong>Email:</strong> {leaderData.email}</p>
                            </div>
                        </div>
                        {teamData?.members?.map((member, index) => (
                        <div key={index} className='bg-primary-4 mb-4 p-4 rounded-xl shadow-lg '>
                            <p className='text-lg'>Member</p>
                            <div className='text-xs md:text-sm'>
                            <p><strong>Full Name:</strong> {member.fullname}</p>
                            <p><strong>School:</strong> {member.school}</p>
                            <p><strong>Batch:</strong> {member.batch}</p>
                            <p><strong>Phone:</strong> {member.phoneNumber}</p>
                            <p><strong>Email:</strong> {member.email}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div>
                    <div className='bg-primary-4 h-fit rounded-xl shadow-lg p-4 md:mt-9'>
                        <p className='text-xl text-gradient font-semibold mb-2'>Team Information</p>
                        <div className='text-xs md:text-sm'>
                        <p><strong>Team Name:</strong> {teamData.teamName}</p>
                        <p><strong>Members:</strong></p>
                        <ul className='list-disc list-inside'>
                            <li>{leaderData.fullname}</li>
                            {teamData?.members?.map((member, index) => (
                                <li key={index}>{member.fullname}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    <div className='bg-primary-4 h-fit mt-4 rounded-xl shadow-lg p-4'>
                        <p className='text-xl text-gradient font-semibold mb-2'>Registration Data</p>
                        <div className='text-xs md:text-sm'>
                        <p><strong>Team Code:</strong> {teamData.teamCode}</p>
                        {
                            teamData.referralCode &&
                            <p><strong>Referral Code:</strong> {teamData.referralCode}</p>
                        }
                        </div>
                    </div>
                    </div>
                </div>
            }
            </div>
        </div>
    );
};

export default IBPCSummary;
