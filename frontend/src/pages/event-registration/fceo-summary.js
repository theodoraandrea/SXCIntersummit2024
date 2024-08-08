import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getFceoRegistrationData } from '../../service/services';

const FCEOSummary = () => {
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
            <div className='bg-gradient-primary w-full min-h-screen p-4 text-white'>
            { isLoading ? <Spinner customStyles={{ margin: "2rem 0" }} /> :
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    <div className='rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Team Information</p>
                        <p><strong>Team Name:</strong> {teamData.teamName}</p>
                        <p><strong>Members:</strong></p>
                        <ul className='list-disc list-inside'>
                            <li>{leaderData.fullname}</li>
                            {teamData?.members?.map((member, index) => (
                                <li key={index}>{member.fullname}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-span-2 rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Submitted Data</p>
                        <div className='mb-4 p-4 rounded-lg shadow-lg '>
                            <p className='text-lg font-semibold mb-2'>Leader Data</p>
                            <p><strong>Full Name:</strong> {leaderData.fullname}</p>
                            <p><strong>Gender:</strong> {leaderData.gender}</p>
                            <p><strong>School:</strong> {leaderData.institution}</p>
                            <p><strong>Phone:</strong> {leaderData.phoneNumber}</p>
                            <p><strong>Email:</strong> {leaderData.email}</p>
                        </div>
                        {teamData?.members?.map((member, index) => (
                        <div key={index} className='mb-4 p-4 rounded-lg shadow-lg '>
                            <p className='text-lg font-semibold mb-2'>Member {index + 1} Data</p>
                            <p><strong>Full Name:</strong> {member.fullname}</p>
                            <p><strong>Gender:</strong> {member.gender}</p>
                            <p><strong>School:</strong> {member.school}</p>
                            <p><strong>Phone:</strong> {member.phoneNumber}</p>
                            <p><strong>Email:</strong> {member.email}</p>
                        </div>
                        ))}
                    </div>
                    <div className='rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Team Code</p>
                        <p><strong>Team Code:</strong> {teamData.teamCode}</p>
                    </div>
                </div>
            }
            </div>
        </div>
    );
};

export default FCEOSummary;
