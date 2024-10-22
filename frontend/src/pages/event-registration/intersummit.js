import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Spinner from "../../components/elements/spinner";
import { errorAlert, successAlert } from '../../components/alert';


const FirstView = ({
    eventData,
    formData,
    setFormData,
    onPrevious,
    onNext,
    sanitizeInput,    
}) => {
    const { profileData } = useUser();

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
  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [batch, setBatch] = useState("");
  // const [proofFollowIG, setProofFollowIG] = useState(
  //   formData.proofFollowIG?.name ?? ""
  // );
  // const [proofOfPostCompany, setproofOfPostCompany] = useState(
  //   formData.proofOfPostCompany?.name ?? ""
  // );  
  // const [proofStory, setProofStory] = useState(
  //   formData.proofStory?.name ?? ""
  // );
  // const [proofOfLike, setProofOfLike] = useState(
  //   formData.proofOfLike?.name ?? ""
  // );
  // const [proofPayment, setProofPayment] = useState(
  //   formData.proofPayment?.name ?? ""
  // );


  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  const handleSubmit = () =>{
    if(checkAllFilled()){
    if(!emailError && !phoneError){
        formData = {
        ...formData,
        fullName: sanitizeInput(fullName),
        gender: sanitizeInput(gender),
        email: email,
        phoneNumber: phoneNumber,
        };
        setFormData(formData);
        onNext();
        }
    }else{
    }
  };

  const checkAllFilled = () => {
    if(
        fullName &&
        gender &&
        email &&
        phoneNumber
        // proofFollowIG &&
        // proofOfPostCompany &&
        // proofStory &&
        // proofOfLike &&
        // proofPayment 
    ){
        return true;
    }
    errorAlert({ message: "All fields are required!"});
    return false;
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
                        <label className='block text-white mb-2' htmlFor='fullName'>Institution</label>
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

const SecondView = ({
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

  // const checkFileSize = (file) => {
  //   if (file.size <= 2000000) {
  //     return true;
  //   }
  //   const message = "File size has to be 2MB or less";
  //   errorAlert({ message: message });
  //   return false;
  // };

  // const checkFileType = (file) => {
  //   if (
  //     file.type === "image/jpeg" ||
  //     file.type === "image/png" ||
  //     file.type === "application/pdf"
  //   ) {
  //     return true;
  //   }
  //   const message = "File has to be pdf, jpg, jpeg, or png";
  //   errorAlert({ message: message });
  //   return false;
  // };

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
  };

  const handleNext = () => {
    if (checkAllFilled()) {
        saveData();
        onNext();
    }
  };

  const handleBack = () => {
      saveData();
      onPrevious();
  };

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

const ThirdView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [expectation, setExpectation] = useState(formData.expectation ?? "");
  const [charCount, setCharCount] = useState(formData.expectation?.length ?? 0);

  const checkAllFilled = () => {
    if (expectation) {
      return true;
    }
    errorAlert({ message: "Field must be filled"});
    return false;
  };

  const saveData = () => {
    setFormData({
        ...formData,
        expectation: sanitizeInput(expectation)
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
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What are your expectations for this event?
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="expectation"
                value={expectation}
                onChange={(e) => {
                  if (e.target.value.length <= 186) {
                    setExpectation(e.target.value);
                    setCharCount(e.target.value.length);
                  }
                }}
                className="w-full h-40 px-3 py-2 rounded-lg text-sm"
              />
              <p className="text-right text-gray-300 text-sm">
                {charCount}/186
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

const FourthView = ({ 
  onPrevious, 
  onNextHave, 
  onNextHaveNot 
}) => (

  <div>
      <Navbar />
      <div className='bg-primary-1 w-full px-2 min-h-screen flex items-center justify-center'>
          <div className='bg-primary-4 p-8 sm:max-w-md max-w-full rounded-xl shadow-lg text-center'>
              <h1 className='text-3xl m-4 font-bold text-gradient mb-4'>Do you have any allergies or dietary restrictions?</h1>
              <div className='flex w-full justify-center'>
                  {/* I have - goes to fifth view */}
                  <div className='w-40'>
                      <button 
                          className='text-sm sm:text-base bg-primary-3 border-2 border-primary-3 w-full text-white sm:px-6 py-2 rounded-full' 
                          onClick={onNextHave} 
                          aria-label='I have'
                      >
                      Yes, I have
                      </button>
                  </div>
                  {/* I have not - goes to sixth view */}
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

const FifthView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [allergy, setAllergy] = useState(formData.allergy ?? "");
  const [charCount, setCharCount] = useState(formData.allergy?.length ?? 0);

  const checkAllFilled = () => {
    if (allergy) {
      return true;
    }
    errorAlert({ message: "Field must be filled"});
    return false;
  };

  const saveData = () => {
    setFormData({
        ...formData,
        expectation: sanitizeInput(expectation)
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
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Please list your allergies and/or dietary restrictions.
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="allergy"
                value={allergy}
                onChange={(e) => {
                  if (e.target.value.length <= 186) {
                    setAllergy(e.target.value);
                    setCharCount(e.target.value.length);
                  }
                }}
                className="w-full h-40 px-3 py-2 rounded-lg text-sm"
              />
              <p className="text-right text-gray-300 text-sm">
                {charCount}/186
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

const SixthView = ({
  formData,
  setFormData,
  checkFileSize,
  checkFileType,
  onPrevious,
  onNext
}) => {

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

  const checkAllFilled = () => {
    if(
        proofFollow &&
        proofIntersummit &&
        proofLike && 
        proofPayment
      ){
        return true;
      }
      errorAlert({ message: "All fields are required" });
      return false;
    };

  const checkFileSize = (file) => {
    if (file.size <= 2000000) {
      return true;
    }
    const message = "File size has to be 2MB or less";
    errorAlert({ message: message });
    return false;
  };

  const checkFileType = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "application/pdf"
    ) {
      return true;
    }
    const message = "File has to be pdf, jpg, jpeg, or png";
    errorAlert({ message: message });
    return false;
  };

  const saveData = () => {
    setFormData({
        ...formData,
        expectation: sanitizeInput(expectation)
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

  return(
    <div>
      <Navbar />
      <div className='bg-primary-1 w-full min-h-screen flex items-center justify-center'>
          <div className='bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-xl rounded-xl shadow-lg text-center max-w-3xl'>
              <h1 className='text-3xl font-bold text-gradient mb-4'>Connect with us!</h1>
              <form className='text-left'>
                  {/* setiap selesai check list harus upload gambar  */}
                  <div className='mb-4'>
                      <label className='block text-white mb-2'>
                          <input
                              type='checkbox'
                              name='follow1'
                              checked={follow1}
                              onChange={(e) => setFollow1(e.target.checked)}
                              className='mr-2'
                          />
                          I have followed <strong>@studentsxceosjkt, @sxcintersummit, @sxcintersummitcompetition</strong> on Instagram 
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
                          I have reposted the Intersummit Poster Feed to Instagram Story and tagged 3 people
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
                          I have liked and commented on the Intersummit Poster Feed
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



export default EventCard;