import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import { useNavigate, Link } from "react-router-dom";
import {
  EVENTS_PAGE,
  HOME,
  LANDING_PAGE,
  USER_DASHBOARD_PAGE,
  USER_DETAILS_PAGE,
} from "../../constants/routes";
import { postChambersRegistration } from "../../service/services";
import Spinner from "../../components/elements/spinner";
import ReferralModal from "../../components/referral-modal";
import { errorAlert, successAlert } from "../../components/alert";

// User Profile Name, etc
const FirstView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {
  const { profileData } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [industryError, setIndustryError] = useState("");

  const industries = ["StartUp", "BUMN", "FMCG", "Consulting"];

  const checkAllFilled = () => {
    if (
      fullName &&
      gender &&
      email &&
      phoneNumber &&
      university &&
      major &&
      batch &&
      selectedIndustries.length >= 2
    ) {
      return true;
    }
    errorAlert({
      message: "All fields must be filled and select at least 2 industries",
    });
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

  const handleIndustryChange = (e) => {
    const { value } = e.target;
    let updatedIndustries = [...selectedIndustries];

    if (selectedIndustries.includes(value)) {
      updatedIndustries = updatedIndustries.filter(
        (industry) => industry !== value
      );
    } else {
      updatedIndustries.push(value);
    }

    setSelectedIndustries(updatedIndustries);

    if (updatedIndustries.length < 2) {
      setIndustryError("Please select at least 2 industries");
    } else {
      setIndustryError("");
    }
  };

  const handleSubmit = () => {
    if (checkAllFilled()) {
      if (!emailError && !phoneError && !industryError) {
        formData = {
          ...formData,
          // fullName: sanitizeInput(fullName),
          // gender: sanitizeInput(gender),
          // email: email,
          // phoneNumber: phoneNumber,
          // university: sanitizeInput(university),
          // major: sanitizeInput(major),
          // batch: batch,
          industryType: selectedIndustries,
        };
        setFormData(formData);
        onNext();
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 my-8 rounded-xl shadow-lg max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient text-center mb-2">
            Personal Information
          </h1>
          <p className="text-white text-center font-bold mb-6">
            You can edit your personal information
            <Link to={USER_DETAILS_PAGE} className="text-yellow-500">
              {" "}
              here
            </Link>
          </p>
          <div className="my-2 px-4">
            <label className="block text-white mb-2" htmlFor="fullName">
              Full Name
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-left">
            <div className="mb-4 md:w-80">
              <label className="block text-white mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                disabled={true}
                onBlur={formatPhoneNumber}
                className="w-full px-3 py-2 rounded-lg"
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Institution
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                disabled={true}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Major
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                disabled={true}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="fullName">
                Batch
              </label>
              <input
                type="text"
                id="batch"
                name="batch"
                value={batch}
                disabled={true}
                onChange={(e) =>
                  setBatch(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Multiple Choice for Industry Selection */}
          <div className="my-4 px-4">
            <label className="block text-white mb-2" htmlFor="industries">
              Which 2 industries will you join? (choose at least 2)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center">
                  <input
                    type="checkbox"
                    id={industry}
                    name={industry}
                    value={industry}
                    checked={selectedIndustries.includes(industry)}
                    onChange={handleIndustryChange}
                    className="mr-2"
                  />
                  <label htmlFor={industry} className="text-white">
                    {industry}
                  </label>
                </div>
              ))}
            </div>
            {industryError && <p className="text-red-500">{industryError}</p>}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white px-6 py-2 mr-6 rounded-full hover:text-gradient"
            >
              Back
            </button>
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

const SecondView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [experience, setExperience] = useState(formData.experience ?? "");
  const [charCount, setCharCount] = useState(formData.experience?.length ?? 0);

  const checkAllFilled = () => {
    if (experience) {
      return true;
    }
    errorAlert({ message: "Field must be filled" });
    return false;
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

  const saveData = () => {
    setFormData({
      ...formData,
      registerReason: sanitizeInput(experience),
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Why do you want to register for this webinar?
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

// 10. What do you expect by attending this webinar? --> name="expectations"
const ThirdView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expectations, setExpectations] = useState(formData.expectations ?? "");
  const [charCount, setCharCount] = useState(
    formData.expectations?.length ?? 0
  );

  const checkAllFilled = () => {
    if (expectations) {
      return true;
    }
    errorAlert({ message: "Field must be filled" });
    return false;
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

  const saveData = () => {
    setFormData({
      ...formData,
      attendingExpectation: sanitizeInput(expectations),
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 m-8 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What do you expect by attending this webinar?
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="expectations"
                value={expectations}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setExpectations(e.target.value);
                    setCharCount(e.target.value.length);
                  }
                }}
                className="w-full h-40 px-3 py-2 rounded-lg"
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

const FourthView = ({
  formData,
  setFormData,
  checkFileSize,
  checkFileType,
  onPrevious,
  onNext,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [follow1, setFollow1] = useState(formData.screenshot1 ? true : false);
  const [follow2, setFollow2] = useState(formData.screenshot2 ? true : false);
  const [follow3, setFollow3] = useState(formData.screenshot3 ? true : false);
  const [cv, setCV] = useState(formData.cv?.name ?? "");

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
      follow3 &&
      cv
    ) {
      onNext();
    } else {
      errorAlert({ message: "All proofs must be uploaded" });
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!checkFileSize(file)) {
      return;
    }

    if (!checkFileType(file)) {
      return;
    }

    // Update the correct proof field based on the input field name
    setFormData((prevState) => {
      const updatedFormData = { ...prevState };

      if (name === "screenshot1") {
        updatedFormData.proofOfFollow = file;
        setScreenshot1(file.name);
      } else if (name === "screenshot2") {
        updatedFormData.proofOfStory = file;
        setScreenshot2(file.name);
      } else if (name === "screenshot3") {
        updatedFormData.proofOfBroadcast = file;
        setScreenshot3(file.name);
      } else if (name === "cv") {
        updatedFormData.cv = file;
        setCV(file.name);
      }

      return updatedFormData;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-xl rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Connect with us!
          </h1>
          <form className="text-left">
            {/* setiap selesai chekck list harus upload gambar  */}
            <div className="mb-4">
              <label className="block text-white mb-2">
                <input
                  type="checkbox"
                  name="follow1"
                  checked={follow1}
                  onChange={(e) => setFollow1(e.target.checked)}
                  className="mr-2"
                />
                I have followed{" "}
                <strong>
                  @studentsxceosjkt, @sxcintersummit, @sxcintersummitcompetition
                </strong>{" "}
                on Instagram
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot1"
                  name="screenshot1"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="screenshot1"
                  className="text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer"
                >
                  Submit screenshot
                </label>
                <label className="text-sm md:text-base text-white ml-2">
                  {screenshot1}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">
                <input
                  type="checkbox"
                  name="follow2"
                  checked={follow2}
                  onChange={(e) => setFollow2(e.target.checked)}
                  className="mr-2"
                />
                I have reposted Chambers Poster Feed to Instagram Story
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot2"
                  name="screenshot2"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="screenshot2"
                  className="text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer"
                >
                  Submit screenshot
                </label>
                <label className="text-sm md:text-base text-white ml-2">
                  {screenshot2}
                </label>
              </div>
            </div>
            <div className="">
              <label className="block text-white">
                <input
                  type="checkbox"
                  name="follow3"
                  checked={follow3}
                  onChange={(e) => setFollow3(e.target.checked)}
                  className="mr-2"
                />
                I have share Chambers poster to 3 groups
              </label>
            </div>
            <div className="flex gap-3">
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot3"
                  name="screenshot3"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="screenshot3"
                  className="text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer"
                >
                  Submit screenshot
                </label>
                <label className="text-sm md:text-base text-white ml-2">
                  {screenshot3}
                </label>
              </div>
            </div>

            {/* CV Upload */}
            <div className="">
              <label className="block text-white mb-2">
                <input
                  type="checkbox"
                  name="cv"
                  checked={cv}
                  onChange={(e) => setCV(e.target.checked)}
                  className="mr-2"
                />
                I have uploaded CV
                <p className="text-sm text-gray-400">
                  If you are lucky, it will be reviewed in a unique session!
                </p>
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="cv"
                  className="text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer"
                >
                  Submit CV
                </label>
                <label className="text-sm md:text-base text-white ml-2">
                  {cv}
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={onPrevious}
                className="text-white px-6 py-2 mr-6 hover:text-gradient"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white px-6 py-2 hover:text-gradient"
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setRegisteredEvents, profileData } = useUser();

  let chambersId; //FOR REGISTER BUTTON PURPOSES

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await postChambersRegistration(formData);
      setIsLoading(false);
      if (response.status === 200) {
        navigate(USER_DASHBOARD_PAGE);
        setRegisteredEvents((prevData) => [...prevData, chambersId]);
        successAlert({
          eventId: "event_5",
          message:
            "Successfully registered for Chambers. Please check your email for further details!",
        });
      }
    } catch (error) {
      errorAlert({ message: "Oh no, something happened. Please try again!" });
      // navigate(HOME);
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
              <p className="text-xl sm:text-3xl text-gradient font-bold mb-2">
                Chambers Registration Form
              </p>
              <p className="text-sm text-center font-semibold mb-2">
                Please make sure all data is correct before submitting
              </p>
              <div className="grid max-w-full grid-cols-2 gap-x-8 md:gap-x-0 text-sm md:text-base">
                <strong>Full Name</strong>
                <p>{profileData.fullname}</p>
                <strong>Gender</strong>
                <p>{profileData.gender}</p>
                <strong>Institution</strong>
                <p>{profileData.institution}</p>
                <strong>Major</strong>
                <p>{profileData.major}</p>
                <strong>Batch</strong>
                <p>{profileData.batch}</p>
                <strong>Phone</strong>
                <p>{profileData.phoneNumber}</p>
                <strong>Email</strong>
                <p>{profileData.email}</p>
                <strong>Selected Industries</strong>
                <ul className="list-disc list-inside">
                  {formData.industryType.map((industry, index) => (
                    <li key={index}>{industry}</li>
                  ))}
                </ul>
              </div>
              <div className="max-w-sm w-full text-sm md:max-w-full md:text-base">
                <div className="border-t border-gray-300 my-4"></div>
                {formData.registerReason ? (
                  <>
                    <strong>
                      Why do you want to register for this webinar?
                    </strong>
                    <p>{formData.registerReason}</p>
                  </>
                ) : (
                  ""
                )}

                <strong>What do you expect by attending this webinar?</strong>
                <p>{formData.attendingExpectation}</p>
                <div className="border-t border-gray-300 my-4"></div>
                <p>
                  <strong>Proof of following our Instagram:</strong>{" "}
                  {formData.proofOfFollow.name}
                </p>
                <p>
                  <strong>Proof of reposting Chambers poster:</strong>{" "}
                  {formData.proofOfStory.name}
                </p>
                <p>
                  <strong>Proof of share poster to 3 groups:</strong>{" "}
                  {formData.proofOfBroadcast.name}
                </p>
                <p>
                  <strong>CV :</strong> {formData.cv.name}
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
    description:
      "</br>&emsp;<strong>1.&emsp;Business Plan Competition Class</strong>" +
      "</br>This session will specifically cover Business Plan Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business plan competition" +
      "</br>&emsp;<strong>2.&emsp;Business Case Competition Class</strong>" +
      "</br>This session will specifically cover Business Class Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business case competition",
    chambersId: 5,
    regularPrice: 0,
    discountedPrice: 0,
    discount: 0,
    bankAccount: "",
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
  };

  const checkFileTypeImage = (file) => {
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf") {
      return true;
    }
    const message = "File has to be jpg, jpeg, png, or pdf";
    errorAlert({ message: message });
    return false;
  };

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
      return (
        <FirstView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInput}
          onNext={handleNext}
        />
      );
    case 2:
      return (
        <SecondView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInputParagraph}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    case 3:
      return (
        <ThirdView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInputParagraph}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    case 4:
      return (
        <FourthView
          formData={formData}
          setFormData={setFormData}
          checkFileSize={checkFileSize}
          checkFileType={checkFileTypeImage}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    case 5:
      return (
        <Summary
          eventData={eventData}
          formData={formData}
          onPrevious={() => {
            setCurrentView(4);
          }}
        />
      );
    default:
      return (
        <FirstView
          {...eventData}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      );
  }
};

export default EventCard;
