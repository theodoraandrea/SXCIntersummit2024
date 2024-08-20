import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import { useNavigate, Link } from 'react-router-dom';
import { EVENTS_PAGE, HOME, LANDING_PAGE, USER_DASHBOARD_PAGE, USER_DETAILS_PAGE } from '../../constants/routes';
import { postBMCRegistration } from '../../service/services';
import Spinner from '../../components/elements/spinner';
import ReferralModal from '../../components/referral-modal';
import { errorAlert, successAlert } from '../../components/alert';

const FirstView = ({ title, description, formData, setFormData, onNext }) => {
  const navigate = useNavigate();
  const { loading, isLoggedIn, registeredEvents } = useUser();
  const [sessionType, setSessionType] = useState(formData.sessionType ?? "");
  const [ hasRegisteredBcc, setHasRegisteredBcc ] = useState(false);
  const [ hasRegisteredBpc, setHasRegisteredBpc ] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
      } else {
        navigate(LANDING_PAGE);
      }
    }
  }, [isLoggedIn, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    if (registeredEvents.includes(2)) {
      setHasRegisteredBcc(true);
    }
    if (registeredEvents.includes(3)) {
      setHasRegisteredBpc(true);
    }
  }, []);

  const checkAllFilled = () => {
    if (sessionType) {
      return true;
    }
    errorAlert({ message: "Agreement paper required"});
    return false;
  };

  const handleSubmit = () => {
    if (checkAllFilled()) {
      setFormData({
        ...formData,
        sessionType: sessionType,
      });
      onNext();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient">{title}</h1>
          <p className="text-sm text-white my-6">
            Choose which workshop you would like to participate in
          </p>
          <div className="mb-4">
            <label
              className="block text-white mb-2"
              htmlFor="selectType"
            ></label>
            <select
              id="selectType"
              name="selectType"
              className="w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setSessionType(e.target.value);
              }}
              value={sessionType}
            >
              <option value="" disabled>
                Select Competition
              </option>
              <option value="Business Case Competition" disabled={hasRegisteredBcc}>
                Business Case Competition
              </option>
              <option value="Business Plan Competition" disabled={hasRegisteredBpc}>
                Business Plan Competition
              </option>
            </select>
          </div>
          <button
            className="text-white px-6 py-2 rounded-full hover:text-gradient"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

//UPDATE (17/08): NO AGREEMENT PAPER
const SecondView = ({ eventData, formData, setFormData, checkFileSize, onNext, onPrevious }) => {
    
    const [ agreement, setAgreement ] = useState(formData.agreement?.name ?? '');

    const { title, description, price, bankAccount } = eventData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const file = files[0];
    if (!checkFileIsPdf(file)) {
      return;
    }

    if (!checkFileSize(file)) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? file : value,
    }));
    setAgreement(file.name);
  };

  const checkFileIsPdf = (file) => {
    if (file.type === "application/pdf") {
      return true;
    }
    const message = "File type has to be pdf";
    errorAlert({ message: message });
    return false;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "{LINK}"; // REPLACE LINK
    link.download = "BMC-AgreementPaper.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    if (agreement) {
      onNext();
    } else {
      errorAlert({ message: "Agreement must be uploaded"});
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-primary w-full min-h-screen flex items-center justify-center">
        <div className="bg-dark-2 p-8 rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg text-white mb-6">{description}</p>
          <button
            className="border-2 border-primary-3 text-primary-3 px-6 py-2 rounded-full mb-4"
            onClick={handleDownload}
          >
            Download Agreement Paper
          </button>
          <p className="text-lg text-white mb-6">{description}</p>
          <div className="relative inline-block mb-5">
            <input
              type="file"
              id="agreement"
              name="agreement"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <label
              htmlFor="agreement"
              className="bg-primary-3 text-white px-5 py-3 rounded-full"
            >
              Submit Agreement Paper
            </label>
            <label className="block text-white mt-6">{agreement}</label>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onPrevious}
              className="bg-primary-3 text-white px-6 py-2 mr-6 rounded-full"
            >
              Back
            </button>
            <button
              type="button"
              className="bg-primary-3 text-white px-6 py-2 rounded-full"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThirdView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    setFullName(profileData?.fullname);
    setGender(profileData?.gender);
    setEmail(profileData?.email);
    setPhoneNumber(profileData?.phoneNumber);
    setUniversity(profileData?.institution);
    setMajor(profileData?.major);
    setBatch(profileData?.batch);
  }, [profileData]);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62 ");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [batch, setBatch] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const checkAllFilled = () => {
    if (
      fullName &&
      gender &&
      email &&
      phoneNumber &&
      university &&
      major &&
      batch
    ) {
      return true;
    }
    errorAlert({ message: "All fields must be filled"});
    return false;
  };

  const handlePhoneNumberChange = (e) => {
    let inputValue = e.target.value;

    let numericValue = inputValue.replace(/\D/g, "");

    if (!numericValue.startsWith("62")) {
      if (numericValue.startsWith("0")) {
        numericValue = numericValue.slice(1);
      }
      numericValue = `62${numericValue}`;
    }

    setPhoneNumber(numericValue);
  };

  const formatPhoneNumber = () => {
    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }
    const formattedValue = phoneNumber.replace(
      /(\d{2})(\d{4})(\d{4})(\d*)/,
      "+62 $2 $3 $4"
    );
    setPhoneNumber(formattedValue);
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Email must be a valid email address");
    } else {
      setEmailError("");
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
          batch: batch,
        };
        setFormData(formData);
        onNext();
      }
    }
  };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 mx-2 p-8 my-8 rounded-xl shadow-lg max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient text-center mb-2'>Personal Information</h1>
                    <p className='text-white text-center font-bold mb-6'>You can edit your personal information
                        <Link to={USER_DETAILS_PAGE}
                        className='text-yellow-500'
                        > here</Link>
                    </p>
                    <div className='my-2 px-4'>
                            <label className='block text-white mb-2' htmlFor='fullName'>Full Name</label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                value={fullName}
                                disabled={true}
                                onChange={(e) => setFullName(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-left">
                        <div className='mb-4 md:w-80'>
                            <label className='block text-white mb-2' htmlFor='gender'>Gender</label>
                            <select
                                id='gender'
                                name='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled={true}
                                className='w-full px-3 py-2 rounded-lg'
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2' htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
                                onChange={(e) => setBatch(e.target.value.replace(/\D/g, "").slice(0,4))}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between items-center'>
                    <button
                            type='button'
                            onClick={onPrevious}
                            className='text-white px-6 py-2 mr-6 rounded-full hover:text-gradient'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleSubmit}
                            className='text-white px-6 py-2 rounded-full hover:text-gradient'
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

const FourthView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [eventSource, setEventSource] = useState(formData.eventSource ?? "");
  const [eventSourceOther, setEventSourceOther] = useState(
    formData.eventSourceOther ?? "Other"
  );
  const [option, setOption] = useState(formData.eventSource ?? "");

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setEventSource(e.target.value);
    if (e.target.value !== 4) {
      setEventSourceOther("");
    }
  };

  const checkAllFilled = () => {
    if (eventSource) {
      return true;
    }
    errorAlert({ message: "Field must be filled"});
    return false;
  };

    const saveData = () => {
        setFormData({
            ...formData,
            eventSource: eventSource,
            eventSourceOther: sanitizeInput(eventSourceOther)
        });
    }

    const handleNext = () => {
        if (checkAllFilled()) {
            saveData();
            onNext();
        }

    }

    const handleBack = () => {
        saveData();
        onPrevious();
    }

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            How did you know this event?
          </h1>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
              <input
                id="eventSource1"
                name="eventSourceRadio"
                type="radio"
                value="Instagram"
                checked={option === "Instagram"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="eventSource1"
                className="w-full ml-2 text-xs sm:text-sm text-gray-800"
              >
                SxC InterSummit Instagram
              </label>
            </div>
            <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
              <input
                id="eventSource2"
                name="eventSourceRadio"
                type="radio"
                value="LinkedIn"
                checked={option === "LinkedIn"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="eventSource2"
                className="w-full ml-2 text-xs sm:text-sm text-gray-800"
              >
                SxC InterSummit LinkedIn
              </label>
            </div>
            <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
              <input
                id="eventSource3"
                name="eventSourceRadio"
                type="radio"
                value="Tiktok"
                checked={option === "Tiktok"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="eventSource3"
                className="w-full ml-2 text-xs sm:text-sm text-gray-800"
              >
                SxC InterSummit Tiktok
              </label>
            </div>
            <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
              <input
                id="eventSource4"
                name="eventSourceRadio"
                type="radio"
                value="Media Partners"
                checked={option === "Media Partners"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="eventSource4"
                className="w-full ml-2 text-xs sm:text-sm text-gray-800"
              >
                Media Partners
              </label>
            </div>
            <div className="flex p-4 col-span-2 text-xs sm:text-sm items-center bg-gray-100 border-gray-300 rounded">
              <input
                id="eventSource5"
                name="eventSourceRadio"
                type="radio"
                value="Other"
                checked={option === "Other"}
                onChange={handleOptionChange}
              />
              <input
                id="eventSource5"
                className="ml-2 bg-gray-100 w-full"
                name="eventSource"
                type="text"
                value={eventSourceOther}
                placeholder="Other"
                onChange={(e) => setEventSourceOther(e.target.value)}
                disabled={option !== "Other"}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              className="hover:text-gradient text-white px-6 py-2 mr-6"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="hover:text-gradient text-white px-6 py-2"
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
        <div className='bg-primary-1 w-full px-2 min-h-screen flex items-center justify-center'>
            <div className='bg-primary-4 p-8 sm:max-w-md max-w-full rounded-xl shadow-lg text-center'>
                <h1 className='text-3xl m-4 font-bold text-gradient mb-4'>Have you ever participated in a business competition before?</h1>
                <div className='flex w-full justify-center'>
                    {/* I have - goes to seventh view */}
                    <div className='w-40'>
                        <button 
                            className='text-sm sm:text-base bg-primary-3 border-2 border-primary-3 w-full text-white sm:px-6 py-2 rounded-full' 
                            onClick={onNextHave} 
                            aria-label='I have'
                        >
                        Yes, I have
                        </button>
                    </div>
                    {/* I have not - goes to eighth view */}
                    <div className='w-40 ml-6'>
                        <button 
                            className='text-sm sm:text-base border-2 border-yellow-500 w-full text-yellow-500 sm:px-6 py-2 rounded-full' 
                            onClick={onNextHaveNot} 
                            aria-label='I have not'
                        >
                            No, I have not
                        </button>
                    </div>
                </div>
                <button
                    type='button'
                    onClick={onPrevious}
                    className='mt-6 text-white px-6 py-2 hover:text-gradient'
                >
                    Back
                </button>
            </div>
        </div>
    </div>
);

const SixthView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [experience, setExperience] = useState(formData.experience ?? "");
  const [charCount, setCharCount] = useState(formData.experience?.length ?? 0);

  const checkAllFilled = () => {
    if (experience) {
      return true;
    }
    errorAlert({ message: "Field must be filled"});
    return false;
  };

    const handleNext = () => {
        if (checkAllFilled()) {
            saveData();
            onNext();
        }
    }

    const handleBack = () => {
        saveData();
        onPrevious();
    }

    const saveData = () => {
        setFormData({
            ...formData,
            experience: sanitizeInput(experience)
        });
    }

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What was your experience when participating in a business
            competition before?
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="experience"
                value={experience}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setExperience(e.target.value);
                    setCharCount(e.target.value.length);
                  }
                }}
                className="w-full h-40 px-3 py-2 rounded-lg text-sm"
              />
              <p className="text-right text-gray-300 text-sm">
                {charCount}/300
              </p>
            </div>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              className="text-white px-6 py-2 mr-6 hover:text-gradient"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="text-white px-6 py-2 hover:text-gradient"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeventhView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [expectations, setExpectations] = useState(formData.expectations ?? "");
  const [charCount, setCharCount] = useState(
    formData.expectations?.length ?? 0
  );

    const checkAllFilled = () => {
        if (expectations) {
            return true;
        }
        errorAlert({ message: "Field must be filled"});
        return false;
    }
    
    const handleNext = () => {
        if (checkAllFilled()) {
            saveData();
            onNext();
        }
    }

    const handleBack = () => {
        saveData();
        onPrevious();
    }

    const saveData = () => {
        setFormData({
            ...formData,
            expectations: sanitizeInput(expectations)
        });
    }

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 m-8 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient mb-4'>What are your expectations for this Business Master Class?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='expectations'
                                value={expectations}
                                onChange={(e) => {
                                    if (e.target.value.length <= 300) {
                                        setExpectations(e.target.value);
                                        setCharCount(e.target.value.length);
                                    }
                                }}
                                className='w-full h-40 px-3 py-2 rounded-lg'
                            />
                            <p className='text-right text-gray-300 text-sm'>{charCount}/300</p>
                        </div>
                    </form>
                    <div className='mt-6 flex justify-between items-center'>
                    <button
                            type='button'
                            onClick={handleBack}
                            className='text-white px-6 py-2 mr-6 hover:text-gradient'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleNext}
                            className='text-white px-6 py-2 hover:text-gradient'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EighthView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [materials, setMaterials] = useState(formData.materials ?? "");
  const [charCount, setCharCount] = useState(formData.materials?.length ?? 0);

  const checkAllFilled = () => {
    if (materials) {
      return true;
    }
    errorAlert({ message: "Field must be filled"});
    return false;
  };

    const handleNext = () => {
        if (checkAllFilled()) {
            saveData();
            onNext();
        }
    }

    const handleBack = () => {
        saveData();
        onPrevious();
    }

    const saveData = () => {
        setFormData({
            ...formData,
            materials: sanitizeInput(materials)
        });
    }

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient mb-4'>What kind of competition materials do you need?</h1>
                    <form className='text-left'>
                        <div className='mb-4'>
                            <textarea
                                name='materials'
                                value={materials}
                                onChange={(e) => {
                                    if (e.target.value.length <= 300) {
                                        setMaterials(e.target.value);
                                        setCharCount(e.target.value.length);
                                    }
                                }}
                                className='w-full h-40 px-3 py-2 rounded-lg'
                            />
                            <p className='text-right text-gray-300 text-sm'>{charCount}/300</p>
                        </div>
                    </form>
                    <div className='mt-6 flex justify-between items-center'>
                    <button
                            type='button'
                            onClick={handleBack}
                            className='text-white px-6 py-2 mr-6 hover:text-gradient'
                        >
                            Back
                    </button>
                    <button
                            type='button'
                            onClick={handleNext}
                            className='text-white px-6 py-2 hover:text-gradient'
                        >
                            Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NinthView = ({ formData, setFormData, checkFileSize, checkFileType, onPrevious, onNext }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [follow1, setFollow1] = useState(formData.screenshot1 ? true : false);
  const [follow2, setFollow2] = useState(formData.screenshot2 ? true : false);
  const [follow3, setFollow3] = useState(formData.screenshot3 ? true : false);

  const [screenshot1, setScreenshot1] = useState(
    formData.screenshot1?.name ?? ""
  );
  const [screenshot2, setScreenshot2] = useState(
    formData.screenshot2?.name ?? ""
  );
  const [screenshot3, setScreenshot3] = useState(
    formData.screenshot3?.name ?? ""
  );

  const handleSubmit = () => {
    if (
      screenshot1 &&
      screenshot2 &&
      screenshot3 &&
      follow1 &&
      follow2 &&
      follow3
    ) {
      onNext();
    } else {
      errorAlert({ message: "All proofs must be uploaded"});
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files[0];

    if (!checkFileSize(file)) {
      return;
    }

    if (!checkFileType(file)) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? file : value,
    }));
    if (name === "screenshot1") {
      setScreenshot1(file.name);
    } else if (name === "screenshot2") {
      setScreenshot2(file.name);
    } else if (name === "screenshot3") {
      setScreenshot3(file.name);
    }
  };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-xl rounded-xl shadow-lg text-center max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient mb-4'>Connect with us!</h1>
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
                                I have followed <strong>@studentsxceosjkt, @sxcintersummit, @sxcintersummitcompetition </strong> on Instagram 
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
                                    className='text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                                <label className='text-sm md:text-base text-white ml-2'>{screenshot1}</label>
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
                                I have reposted BMC Poster Feed to Instagram Story and tagged 3 people
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
                                    className='text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                                <label className='text-sm md:text-base text-white ml-2'>{screenshot2}</label>
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
                                    className='text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer'
                                >
                                    Submit screenshot
                                </label>
                                <label className='text-sm md:text-base text-white ml-2'>{screenshot3}</label>
                            </div>
                        </div>
                        <div className='mt-6 flex justify-between items-center'>
                            <button
                                type='button'
                                onClick={onPrevious}
                                className='text-white px-6 py-2 mr-6 hover:text-gradient'
                            >
                            Back
                            </button>
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='text-white px-6 py-2 hover:text-gradient'
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

const PaymentView = ({ eventData, formData, setFormData, checkFileSize, checkFileType, onPrevious, onNext }) => {
    const [ checkPayment, setCheckPayment ] = useState(formData.proofPayment ? true : false);
    const [ proofPayment, setProofPayment ] = useState(formData.proofPayment?.name ?? "");

    const { regularPrice, bankAccount, discountedPrice, discount } = eventData;
    const [ verifiedRefCode, setVerifiedRefCode ] = useState(formData.referralCode ?? null);
    const [ refCodeValid, setRefCodeValid ] = useState(formData.referralCode ? true : false);

    //handling file change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        const file = files[0];
        
        if (!checkFileSize(file)) {
          return;
        }

        if (!checkFileType(file)) {
          return;
        }

        setFormData((prevState) => ({
          ...prevState,
          [name]: files ? file : value,
        }));
        setProofPayment(file?.name);
    };

    //saving referral code
    useEffect(() => {
        setFormData({
            ...formData,
            referralCode: verifiedRefCode
        });
    }, [verifiedRefCode]);

    //checking payment proof
    const handleNext = () => {
        if (checkPayment && proofPayment) {
            onNext();
        } else {
          errorAlert({ message: "Proof must be uploaded"});
        }
    }

    return (
        <div>
        <Navbar />
        <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
            <div className='bg-primary-4 flex flex-col text-center max-w-full md:max-w-3xl'>
                <div className='mb-4 rounded-lg shadow-lg flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold text-white mb-2'>Registration Fee</h1>
                        <p className='text-white mx-4 mb-2 text-center'>
                            Please transfer the following amount to complete your registration
                        </p>
                        <div className='text-white text-left w-40'>
                            <div className='flex flex-row justify-between'>
                                <p><strong>Price: </strong></p>
                                <p>{regularPrice}</p>
                            </div>
                        {
                            verifiedRefCode && refCodeValid && (
                                <>
                                <div className='flex flex-row justify-between'>
                                <p><strong>Discount:</strong></p>
                                <p>{discount}</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                <p><strong>Total:</strong></p>
                                <p><strong>{discountedPrice}</strong></p>
                                </div>
                                </>
                            )
                        }
                        </div>
                        <p className='text-white mx-4 text-center'>
                            <strong>Bank Account Number: </strong>{bankAccount}
                        </p>
                    <div className='mt-4'>
                        <label className='block text-white mb-2'>
                            <input
                                type='checkbox'
                                name='checkPayment'
                                checked={checkPayment}
                                onChange={(e) => setCheckPayment(e.target.checked)}
                                className='mr-2'
                            />
                            I have paid the registration fee
                        </label>
                        <div className='my-4 relative'>
                            <input
                                type='file'
                                id='proofPayment'
                                name='proofPayment'
                                onChange={handleChange}
                                className='absolute inset-0 opacity-0 cursor-pointer'
                            />
                            <label
                                htmlFor='proofPayment'
                                className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer'
                            >
                                Submit screenshot
                            </label>
                            <p className='text-white mt-4'>{proofPayment}</p>
                        </div>
                    </div>
                </div>
                <ReferralModal 
                eventName="bmc"
                referralCode={formData.referralCode ?? ''}
                verifiedRefCode={verifiedRefCode}
                setVerifiedRefCode={setVerifiedRefCode} 
                setRefCodeValid={setRefCodeValid}
                />
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
                        onClick={handleNext}
                        className='bg-primary-3 text-white px-6 py-2 rounded-full'
                    >
                    Next
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

const Summary = ({ formData, onPrevious }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setRegisteredEvents } = useUser();

  let bmcId; //FOR REGISTER BUTTON PURPOSES

  if (formData.sessionType === "Business Case Competition") {
    bmcId = 2;
  } else if (formData.sessionType === "Business Plan Competition") {
    bmcId = 3;
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await postBMCRegistration(formData);
      setIsLoading(false);
      if (response.status === 200) {
        navigate(USER_DASHBOARD_PAGE);
        setRegisteredEvents((prevData) => [...prevData, bmcId]);
        successAlert({ message: "Successfully registered for BMC. Please check your email for further details!"})
      }
    } catch (error) {
      errorAlert({ message: "Oh no, something happened. Please try again!"});
      navigate(HOME);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full text-white">
        <div className="flex min-h-screen items-center justify-center">
          {isLoading ? (
            <div className="">
              <Spinner
                text="Uploading files... Please don't leave the page"
                longText="This might take a while..."
              />
            </div>
          ) : (
            <div className="bg-primary-4 mx-2 my-8 max-w-full md:max-w-lg flex items-center flex-col col-span-2 rounded-xl shadow-lg p-10 bg-opacity-25">
              <p className="text-xl sm:text-3xl text-gradient font-bold mb-2">BMC Registration Form</p>
              <p className="text-sm text-center font-semibold mb-2">
                Please make sure all data is correct before submitting
              </p>
              <div className="grid max-w-full grid-cols-2 gap-x-8 md:gap-x-0 text-sm md:text-base">
                <strong>Session</strong>
                <p>{formData.sessionType}</p>
                <strong>Full Name</strong> 
                <p>{formData.fullName}</p>
                <strong>Gender</strong> 
                <p>{formData.gender}</p>
                <strong>University</strong>
                <p>{formData.university}</p>
                <strong>Major</strong>
                <p>{formData.major}</p>
                <strong>Batch</strong>
                <p>{formData.batch}</p>
                <strong>Phone</strong>
                <p>{formData.phoneNumber}</p>
                <strong>Email</strong>
                <p>{formData.email}</p>
              </div>
              <div className="max-w-sm w-full text-sm md:max-w-full md:text-base">
                <div className="border-t border-gray-300 my-4"></div>
                <strong>How did you know this event?</strong>
                <p>
                  {formData.eventSource === "Other"
                    ? `${formData.eventSource}${
                        formData.eventSourceOther !== ""
                          ? `: ${formData.eventSourceOther}`
                          : ""
                      }`
                    : `SxC InterSummit ${formData.eventSource}`}
                </p>
                {formData.experience ? (
                  <>
                    <strong>
                      What was your experience when participating in a business
                      competition before?
                    </strong>
                    <p>{formData.experience}</p>
                  </>
                ) : (
                  ""
                )}
                
                <strong>
                  What are your expectations for this Business Master Class?
                </strong>
                <p>{formData.expectations}</p>
                <strong>What kind of competition materials do you need?</strong>
                <p>{formData.materials}</p>
                <div className="border-t border-gray-300 my-4"></div>
                <p>
                  <strong>Proof of following our Instagram:</strong>{" "}
                  {formData.screenshot1.name}
                </p>
                <p>
                  <strong>Proof of reposting BMC poster:</strong>{" "}
                  {formData.screenshot2.name}
                </p>
                <p>
                  <strong>Proof of like & comment on BMC poster:</strong>{" "}
                  {formData.screenshot3.name}
                </p>
              </div>
              <div className="flex w-full mt-6 justify-between">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="text-white px-6 py-2 mr-6 hover:text-gradient"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="text-white px-6 py-2 hover:text-gradient"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const EventCard = () => {
  const [currentView, setCurrentView] = useState(1);

    const eventData = {
        title: "Business Master Class",
        description: "</br>&emsp;<strong>1.&emsp;Business Plan Competition Class</strong>" +
    "</br>This session will specifically cover Business Plan Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business plan competition" +
    "</br>&emsp;<strong>2.&emsp;Business Case Competition Class</strong>" +
    "</br>This session will specifically cover Business Class Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business case competition",
        bmcId: 1,
        regularPrice: 50000,
        discountedPrice: 45000,
        discount: 5000,
        bankAccount: "BCA - [no rek]",
    };

  //All fields for BMC
  const [formData, setFormData] = useState({});

  //Utility functions
  const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z\s]/g, "");
  };

  const sanitizeInputParagraph = (input) => {
    return input.replace(/[^a-zA-Z0-9.,&! "'?\n-]/g, "");
  };

  const checkFileSize = (file) => {
    if (file.size <= 5000000) {
      return true;
    }
    const message = "File size has to be 5MB or less";
    errorAlert({ message: message });
    return false;
  }

  const checkFileTypeImage = (file) => {
    if (file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      return true;
    }
    const message = "File has to be jpg, jpeg, or png";
    errorAlert({ message: message });
    return false;
  }

  const handleNext = () => {
    setCurrentView((prevView) => prevView + 1);
  };

  const handlePrevious = () => {
    if (currentView === 7 && !formData.experience) {
      setCurrentView((prevView) => prevView - 2);
    } else {
      setCurrentView((prevView) => prevView - 1);
    }
  };

  const handleNext2 = () => {
    setFormData({
      ...formData,
      experience: "",
    });
    setCurrentView((prevView) => prevView + 2);
  };

    switch (currentView) {
        case 1:
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={()=>{setCurrentView(3)}} />;
        case 2:
            //skipped cus agreement paper is cancelled
        case 3:
            return <ThirdView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(1)}} onNext={handleNext} />;
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
            return <NinthView formData={formData} setFormData={setFormData} checkFileSize={checkFileSize} checkFileType={checkFileTypeImage} onPrevious={handlePrevious} onNext={()=>{setCurrentView(11)}}/>;
        case 10:
            //skipped
            //return <PaymentView eventData={eventData} formData={formData} setFormData={setFormData} checkFileType={checkFileTypeImage} checkFileSize={checkFileSize} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 11:
            return <Summary eventData={eventData} formData={formData} onPrevious={()=>{setCurrentView(9)}}/>
        default:
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} />;
    }
};

export default EventCard;
