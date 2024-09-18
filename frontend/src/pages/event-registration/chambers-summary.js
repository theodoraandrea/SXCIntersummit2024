// NOTES :
// INI MASIH ERROR DARI BMC
// import React, { useState, useEffect } from 'react';
// import { useUser } from "../../contexts/user-context";
// import Navbar from "../../components/navbar";
// import Spinner from '../../components/elements/spinner';
// import { getChambersRegistrationData } from '../../service/services';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// const ChambersSummary = () => {
//     const { profileData, isLoggedIn, loading } = useUser();
//     const [ response, setResponse ] = useState([]);
//     const [ userData, setUserData ] = useState({});
//     const [ isLoading, setIsLoading ] = useState(false);

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchRegistrationData();
//         }
//     }, [isLoggedIn]);

//     useEffect(() => {
//         if (!loading) {
//             setUserData(profileData);
//         }
//     }, [loading, profileData]);

//     const fetchRegistrationData = async () => {
//         try {
//             setIsLoading(true);
//             const response = await getChambersRegistrationData();
//             setResponse(response);
//         } catch (error) {
//             //Handle error
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     const handleFileLinks = (link) => {
//         return link.substring(2, link.length - 2);
//     }

//     return (
//         <div>
//             <Navbar/>
//             <div className='bg-primary-1 w-full min-h-screen p-4 text-white'>
//             { isLoading ?          
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <Spinner/>
//                 </div>
//             :
//             <div className='grid md:grid-cols-2 md:gap-x-4 md:gap-y-4'>
//                             <div className="grid grid-cols-1 gap-y-4 md:col-span-2 mx-2 sm:mx-8 py-4 md:py-8">
//                             <h1 className='text-gradient font-bold mx-8 text-4xl md:text-5xl text-center'>Chambers</h1>
//                             <p className='text-sm md:text-base text-center mx-2 sm:mx-32 md:max-w-lg lg:mx-auto'>Congratulations! You have been registered for Chambers. Please check this page and your email for updates.</p>
//                             </div>
//                             <div className='flex flex-col max-w-full items-center md:items-end rounded-lg bg-opacity-25'>
//                                 {
//                                     bpcData.sessionType ?                       
//                                 <div className='bg-primary-4 mt-4 md:mx-2 max-w-full sm:max-w-md w-full p-8 rounded-lg shadow-lg'>
//                                     <p className='text-xl text-center text-gradient mb-2'><strong>{bpcData.sessionType}</strong></p>
//                                     <div className="text-sm md:text-base">
//                                     <p><strong>Full Name:</strong> {userData.fullname}</p>
//                                     <p><strong>Gender:</strong> {userData.gender}</p>
//                                     <p><strong>University:</strong> {userData.university}</p>
//                                     <p><strong>Major:</strong> {userData.major}</p>
//                                     <p><strong>Batch:</strong> {userData.batch}</p>
//                                     <p><strong>Phone:</strong> {userData.phoneNumber}</p>
//                                     <p><strong>Email:</strong> {userData.email}</p>
//                                     <div className="border-t border-gray-300 my-4"></div>
//                                     <strong>How did you know this event?</strong>
//                                     <p>{bpcData.eventSource}</p>
//                                     {
//                                         bpcData.experience ? <>
//                                         <strong>What was your experience when participating in a business competition before?</strong>
//                                         <p>{bpcData.experience}</p>
//                                         </>
//                                         : ''
//                                     }
//                                     <strong>What are your expectations for this Business Master Class?</strong>
//                                     <p>{bpcData.expectations}</p>
//                                     <strong>What kind of competition materials do you need?</strong>
//                                     <p>{bpcData.materials}</p>
//                                     </div>
                                    
//                                 </div>
//                                 : <></>
//                                 }       
//                             </div>

//             </div>
//             }
//             </div>
//         </div>
//     );
// }

// export default ChambersSummary;
