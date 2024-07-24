import React, { useState } from 'react';
import Navbar from "./../../components/navbar";

const FirstView = ({ title, description, onNext }) => (
    <div>
        <Navbar />
        <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>{title}</h1>
                <p className='text-lg text-white mb-6'>{description}</p>
                <button className='bg-primary-3 text-white px-6 py-2 rounded-full' onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    </div>
);

const SecondView = ({ title, description, onNext }) => (
    <div>
        <Navbar />
        <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>{title}</h1>
                <p className='text-lg text-white mb-6'>{description}</p>
                <button className='border-2 border-primary-3 text-primary-3 px-6 py-2 rounded-full mb-4'>
                    Download Agreement Paper
                </button>
                <p className='text-lg text-white mb-6'>{description}</p>
                <button className='bg-primary-3 text-white px-6 py-2 rounded-full'>
                    Submit Agreement Paper
                </button>
                <button className='bg-primary-3 text-white px-6 py-2 rounded-full' onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    </div>
);

const ThirdView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Personal Information</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>Full Name</label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='gender'>Gender</label>
                            <input
                                type='text'
                                id='gender'
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                type='text'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const FourthView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState({
        university: '',
        batch: '',
        major: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Education Information</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='university'>University</label>
                            <input
                                type='text'
                                id='university'
                                name='university'
                                value={formData.university}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='batch'>Batch</label>
                            <input
                                type='text'
                                id='batch'
                                name='batch'
                                value={formData.batch}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='major'>Major</label>
                            <input
                                type='text'
                                id='major'
                                name='major'
                                value={formData.major}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const FifthView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>How did you know this event?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='eventSource'
                                value={formData}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SixthView = ({ onPrevious, onNext }) => (
    <div>
        <Navbar />
        <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
            <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-4'>Have you ever participated in a business competition before?</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <button className='bg-primary-3 text-white px-6 py-2 rounded-full' onClick={onNext}>
                        I have
                    </button>
                    <button className='bg-primary-3 text-white px-6 py-2 rounded-full' onClick={onNext}>
                        I have not
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const SeventhView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What was your experience when participating in a business competition before?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='experience'
                                value={formData}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EighthView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What are your expectations for this Business Master Class?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='expectations'
                                value={formData}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const NinthView = ({ onPrevious, onNext }) => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        onNext();
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>What kind of competition materials do you need?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='materials'
                                value={formData}
                                onChange={handleChange}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const TenthView = ({ onPrevious }) => {
    const [formData, setFormData] = useState({
        follow1: false,
        follow2: false,
        follow3: false
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted: ", formData);
        // Handle form submission
    };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-white mb-4'>Connect with us!</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>
                                <input
                                    type='checkbox'
                                    name='follow1'
                                    checked={formData.follow1}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                I have followed @SxCIntersummit Instagram account
                            </label>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>
                                <input
                                    type='checkbox'
                                    name='follow2'
                                    checked={formData.follow2}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                I have followed @SxCIntersummit Instagram account
                            </label>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>
                                <input
                                    type='checkbox'
                                    name='follow3'
                                    checked={formData.follow3}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                I have followed @SxCIntersummit Instagram account
                            </label>
                        </div>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='bg-primary-3 text-white px-6 py-2 rounded-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EventCard = () => {
    const [currentView, setCurrentView] = useState(1);

    const eventData = {
        title: "Business Master Class",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc."
    };

    const handleNext = () => {
        setCurrentView(prevView => prevView + 1);
    };

    const handlePrevious = () => {
        setCurrentView(prevView => prevView - 1);
    };

    switch (currentView) {
        case 1:
            return <FirstView {...eventData} onNext={handleNext} />;
        case 2:
            return <SecondView {...eventData} onNext={handleNext} />;
        case 3:
            return <ThirdView onPrevious={handlePrevious} onNext={handleNext} />;
        case 4:
            return <FourthView onPrevious={handlePrevious} onNext={handleNext} />;
        case 5:
            return <FifthView onPrevious={handlePrevious} onNext={handleNext} />;
        case 6:
            return <SixthView onPrevious={handlePrevious} onNext={handleNext} />;
        case 7:
            return <SeventhView onPrevious={handlePrevious} onNext={handleNext} />;
        case 8:
            return <EighthView onPrevious={handlePrevious} onNext={handleNext} />;
        case 9:
            return <NinthView onPrevious={handlePrevious} onNext={handleNext} />;
        case 10:
            return <TenthView onPrevious={handlePrevious} />;
        default:
            return <FirstView {...eventData} onNext={handleNext} />;
    }
};

export default EventCard;
