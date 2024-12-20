import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Spinner from "../../components/elements/spinner";
import ReferralModal from "../../components/referral-modal";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { USER_DASHBOARD_PAGE, USER_DETAILS_PAGE } from "../../constants/routes";
import { postNewFceoMember, postNewFceoTeam } from "../../service/services";
import { errorAlert, successAlert } from "../../components/alert";

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
    setSchool(profileData?.institution);
  }, [profileData]);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState(formData.teamName ?? "");
  const [region, setRegion] = useState(formData.region ?? "");
  const [members, setMembers] = useState(3);
  const [studentIds, setStudentIds] = useState(formData.studentIds?.name ?? "");
  const [proofFollow, setProofFollow] = useState(
    formData.proofFollow?.name ?? ""
  );
  const [proofTwibbon, setProofTwibbon] = useState(
    formData.proofTwibbon?.name ?? ""
  );
  const [proofStory, setProofStory] = useState(formData.proofStory?.name ?? "");
  const [proofPayment, setProofPayment] = useState(
    formData.proofPayment?.name ?? ""
  );

  //REFERRAL & PAYMENT DATA
  const {
    regularPrice,
    bankAccount,
    bank,
    recipient,
    earlyBirdPrice,
    referralPrice
  } = eventData;
  const [verifiedRefCode, setVerifiedRefCode] = useState(
    formData.referralCode ?? null
  );
  const [refCodeValid, setRefCodeValid] = useState(
    formData.referralCode ? true : false
  );

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [verifiedRefCode]);

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
          region: sanitizeInput(region),
          members: 3,
        };
        setFormData(formData);
        onNext();
      }
    } else {
    }
  };

  //saving referral code
  useEffect(() => {
    setFormData({
      ...formData,
      referralCode: verifiedRefCode,
    });
  }, [verifiedRefCode]);

  const checkAllFilled = () => {
    if (
      proofPayment &&
      fullName &&
      gender &&
      email &&
      phoneNumber &&
      school &&
      teamName &&
      region &&
      members &&
      studentIds &&
      proofFollow &&
      proofTwibbon &&
      proofStory
    ) {
      return true;
    }
    errorAlert({ message: "All fields are required" });
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
    if (name === "studentIds") {
      setStudentIds(file.name);
    } else if (name === "proofFollow") {
      setProofFollow(file.name);
    } else if (name === "proofTwibbon") {
      setProofTwibbon(file.name);
    } else if (name === "proofStory") {
      setProofStory(file.name);
    } else if (name === "proofPayment") {
      setProofPayment(file.name);
    }
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

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 text-center py-8">
        <h1 className="text-3xl font-bold text-white">FCEO Registration</h1>
      </div>
      <div className="bg-primary-1 lg:space-x-8 lg:gap-y-4 lg:px-16 min-h-screen grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 w-fit mx-auto p-4 pt-0 text-center">
          <div className="mb-4 p-8 bg-primary-4 text-white rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-2">Registration Fee</h1>
            <p className="mb-2 text-center text-sm">
              Please pay the following amount to complete your registration
            </p>

            {refCodeValid && verifiedRefCode === "JUARAFCEO1" ? (
                                <>
                                <div className="pb-4">
                                  <span className="line-through text-gray-400 text-[18px] ">
                                    IDR {earlyBirdPrice.toLocaleString()}
                                  </span>
                                </div>
                                <span className="ml-2 bg-primary-3 px-2 py-1 rounded-md shadow-sm">
                                  IDR 0
                                </span>
                              </>
            ) : <></>
            }
            {refCodeValid && verifiedRefCode === "FUTURECEO50" ? (
                                <>
                                <div className="pb-4">
                                  <span className="line-through text-gray-400 text-[18px] ">
                                    IDR {earlyBirdPrice.toLocaleString()}
                                  </span>
                                </div>
                                <span className="ml-2 bg-primary-3 px-2 py-1 rounded-md shadow-sm">
                                  IDR 40,000
                                </span>
                              </>
            ) : <></>
            }
            {verifiedRefCode && refCodeValid && !(verifiedRefCode === "FUTURECEO50") && !(verifiedRefCode === "JUARAFCEO1") ? (
                  <>
                  <div className="pb-4">
                    <span className="line-through text-gray-400 text-[18px] ">
                      IDR {earlyBirdPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="ml-2 bg-primary-3 px-2 py-1 rounded-md shadow-sm">
                    IDR {referralPrice.toLocaleString()}
                  </span>
                </>
                ) : (
                 <></>
            )}
            {!verifiedRefCode && !refCodeValid ? (
                <>
                <div className="pb-4">
                  <span className="line-through text-gray-400 text-[18px] ">
                    IDR {regularPrice.toLocaleString()}
                  </span>
                </div>
                <span className="ml-2 bg-primary-3 px-2 py-1 rounded-md shadow-sm">
                  IDR {earlyBirdPrice.toLocaleString()}
                </span>
                </>
                ) : (
                 <></>
            )}

            

            <p className="text-sm mt-4">
              {verifiedRefCode && refCodeValid && "Referral discount applied"}
            </p>
          </div>

          <div className="text-white bg-primary-4 rounded-lg shadow-lg p-8 text-left">
            <p className="text-xl text-center">
              <strong>Transfer to</strong>
            </p>
            <div className="text-sm mt-2 w-fit mx-auto text-center">
              <p>
                <strong>{bankAccount}</strong> - {bank}
              </p>
              <p>{recipient}</p>
            </div>
            <div className="text-sm mt-4 w-fit mx-auto text-center">
              <p>
                <strong>{eventData.bankAccount_2}</strong> - {eventData.bank_2}
              </p>
              <p>{eventData.recipient_2}</p>
            </div>
          </div>

          <div className="bg-primary-4 mt-4 rounded-lg">
            <ReferralModal
              eventName="fceo"
              referralCode={formData.referralCode ?? ""}
              verifiedRefCode={verifiedRefCode}
              setVerifiedRefCode={setVerifiedRefCode}
              setRefCodeValid={setRefCodeValid}
            />
          </div>
        </div>

        <div className="bg-dark-2 col-span-2 p-4 px-8 md:py-8 md:px-16 lg:p-0 lg:w-full rounded-lg lg:shadow-lg text-center">
          <form className="text-left">
            <h1 className="text-lg font-bold text-white">Leader Data</h1>
            <p className="text-white font-bold mb-2">
              You can edit your personal information
              <Link to={USER_DETAILS_PAGE} className="text-yellow-500">
                {" "}
                here
              </Link>
            </p>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                disabled={true}
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
                disabled={true}
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
                disabled={true}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 rounded-lg"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                disabled={true}
                onChange={handlePhoneNumberChange}
                onBlur={formatPhoneNumber}
                className="w-full px-3 py-2 rounded-lg"
              />
              {phoneError && <p className="text-yellow-500">{phoneError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                School
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={school}
                disabled={true}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <h1 className="text-lg font-bold text-white mt-10">Team Data</h1>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="teamName">
                Team name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="region">
                Region
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4 hidden">
              <label className="block text-white mb-2" htmlFor="selectMembers">
                Number of members
              </label>
              <select
                id="selectMembers"
                name="selectMembers"
                className="w-full px-3 py-2 rounded-lg"
                onChange={(e) => {
                  setMembers(e.target.value);
                }}
                value={members}
              >
                <option value="" disabled>
                  Select number of members
                </option>
                <option value="2" disabled>
                  2
                </option>
                <option value="3">3</option>
              </select>
            </div>
            <h1 className="text-lg font-bold text-white mt-10">Uploads</h1>
            <label className="block text-white">
              Combine files of <strong>ALL MEMBERS</strong> into 1 PDF file
            </label>
            <label className="block text-white mb-4">
              File size has to be less than 2MB
            </label>
            <label className="block text-white">
              Proof of Payment
              <p className="text-sm text-gray-400">
                  If you get school partner registration flow, just screenshot the reffcode result
                </p>
            </label>
            
            <div className="my-4 w-fit flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
                <input
                  type="file"
                  id="proofPayment"
                  name="proofPayment"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="proofPayment"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <div className="text-sm text-white ml-2 max-w-full">
                {proofPayment}
              </div>
            </div>
            <p className="block text-white">Student ID (all members)</p>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
                <input
                  type="file"
                  id="studentIds"
                  name="studentIds"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="studentIds"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <p className="text-sm text-white ml-2 block">{studentIds}</p>
            </div>
            <label className="block text-white">
              Proof of following @sxcintersummit & @sxcintersummitcompetition on
              IG (all members)
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
                <input
                  type="file"
                  id="proofFollow"
                  name="proofFollow"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="proofFollow"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <label className="text-sm text-white ml-2">{proofFollow}</label>
            </div>
            <label className="block text-white">
              Proof of Twibbon post (all members)
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
                <input
                  type="file"
                  id="proofTwibbon"
                  name="proofTwibbon"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="proofTwibbon"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <label className="text-sm text-white ml-2">{proofTwibbon}</label>
            </div>
            <label className="block text-white">
              Proof of sharing Instagram story posters (all members)
            </label>
            <div className="my-4 max-w-full flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
                <input
                  type="file"
                  id="proofStory"
                  name="proofStory"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="proofStory"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                  Choose file
                </label>
              </div>
              <label className="text-sm text-white ml-2">{proofStory}</label>
            </div>
          </form>
          <div className="mt-6 w-fit py-4 ml-auto">
            <button
              type="button"
              onClick={handleSubmit}
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
const Member1Data = ({
  members,
  formData,
  setFormData,
  onPrevious,
  goToSummary,
  goToNext,
  sanitizeInput,
}) => {
  const [fullName, setFullName] = useState(formData.fullName ?? "");
  const [gender, setGender] = useState(formData.gender ?? "");
  const [school, setSchool] = useState(formData.school ?? "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? "+62");
  const [email, setEmail] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        };
        setFormData(formData);
      }

      goToNext();
    } else {
      errorAlert({ message: "All fields must be filled" });
    }
  };

  const checkAllFilled = () => {
    if (fullName && gender && school && phoneNumber && email) {
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
          <h1 className="text-3xl font-bold text-white mb-4">Member 1 Data</h1>
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
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                School
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
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
  onNext,
  sanitizeInput,
}) => {
  const [fullName, setFullName] = useState(formData.fullName ?? "");
  const [gender, setGender] = useState(formData.gender ?? "");
  const [school, setSchool] = useState(formData.school ?? "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? "+62");
  const [email, setEmail] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (saveData()) {
      onNext();
    }
  };

  const handleBack = () => {
    if (saveData()) {
      onPrevious();
    }
  };

  const saveData = () => {
    if (checkAllFilled()) {
      if (!emailError && !phoneError) {
        formData = {
          ...formData,
          fullName: sanitizeInput(fullName),
          gender: sanitizeInput(gender),
          email: email,
          phoneNumber: phoneNumber,
          school: sanitizeInput(school),
        };
        setFormData(formData);
        return true;
      }
    }
    errorAlert({ message: "All fields must be filled" });
    return false;
  };

  const checkAllFilled = () => {
    if (fullName && gender && email && phoneNumber && school) {
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
        <div className="bg-primary-1 sm:bg-primary-4 p-8 rounded-lg sm:shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Member 2 Data</h1>
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
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                School
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="text-white px-6 py-2 rounded-full hover:text-gradient"
              disabled={fullName && (emailError || phoneError)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = ({
  eventData,
  formData,
  numberOfMembers,
  member1Data,
  member2Data,
  setCurrentView,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setRegisteredCompetitions } = useUser();
  const membersData = [member1Data, member2Data];

  const { fceoId } = eventData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await registerTeam(formData);
      if (response.team.id) {
        let memberCounter = 1;
        for (const member of membersData) {
          if (member.fullName) {
            const memberData = {
              teamId: response.team.id,
              fullname: member.fullName,
              gender: member.gender,
              email: member.email,
              school: member.school,
              phoneNumber: member.phoneNumber,
            };
            try {
              await registerMember(memberData);
              memberCounter++;
              if (memberCounter === numberOfMembers) {
                setIsLoading(false);
                //Add this activeTab state for competition registrations
                //because user-dashboard opens "events" by default
                navigate(USER_DASHBOARD_PAGE, {
                  state: {
                    activeTab: "competitions",
                  },
                });
                setRegisteredCompetitions((prevData) => [...prevData, fceoId]);
                successAlert({
                  title: "Successfully registered for FCEO!",
                  message:
                    "Please check your email and user dashboard for further details.",
                });
              }
            } catch (memberError) {
              setIsLoading(false);
              errorAlert({
                message: "Something went wrong. Please try again",
              });
              navigate(-1);
            }
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert({
        message: "Something went wrong. Please try to register again.",
      });
      navigate(-1);
    }
  };

  const registerTeam = async (data) => {
    try {
      const response = await postNewFceoTeam(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerMember = async (data) => {
    try {
      const response = await postNewFceoMember(data);
    } catch (error) {
      throw error;
    }
  };

  const onPrevious = () => {
    setCurrentView((prev) => prev - 1);
  };

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
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex justify-center p-4 text-white">
        {isLoading ? (
          <>
            <Spinner
              customStyles={{ margin: "2rem 0" }}
              text="Uploading files... Please don't leave the page"
              longText="This might take a while..."
            />
          </>
        ) : (
          <div className="rounded-lg shadow-lg p-4 bg-opacity-25">
            <h1 className="text-xl font-semibold mb-2 text-center">
              Your Registration
            </h1>
            <div
              className="mb-4 p-4 text-sm md:text-base rounded-lg shadow-lg bg-primary-4 hover:bg-primary-600 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                editData(0);
              }}
            >
              <p className="text-base md:text-lg font-semibold mt-2">
                Team Data
              </p>
              <p>
                <strong>Team Name:</strong> {formData.teamName}
              </p>
              <p>
                <strong>Region:</strong> {formData.region}
              </p>
              <p>
                <strong>Student IDs:</strong> {formData.studentIds.name}
              </p>
              <p>
                <strong>Proof of Following Instagram:</strong>{" "}
                {formData.proofFollow.name}
              </p>
              <p>
                <strong>Proof of Twibbon Post:</strong>{" "}
                {formData.proofTwibbon.name}
              </p>
              <p>
                <strong>Proof of Sharing Instagram Story Posters:</strong>{" "}
                {formData.proofStory.name}
              </p>
              <p className="text-base md:text-lg font-semibold mt-2">
                Team Leader
              </p>
              <p>
                <strong>Full Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Gender:</strong> {formData.gender}
              </p>
              <p>
                <strong>School:</strong> {formData.school}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              {formData.referralCode && (
                <>
                  <p className="text-base md:text-lg font-semibold mt-2">
                    Referral Code
                  </p>
                  {formData.referralCode}
                </>
              )}
            </div>
            {membersData.map(
              (member, index) =>
                member.fullName && (
                  <div
                    key={index}
                    className="mb-4 p-4 rounded-lg text-sm md:text-base shadow-lg bg-primary-4 hover:bg-primary-600 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                    onClick={() => {
                      editData(index + 1);
                    }}
                  >
                    <p className="text-base md:text-lg font-semibold mb-2">
                      Member {index + 1}
                    </p>
                    <p>
                      <strong>Full Name:</strong> {member.fullName}
                    </p>
                    <p>
                      <strong>Gender:</strong> {member.gender}
                    </p>
                    <p>
                      <strong>School:</strong> {member.school}
                    </p>
                    <p>
                      <strong>Phone:</strong> {member.phoneNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {member.email}
                    </p>
                  </div>
                )
            )}

            <div className="mt-6 mb-2 flex justify-center items-center">
              <button
                type="button"
                onClick={onPrevious}
                className="bg-primary-3 text-white px-6 py-2 mr-6 hover:bg-yellow-600 transition duration-300 rounded-full"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-primary-3 text-white px-6 py-2 hover:bg-yellow-600 transition duration-300 rounded-full"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = () => {
  const [currentView, setCurrentView] = useState(1);

  const [formData, setFormData] = useState({});
  const [member1Data, setMember1Data] = useState({});
  const [member2Data, setMember2Data] = useState({});

  const eventData = {
    fceoId: 1,
    bankAccount: "000427101697",
    bank: "blu by BCA DIGITAL",
    recipient: "CLAIRINE SABATINI NAYOAN",
    bankAccount_2: "085959773266",
    bank_2: "GoPay",
    recipient_2: "DIVO AZRIEL HAKIM",
    regularPrice: 110000,
    referralPrice: 40000,
    earlyBirdPrice: 40000,
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z\s]/g, "");
  };

  const handleNext = (view) => {
    if (view) {
      setCurrentView(() => view);
    } else {
      setCurrentView((prevView) => prevView + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentView((prevView) => prevView - 1);
  };

  switch (currentView) {
    case 1:
      return (
        <FirstView
          eventData={eventData}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          sanitizeInput={sanitizeInput}
        />
      );
    case 2:
      return (
        <Member1Data
          formData={member1Data}
          setFormData={setMember1Data}
          members={formData.members}
          member2Data={member2Data}
          goToNext={() => {
            setCurrentView(3);
          }}
          goToSummary={() => setCurrentView(4)}
          onPrevious={handlePrevious}
          sanitizeInput={sanitizeInput}
        />
      );
    case 3:
      return (
        <Member2Data
          formData={member2Data}
          members={formData.members}
          setFormData={setMember2Data}
          onNext={handleNext}
          onPrevious={handlePrevious}
          sanitizeInput={sanitizeInput}
        />
      );
    case 4:
      return (
        <Summary
          eventData={eventData}
          formData={formData}
          numberOfMembers={formData.members}
          member1Data={member1Data}
          member2Data={member2Data}
          setCurrentView={setCurrentView}
        />
      );
    default:
      return (
        <FirstView
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          sanitizeInput={sanitizeInput}
        />
      );
  }
};

export default EventCard;
