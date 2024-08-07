import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../../components/navbar";
import Spinner from "../../components/elements/spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { USER_DASHBOARD_PAGE } from "../../constants/routes";
import { postNewFceoMember, postNewFceoTeam } from "../../service/services";

const FirstView = ({ formData, setFormData, onPrevious, onNext, sanitizeInput }) => {
  const { profileData } = useUser();

  useEffect(() => {
      setFullName(profileData?.fullname);
      setGender(profileData?.gender);
      setEmail(profileData?.email);
      setPhoneNumber(profileData?.phoneNumber);
      setSchool(profileData?.institution);
  }, [profileData])

  const [ fullName, setFullName ] = useState("");
  const [ gender, setGender ] = useState("");
  const [ school, setSchool ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("+62");
  const [ email, setEmail ] = useState("");
  const [ teamName, setTeamName ] = useState(formData.teamName ?? '');
  const [ studentIds, setStudentIds ] = useState(formData.studentIds?.name ?? '');
  const [ proofFollow, setProofFollow ] = useState(formData.proofFollow?.name ?? '');
  const [ proofTwibbon, setProofTwibbon ] = useState(formData.proofTwibbon?.name ?? '');
  const [ proofStory, setProofStory ] = useState(formData.proofStory?.name ?? '');
  const [ proofPayment, setProofPayment ] = useState(formData.proofPayment?.name ?? '');

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = () => {
    if (checkAllFilled()) {
        if (!emailError && !phoneError) {
            formData = {
                ...formData,
                fullName: sanitizeInput(fullName),
                gender: sanitizeInput(gender),
                email: email,
                phoneNumber: phoneNumber,
                school: sanitizeInput(school),
                teamName: sanitizeInput(teamName),
            }
            setFormData(formData);
            onNext();
        }
    }  
  };

  const checkAllFilled = () => {
    if (proofPayment && fullName && gender && email && phoneNumber && school
      && teamName && studentIds && proofFollow && proofTwibbon && proofStory) {
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

const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: files ? files[0] : value,
  }));
  if (name === "studentIds") {
    setStudentIds(files[0].name);
  } else if (name === "proofFollow") {
    setProofFollow(files[0].name);
  } else if (name === "proofTwibbon") {
    setProofTwibbon(files[0].name);
  } else if (name === "proofStory") {
    setProofStory(files[0].name);
  } else if (name === "proofPayment") {
    setProofPayment(files[0].name);
  }
};

  return (
    <div>
      <Navbar/>
      <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
        <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
          <h1 className='text-3xl font-bold text-white mb-4'>FCEO Registration</h1>
            <form className='text-left'>
            <h1 className='text-lg font-bold text-white'>Leader Data</h1>
              <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='fullName'>Full name</label>
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
                      onChange={handleEmailChange}
                      className='w-full px-3 py-2 rounded-lg'
                  />
                  {emailError && <p className='text-red-500'>{emailError}</p>}
              </div>
              <div className='mb-4'>
                  <label className='block text-white mb-2' htmlFor='phoneNumber'>Phone number</label>
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
                  <label className='block text-white mb-2' htmlFor='fullName'>School</label>
                  <input
                      type='text'
                      id='school'
                      name='school'
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className='w-full px-3 py-2 rounded-lg'
                  />
              </div>
              <h1 className='text-lg font-bold text-white mt-10'>Team Data</h1>
              <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor='teamName'>Team name</label>
                <input
                    type='text'
                    id='teamName'
                    name='teamName'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className='w-full px-3 py-2 rounded-lg'
                />
              </div>
              <label className='block text-white'>Proof of Payment</label>
              <div className='my-4 relative'>
                <input
                      type='file'
                      id='proofPayment'
                      name='proofPayment'
                      onChange={handleChange}
                      className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                  <label
                      htmlFor='proofPayment'
                      className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20'
                  >
                      Choose file
                  </label>
                  <label className='text-white ml-2'>{proofPayment}</label>
              </div>
              <label className='block text-white'>Student ID (all members)</label>
              <label className='block text-white mb-2'>File name: Team Name_Leader Name_Proof of Student Card</label>
              <div className='my-4 relative'>
                <input
                      type='file'
                      id='studentIds'
                      name='studentIds'
                      onChange={handleChange}
                      className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                  <label
                      htmlFor='studentIds'
                      className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20'
                  >
                      Choose file
                  </label>
                  <label className='text-white ml-2'>{studentIds}</label>
              </div>
              <label className='block text-white'>Proof of following @sxcintersummit & @sxcintersummitcompetition (all members)</label>
              <label className='block text-white mb-2'>File name: Team Name_Leader Name_Proof of Follow</label>
              <div className='my-4 relative'>
                <input
                      type='file'
                      id='proofFollow'
                      name='proofFollow'
                      onChange={handleChange}
                      className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                  <label
                      htmlFor='proofFollow'
                      className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20'
                  >
                      Choose file
                  </label>
                  <label className='text-white ml-2'>{proofFollow}</label>
              </div>
              <label className='block text-white'>Proof of twibbon post (all members)</label>
              <label className='block text-white mb-2'>File name: Team Name_Leader Name_Proof of Twibbon</label>
              <div className='my-4 relative'>
                <input
                      type='file'
                      id='proofTwibbon'
                      name='proofTwibbon'
                      onChange={handleChange}
                      className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                  <label
                      htmlFor='proofTwibbon'
                      className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20'
                  >
                      Choose file
                  </label>
                  <label className='text-white ml-2'>{proofTwibbon}</label>
              </div>
              <label className='block text-white'>Proof of sharing Instagram story posters (all members)</label>
              <label className='block text-white mb-2'>File name: Team Name_Leader Name_Proof of Instastory</label>
              <div className='my-4 relative'>
                <input
                      type='file'
                      id='proofStory'
                      name='proofStory'
                      onChange={handleChange}
                      className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                  <label
                      htmlFor='proofStory'
                      className='bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20'
                  >
                      Choose file
                  </label>
                  <label className='text-white ml-2'>{proofStory}</label>
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
}
const Member1Data = ({ formData, setFormData, onPrevious, onSubmit, onAddMember, sanitizeInput, member2Data }) => {

  const [ fullName, setFullName ] = useState(formData.fullName ?? "");
  const [ gender, setGender ] = useState(formData.gender ?? "");
  const [ school, setSchool ] = useState(formData.school ?? "");
  const [ phoneNumber, setPhoneNumber ] = useState(formData.phoneNumber ?? "+62");
  const [ email, setEmail ] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = () => {
    if (checkAllFilled()) {
        if (!emailError && !phoneError) {
            formData = {
                ...formData,
                fullName: sanitizeInput(fullName),
                gender: sanitizeInput(gender),
                email: email,
                phoneNumber: phoneNumber,
                school: sanitizeInput(school),
            }
            setFormData(formData);
        }
    }  
  };

  const checkAllFilled = () => {
    if (fullName && gender && email && phoneNumber && school
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

  return (
    <div>
      <Navbar/>
      <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
        <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
          <h1 className='text-3xl font-bold text-white mb-4'>Member 1 Data</h1>
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
                  <label className='block text-white mb-2' htmlFor='fullName'>School</label>
                  <input
                      type='text'
                      id='school'
                      name='school'
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
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
              {
                !member2Data.fullName && 
                  <button
                  type='button'
                  onClick={() => {
                    handleSubmit();
                    onAddMember();
                  }}
                  className='bg-primary-3 text-white px-6 py-2 mr-6 rounded-full'
                  disabled={emailError || phoneError}
                >
                  Add Member
                </button>              
              }
              {
                member2Data.fullName ?
                <button
                type='button'
                onClick={() => {
                  handleSubmit();
                  onAddMember();
                }}
                className='bg-primary-3 text-white px-6 py-2 rounded-full'
                disabled={emailError || phoneError}
              >
                Next
              </button>  
              :
              <button
              type='button'
              onClick={() => {
                handleSubmit();
                onSubmit();
              }}
              className='bg-primary-3 text-white px-6 py-2 rounded-full'
              disabled={emailError || phoneError}
            >
              Submit
          </button> 

              }
            </div>
        </div>
      </div>
    </div>
  );
}

const Member2Data = ({ formData, setFormData, onPrevious, onNext, sanitizeInput }) => {

  const [ fullName, setFullName ] = useState(formData.fullName ?? "");
  const [ gender, setGender ] = useState(formData.gender ?? "");
  const [ school, setSchool ] = useState(formData.school ?? "");
  const [ phoneNumber, setPhoneNumber ] = useState(formData.phoneNumber ?? "+62");
  const [ email, setEmail ] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = () => {
    if (checkAllFilled()) {
        if (!emailError && !phoneError) {
            formData = {
                ...formData,
                fullName: sanitizeInput(fullName),
                gender: sanitizeInput(gender),
                email: email,
                phoneNumber: phoneNumber,
                school: sanitizeInput(school),
            }
            setFormData(formData);
            onNext();
        }
    }  
  };

  const checkAllFilled = () => {
    if (fullName && gender && email && phoneNumber && school
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

  return (
    <div>
      <Navbar/>
      <div className='bg-gradient-primary w-full min-h-screen flex items-center justify-center'>
        <div className='bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl'>
          <h1 className='text-3xl font-bold text-white mb-4'>Member 2 Data</h1>
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
                  <label className='block text-white mb-2' htmlFor='fullName'>School</label>
                  <input
                      type='text'
                      id='school'
                      name='school'
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
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
}

const Summary = ({ formData, members, setCurrentView }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await registerTeam(formData);
      if (response.team.id) {
          for (const member of members) {
            if (member.fullName) {
              console.log("posting member...",member);
                const memberData = {
                  teamId: response.team.id,
                  fullname: member.fullName,
                  email: member.email,
                  school: member.school,
                  phoneNumber: member.phoneNumber
                };
              try {
                await registerMember(memberData);
                console.log("posted member");
                setIsLoading(false);
                navigate(USER_DASHBOARD_PAGE);
                {/*INSERT SUCCESS ALERT*/}
              } catch (memberError) {
                console.log("Error posting member: ", memberError);
                setIsLoading(false);
                {/*INSERT ERROR ALERT*/}
              }
            }
          }
      }
    } catch (error) {
      console.log("Error registering team: ", error);
      setIsLoading(false);
      {/*INSERT ERROR ALERT*/}
    }
  }

  const registerTeam = async (data) => {
    try {
      const response = await postNewFceoTeam(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const registerMember = async (data) => {
    try {
      console.log("in registerMember");
      console.log("data ", data);

      const response = await postNewFceoMember(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onPrevious = () => {
    if (members.length === 2) {
      setCurrentView((prev) => prev - 1);
    } else {
      setCurrentView((prev) => prev - 2);
    }
  }

  const editData = (index) => {
    switch (index) {
      case 0:
        setCurrentView(1);
        return;
      case 1:
        setCurrentView(2);
        return;
      case 2:
        setCurrentView(3);
        return;
      default:
        return;
    }
  }


  return (
    <div>
      <Navbar />
      <div className='bg-gradient-primary w-full min-h-screen flex justify-center p-4 text-white'>
        { isLoading ? <Spinner customStyles={{ margin: "2rem 0" }} /> :
        <div className='rounded-lg shadow-lg p-4 bg-opacity-25'>
        <h1 className='text-xl font-semibold mb-2 text-center'>Submitted Data</h1>
              <div className='mb-4 p-4 rounded-lg shadow-lg bg-primary-700 hover:bg-primary-600 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer'
              onClick={()=>{editData(0);}}
              >
                 <p className='text-lg font-semibold mt-2'>
                  Team Data</p>
                  <p><strong>Team Name:</strong> {formData.teamName}</p>
                  <p><strong>Student IDs:</strong> {formData.studentIds.name}</p>
                  <p><strong>Proof of Following Instagram:</strong> {formData.proofFollow.name}</p>
                  <p><strong>Proof of Twibbon Post:</strong> {formData.proofTwibbon.name}</p>
                  <p><strong>Proof of Sharing Instagram Story Posters:</strong> {formData.proofStory.name}</p>
                  <p className='text-lg font-semibold mt-2'>
                    Team Leader</p>
                  <p><strong>Full Name:</strong> {formData.fullName}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>School:</strong> {formData.school}</p>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
              </div>
              {members.map((member, index) => (
                member.fullName &&
                  <div key={index} 
                  className='mb-4 p-4 rounded-lg shadow-lg bg-primary-700 hover:bg-primary-600 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer'
                  onClick={()=>{editData(index + 1);}}
                  >
                      <p className='text-lg font-semibold mb-2'
                      
                      >Member {index + 1}</p>
                      <p><strong>Full Name:</strong> {member.fullName}</p>
                      <p><strong>Gender:</strong> {member.gender}</p>
                      <p><strong>School:</strong> {member.school}</p>
                      <p><strong>Phone:</strong> {member.phoneNumber}</p>
                      <p><strong>Email:</strong> {member.email}</p>
                  </div>
              ))}

              <div className='mt-6 mb-2 flex justify-center items-center'>
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
                      Submit
              </button>
            </div>
        </div>
        }
      </div>
    </div>
  );
}

const EventCard = () => {
  const [ currentView, setCurrentView ] = useState(1);

  const [ formData, setFormData ] = useState({});
  const [ member1Data, setMember1Data ] = useState({});
  const [ member2Data, setMember2Data ] = useState({});

  const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z\s]/g, "");
  };

  const handleNext = (count) => {
        setCurrentView(prevView => prevView + 1);
  };

  const handlePrevious = () => {
      setCurrentView(prevView => prevView - 1);
  };

  switch (currentView) {
    case 1:
      return <FirstView formData={formData} setFormData={setFormData} onNext={handleNext} sanitizeInput={sanitizeInput}/>;
    case 2:
      return <Member1Data formData={member1Data} setFormData={setMember1Data} member2Data={member2Data} onSubmit={()=>{setCurrentView(4)}} onAddMember={handleNext} onPrevious={handlePrevious} sanitizeInput={sanitizeInput}/>;
    case 3: 
      return <Member2Data formData={member2Data} setFormData={setMember2Data} onNext={handleNext} onPrevious={handlePrevious} sanitizeInput={sanitizeInput}/>;
    case 4:
      return <Summary formData={formData} members={[member1Data, member2Data]} setCurrentView={setCurrentView}/>
    default:
      return <FirstView formData={formData} setFormData={setFormData} onNext={handleNext} sanitizeInput={sanitizeInput}/>;
  }
}

export default EventCard;
