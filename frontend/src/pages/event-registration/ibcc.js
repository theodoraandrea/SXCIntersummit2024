import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import { useNavigate, Link } from 'react-router-dom';
import { EVENTS_PAGE, HOME, LANDING_PAGE, USER_DASHBOARD_PAGE, USER_DETAILS_PAGE } from '../../constants/routes';
import { postBMCRegistration } from '../../service/services';
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

  const handleSubmit = () => {
    if (checkAllFilled()) {
      setFormData({
        ...formData,
        registrationType: registrationType,
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
              value={sessionType}
            >
              <option value="" disabled>
                Select Competition
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
                    <h1 className='text-3xl font-bold text-gradient text-center text-white mb-2'>Team Registrant</h1>
                    <p className='text-center font-bold mb-6'>You can edit your personal information
                        <Link to={USER_DETAILS_PAGE}
                        className='text-yellow-500'
                        > here</Link>
                    </p>
                    <div className='my-2 px-4'>
                            <label className='block mb-2' htmlFor='fullName'>Full Name</label>
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
                            <label className='block mb-2' htmlFor='gender'>Gender</label>
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
                            <label className='block mb-2' htmlFor='email'>Email</label>
                            <p>Please use your personal email and not your university email</p>
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
                            <label className='block mb-2' htmlFor='phoneNumber'>Phone Number</label>
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
                            <label className='block mb-2' htmlFor='fullName'>University</label>
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
                            <label className='block mb-2' htmlFor='fullName'>Major</label>
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
                            <label className='block mb-2' htmlFor='fullName'>Batch</label>
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

const IndividualView = ({}) => {
  return (
    <div>
      <Navbar/>
      <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
        <div></div>
      </div>
    </div>
  );

};

const Member1Data = ({
  members,
  formData,
  setFormData,
  onPrevious,
  goToSummary,
  goToNext,
  sanitizeInput,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  // useEffect(() => {
  //   setFullName(profileData?.fullname);
  //   setGender(profileData?.gender);
  //   setEmail(profileData?.email);
  //   setPhoneNumber(profileData?.phoneNumber);
  //   setUniversity(profileData?.institution);
  //   setMajor(profileData?.major);
  //   setBatch(profileData?.batch);
  // }, [profileData]);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62 ");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [batch, setBatch] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


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
      }

      goToNext();
      
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
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 rounded-lg"
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
  members,
  formData,
  setFormData,
  onPrevious,
  goToSummary,
  goToNext,
  sanitizeInput,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62 ");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [batch, setBatch] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


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
      }

      goToNext();
      
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
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 rounded-lg"
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

const UploadsView = ({}) => {

};

const PaymentView = ({ eventData, formData, setFormData, checkFileSize, checkFileType, onPrevious, onNext }) => {
  const [ checkPayment, setCheckPayment ] = useState(formData.proofPayment ? true : false);
  const [ proofPayment, setProofPayment ] = useState(formData.proofPayment?.name ?? "");
  const [ verifiedRefCode, setVerifiedRefCode ] = useState(formData.referralCode ?? null);
  const [ refCodeValid, setRefCodeValid ] = useState(formData.referralCode ? true : false);

  // Menentukan harga berdasarkan sessionType
  const sessionPrice = formData.sessionType === "Team" ? 200000 : 50000;

  // Handling file change
  const handleChange = (e) => {
      const { name, files } = e.target;
      const file = files[0];

      if (!checkFileSize(file) || !checkFileType(file)) return;

      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      setProofPayment(file?.name);
  };

  // Saving referral code
  useEffect(() => {
      setFormData({
          ...formData,
          referralCode: verifiedRefCode
      });
  }, [verifiedRefCode]);

  // Checking payment proof
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
                              <p>Rp {sessionPrice.toLocaleString('id-ID')}</p>
                          </div>
                      </div>
                      <p className='text-white mx-4 text-center'>
                          <strong>Bank Account Number: </strong>{eventData.bankAccount}
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

  if (formData.sessionType === "SxC International Business Challenge: Business Case Competition") {
    bmcId = 2;
  } else if (formData.sessionType === "SxC International Business Challenge: Business Case Competition") {
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
        successAlert({ message: "Successfully registered for IBCC. Please check your email for further details!"})
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
              <p className="text-xl sm:text-3xl text-gradient font-bold mb-2 text-center">SxC International Business Challenge: Business Case Competition</p>
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
                <strong>How did you find out about StudentsxCEOs International Summit Competitions?</strong>
                <p>
                  {formData.eventSource === "Other"
                    ? `${formData.eventSource}${
                        formData.eventSourceOther !== ""
                          ? `: ${formData.eventSourceOther}`
                          : ""
                      }`
                    : `${formData.eventSource}`}
                </p>
                {formData.experience ? (
                  <>
                    <strong>
                        What are your main goals for participating in this business case competition?
                    </strong>
                    <p>{formData.experience}</p>
                  </>
                ) : (
                  ""
                )}
                
                <strong>
                Is there any other information about your background, such as skills, or interests, that you think would be helpful for matchmaking purposes?
                </strong>
                <p>{formData.expectations}</p>
                <strong>Briefly describe your experience</strong>
                <p>{formData.materials}</p>
                <div className="border-t border-gray-300 my-4"></div>
                <p>
                  <strong>Proof of following our Instagram:</strong>{" "}
                  {formData.screenshot1.name}
                </p>
                <p>
                  <strong>Proof of reposting IBCC poster:</strong>{" "}
                  {formData.screenshot2.name}
                </p>
                <p>
                  <strong>Proof of like & comment on IBCC poster:</strong>{" "}
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
        title: "SxC International Business Challenge: Business Case Competition",
        bccId: 2,
        // regularPrice: 50000,
        // discountedPrice: 45000,
        // discount: 5000,
        // bankAccount: "BCA - [no rek]",
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
            // return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={()=>{setCurrentView(3)}} />;
            return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={()=>{
                if (formData.sessionType === "Individual") {
                  setCurrentView(3);
              } else if (formData.sessionType === "Team") {
                  setCurrentView(10);
              } else {
                  // Handle the case where sessionType is not set or invalid
                  console.error("Invalid sessionType");
              }
            }} />;
        case 2:
          return <TenView formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(1)}} onNext={handleNext} />;
        case 3:
          return <Member1Data formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(10)}} goToNext={()=>{setCurrentView((12))}}/>;
        case 4:
          return <Member2Data formData={formData} setFormData={setFormData} sanitizeInput={sanitizeInput} onPrevious={()=>{setCurrentView(11)}} goToNext={()=>{setCurrentView((13))}}/>;
        case 5:
          return <PaymentView eventData={eventData} formData={formData} setFormData={setFormData} checkFileType={checkFileTypeImage} checkFileSize={checkFileSize} onPrevious={handlePrevious} onNext={handleNext}/>;
        case 14:
          return <Summary eventData={eventData} formData={formData} onPrevious={()=>{setCurrentView(9)}}/>
        default:
          return <FirstView {...eventData} formData={formData} setFormData={setFormData} onNext={handleNext} />;
    }
};

export default EventCard;
