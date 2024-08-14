import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getBmcRegistrationData } from '../../service/services';

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
                console.log(answers);
                setBccData({
                    ...item,
                    eventSource: answers[0],
                    hasExperience: answers[1],
                    experience: answers[2],
                    expectations: answers[3],
                    materials: answers[4]
                });
                console.log(bccData);
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
                console.log(bpcData);
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
            <div className='bg-gradient-primary w-full min-h-screen p-4 text-white'>
            { isLoading ?          
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner/>
                </div>
            :
                                <div className='flex items-center flex-col col-span-2 rounded-lg shadow-lg p-10 bg-opacity-25'>
                                <p className='text-xl font-bold mb-2'>BMC Registrations</p>
                                {
                                    bccData.sessionType ? 
                                <div className='max-w-md w-full p-4 rounded-lg shadow-lg'>
                                    <p className='text-center'><strong>{bccData.sessionType}</strong></p>
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
                                : <></>
                                }
                                {
                                    bpcData.sessionType ?                       
                                <div className='max-w-md w-full p-4 rounded-lg shadow-lg'>
                                    <p className='text-center'><strong>{bpcData.sessionType}</strong></p>
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
                                : <></>
                                }       
                            </div>
            }
            </div>
        </div>
    );
}

export default BMCSummary;
