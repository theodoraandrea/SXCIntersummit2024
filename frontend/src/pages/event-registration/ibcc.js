import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import { useNavigate, Link } from 'react-router-dom';
import { EVENTS_PAGE, HOME, LANDING_PAGE, USER_DASHBOARD_PAGE, USER_DETAILS_PAGE } from '../../constants/routes';
import { postNewIbccIndividual, postNewIbccTeam, postNewIbccMember } from '../../service/services';
import Spinner from '../../components/elements/spinner';
import ReferralModal from '../../components/referral-modal';
import { errorAlert, successAlert } from '../../components/alert';

const FirstView = ({ title, formData, setFormData, onNext }) => {
  const navigate = useNavigate();
  const { loading, isLoggedIn } = useUser();
  const [ registrationType, setRegistrationType ] = useState(formData.registrationType ?? "");

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

  const checkAllFilled = () => {
    if (registrationType) {
      return true;
    }
    errorAlert({ message: "All fields must be filled"});
    return false;
  };

  const handleSubmit = () => {
    if (checkAllFilled()) {
      setFormData({
        ...formData,
        registrationType: registrationType,
      });
      console.log(registrationType);
      onNext(registrationType);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient">{title}</h1>
          <p className="text-sm text-white my-6">
            Select the type of registrant
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
                setRegistrationType(e.target.value);
              }}
              value={registrationType}
            >
              <option value="" disabled>
                Select registration type
              </option>
              <option value="Individual"> 
                Individual
              </option>
              <option value="Team">
                Team
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

const TeamView = ({
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
    console.log(profileData);
    setFullName(profileData?.fullname);
    setGender(profileData?.gender);
    setEmail(formData?.email ?? profileData?.email);
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
  const [teamName, setTeamName] = useState(formData.teamName ?? "");

  const [option, setOption] = useState(formData.eventSource ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const checkAllFilled = () => {
    if (
      teamName &&
      fullName &&
      gender &&
      email &&
      phoneNumber &&
      university &&
      major &&
      batch &&
      option &&
      teamName
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
          eventSource: option,
          teamName: teamName,
        };
        setFormData(formData);
        onNext();
      }
    }
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 mx-2 p-8 my-8 rounded-xl shadow-lg max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient text-center text-white mb-2'>Team Leader</h1>
                    <p className='text-white text-center font-bold mb-6'>You can edit your personal information
                        <Link to={USER_DETAILS_PAGE}
                        className='text-yellow-500'
                        > here</Link>
                    </p>
                    <div className='my-2 px-4'>
                            <label className='text-white block mb-2' htmlFor='fullName'>Full Name</label>
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
                            <label className='text-white block mb-2' htmlFor='gender'>Gender</label>
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
                            <label className='text-white block' htmlFor='email'>Email</label>
                            <small className="text-white">Please change to your personal email if you registered using your university email</small>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                disabled={false}
                                onChange={handleEmailChange}
                                className='w-full px-3 py-2 mt-2 rounded-lg'
                            />
                            {emailError && <p className='text-red-500'>{emailError}</p>}
                        </div>
                        <div className='mb-4'>
                            <label className='text-white block mb-2' htmlFor='phoneNumber'>Phone Number</label>
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
                            <label className='block mb-2 text-white' htmlFor='fullName'>University</label>
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
                            <label className='text-white block mb-2' htmlFor='fullName'>Major</label>
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
                            <label className='text-white block mb-2' htmlFor='fullName'>Batch</label>
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
                    <h1 className="text-3xl font-bold text-gradient mb-4">
                      How did you know this event?
                    </h1>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question1"
                          name="questionRadio"
                          type="radio"
                          value="Social Media"
                          checked={option === "Social Media"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question1"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Social Media
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question2"
                          name="questionRadio"
                          type="radio"
                          value="Stubas"
                          checked={option === "Stubas"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question2"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Student Ambassador
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question3"
                          name="questionRadio"
                          type="radio"
                          value="WA Group"
                          checked={option === "WA Group"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question3"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          WhatsApp Group
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Telegram"
                          checked={option === "Telegram"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Telegram
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Email"
                          checked={option === "Email"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Email
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Advertisement"
                          checked={option === "Advertisement"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Advertisement
                        </label>
                      </div>
                     
                    </div>
                    <h1 className="mt-4 text-3xl font-bold text-gradient mb-4">
                      Team name
                    </h1>
                    <div className='mb-4'>
                            <input
                                type='text'
                                id='teamName'
                                name='teamName'
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className='w-full px-3 py-2 rounded-lg'
                            />
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

const IndividualView = ({
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
    setEmail(formData?.email ?? profileData?.email);
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

  const [option, setOption] = useState(formData.eventSource ?? "");

  const [mbti, setMbti] = useState(formData.mbti ?? "");

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
      batch &&
      option &&
      mbti
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
          eventSource: option,
          mbti: mbti
        };
        setFormData(formData);
        onNext();
      }
    }
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

    return (
        <div>
            <Navbar />
            <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
                <div className='bg-primary-4 mx-2 p-8 my-8 rounded-xl shadow-lg max-w-3xl'>
                    <h1 className='text-3xl font-bold text-gradient text-center text-white mb-2'>Your Data</h1>
                    <p className='text-center font-bold mb-6 text-white'>You can edit your personal information
                        <Link to={USER_DETAILS_PAGE}
                        className='text-yellow-500'
                        > here</Link>
                    </p>
                    <div className='my-2 px-4'>
                            <label className='block mb-2 text-white' htmlFor='fullName'>Full Name</label>
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
                            <label className='block mb-2 text-white' htmlFor='gender'>Gender</label>
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
                            <label className='block text-white' htmlFor='email'>Email</label>
                            <small className="text-white">Please change to your personal email if you registered using your university email</small>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                disabled={false}
                                onChange={handleEmailChange}
                                className='w-full px-3 py-2 mt-2 rounded-lg'
                            />
                            {emailError && <p className='text-red-500'>{emailError}</p>}
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2 text-white' htmlFor='phoneNumber'>Phone Number</label>
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
                            <label className='block mb-2 text-white' htmlFor='fullName'>University</label>
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
                            <label className='block mb-2 text-white' htmlFor='fullName'>Major</label>
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
                            <label className='block mb-2 text-white' htmlFor='fullName'>Batch</label>
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
                        <div className='mb-4'>
                            <label className='block mb-2 text-white' htmlFor='fullName'>MBTI</label>
                            <input
                                type='text'
                                id='mbti'
                                name='mbti'
                                value={mbti}
                                disabled={false}
                                onChange={(e) => setMbti(e.target.value.slice(0,4).toUpperCase())}
                                className='w-full px-3 py-2 rounded-lg'
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl text-gradient font-bold mb-4">
                      How did you know this event?
                    </h1>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question1"
                          name="questionRadio"
                          type="radio"
                          value="Social Media"
                          checked={option === "Social Media"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question1"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Social Media
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question2"
                          name="questionRadio"
                          type="radio"
                          value="Stubas"
                          checked={option === "Stubas"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question2"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Student Ambassador
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question3"
                          name="questionRadio"
                          type="radio"
                          value="WA Group"
                          checked={option === "WA Group"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question3"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          WhatsApp Group
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Telegram"
                          checked={option === "Telegram"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Telegram
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Email"
                          checked={option === "Email"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Email
                        </label>
                      </div>
                      <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                        <input
                          id="question4"
                          name="questionRadio"
                          type="radio"
                          value="Advertisement"
                          checked={option === "Advertisement"}
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor="question4"
                          className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                        >
                          Advertisement
                        </label>
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


const Member1Data = ({
  member1Data,
  setMember1Data,
  onPrevious,
  onNext,
  sanitizeInput,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [fullName, setFullName] = useState(member1Data.fullname ?? "");
  const [gender, setGender] = useState(member1Data.gender ?? "");
  const [email, setEmail] = useState(member1Data.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(member1Data.phoneNumber ?? "+62 ");
  const [university, setUniversity] = useState(member1Data.university ?? "");
  const [major, setMajor] = useState(member1Data.major ?? "");
  const [batch, setBatch] = useState(member1Data.batch ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  const handleSubmit = () => {
    if (checkAllFilled()) {
      if (!emailError && !phoneError) {
        member1Data = {
          ...member1Data,
          fullname: sanitizeInput(fullName),
          gender: sanitizeInput(gender),
          email: email,
          phoneNumber: phoneNumber,
          university: sanitizeInput(university),
          major: sanitizeInput(major),
          batch: batch,
        };
        setMember1Data(member1Data);
      }

      onNext();
      
    } else {
      errorAlert({ message: "All fields must be filled"});
    }
  };

  const checkAllFilled = () => {
    if (fullName && gender && university && major && batch && phoneNumber && email) {
      return true;
    }
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

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen py-16">
        <div className="bg-primary-1 sm:bg-primary-4 p-8 rounded-xl sm:shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            Member 1 Data
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-white block text-white" htmlFor="email">
                Personal Email
              </label>
              <small className="text-white ">Do not use university email</small>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 mt-2 rounded-lg"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                onBlur={formatPhoneNumber}
                className="w-full px-3 py-2 rounded-lg"
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
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
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
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

const Member2Data = ({
  formData,
  setFormData,
  onPrevious,
  onNext,
  sanitizeInput,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [fullName, setFullName] = useState(formData.fullname ?? "");
  const [gender, setGender] = useState(formData.gender ?? "");
  const [email, setEmail] = useState(formData.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? "+62 ");
  const [university, setUniversity] = useState(formData.university ?? "");
  const [major, setMajor] = useState(formData.major ?? "");
  const [batch, setBatch] = useState(formData.batch ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  const handleSubmit = () => {
    if (checkAllFilled()) {
      if (!emailError && !phoneError) {
        formData = {
          ...formData,
          fullname: sanitizeInput(fullName),
          gender: sanitizeInput(gender),
          email: email,
          phoneNumber: phoneNumber,
          university: sanitizeInput(university),
          major: sanitizeInput(major),
          batch: batch,
        };
        setFormData(formData);
      }
      onNext();
      
    } else {
      errorAlert({ message: "All fields must be filled"});
    }
  };

  const checkAllFilled = () => {
    if (fullName && gender && university && major && batch && phoneNumber && email) {
      return true;
    }
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

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen py-16">
        <div className="bg-primary-1 sm:bg-primary-4 p-8 rounded-xl sm:shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            Member 2 Data
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white" htmlFor="email">
                Personal Email
              </label>
              <small className="text-white">Do not use university email</small>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 mt-2 rounded-lg"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                onBlur={formatPhoneNumber}
                className="w-full px-3 py-2 rounded-lg"
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
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
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
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

const UploadsView = ({ formData, setFormData, checkFileSize, checkFileType, onNext, onPrevious }) => {

  const [studentId, setStudentId] = useState(formData.studentId?.name ?? "");
  const [cv, setCV ] = useState(formData.cv?.name ?? "");
  const [proofOfFollow, setProofOfFollow] = useState(
    formData.proofOfFollow?.name ?? ""
  );
  const [proofOfStory, setProofOfStory] = useState(formData.proofOfStory?.name ?? ""
  );
  const [proofOfComment, setProofOfComment] = useState(formData.proofOfComment?.name ?? ""
  );
  const [proofOfBroadcast, setProofOfBroadcast] = useState(formData.proofOfBroadcast?.name ?? "");
  const [twibbon1, setTwibbon1] = useState(formData.twibbonLink1 ?? "");
  const [twibbon2, setTwibbon2] = useState(formData.twibbonLink2 ?? "");
  const [twibbon3, setTwibbon3] = useState(formData.twibbonLink3 ?? "");

  const handleSubmit = () => {
    if (checkAllFilled()) {
      if (formData.registrationType === "Individual") {
        setFormData({
          ...formData,
          twibbonLink1: twibbon1
        });
      } else if (formData.registrationType === "Team") {
        setFormData({
          ...formData,
          twibbonLink1: twibbon1,
          twibbonLink2: twibbon2,
          twibbonLink3: twibbon3
        });
      }
      onNext();
    } else {
      errorAlert({ message: "All fields must be filled"});
    }
  };

  const checkAllFilled = () => {
    if (studentId && proofOfComment && proofOfFollow && proofOfStory && proofOfBroadcast) {
      if (formData.registrationType === "Individual") {
        if (cv && twibbon1) {
          return true;
        }
      } else if (formData.registrationType === "Team") {
        if (twibbon1 && twibbon2 && twibbon3) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    const file = files[0];

    if (!checkFileSize(file)) {
      return;
    }

    else {
      if (!checkFileType(file)) {
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? file : value,
    }));
    if (name === "studentId") {
      setStudentId(file.name);
    } else if (name === "cv") {
      if (formData.registrationType === "Individual") {
        setCV(file.name);
      }
    } else if (name === "proofOfFollow") {
      setProofOfFollow(file.name);
    } else if (name === "proofOfStory") {
      setProofOfStory(file.name);
    } else if (name === "proofOfComment") {
      setProofOfComment(file.name);
    } else if (name === "proofOfBroadcast") {
      setProofOfBroadcast(file.name);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="bg-primary-1 w-full min-h-screen py-16">  
      <div className="bg-primary-1 sm:bg-primary-4 p-8 rounded-xl sm:shadow-lg max-w-3xl mx-auto">
      <h1 className="text-lg font-bold text-white ">Uploads</h1>
            <label className="block text-white">
              For Team Registration, combine files of <strong>ALL MEMBERS</strong> into 1 PDF file
            </label>
            <label className="block text-white mb-4">
              File size has to be less than 2MB
            </label>
            <label className="block text-white mb-4">
              Each requirement will be reviewed and participants will be contacted if any are not met.
            </label>
            <p className="block text-white">Student ID</p>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">              
                <input
                type="file"
                id="studentId"
                name="studentId"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="studentId"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <p className="text-sm text-white ml-2 block">{studentId}</p>
            </div>
            <div
            hidden={formData.registrationType === "Team"}
            >
            <p className="text-white"
            >CV</p>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row"
            >
              <div className="relative">              
                <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="cv"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"

                >
                  Choose file
                </label>
              </div>
              <p className="text-sm text-white ml-2 block"
              >{cv}</p>
            </div>
            </div>
            <label className="block text-white">
              Proof of following @sxcintersummit & @sxcintersummitcompetition on IG
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">              
              <input
                type="file"
                id="proofOfFollow"
                name="proofOfFollow"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="proofOfFollow"
                className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
              >
                Choose file
              </label>
              </div>
              <label className="text-sm text-white ml-2">{proofOfFollow}</label>
            </div>
            <label className="block text-white">
            Proof of sharing open registration feeds to IG story and tag @sxcintersummit @sxcintersummitcompetition            
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">              
                <input
                type="file"
                id="proofOfStory"
                name="proofOfStory"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="proofOfStory"
                className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
              >
                Choose file
              </label>
              </div>
              <label className="text-sm text-white ml-2">{proofOfStory}</label>
            </div>
            <label className="block text-white">
            Proof Tag 3 friends in the Open Registration Feeds comment Section
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">              
                <input
                type="file"
                id="proofOfComment"
                name="proofOfComment"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="proofOfComment"
                className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
              >
                Choose file
              </label>
              </div>
              <label className="text-sm text-white ml-2">{proofOfComment}</label>
            </div>
            <label className="block text-white">
            Proof of sharing the IBC poster and broadcast to 1 group 
            </label>
            <label className="block text-white">
            Material can be accessed <a className="font-bold text-primary-3"
            target="_blank"
            href="https://drive.google.com/drive/folders/1ixXX3dGcRoXFknLqHASzl0sZOTrKF64D?usp=drive_link">here</a>         
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">              
                <input
                type="file"
                id="proofOfBroadcast"
                name="proofOfBroadcast"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="proofOfBroadcast"
                className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
              >
                Choose file
              </label>
              </div>
              <label className="text-sm text-white ml-2">{proofOfBroadcast}</label>
            </div>
            <label className="text-white"
            hidden={formData.registrationType === "Individual"}
            >
              Proof of Twibbon post (all members)
            </label>
            <div className="mb-4">
            <div>
              <label className="text-white my-1" 
              hidden={formData.registrationType === "Individual"}
              >Proof of Twibbon 1</label>
              <label className="text-white my-1" 
              hidden={formData.registrationType === "Team"}
              >Proof of Twibbon</label>
              <input
                type="text"
                id="twibbon1" // Use unique IDs for each input
                name="twibbon1"
                value={twibbon1}
                onChange={(e) => setTwibbon1(e.target.value)}
                className="w-full mt-2 px-3 py-2 rounded-lg"
              />
            </div>
            <div
            hidden={formData.registrationType === "Individual"}
            >
              <label className="text-white my-1">Proof of Twibbon 2</label>
              <input
                type="text"
                id="twibbon2" // Use unique IDs for each input
                name="twibbon2"
                value={twibbon2}
                disabled={formData.registrationType === "Individual"}
                onChange={(e) => setTwibbon2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div 
            hidden={formData.registrationType === "Individual"}
            >
              <label className="text-white my-1">Proof of Twibbon 3</label>
              <input
                type="text"
                id="twibbon3" // Use unique IDs for each input
                name="twibbon3"
                value={twibbon3}
                disabled={formData.registrationType === "Individual"}
                onChange={(e) => setTwibbon3(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
            >
              Next
            </button>
            </div>
            </div>
          </div>
      </div>

    </div>
  )
};

const PaymentView = ({ eventData, formData, setFormData, checkFileSize, checkFileType, onPrevious, onNext }) => {
  const [ checkPayment, setCheckPayment ] = useState(formData.proofOfPayment ? true : false);
  const [ proofOfPayment, setProofOfPayment ] = useState(formData.proofOfPayment?.name ?? "");
  const [ verifiedRefCode, setVerifiedRefCode ] = useState(formData.referralCode ?? null);
  const [ refCodeValid, setRefCodeValid ] = useState(formData.referralCode ? true : false);

  const { teamPrice, individualPrice, discount, bankAccount1, bankAccount2 } = eventData;

  const [ paymentChannel, setPaymentChannel ] = useState(formData.paymentChannel ?? "");
  const [ paymentBank, setPaymentBank ] = useState(formData.paymentBank ?? "");
  const [ payerBankAccName, setPayerBankAccName ] = useState(formData.payerBankAccName ?? "");
  const [ transferDate, setTransferDate ] = useState(formData.transferDate ?? "");

  // Handling file change
  const handleChange = (e) => {
      const { name, files } = e.target;
      const file = files[0];

      if (!checkFileSize(file) || !checkFileType(file)) return;

      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      setProofOfPayment(file?.name);
  };

  // Saving referral code
  useEffect(() => {
      setFormData({
          ...formData,
          referralCode: verifiedRefCode
      });
      window.scrollTo(0,0);
  }, [verifiedRefCode]);

  // Checking payment proof
  const handleNext = () => {
      if (checkAllFilled()) {
          const paymentType = getPaymentType(refCodeValid);
          setFormData({
            ...formData,
            paymentChannel: paymentChannel,
            paymentType: paymentType,
            paymentBank: paymentBank,
            payerBankAccName: payerBankAccName,
            transferDate: transferDate
          })
          onNext();
      } else {
        errorAlert({ message: "Proof must be uploaded"});
      }
  }

  const checkAllFilled = () => {
    if (checkPayment && proofOfPayment 
      && paymentChannel
      && paymentBank
      && payerBankAccName
      && transferDate
    ) {
      return true;
    } else {
      errorAlert({ message: "All fields must be filled!"});
      return false;
    }
  }

  const getPaymentType = (refCodeValid) => {
    if (refCodeValid && verifiedRefCode) {
      return "Referral";
    } else {
      const currentDate = new Date();

      const earlyBirdStart = new Date("2024-09-01"); 
      const earlyBirdEnd = new Date("2024-09-08");
      const regularStart = new Date("2024-09-09");
      const regularEnd = new Date("2024-09-25");
      const lateStart = new Date("2024-09-26");
      const lateEnd = new Date("2024-10-01");
  
      if (currentDate >= earlyBirdStart && currentDate <= earlyBirdEnd) {
        return "Early Bird";
      } else if (currentDate >= regularStart && currentDate <= regularEnd) {
        return "Normal";
      } else if (currentDate >= lateStart && currentDate <= lateEnd) {
        return "Late";
      } else {
        return "Normal";
      }
    }
  }



  const getPrice = (refCodeValid) => {
    const type = formData.registrationType;

    let price = type === "Team" ? "200000" : "70000";

    const currentDate = new Date();

    // 2 8 9 25 26 1 

    const earlyBirdStart = new Date("2024-09-01"); 
    const earlyBirdEnd = new Date("2024-09-08");
    const regularStart = new Date("2024-09-09");
    const regularEnd = new Date("2024-09-25");
    const lateStart = new Date("2024-09-26");
    const lateEnd = new Date("2024-10-01");

    if (currentDate >= earlyBirdStart && currentDate <= earlyBirdEnd) {
      if (type === "Team") {
        price = 180000;
      } else {
        price = 60000;
      }
    } else if (currentDate >= regularStart && currentDate <= regularEnd) {
      if (type === "Team") {
        price = 200000;
      } else {
        price = 70000;
      }    
    } else if (currentDate >= lateStart && currentDate <= lateEnd) {
      if (type === "Team") {
        price = 230000;
      } else {
        price = 85000;
      }   
    } 

    if (refCodeValid){
      price -= discount;
    }

    return price;
  }

  let price = getPrice(refCodeValid);

  return (
      <div>
          <Navbar />
          <div className="bg-primary-1 w-full min-h-screen py-16">  
          <div className="bg-primary-1 sm:bg-primary-4 p-8 rounded-xl sm:shadow-lg max-w-3xl mx-auto">
                  <div className='mb-4 py-8 shadow-md rounded-lg flex flex-col items-center justify-center'>
                      <h1 className='text-3xl font-bold text-white mb-2'>Registration Fee</h1>
                      <p className='text-white mx-4 mb-2 text-center'>
                          Please transfer the following amount to complete your registration
                      </p>
                      <div className='text-white text-center font-bold text-3xl'>
                          <p>IDR {price.toLocaleString()}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                        <div className="flex flex-col justify-center px-5 py-3 bg-gray-500 bg-opacity-60 shadow-lg rounded-2xl">
                        <p className='text-white mx-4'>
                            {bankAccount1[0]}
                        </p>
                        <p className='text-white mx-4'>
                            {bankAccount1[1]}
                        </p>
                        <p className='text-white mx-4'>
                            {bankAccount1[2]}
                        </p>
                        </div>
                        <div className="flex flex-col justify-center px-5 py-4 bg-gray-500 bg-opacity-60 shadow-lg rounded-2xl">
                        <p className='text-white mx-4'>
                            {bankAccount2[0]}
                        </p>
                        <p className='text-white mx-4'>
                            {bankAccount2[1]}
                        </p>
                        <p className='text-white mx-4'>
                            {bankAccount2[2]}
                        </p>
                        <a className='underline text-white mx-4'
                        href={bankAccount2[3]}
                        target="_blank"
                        >
                            {bankAccount2[3]}
                        </a>
                        </div>
                      </div>
                      <div className='mb-4 w-full'>
                          <label className='block text-white' htmlFor='fullName'>Where did you pay?</label>
                          <small className="text-white">blu / Paypal</small>
                          <input
                              type='text'
                              id='paymentChannel'
                              name='paymentChannel'
                              value={paymentChannel}
                              onChange={(e) => setPaymentChannel(e.target.value)}
                              className='w-full px-3 py-2 mt-2 rounded-lg'
                          />
                      </div>
                      <div className='mb-4 w-full'>
                          <label className='block text-white' htmlFor='fullName'>From which bank did you make your payment?</label>
                          <small className="text-white">e.g. BCA, BNI, BRI, etc.</small>
                          <input
                              type='text'
                              id='paymentBank'
                              name='paymentBank'
                              value={paymentBank}
                              onChange={(e) => setPaymentBank(e.target.value)}
                              className='w-full px-3 py-2 mt-2 rounded-lg'
                          />
                      </div>
                      <div className='mb-4 w-full'>
                          <label className='block text-white' htmlFor='fullName'>Name of payer</label>
                          <small className="text-white">The name listed on the bank account used for transfer</small>
                          <input
                              type='text'
                              id='payerBankAccName'
                              name='payerBankAccName'
                              value={payerBankAccName}
                              onChange={(e) => setPayerBankAccName(e.target.value)}
                              className='w-full px-3 py-2 mt-2 rounded-lg'
                          />
                      </div>
                      <div className='mb-4 w-full'>
                          <label className='block text-white mb-2' htmlFor='fullName'>Transfer date</label>
                          <input
                              type='date'
                              id='transferDate'
                              name='transferDate'
                              value={transferDate}
                              onChange={(e) => setTransferDate(e.target.value)}
                              className='w-full px-3 py-2 rounded-lg'
                          />
                      </div>
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
                          <div className='my-4 relative w-fit mx-auto'>
                              <input
                                  type='file'
                                  id='proofOfPayment'
                                  name='proofOfPayment'
                                  onChange={handleChange}
                                  className='absolute inset-0 opacity-0 cursor-pointer'
                              />
                              <label
                                  htmlFor='proofOfPayment'
                                  className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer'
                              >
                                  Submit screenshot
                              </label>
                              <p className='text-white mt-4'>{proofOfPayment}</p>
                          </div>
                      </div>
                  </div>
                  <ReferralModal 
                      eventName="ibc_bcc"
                      referralCode={formData.referralCode ?? ''}
                      verifiedRefCode={verifiedRefCode}
                      setVerifiedRefCode={setVerifiedRefCode} 
                      setRefCodeValid={setRefCodeValid}
                  />
                  <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="text-white px-6 py-2 rounded-full hover:text-gradient"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleNext();
                    }}
                    className="text-white px-6 py-2 rounded-full hover:text-gradient"
                  >
                    Next
                  </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

const SkillsQuestionnaire1 = ({
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
          <h1 className="text-lg font-bold text-gradient mb-4">
          Have you participated in similar business case competitions before? If yes, please briefly describe your experience.
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

const SkillsQuestionnaire2 = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [goals, setGoals] = useState(formData.goals ?? "");
  const [charCount, setCharCount] = useState(formData.goals?.length ?? 0);

  const checkAllFilled = () => {
    if (goals) {
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
            goals: sanitizeInput(goals)
        });
    }

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-lg font-bold text-gradient mb-4">
          What are your main goals for participating in this business case competition?
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="goals"
                value={goals}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setGoals(e.target.value);
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

const SkillsQuestionnaire3 = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [background, setBackground] = useState(formData.background ?? "");
  const [charCount, setCharCount] = useState(formData.background?.length ?? 0);

  const checkAllFilled = () => {
    if (background) {
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
            background: sanitizeInput(background)
        });
    }

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-lg font-bold text-gradient mb-4">
          Is there any other information about your background, such as skills, or interests, that you think would be helpful for matchmaking purposes?          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="background"
                value={background}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setBackground(e.target.value);
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

const CommitmentQuestionnaire = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [commitment1, setCommitment1] = useState(formData.commitment1 ?? "Yes");
  const [commitment2, setCommitment2] = useState(formData.commitment2 ?? "Yes");

  const checkAllFilled = () => {
    if (commitment1 && commitment2) {
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
            commitment1: commitment1,
            commitment2: commitment2,
        });
    }

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <p className="text-sm text-white my-6">
          Are you willing to collaborate effectively with assigned teammates?
          </p>
          <div className="mb-4">
            <label
              className="block text-white mb-2"
              htmlFor="commitment2"
            ></label>
            <select
              id="commitment1"
              name="commitment1"
              className="w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setCommitment1(e.target.value);
              }}
              value={commitment1}
            >
              <option value="" disabled>
              </option>
              <option value="Yes"> 
                Yes
              </option>
              <option value="No">
                No
              </option>
            </select>
          </div>
          <p className="text-sm text-white my-6">
          Are you willing to commit and participate in all scheduled rounds and activities of the competition?          </p>
          <div className="mb-4">
            <label
              className="block text-white mb-2"
              htmlFor="commitment2"
            ></label>
            <select
              id="commitment2"
              name="commitment2"
              className="w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setCommitment2(e.target.value);
              }}
              value={commitment2}
            >
              <option value="" disabled>
              </option>
              <option value="Yes"> 
                Yes
              </option>
              <option value="No">
                No
              </option>
            </select>
          </div>
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

const Summary = ({ formData, member1Data, member2Data, onPrevious }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(formData);
    if (formData.registrationType === "Individual") {
      try {
        setIsLoading(true);
        const response = await registerIndividual(formData);
        setIsLoading(false);
        console.log(response);
        if (response.status === 201) {
          navigate(USER_DASHBOARD_PAGE, {
            state: {
              activeTab: "competitions",
            },
          });
          successAlert({ 
            message: "Successfully registered for International Business Case Competition. Please check your email for further details!"
          })
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        errorAlert({ message: "Something went wrong. Please try again"});
        ////navigate(-1);
      }
    } else if (formData.registrationType === "Team") {
        try {
          setIsLoading(true);
          const response = await registerTeam(formData);
          const membersData = [member1Data, member2Data];
          if (response.team.id) {
            let memberCounter = 0;
            for (const member of membersData) {    
             try {
              const memberData = {
                teamId: response.team.id,
                fullname: member.fullname,
                personalEmail: member.email,
                phoneNumber: member.phoneNumber,
                university: member.university,
                batch: member.batch,
                major: member.major
               };
              const newMember = await registerMember(memberData);
              console.log("SUCCESS");
             } catch (memberError) {
              setIsLoading(false);
              errorAlert({
                message: "Something went wrong during member registration. Please try again"
              });
              ////navigate(-1);
             }
            }
            setIsLoading(false);
            //Add this activeTab state for competition registrations
            //because user-dashboard opens "events" by default
            navigate(USER_DASHBOARD_PAGE, {
              state: {
                activeTab: "competitions",
              },
            });
            successAlert({ title: "Successfully registered for International Business Case Competition!",
              message: "Please check your email and user dashboard for further details."
            });
            
          }
        } catch (error) {
          setIsLoading(false);
          errorAlert({ message: "Something went wrong. Please try again"});
          //navigate(-1);
        }
    } else {
      errorAlert({ message: "Please choose a registration type"});
    }
  }

  const registerTeam = async (data) => {
    try {
      const response = await postNewIbccTeam(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  const registerMember = async (data) => {
    try {
      const response = await postNewIbccMember(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  const registerIndividual = async (data) => {
    try {
      const response = await postNewIbccIndividual(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

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
            <div className="bg-primary-4 mx-2 my-8 max-w-full md:max-w-3xl flex items-center flex-col col-span-2 rounded-xl shadow-lg p-10 bg-opacity-25">
              <p className="text-xl sm:text-3xl text-gradient font-bold mb-2 text-center">SxC International Business Challenge: Business Case Competition</p>
              <p className="text-sm text-center font-semibold mb-2">
                Please make sure all data is correct before submitting
              </p>
              <div className="max-w-3xl grid grid-cols-2 gap-x-8 md:gap-x-0 text-sm md:text-base">
                <strong>Registration Type</strong>
                <p>{formData.registrationType}</p>
                <strong>Referral Code</strong>
                <p>{formData.referralCode ?? "-"}</p>
                <strong>Payment Type</strong>
                <p>{formData.paymentType}</p>
                <strong>Payment Channel</strong>
                <p>{formData.paymentChannel}</p>
                <strong>Payment Bank</strong>
                <p>{formData.paymentBank}</p>
                <strong>Payment Account Name</strong>
                <p>{formData.payerBankAccName}</p>
                <strong>Payment Date</strong>
                <p>{formData.transferDate}</p>
                {
                  formData.registrationType === "Team" ? 
                  <strong className="col-span-2 mt-4">Leader Data</strong>
                  : ""
                }
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
                {formData.registrationType === "Individual" ? (
                  <>
                    <strong>
                        MBTI
                    </strong>
                    <p>{formData.mbti}</p>
                  </>
                ) : (
                  <>
                  <strong className="col-span-2 mt-4">Member 1 Data</strong>
                  <strong>Full Name</strong> 
                  <p>{member1Data.fullname}</p>
                  <strong>Gender</strong> 
                  <p>{member1Data.gender}</p>
                  <strong>University</strong>
                  <p>{member1Data.university}</p>
                  <strong>Major</strong>
                  <p>{member1Data.major}</p>
                  <strong>Batch</strong>
                  <p>{member1Data.batch}</p>
                  <strong>Phone</strong>
                  <p>{member1Data.phoneNumber}</p>
                  <strong>Email</strong>
                  <p>{member1Data.email}</p>
                  <strong className="col-span-2 mt-4">Member 2 Data</strong>
                  <strong>Full Name</strong> 
                  <p>{member2Data.fullname}</p>
                  <strong>Gender</strong> 
                  <p>{member2Data.gender}</p>
                  <strong>University</strong>
                  <p>{member2Data.university}</p>
                  <strong>Major</strong>
                  <p>{member2Data.major}</p>
                  <strong>Batch</strong>
                  <p>{member2Data.batch}</p>
                  <strong>Phone</strong>
                  <p>{member2Data.phoneNumber}</p>
                  <strong>Email</strong>
                  <p>{member2Data.email}</p>
                  </>
                )}
              </div>
              <div className="max-w-sm w-full text-sm md:max-w-full md:text-base">
                <div className="border-t border-gray-300 my-4"></div>
                <strong>How did you find out about StudentsxCEOs International Summit Competitions?</strong>
                <p>{formData.eventSource}</p>
                {
                  formData.registrationType === "Individual" ? (
                    <>
                    <strong>
                        What are your main goals for participating in this competition?
                    </strong>
                    <p>{formData.goals}</p>
                    <strong>
                    Is there any other information about your background, such as skills, or interests, that you think would be helpful for matchmaking purposes?
                    </strong>
                    <p>{formData.background}</p>
                    <strong>Briefly describe your experience</strong>
                    <p>{formData.experience}</p>
                    </>
                  ) : ""
                }                
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
        title: "SxC International Business Challenge: Business Case Competition",
        bccId: 2,
        teamPrice: 200000,
        individualPrice: 60000,
        bankAccount1:[ "000427101697",
          "blu by BCA DIGITAL",
          "a.n. CLAIRINE SABATINI NAYOAN"
        ],
        bankAccount2: [
          "Username: @Intersummit2024",
          "Email: Clairinenayoan93@gmail.com",
          "Phone number: +621256356856",
          "https://paypal.me/Intersummit2024"
        ],
        discount: 5000
    };

  const [formData, setFormData] = useState({});
  const [member1Data, setMember1Data] = useState({});
  const [member2Data, setMember2Data] = useState({});

  //Utility functions
  const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z\s]/g, "");
  };

  const sanitizeInputParagraph = (input) => {
    return input.replace(/[^a-zA-Z0-9.,&! "'?\n-]/g, "");
  };

  const checkFileSize = (file) => {
    if (file.size <= 2000000) {
      return true;
    }
    const message = "File size has to be 2MB or less";
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

  const checkFileTypePdf = (file) => {
    if (file.type === "application/pdf") {
      return true;
    }
    const message = "File has to be PDF";
    errorAlert({ message: message });
    return false;
  }

  const handleNext = () => {
    setCurrentView((prevView) => prevView + 1);
  };

  const handlePrevious = () => {
    if (currentView === 50) {
      if (formData.registrationType === "Individual") {
        setCurrentView(14);
      } else if (formData.registrationType === "Team") {
        setCurrentView(4);
      }
    } else {
      setCurrentView((prev) => prev - 1);
    }
  };

    switch (currentView) {
        case 1: 
            // return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={()=>{setCurrentView(3)}} />;
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={(registrationType)=>{
                if (registrationType === "Individual") {
                  setCurrentView(10);
              } else if (registrationType === "Team") {
                  setCurrentView(2);
              } else {
                  // Handle the case where sessionType is not set or invalid
                  console.error("Invalid registration type");
              }
            }} />;
        //TEAM REGISTRATION BRANCH
        case 2:
          return <TeamView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(1)}} onNext={handleNext}/>;
        case 3:
          return <Member1Data member1Data={member1Data} setMember1Data={setMember1Data} sanitizeInput={sanitizeInput} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 4:
          return <Member2Data formData={member2Data} setFormData={setMember2Data} sanitizeInput={sanitizeInput} onPrevious={handlePrevious} onNext={()=>{setCurrentView(50)}}/>;
        //////////////////////////////////
        //INDIVIDUAL REGISTRATION BRANCH
        case 10:
          return <IndividualView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(1)}} onNext={handleNext}/>;
        case 11:
          return <SkillsQuestionnaire1 formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 12:
          return <SkillsQuestionnaire2 formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 13:
          return <SkillsQuestionnaire3 formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInputParagraph} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 14:
          return <CommitmentQuestionnaire formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={handlePrevious} onNext={()=>{setCurrentView(50)}}/>;
        //////////////////////////////////
        case 50:
          //Upload screenshots, CV, student ID
          return <UploadsView formData={formData} setFormData={setFormData} checkFileType={checkFileTypePdf} checkFileSize={checkFileSize} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 51:
          return <PaymentView eventData={eventData} formData={formData} setFormData={setFormData} checkFileType={checkFileTypeImage} checkFileSize={checkFileSize} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 52:
          return <Summary eventData={eventData} formData={formData} member1Data={member1Data} member2Data={member2Data} onPrevious={handlePrevious}/>
        default:
          return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} />;
    }
};

export default EventCard;
