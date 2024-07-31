import React, { useState } from 'react';
import Navbar from "../../components/navbar";

const TeamCode = () => {
    const [teamData, setTeamData] = useState({
        teamName: 'Your Team Name', // Replace with actual data
        leader: { // Replace with actual data
            fullName: 'Leader Name',
            gender: 'Female',
            school: 'Leader School',
            phone: '1234567890',
            email: 'leader@example.com',
            studentId: 'LeaderID123',
            instagramProof: 'leaderInstagramProof.jpg',
            twibbonProof: 'leaderTwibbonProof.jpg',
            storyProof: 'leaderStoryProof.jpg',
            whatsappProof: 'leaderWhatsappProof.jpg',
        },
        members: [ // Replace with actual data
            {
                fullName: 'Member 1',
                gender: 'Male',
                school: 'School Name',
                phone: '1234567890',
                email: 'member1@example.com',
                studentId: 'ID123456',
                instagramProof: 'instagramProof.jpg',
                twibbonProof: 'twibbonProof.jpg',
                storyProof: 'storyProof.jpg',
                whatsappProof: 'whatsappProof.jpg',
            },
            {
                fullName: 'Member 2',
                gender: 'Female',
                school: 'School Name',
                phone: '0987654321',
                email: 'member2@example.com',
                studentId: 'ID654321',
                instagramProof: 'instagramProof2.jpg',
                twibbonProof: 'twibbonProof2.jpg',
                storyProof: 'storyProof2.jpg',
                whatsappProof: 'whatsappProof2.jpg',
            },
        ],
        teamCode: 'XYZ123', // Replace with actual data
        membersFilled: 2, // Replace with actual data
        totalMembers: 2, // Replace with actual data
    });

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen p-4 text-white'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    <div className='rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Team Information</p>
                        <p><strong>Team Name:</strong> {teamData.teamName}</p>
                        <p><strong>Members:</strong></p>
                        <ul className='list-disc list-inside'>
                            {teamData.members.map((member, index) => (
                                <li key={index}>{member.fullName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-span-2 rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Submitted Data</p>
                        <div className='mb-4 p-4 rounded-lg shadow-lg'>
                            <p className='text-lg font-semibold mb-2'>Leader Data</p>
                            <p><strong>Full Name:</strong> {teamData.leader.fullName}</p>
                            <p><strong>Gender:</strong> {teamData.leader.gender}</p>
                            <p><strong>School:</strong> {teamData.leader.school}</p>
                            <p><strong>Phone:</strong> {teamData.leader.phone}</p>
                            <p><strong>Email:</strong> {teamData.leader.email}</p>
                            <p><strong>National Student ID:</strong> {teamData.leader.studentId}</p>
                            <p><strong>Proof of Following Instagram:</strong> {teamData.leader.instagramProof}</p>
                            <p><strong>Proof of Twibbon Post:</strong> {teamData.leader.twibbonProof}</p>
                            <p><strong>Proof of Sharing Instagram Story Posters:</strong> {teamData.leader.storyProof}</p>
                            <p><strong>Proof of Sharing Posters to 3 Whatsapp Groups:</strong> {teamData.leader.whatsappProof}</p>
                        </div>
                        {teamData.members.map((member, index) => (
                            <div key={index} className='mb-4 p-4 rounded-lg shadow-lg '>
                                <p className='text-lg font-semibold mb-2'>Member {index + 1} Data</p>
                                <p><strong>Full Name:</strong> {member.fullName}</p>
                                <p><strong>Gender:</strong> {member.gender}</p>
                                <p><strong>School:</strong> {member.school}</p>
                                <p><strong>Phone:</strong> {member.phone}</p>
                                <p><strong>Email:</strong> {member.email}</p>
                                <p><strong>National Student ID:</strong> {member.studentId}</p>
                                <p><strong>Proof of Following Instagram:</strong> {member.instagramProof}</p>
                                <p><strong>Proof of Twibbon Post:</strong> {member.twibbonProof}</p>
                                <p><strong>Proof of Sharing Instagram Story Posters:</strong> {member.storyProof}</p>
                                <p><strong>Proof of Sharing Posters to 3 Whatsapp Groups:</strong> {member.whatsappProof}</p>
                            </div>
                        ))}
                    </div>
                    <div className='rounded-lg shadow-lg p-4 bg-opacity-25'>
                        <p className='text-xl font-semibold mb-2'>Team Code & Reminders</p>
                        <p><strong>Team Code:</strong> {teamData.teamCode}</p>
                        <p><strong>Members Filled:</strong> {teamData.membersFilled}/{teamData.totalMembers}</p>
                        <p>{teamData.totalMembers - teamData.membersFilled} members still need to submit their data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCode;
