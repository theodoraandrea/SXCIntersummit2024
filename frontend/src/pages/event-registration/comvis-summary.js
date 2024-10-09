import React, { useState, useEffect } from 'react';
import { useUser  } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getCompvisRegistrationData } from '../../service/services';

const CompvisSummary = () => {
    const { profileData, isLoggedIn, loading } = useUser ();
    const [response, setResponse] = useState([]);
    const [userData, setUserData] = useState({});
    const [compvisData, setCompvisData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            const response = await getCompvisRegistrationData();
            setResponse(response);
        } catch (error) {
            console.error("Error fetching registration data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (response.length > 0) {
            setFormData();
        }
    }, [response]);

    const setFormData = () => {
        const updatedData = response.map((item) => {
            const answers = handleQuestions(item.question);
            return {
                ...item,
                eventSource: answers[0],
                hasExperience: answers[1],
                experience: answers[2],
                expectations: answers[3],
                materials: answers[4],
            };
        });
        setCompvisData(updatedData);
    };

    const handleQuestions = (string) => {
        try {
            const qna = JSON.parse(string);
            return qna.map(i => Object.values(i)[0]);
        } catch (error) {
            console.error("Error parsing questions:", error);
            return [];
        }
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen p-4 text-white'>
                {isLoading ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Spinner />
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 md:gap-x-4 md:gap-y-4'>
                        <div className="grid grid-cols-1 gap-y-4 md:col-span-2 mx-2 sm:mx-8 py-4 md:py-8">
                            <h1 className='text-gradient font-bold mx-8 text-4xl md:text-5xl text-center'>Company Visit</h1>
                            <p className='text-sm md:text-base text-center mx-2 sm:mx-32 md:max-w-lg lg:mx-auto'>
                                Congratulations! You have been registered for Company Visit. Please check this page and your email for updates.
                            </p>
                        </div>

                        {compvisData.map((data, index) => (
                            <div key={index} className='flex flex-col max-w-full items-center md:items-end rounded-lg bg-opacity-25'>
                                <div className='bg-primary-4 md:mx-2 max-w-full sm:max-w-md w-full p-8 rounded-lg shadow-lg'>
                                    <p className='text-xl text-center text-gradient mb-2'><strong>{data.sessionType}</strong></p>
                                    <div className="text-sm md:text-base">
                                        <p><strong>Offline/Online:</strong> {userData.attendanceType}</p>
                                        <p><strong>Company:</strong> {data.company}</p>
                                        <p><strong>Full Name:</strong> {userData.fullname}</p>
                                        <p><strong>Gender:</strong> {userData.gender}</p>
                                        <p><strong>University:</strong> {userData.institution}</p>
                                        <p><strong>Major:</strong> {userData.major}</p>
                                        <p><strong>Batch:</strong> {userData.batch}</p>
                                        <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                                        <p><strong>Email:</strong> {userData.email}</p>
                                        <div className="border-t border-gray-300 my-4"></div>
                                        <p><strong>GPA:</strong> { userData?.gpa}</p>
                                        <p><strong>Semester:</strong> {userData.semester}</p>
                                        <p><strong>Domicile:</strong> {userData.domicile}</p>
                                        <p><strong>CV:</strong> {userData.cv}</p>
                                        <strong>What are your expectations for this Business Master Class?</strong>
                                        <p>{data.expectations}</p>
                                        <strong>What kind of competition materials do you need?</strong>
                                        <p>{data.materials}</p>
                                        {/* {data.referralCode && (
                                            <>
                                                <div className="border-t border-gray-300 my-4"></div>
                                                <p><strong>Referral Code: </strong>{data.referralCode}</p>
                                            </>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompvisSummary;