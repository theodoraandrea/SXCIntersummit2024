import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';
import { getIntersummitRegistrationData } from '../../service/services';


const IntersummitSummary = () =>{
  const { profileData, isLoggedIn, loading } = useUser();
  const[ userData, setUserData] = useState({});
  const [response, setResponse] = useState({});
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
        const response = await getIntersummitRegistrationData();
        setResponse(response);
      } catch (error) {
        // error
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
        setFormData();
    }, [response]);

    const setFormData = () => {
        for (let i=0; i < response.length; i++) {
          const item = response[i];
              const answers = handleQuestions(item.question);
                setuserData({
                  ...item,
                  eventSource: answers[0],
                  expectation: answers[1],
                  hasAllergy: answers[2],
                  allergy: answers[3],
                });
        }
    }

    const handleQuestions = (string) => {
        const qna = JSON.parse(string);
        const answers = qna.map(i => Object.values(i)[0]);
        //questions
        // 0 - eventSource
        // 1 - expectation
        // 2 - have allergy?
        // 3 - list allergy
        return answers;
    }

    return (
        <div>
          <Navbar />
          <div className="bg-primary-1 w-full min-h-screen p-4 text-white">
            {isLoading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 md:gap-x-4 md:gap-y-4">
                {/* Heading and Intro Text */}
                <div className="grid grid-cols-1 gap-y-4 md:col-span-2 mx-2 sm:mx-8 py-4 md:py-8">
                  <h1 className="text-gradient font-bold mx-8 text-4xl md:text-5xl text-center">
                    International Summit
                  </h1>
                  <p className="text-sm md:text-base text-center mx-2 sm:mx-32 md:max-w-lg lg:mx-auto">
                    Congratulations! You have been registered for the International Summit. Please check this page and your email for updates.
                  </p>
                </div>
      
                {/* User Data and Session Info */}
                <div className="flex flex-col max-w-full items-center md:items-end rounded-lg bg-opacity-25">
                  {userData.sessionType && (
                    <div className="bg-primary-4 md:mx-2 max-w-full sm:max-w-md w-full p-8 rounded-lg shadow-lg">
                      <p className="text-xl text-center text-gradient mb-2">
                        <strong>{userData.sessionType}</strong>
                      </p>
                      <div className="text-sm md:text-base">
                        <p><strong>Full Name:</strong> {userData.fullname}</p>
                        <p><strong>Gender:</strong> {userData.gender}</p>
                        <p><strong>University:</strong> {userData.institution}</p>
                        <p><strong>Major:</strong> {userData.major}</p>
                        <p><strong>Batch:</strong> {userData.batch}</p>
                        <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
      
                        <div className="border-t border-gray-300 my-4"></div>
      
                        {/* Event Source and Additional Information */}
                        <strong>How did you know this event?</strong>
                        <p>{userData.eventSource}</p>
                        
                        <strong>What are your expectations for this International Summit?</strong>
                        <p>{userData.expectations}</p>

                        {userData.allergy && (
                          <>
                            <strong>Please list any allergies or dietary restrictions.</strong>
                            <p>{userData.allergy}</p>
                          </>
                        )}
                        
                        {userData.referralCode && (
                          <>
                            <div className="border-t border-gray-300 my-4"></div>
                            <p><strong>Referral Code: </strong>{userData.referralCode}</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );      
};

export default IntersummitSummary;