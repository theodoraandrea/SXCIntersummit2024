import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/user-context'
import Navbar from "../../components/navbar";
import { useNavigate } from 'react-router-dom';
import { LANDING_PAGE, USER_DASHBOARD_PAGE } from '../../constants/routes';
import { postBMCRegistration } from '../../service/services';
import Spinner from '../../components/elements/spinner';

const FirstView = ({ title, description, formData, setFormData, onNext }) => {
    const navigate = useNavigate();
    const { loading, isLoggedIn } = useUser();
    const [ sessionType, setSessionType ] = useState(formData.sessionType ?? '');
    
    useEffect(() => {
        if (!loading) {
            if (isLoggedIn) {
                console.log("Logged in");
            } else {
                console.log("Cannot sign up because not logged in");
                navigate(LANDING_PAGE);
            }
        }
    }, [isLoggedIn, loading]);

    const checkAllFilled = () => {
        if (sessionType) {
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        if (checkAllFilled()) {
            setFormData({
                ...formData,
                sessionType: sessionType
            });
            onNext();
        }
    }

    return (
    <div>
        <Navbar />
        <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>{title}</h1>
                <p className='text-lg text-white mb-6'>{description}</p>
                <div className='mb-4'>
                    <label className='block text-white mb-2' htmlFor='selectType'></label>
                    <select
                        id='selectType'
                        name='selectType'
                        className='w-full px-3 py-2 rounded-lg'
                        onChange={(e)=>{setSessionType(e.target.value)}}
                        value={sessionType}
                    >
                        <option value="" disabled>Select Competition</option>
                        <option value="Business Case Competition">Business Case Competition</option>
                        <option value="Business Plan Competition">Business Plan Competition</option>
                    </select>
                </div>
                <button className='bg-primary-3 text-white px-6 py-2 rounded-full' 
                onClick={handleSubmit}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
    );
};

const SecondView = ({ title, description, formData, setFormData, onNext, onPrevious }) => {
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: files ? files[0] : value,
        }));
        console.log(files);
      };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '{LINK}'; // REPLACE LINK
        link.download = 'BMC-AgreementPaper.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
    <div>
        <Navbar />
        <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>{title}</h1>
                <p className='text-lg text-white mb-6'>{description}</p>
                <button className='border-2 border-primary-3 text-primary-3 px-6 py-2 rounded-full mb-4'
                onClick={handleDownload}>
                    Download Agreement Paper
                </button>
                <p className='text-lg text-white mb-6'>{description}</p>
                <div className='relative inline-block mb-10'>
                <input 
                    type='file'
                    id="agreement" 
                    name='agreement'
                    onChange={handleChange}
                    className='absolute inset-0 opacity-0 cursor-pointer'
                />
                <label
                    htmlFor='agreement'
                    className='bg-primary-3 text-white px-5 py-3 rounded-full'>
                        Submit Agreement Paper
                </label>
                </div>
                <div className='flex justify-center'>
                <button
                    type='button'
                    onClick={onPrevious}
                    className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                >
                    Back
                </button>
                <button
                    type='button'
                    className='bg-primary-3 text-white px-6 py-2 rounded-full'
                    onClick={onNext}
                    >
                    Next
                </button>
                </div>
            </div>
        </div>
    </div>
    );
};

const ThirdView = ({ formData, setFormData, sanitizeInput, onPrevious, onNext }) => {
    const { profileData } = useUser();

    useEffect(() => {
        setFullName(profileData?.fullname);
        setGender(profileData?.gender);
        setEmail(profileData?.email);
        setPhoneNumber(profileData?.phoneNumber);
        setUniversity(profileData?.institution);
        setMajor(profileData?.major);
        setBatch(profileData?.batch);
    }, [profileData])

    const [ fullName, setFullName ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('+62 ');
    const [ university, setUniversity ] = useState('');
    const [ major, setMajor ] = useState('');
    const [ batch, setBatch ] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const checkAllFilled = () => {
        if (fullName && gender && email && phoneNumber && university
            && major && batch
        ) {
            return true;
        }
        return false;
    }

    const handlePhoneNumberChange = (e) => {
        let inputValue = e.target.value;
    
        let numericValue = inputValue.replace(/\D/g, "");
    
        if (!numericValue.startsWith("62")) {
            if (numericValue.startsWith("0")) {
                numericValue = numericValue.slice(1);
                console.log(numericValue);
            }
            numericValue = `62${numericValue}`;
        }
    
        setPhoneNumber(numericValue);
    };

    const formatPhoneNumber = () => {
        if (phoneNumber.length < 10) {
            setPhoneError("Please enter a valid phone number");
        } else {
            setPhoneError('');
        }
        const formattedValue = phoneNumber.replace(
            /(\d{2})(\d{4})(\d{4})(\d*)/,
            "+62 $2 $3 $4"
        );
        setPhoneNumber(formattedValue);
    }

    const handleEmailChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Email must be a valid email address');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        if (checkAllFilled()) {
            if (!emailError && !phoneError) {
                formData = {
                    ...formData,
                    fullName: sanitizeInput(fullName),
                    gender: sanitizeInput(gender),
                    email: email,
                    phoneNumber: phoneNumber,
                    university: sanitizeInput(university),
                    major: sanitizeInput(major),
                    batch: batch
                }
                setFormData(formData);
                onNext();
            }
        }  
    };

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Personal Information</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>Full Name</label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='gender'>Gender</label>
                            <select
                                id='gender'
                                name='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={handleEmailChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                            {emailError && <p className='text-red-500'>{emailError}</p>}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                type='text'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                onBlur={formatPhoneNumber}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                            {phoneError && <p className='text-red-500'>{phoneError}</p>}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>University</label>
                            <input
                                type='text'
                                id='university'
                                name='university'
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>Major</label>
                            <input
                                type='text'
                                id='major'
                                name='major'
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>Batch</label>
                            <input
                                type='text'
                                id='batch'
                                name='batch'
                                value={batch}
                                onChange={(e) => setBatch(e.target.value.replace(/\D/g, "").slice(0,4))}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </form>
                    <div className='mt-6 flex justify-center items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                            disabled={emailError || phoneError}
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FourthView = ({ formData, setFormData, sanitizeInput, onPrevious, onNext }) => {
    const [ eventSource, setEventSource ] = useState(formData.eventSource ?? '');

    const checkAllFilled = () => {
        if (eventSource) {
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        if (checkAllFilled()) {
            setFormData({
                ...formData,
                eventSource: sanitizeInput(eventSource)
            });
            onNext();
        }
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>How did you know this event?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='eventSource'
                                value={eventSource}
                                onChange={(e) => setEventSource(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </form>
                    <div className='mt-6 flex justify-center items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FifthView = ({ onPrevious, onNextHave, onNextHaveNot }) => (
    <div>
        <Navbar />
        <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>Have you ever participated in a business competition before?</h1>
                <div className='grid grid-cols-2 gap-4'>
                    {/* I have - goes to seventh view */}
                    <button 
                        className='bg-primary-3 text-white px-6 py-2 rounded-full' 
                        onClick={onNextHave} 
                        aria-label='I have'
                    >
                        I have
                    </button>
                    {/* I have not - goes to eighth view */}
                    <button 
                        className='bg-primary-3 text-white px-6 py-2 rounded-full' 
                        onClick={onNextHaveNot} 
                        aria-label='I have not'
                    >
                        I have not
                    </button>
                </div>
                <button
                    type='button'
                    onClick={onPrevious}
                    className='mt-6 bg-primary-3 text-white px-6 py-2 rounded-full'
                >
                    Back
                </button>
            </div>
        </div>
    </div>
);

const SixthView = ({ formData, setFormData, sanitizeInput, onPrevious, onNext }) => {
    const [ experience, setExperience ] = useState(formData.experience ?? '');

    const checkAllFilled = () => {
        if (experience) {
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        if (checkAllFilled()) {
            setFormData({
                ...formData,
                experience: sanitizeInput(experience)
            });
            onNext();
        }
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What was your experience when participating in a business competition before?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='experience'
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </form>
                    <div className='mt-6 flex justify-center items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SeventhView = ({ formData, setFormData, sanitizeInput, onPrevious, onNext }) => {
    const [ expectations, setExpectations ] = useState(formData.expectations ?? '');

    const checkAllFilled = () => {
        if (expectations) {
            return true;
        }
        return false;
    }
    
    const handleSubmit = () => {
        if (checkAllFilled()) {
            setFormData({
                ...formData,
                expectations: sanitizeInput(expectations)
            });
            onNext();
        }
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What are your expectations for this Business Master Class?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='expectations'
                                value={expectations}
                                onChange={(e) => setExpectations(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </form>
                    <div className='mt-6 flex justify-center items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EighthView = ({ formData, setFormData, sanitizeInput, onPrevious, onNext }) => {
    const [ materials, setMaterials ] = useState(formData.materials ?? '');

    const checkAllFilled = () => {
        if (materials) {
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        if (checkAllFilled()) {
            setFormData({
                ...formData,
                materials: sanitizeInput(materials)
            });
            onNext();
        }
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What kind of competition materials do you need?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='materials'
                                value={materials}
                                onChange={(e) => setMaterials(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </form>
                    <div className='mt-6 flex justify-center items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NinthView = ({ formData, setFormData, onPrevious, onNext }) => {
    const [ follow1, setFollow1 ] = useState(false);
    const [ follow2, setFollow2 ] = useState(false);
    const [ follow3, setFollow3 ] = useState(false);

    const handleSubmit = () => {
        onNext();
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: files ? files[0] : value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Connect with us!</h1>
                    <form className='text-left'>
                        {/* setiap selesai chekck list harus upload gambar  */}
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>
                                <input
                                    type='checkbox'
                                    name='follow1'
                                    checked={follow1}
                                    onChange={(e) => setFollow1(e.target.checked)}
                                    className='mr-2'
                                />
                                I have followed @SxCIntersummit Instagram account
                            </label>
                            <div className='my-4 relative'>
                                <input
                                    type='file'
                                    id='screenshot1'
                                    name='screenshot1'
                                    onChange={handleChange}
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                />
                                <label
                                    htmlFor='screenshot1'
                                    className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>
                                <input
                                    type='checkbox'
                                    name='follow2'
                                    checked={follow2}
                                    onChange={(e) => setFollow2(e.target.checked)}
                                    className='mr-2'
                                />
                                I have reposted BMC Poster Feed to Instagram Story and tag 3 people
                            </label>
                            <div className='my-4 relative'>
                                <input
                                    type='file'
                                    id='screenshot2'
                                    name='screenshot2'
                                    onChange={handleChange}
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                />
                                <label
                                    htmlFor='screenshot2'
                                    className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                            </div>
                        </div>
                        <div className=''>
                            <label className='block text-white'>
                                <input
                                    type='checkbox'
                                    name='follow3'
                                    checked={follow3}
                                    onChange={(e) => setFollow3(e.target.checked)}
                                    className='mr-2'
                                />
                                I have liked and commented on BMC Poster Feed
                            </label>
                        </div>
                        <div className='flex gap-3'>
                             <div className='my-4 relative'>
                                <input
                                    type='file'
                                    id='screenshot3'
                                    name='screenshot3'
                                    onChange={handleChange}
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                />
                                <label
                                    htmlFor='screenshot3'
                                    className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                            </div>
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                        <button
                            type='button'
                            onClick={onPrevious}
                            className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                        >
                        Back
                        </button>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                        Next
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Summary = ({ formData, onPrevious }) => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            console.log(formData);
            const response = await postBMCRegistration(formData);
            setIsLoading(false);
            if (response.status === 200) {
                {/*INSERT SUCCESS INDICATOR*/}
                navigate(USER_DASHBOARD_PAGE);
            }
            console.log(response);
        } catch (error) {
            {/*INSERT ERROR INDICATOR*/}
            console.log(error);
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className='bg-gradient-primary w-full min-h-screen p-4 text-white'>
                <div className='flex items-center justify-center'>
                    { isLoading ? <Spinner customStyles={{ margin: "2rem 0" }} /> :
                    <div className='flex items-center flex-col col-span-2 rounded-lg shadow-lg p-10 bg-opacity-25'>
                        <p className='text-xl font-bold mb-2'>BMC Registration Form</p>
                        <p className='text-sm font-semibold mb-2'>Please make sure all data is correct before submitting</p>
                        <div className='max-w-md w-full p-4 rounded-lg shadow-lg'>
                            <p><strong>Session:</strong> {formData.sessionType}</p>
                            <p><strong>Full Name:</strong> {formData.fullName}</p>
                            <p><strong>Gender:</strong> {formData.gender}</p>
                            <p><strong>University:</strong> {formData.university}</p>
                            <p><strong>Major:</strong> {formData.major}</p>
                            <p><strong>Batch:</strong> {formData.batch}</p>
                            <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <strong>How did you know this event?</strong>
                            <p>{formData.eventSource}</p>
                            {
                                formData.experience ? <>
                                <strong>What was your experience when participating in a business competition before?</strong>
                                <p>{formData.experience}</p>
                                </>
                                : ''
                            }
                            <strong>What are your expectations for this Business Master Class?</strong>
                            <p>{formData.expectations}</p>
                            <strong>What kind of competition materials do you need?</strong>
                            <p>{formData.materials}</p>
                        </div>
                        <div className='flex mt-6'>
                        <button
                                type='button'
                                onClick={onPrevious}
                                className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                            >
                                Back
                        </button>
                        <button
                            type='button'
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}
const EventCard = () => {
    const [currentView, setCurrentView] = useState(1);

    const eventData = {
        title: "Business Master Class",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc."
    };

    //All fields for BMC
    const [ formData, setFormData ] = useState({})

    const sanitizeInput = (input) => {
        return input.trim().replace(/[^a-zA-Z\s]/g, "");
    };

    const sanitizeInputParagraph = (input) => {
        return input.replace(/[^a-zA-Z0-9.,&! "'?\n-]/g, '');
    }

    const handleNext = () => {
        setCurrentView(prevView => prevView + 1);
    };

    const handlePrevious = () => {
        if(currentView === 7 && !formData.experience) {
            setCurrentView(prevView => prevView - 2);
        } else {
            setCurrentView(prevView => prevView - 1);
        }
    };

    const handleNext2 = () => {
        setFormData({
            ...formData,
            experience: ''
        });
        setCurrentView(prevView => prevView + 2);
    }

    switch (currentView) {
        case 1:
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} />;
        case 2:
            return <SecondView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious}/>;
        case 3:
            return <ThirdView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={handlePrevious} onNext={handleNext} />;
        case 4:
            return <FourthView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext} />;
        case 5:
            return <FifthView onPrevious={handlePrevious} onNextHave={handleNext} onNextHaveNot={handleNext2} />;
        case 6:
            return <SixthView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext} />;
        case 7:
            return <SeventhView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext} />;
        case 8:
            return <EighthView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext} />;
        case 9:
            return <NinthView formData={formData} setFormData={setFormData} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 10:
            return <Summary formData={formData} onPrevious={handlePrevious}/>
        default:
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} />;
    }
};

export default EventCard;
