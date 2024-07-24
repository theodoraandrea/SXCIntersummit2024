import React, { useState } from 'react';
import Navbar from "./../../components/navbar";

const MemberForm = ({ memberId, formData, handleChange }) => (
    <div>
        <h2 className='text-2xl font-bold text-white mb-4'>Member {memberId} Identity</h2>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`fullName${memberId}`}>Full Name</label>
            <input
                type='text'
                id={`fullName${memberId}`}
                name={`fullName${memberId}`}
                value={formData[`fullName${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`gender${memberId}`}>Gender</label>
            <input
                type='text'
                id={`gender${memberId}`}
                name={`gender${memberId}`}
                value={formData[`gender${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`school${memberId}`}>School</label>
            <input
                type='text'
                id={`school${memberId}`}
                name={`school${memberId}`}
                value={formData[`school${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`phone${memberId}`}>Phone</label>
            <input
                type='text'
                id={`phone${memberId}`}
                name={`phone${memberId}`}
                value={formData[`phone${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`email${memberId}`}>Email</label>
            <input
                type='email'
                id={`email${memberId}`}
                name={`email${memberId}`}
                value={formData[`email${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`studentId${memberId}`}>National Student Identification Number</label>
            <input
                type='text'
                id={`studentId${memberId}`}
                name={`studentId${memberId}`}
                value={formData[`studentId${memberId}`]}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`studentCard${memberId}`}>Student ID Card</label>
            <input
                type='file'
                id={`studentCard${memberId}`}
                name={`studentCard${memberId}`}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`proofFollow${memberId}`}>Proof of Following @sxcintersummit and @sxcintersummitcompetition Instagram Account</label>
            <input
                type='file'
                id={`proofFollow${memberId}`}
                name={`proofFollow${memberId}`}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`proofTwibbon${memberId}`}>Proof of Twibbon Post</label>
            <input
                type='file'
                id={`proofTwibbon${memberId}`}
                name={`proofTwibbon${memberId}`}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`proofStory${memberId}`}>Proof of Sharing Instagram Story Posters</label>
            <input
                type='file'
                id={`proofStory${memberId}`}
                name={`proofStory${memberId}`}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-white mb-2' htmlFor={`proofWhatsapp${memberId}`}>Proof of Sharing Posters to 3 Whatsapp Group</label>
            <input
                type='file'
                id={`proofWhatsapp${memberId}`}
                name={`proofWhatsapp${memberId}`}
                onChange={handleChange}
                className='w-full px-3 py-2 rounded-lg'
            />
        </div>
    </div>
);

const FutureCEOPage = () => {
    const [formData, setFormData] = useState({
        fullName1: '', gender1: '', school1: '', phone1: '', email1: '', studentId1: '', studentCard1: null, proofFollow1: null, proofTwibbon1: null, proofStory1: null, proofWhatsapp1: null,
        fullName2: '', gender2: '', school2: '', phone2: '', email2: '', studentId2: '', studentCard2: null, proofFollow2: null, proofTwibbon2: null, proofStory2: null, proofWhatsapp2: null,
        fullName3: '', gender3: '', school3: '', phone3: '', email3: '', studentId3: '', studentCard3: null, proofFollow3: null, proofTwibbon3: null, proofStory3: null, proofWhatsapp3: null,
        fullName4: '', gender4: '', school4: '', phone4: '', email4: '', studentId4: '', studentCard4: null, proofFollow4: null, proofTwibbon4: null, proofStory4: null, proofWhatsapp4: null,
        fullName5: '', gender5: '', school5: '', phone5: '', email5: '', studentId5: '', studentCard5: null, proofFollow5: null, proofTwibbon5: null, proofStory5: null, proofWhatsapp5: null,
        teamLeader: '', teamName: '', proofPayment: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center py-5'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-extrabold text-white mb-4'>Future CEO Team Registration</h1>
                    <form onSubmit={handleSubmit} className='text-left'>
                        <MemberForm memberId={1} formData={formData} handleChange={handleChange} />
                        <MemberForm memberId={2} formData={formData} handleChange={handleChange} />
                        <MemberForm memberId={3} formData={formData} handleChange={handleChange} />
                        <MemberForm memberId={4} formData={formData} handleChange={handleChange} />
                        <MemberForm memberId={5} formData={formData} handleChange={handleChange} />
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>Who is the Team Leader?</label>
                            <select
                                name='teamLeader'
                                value={formData.teamLeader}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            >
                                <option value="">Select Team Leader</option>
                                <option value="Member 1">Member 1</option>
                                <option value="Member 2">Member 2</option>
                                <option value="Member 3">Member 3</option>
                                <option value="Member 4">Member 4</option>
                                <option value="Member 5">Member 5</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='teamName'>Team Name</label>
                            <input
                                type='text'
                                id='teamName'
                                name='teamName'
                                value={formData.teamName}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='proofPayment'>Proof of Registrant Payment (Early, Regular, Student Ambassador, Last Call)</label>
                            <input
                                type='file'
                                id='proofPayment'
                                name='proofPayment'
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button type='submit' className='bg-primary-3 text-white px-6 py-2 rounded-full'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FutureCEOPage;
