import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getBmcRegistrationData } from '../../service/services';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BMCSummary = () => {
    const { profileData, isLoggedIn, loading } = useUser();
    const [ response, setResponse ] = useState([]);
    const [ userData, setUserData ] = useState({});
    const [ bccData, setBccData ] = useState({});
    const [ bpcData, setBpcData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchRegistrationData();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!loading) {
            setUserData(profileData);
        }
    }, [loading, profileData]);

    const fetchRegistrationData = async () => {
        try {
            setIsLoading(true);
            const response = await getBmcRegistrationData();
            setResponse(response);
        } catch (error) {
            //Handle error
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setFormData();
    }, [response]);

    const setFormData = () => {
        for (let i=0; i < response.length; i++) {
            const item = response[i];
            if (item.sessionType === "Business Case Competition") {
                const answers = handleQuestions(item.question);
                setBccData({
                    ...item,
                    eventSource: answers[0],
                    hasExperience: answers[1],
                    experience: answers[2],
                    expectations: answers[3],
                    materials: answers[4]
                });
            } else if (item.sessionType === "Business Plan Competition") {
                const answers = handleQuestions(item.question);
                setBpcData({
                    ...item,
                    eventSource: answers[0],
                    hasExperience: answers[1],
                    experience: answers[2],
                    expectations: answers[3],
                    materials: answers[4]
                });
            }
        }
    }

    const handleQuestions = (string) => {
        const qna = JSON.parse(string);
        const answers = qna.map(i => Object.values(i)[0]);
        //questions
        // 0 - eventSource
        // 1 - have you participated in a business comp before?
        // 2 - experience
        // 3 - expectations
        // 4 - materials
        return answers;
    }
     

    return (
        <div>
            <Navbar/>
            <div className='bg-primary-1 w-full min-h-screen p-4 text-white'>
            { isLoading ?          
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner/>
                </div>
            :
            <div className='grid md:grid-cols-2 md:gap-x-4 md:gap-y-4'>
                            <div className="grid grid-cols-1 gap-y-4 md:col-span-2 mx-2 sm:mx-8 py-4 md:py-8">
                            <h1 className='text-gradient font-bold mx-8 text-4xl md:text-5xl text-center'>Business Master Class</h1>
                            <p className='text-sm md:text-base text-center mx-2 sm:mx-32 md:max-w-lg lg:mx-auto'>Congratulations! You have been registered for Business Master Class. Please check this page and your email for updates.</p>
                            </div>
                            <div className='flex flex-col max-w-full items-center md:items-end rounded-lg bg-opacity-25'>
                                {
                                    bccData.sessionType ? 
                                <div className='bg-primary-4 md:mx-2 max-w-full sm:max-w-md w-full p-8 rounded-lg shadow-lg'>
                                    <p className='text-xl text-center text-gradient mb-2'><strong>{bccData.sessionType}</strong></p>
                                    <div className="text-sm md:text-base">
                                    <p><strong>Full Name:</strong> {userData.fullname}</p>
                                    <p><strong>Gender:</strong> {userData.gender}</p>
                                    <p><strong>University:</strong> {userData.institution}</p>
                                    <p><strong>Major:</strong> {userData.major}</p>
                                    <p><strong>Batch:</strong> {userData.batch}</p>
                                    <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <div className="border-t border-gray-300 my-4"></div>
                                    <strong>How did you know this event?</strong>
                                    <p>{bccData.eventSource}</p>
                                    {
                                        bccData.experience ? <>
                                        <strong>What was your experience when participating in a business competition before?</strong>
                                        <p>{bccData.experience}</p>
                                        </>
                                        : ''
                                    }
                                    <strong>What are your expectations for this Business Master Class?</strong>
                                    <p>{bccData.expectations}</p>
                                    <strong>What kind of competition materials do you need?</strong>
                                    <p>{bccData.materials}</p>
                                    {
                                        bccData.referralCode && (
                                            <>
                                            <div className="border-t border-gray-300 my-4"></div>
                                            <p><strong>Referral Code: </strong>{bccData.referralCode}</p>
                                            </>
                                        )
                                    }
                                    </div>
                                </div>
                                : <></>
                                }
                                {
                                    bpcData.sessionType ?                       
                                <div className='bg-primary-4 mt-4 md:mx-2 max-w-full sm:max-w-md w-full p-8 rounded-lg shadow-lg'>
                                    <p className='text-xl text-center text-gradient mb-2'><strong>{bpcData.sessionType}</strong></p>
                                    <div className="text-sm md:text-base">
                                    <p><strong>Full Name:</strong> {userData.fullname}</p>
                                    <p><strong>Gender:</strong> {userData.gender}</p>
                                    <p><strong>University:</strong> {userData.university}</p>
                                    <p><strong>Major:</strong> {userData.major}</p>
                                    <p><strong>Batch:</strong> {userData.batch}</p>
                                    <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <div className="border-t border-gray-300 my-4"></div>
                                    <strong>How did you know this event?</strong>
                                    <p>{bpcData.eventSource}</p>
                                    {
                                        bpcData.experience ? <>
                                        <strong>What was your experience when participating in a business competition before?</strong>
                                        <p>{bpcData.experience}</p>
                                        </>
                                        : ''
                                    }
                                    <strong>What are your expectations for this Business Master Class?</strong>
                                    <p>{bpcData.expectations}</p>
                                    <strong>What kind of competition materials do you need?</strong>
                                    <p>{bpcData.materials}</p>
                                    {
                                        bpcData.referralCode && (
                                            <>
                                            <div className="border-t border-gray-300 my-4"></div>
                                            <p><strong>Referral Code: </strong>{bpcData.referralCode}</p>
                                            </>
                                        )
                                    }
                                    </div>
                                    
                                </div>
                                : <></>
                                }       
                            </div>
                            <div className='flex flex-col items-start'>
                            <div className='sm:max-w-md w-full mx-auto md:mx-0 rounded-lg'>
                                <div className='bg-primary-4 flex flex-col rounded-lg shadow-lg mt-4 md:mt-0 md:px-4 py-8 items-center'>
                                    <p className='text-2xl md:text-3xl
                                    text-gradient font-bold mb-2 text-center'>Feedback & Submission</p>
                                    <button
                                    className='w-fit text-white text-sm border-2 border-primary-3 rounded-full px-4 py-1
                                    md:px-6 md:py-2 md:text-base
                                    hover:bg-primary-3 hover:text-white transition duration-300
                                    '
                                    onClick={() => window.location.href = 'https://bit.ly/FeedbackBMCInterSummit2024'}
                                    >Go to form
                                    </button>
                                </div>
                                <div className='bg-primary-4 flex flex-col rounded-lg shadow-lg mt-4 md:px-4 py-8 items-center'>
                                    <p className='text-2xl md:text-3xl
                                    text-gradient font-bold mb-2 text-center'>Purchase Booklet</p>
                                    <button
                                    className='w-fit text-white text-sm border-2 border-primary-3 rounded-full px-4 py-1
                                    md:px-6 md:py-2 md:text-base
                                    hover:bg-primary-3 hover:text-white transition duration-300
                                    '
                                    onClick={() => window.location.href = 'https://bit.ly/HANDBOOKSXC24'}
                                    >Go to store
                                    </button>
                                </div>
                            </div>
                            </div>

            </div>
            }
            </div>
        </div>
    );
}

export default BMCSummary;
