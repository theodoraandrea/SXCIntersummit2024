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
import { postCompvisRegistration } from "../../service/services";
import Spinner from "../../components/elements/spinner";
import ReferralModal from "../../components/referral-modal";
import { errorAlert, successAlert } from "../../components/alert";
import Swal from "sweetalert2";

// option online / offline
const FirstView = ({ title, description, formData, setFormData, onNext }) => {
  const navigate = useNavigate();
  const { loading, isLoggedIn, registeredEvents } = useUser();
  const [attendanceType, setAttendanceType] = useState("");
  const [hasRegisteredOnline, setHasRegisteredOnline] = useState(false);
  const [hasRegisteredOffline, setHasRegisteredOffline] = useState(false);

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
  }, []);

  useEffect(() => {
    if (registeredEvents.includes(2)) {
      setHasRegisteredOnline(true);
    }
    if (registeredEvents.includes(3)) {
      setHasRegisteredOffline(true);
    }
  }, []);

  const checkAllFilled = () => {
    if (attendanceType) {
      return true;
    }
    errorAlert({ message: "Agreement paper required" });
    return false;
  };

  const handleSubmit = () => {
    if (checkAllFilled()) {
      setFormData({
        ...formData,
        attendanceType: attendanceType,
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
            Choose which company visit session you would like to participate in
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
                setAttendanceType(e.target.value);
              }}
              value={attendanceType}
            >
              <option value="" disabled>
                Select Session
              </option>
              <option value="online" disabled={true}>
                Online
              </option>
              <option value="offline" disabled={hasRegisteredOffline}>
                Offline (KPMG/Shopee)
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

// personal information 1
const SecondView = ({
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
    errorAlert({ message: "All fields must be filled" });
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
          // fullName: sanitizeInput(fullName),
          // gender: sanitizeInput(gender),
          // email: email,
          // phoneNumber: phoneNumber,
          // university: sanitizeInput(university),
          // major: sanitizeInput(major),
          // batch: batch,
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
                University
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

// personal information 2
const ThirdView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
  checkFileSize,
  checkFileType,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setGpa(formData?.gpa || "");
    setDomicile(formData?.domicile || "");
    setCv(formData?.cv?.name || ""); // Only set the file name, not the file object
  }, [formData]);

  const [gpa, setGpa] = useState("");
  const [domicile, setDomicile] = useState("");
  const [cv, setCv] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const checkAllFilled = () => {
    if (gpa && cv && domicile && linkedin) {
      return true;
    }
    errorAlert({ message: "All fields must be filled" });
    return false;
  };

  const handleNext = () => {
    if (checkAllFilled()) {
      onNext();
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    if (file) {
      if (!checkFileSize(file) || !checkFileType(file)) {
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: file || value, // Store the file object for submission
    }));

    if (name === "cv") {
      setCv(file ? file.name : "");
    } else if (name === "gpa") {
      const gpaValue = parseFloat(value);
      if(gpaValue > 0 || value === ""){
        setGpa(value);
      } else {
        setGpa(value);
        alert("GPA must be a valid number greater than 0");
      }
    } else if (name === "domicile") {
      setDomicile(value);
    } else if (name === "linkedin") {
      setLinkedin(value);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 my-8 rounded-xl shadow-lg max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient text-center mb-2">
            Personal Information 2
          </h1>
          <div className="my-2 px-4">
            <label className="block text-white mb-2" htmlFor="gpa">
              Current GPA
            </label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              value={gpa}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
              placeholder="e.g. 3.7"
            />
          </div>
          <div className="my-2 px-4">
            <label className="block text-white mb-2" htmlFor="domicile">
              Domicile
            </label>
            <input
              type="text"
              id="domicile"
              name="domicile"
              value={domicile}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
            />
          </div>
          <div className="my-2 px-4">
            <label className="block text-white mb-2" htmlFor="linkedin">
              LinkedIn Link
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
            />
          </div>

          <div className="my-5 px-4 relative">
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="cv"
              className="text-sm px-4 py-2 md:text-base bg-primary-3 text-white md:px-6 md:py-2 my-2 rounded-full cursor-pointer"
            >
              Submit CV
            </label>
            <span className="text-sm md:text-base text-white ml-2">{cv}</span>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white px-6 py-2 mr-6 rounded-full hover:text-gradient transition duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="text-white px-6 py-2 rounded-full hover:text-gradient transition duration-300"
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
  attendanceType,
  company,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCompany, setSelectedCompany] = useState(
    formData.company ?? ""
  );
  const [semester, setSemester] = useState(formData.semester ?? "");

  // Validate fields before proceeding
  const checkAllFilled = () => {
    if (!semester || !selectedCompany) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "All fields must be filled",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate semester based on selected company
    if (selectedCompany === "Bosch" && semester < 5) {
      Swal.fire({
        icon: "error",
        title: "Semester Requirement",
        text: "Bosch is only available for students in 5th semester or above",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (selectedCompany === "BCA" && semester < 6) {
      Swal.fire({
        icon: "error",
        title: "Semester Requirement",
        text: "BCA is only available for students in 6th semester or above",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };

  const saveData = () => {
    const sanitizedCompany = sanitizeInput(selectedCompany);
    setFormData({
      ...formData,
      company: sanitizedCompany,
      semester: semester,
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
            {attendanceType === "Company Visit Online"
              ? "Which company do you wish to participate in our Company Visit Event?"
              : "Select the company"}
          </h1>

          {/* Online version */}
          {attendanceType === "Company Visit Online" ? (
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="mb-4">
                <label
                  className="block text-white mb-2"
                  htmlFor="semesterInput"
                >
                  Enter your current semester
                </label>
                <input
                  id="semesterInput"
                  name="semester"
                  className="w-full px-3 py-2 rounded-lg"
                  type="number"
                  min="1"
                  max="10"
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    console.log("Semester Updated:", e.target.value);
                  }}
                  placeholder="Enter your semester"
                />
              </div>
              <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                <input
                  id="companyFMCG"
                  name="companyVisit"
                  type="radio"
                  value="FMCG Industry"
                  disabled={semester < 1}
                  //  Disabled jika semester kurang dari 1
                  checked={selectedCompany === "FMCG Industry"}
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    console.log("Selected Company Updated:", e.target.value);
                  }}
                />
                <label
                  htmlFor="companyFMCG"
                  className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                >
                  FMCG Industry
                </label>
              </div>
              <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                <input
                  id="companyTBA"
                  name="companyVisit"
                  type="radio"
                  value="2nd company tba"
                  disabled={semester < 1}
                  // Disabled jika semester kurang dari 1
                  checked={selectedCompany === "2nd company tba"}
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    console.log("Selected Company Updated:", e.target.value);
                  }}
                />
                <label
                  htmlFor="companyTBA"
                  className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                >
                  2nd company tba
                </label>
              </div>
            </div>
          ) : (
            // Offline version
            <div>
              <div className="mb-4">
                <label
                  className="block text-white mb-2"
                  htmlFor="semesterInput"
                >
                  Enter your current semester
                </label>
                <input
                  id="semesterInput"
                  name="semester"
                  className="w-full px-3 py-2 rounded-lg"
                  type="number"
                  min="1"
                  max="8"
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    console.log("Semester Updated:", e.target.value);
                  }}
                  placeholder="Enter your semester"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 text-left">
{/*                 
                <div className="flex p-4 items center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="companyBosch"
                    name="companyVisit"
                    type="radio"
                    value="Bosch"
                    disabled={semester < 5}
                    //  Disabled jika semester kurang dari 5
                    checked={selectedCompany === "Bosch"}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                      console.log("Selected Company Updated:", e.target.value);
                    }}
                  />
                  <label
                    htmlFor="companyBosch"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    Bosch (Only for students in 5th semester or above)
                  </label>
                </div> */}
                {/* <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="companyBCA"
                    name="companyVisit"
                    type="radio"
                    value="BCA"
                    disabled={semester < 6}
                    // Disabled jika semester kurang dari 6
                    checked={selectedCompany === "BCA"}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                      console.log("Selected Company Updated:", e.target.value);
                    }}
                  />
                  <label
                    htmlFor="companyBCA"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    BCA (Only for students in 6th semester or above)
                  </label>
                </div> */}
                
                <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="companyKPMG"
                    name="companyVisit"
                    type="radio"
                    value="KPMG"
                    checked={selectedCompany === "KPMG"}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="companyKPMG"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    KPMG
                  </label>
                </div>

                <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="companyShopee"
                    name="companyVisit"
                    type="radio"
                    value="Shopee"
                    disabled={semester < 3}
                    checked={selectedCompany === "Shopee"}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="companyShopee"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    Shopee (Minimum 3rd semester students or fresh graduates with less than 2 years working experience
                    )
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
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

const ExtraView = ({ formData, setFormData, onNext, onPrevious}) => {
  const [appliedToProgram, setAppliedToProgram] = useState(formData.appliedToProgram ?? null);
  const [graduationDate, setGraduationDate] = useState(formData.graduationDate ?? '');

  const handleNext = () => {
    if (appliedToProgram === null || !graduationDate) {
      alert('Please fill in all fields.');
      return;
    }

    // Update form data with current inputs
    setFormData({
      ...formData,
      appliedToProgram,
      graduationDate,
    });

    onNext(); // Proceed to the next step
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 mx-2 p-8 rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">Additional Information</h1>

          {/* Question: Applied to Program */}
          <div className="mb-4">
            <label className="block text-white mb-2">
              Have you applied to the Shopee Graduate Development Program?
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="appliedToProgram"
                  value="yes"
                  checked={appliedToProgram === 'yes'}
                  onChange={() => setAppliedToProgram('yes')}
                />
                <span className="ml-2 text-white">Yes</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="appliedToProgram"
                  value="no"
                  checked={appliedToProgram === 'no'}
                  onChange={() => setAppliedToProgram('no')}
                />
                <span className="ml-2 text-white">No</span>
              </label>
            </div>
          </div>

          {/* Expected Graduation Date */}
          <div className="mb-4">
            <label htmlFor="graduationDate" className="flex text-white mb-2">
              Expected Graduation Date (e.g., September 2025)
            </label>
            <input
              type="text"
              id="graduationDate"
              name="graduationDate"
              placeholder="e.g., September 2025"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-800 border-gray-300"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onPrevious}
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


const FifthView = ({
  onPrevious,
  onNextHave,
  onNextHaveNot,
  formData,
  setFormData,
}) => {
  const [isCommittee, setIsCommittee] = useState(formData?.isCommittee ?? "");

  useEffect(() => {
    window.scrollTo(0, 0); // Pindah scroll ke atas saat komponen dirender
  }, []);

  // Function to handle selection
  const handleSelection = (selection) => {
    setIsCommittee(selection);
    setFormData({ ...formData, isCommittee: selection }); // Update formData

    // Navigate to the next step
    if (selection === "Yes") {
      onNextHave(); // Navigate for 'Yes'
    } else {
      onNextHaveNot(); // Navigate for 'No'
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full px-2 min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 sm:max-w-md max-w-full rounded-xl shadow-lg text-center">
          <h1 className="text-3xl m-4 font-bold text-gradient mb-4">
            Are you from the StudentsxCEOs International Summit Committee?
          </h1>
          <div className="flex w-full justify-center">
            {/* Button for Yes */}
            <div className="w-40">
              <button
                className="text-sm sm:text-base bg-primary-3 border-2 border-primary-3 w-full text-white sm:px-6 py-2 rounded-full"
                onClick={() => handleSelection("Yes")}
                aria-label="I am"
              >
                Yes, I am
              </button>
            </div>
            {/* Button for No */}
            <div className="w-40 ml-6">
              <button
                className="text-sm sm:text-base border-2 border-yellow-500 w-full text-yellow-500 sm:px-6 py-2 rounded-full"
                onClick={() => handleSelection("No")}
                aria-label="I am not"
              >
                No, I am not
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={onPrevious}
            className="mt-6 text-white px-6 py-2 hover:text-gradient"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const SixthView = ({
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
      motivation: sanitizeInput(experience),
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What motivates you to join the StudentsxCEOs International Summit
            Company Visit 2024?
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
      expectations: sanitizeInput(expectations),
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 m-8 p-8 my-8 mx-2 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What are your expectations for this Business Master Class?
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

const EighthView = ({
  formData,
  setFormData,
  sanitizeInput,
  onPrevious,
  onNext,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [materials, setMaterials] = useState(formData.materials ?? "");
  const [charCount, setCharCount] = useState(formData.materials?.length ?? 0);

  const checkAllFilled = () => {
    if (materials) {
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
      materials: sanitizeInput(materials),
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-md rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            What kind of competition materials do you need?
          </h1>
          <form className="text-left">
            <div className="mb-4">
              <textarea
                name="materials"
                value={materials}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setMaterials(e.target.value);
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

const NinthView = ({
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
      errorAlert({ message: "All proofs must be uploaded" });
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
    if (name === "proofFollow") {
      setScreenshot1(file.name);
    } else if (name === "proofStory") {
      setScreenshot2(file.name);
    } else if (name === "proofPoster") {
      setScreenshot3(file.name);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 my-8 mx-2 p-8 max-w-full md:max-w-xl rounded-xl shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Connect with us!
          </h1>
          <form className="text-left">
            {/* setiap selesai check list harus upload gambar  */}
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
                  {" "}
                  @studentsxceosjkt @sxcintersummit, @sxcintersummitcompetition{" "}
                </strong>{" "}
                on Instagram
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot1"
                  name="proofFollow"
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
                I have liked and reposted Company Visit Post Feed to IG Story
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot2"
                  name="proofStory"
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
                I have mentioned 3 people in the comment section
              </label>
            </div>
            <div className="flex gap-3">
              <div className="my-4 relative">
                <input
                  type="file"
                  id="screenshot3"
                  name="proofPoster"
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

const PaymentView = ({
  eventData,
  formData,
  setFormData,
  checkFileSize,
  checkFileType,
  onPrevious,
  onNext,
}) => {
  const [checkPayment, setCheckPayment] = useState(
    formData.proofPayment ? true : false
  );
  const [proofPayment, setProofPayment] = useState(
    formData.proofPayment?.name ?? ""
  );

  const { regularPrice, bankAccount, discountedPrice, discount } = eventData;
  const [verifiedRefCode, setVerifiedRefCode] = useState(
    formData.referralCode ?? null
  );
  const [refCodeValid, setRefCodeValid] = useState(
    formData.referralCode ? true : false
  );

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
      referralCode: verifiedRefCode,
    });
  }, [verifiedRefCode]);

  //checking payment proof
  const handleNext = () => {
    if (checkPayment && proofPayment) {
      onNext();
    } else {
      errorAlert({ message: "Proof must be uploaded" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen flex items-center justify-center">
        <div className="bg-primary-4 flex flex-col text-center max-w-full md:max-w-3xl">
          <div className="mb-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Registration Fee
            </h1>
            <p className="text-white mx-4 mb-2 text-center">
              Please transfer the following amount to complete your registration
            </p>
            <div className="text-white text-left w-40">
              <div className="flex flex-row justify-between">
                <p>
                  <strong>Price: </strong>
                </p>
                <p>{regularPrice}</p>
              </div>
              {verifiedRefCode && refCodeValid && (
                <>
                  <div className="flex flex-row justify-between">
                    <p>
                      <strong>Discount:</strong>
                    </p>
                    <p>{discount}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>
                      <strong>Total:</strong>
                    </p>
                    <p>
                      <strong>{discountedPrice}</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
            <p className="text-white mx-4 text-center">
              <strong>Bank Account Number: </strong>
              {bankAccount}
            </p>
            <div className="mt-4">
              <label className="block text-white mb-2">
                <input
                  type="checkbox"
                  name="checkPayment"
                  checked={checkPayment}
                  onChange={(e) => setCheckPayment(e.target.checked)}
                  className="mr-2"
                />
                I have paid the registration fee
              </label>
              <div className="my-4 relative">
                <input
                  type="file"
                  id="proofPayment"
                  name="proofPayment"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="proofPayment"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer"
                >
                  Submit screenshot
                </label>
                <p className="text-white mt-4">{proofPayment}</p>
              </div>
            </div>
          </div>
          <ReferralModal
            eventName="comvis"
            referralCode={formData.referralCode ?? ""}
            verifiedRefCode={verifiedRefCode}
            setVerifiedRefCode={setVerifiedRefCode}
            setRefCodeValid={setRefCodeValid}
          />
          <div className="mt-6 flex justify-center items-center">
            <button
              type="button"
              onClick={onPrevious}
              className="bg-primary-3 text-white px-6 py-2 mr-6 rounded-full"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary-3 text-white px-6 py-2 rounded-full"
            >
              Next
            </button>
          </div>
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

  const { setRegisteredEvents } = useUser();

  let compvisId; //FOR REGISTER BUTTON PURPOSES

  compvisId = 6;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await postCompvisRegistration(formData);
      setIsLoading(false);
      if (response.status === 200) {
        navigate(USER_DASHBOARD_PAGE);
        setRegisteredEvents((prevData) => [...prevData, compvisId]);
        successAlert({
          message:
            "Successfully registered for Company Visit. Please check your email for further details!",
        });
      }
    } catch (error) {
      errorAlert({ message: "Oh no, something happened. Please try again!" });
      navigate(HOME);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full text-white">
        <div className="flex min-h-screen items-center justify-center">
          {isLoading ? (
            <div>
              <Spinner
                text="Uploading files... Please don't leave the page"
                longText="This might take a while..."
              />
            </div>
          ) : (
            <div className="bg-primary-4 mx-2 my-8 max-w-full md:max-w-lg flex items-center flex-col col-span-2 rounded-xl shadow-lg p-10 bg-opacity-25">
              <p className="text-xl sm:text-3xl text-gradient font-bold mb-2">
                Company Visit Registration Form
              </p>
              <p className="text-sm text-center font-semibold mb-2">
                Please make sure all data is correct before submitting
              </p>

              {/* Section for basic information */}
              <div className="grid max-w-full grid-cols-2 gap-x-8 md:gap-x-5 text-sm md:text-base">
                <strong>Full Name</strong>
                <p>{formData.fullName}</p>

                <strong>Email</strong>
                <p>{formData.email}</p>

                <strong>Phone Number</strong>
                <p>{formData.phoneNumber}</p>

                <strong>
                  Which company do you wish to participate in our Company Visit
                  Event?
                </strong>
                <p>{formData.company}</p>

                <strong>
                  Are you from the StudentsxCEOs International Summit Committee?
                </strong>
                <p>{formData.isCommittee}</p>

                <strong>Domicile (City, Province)</strong>
                <p>{formData.domicile}</p>

                <strong>LinkedIn</strong>
                <p>{formData.linkedin}</p>

                <strong>University/Institution</strong>
                <p>{formData.university}</p>

                <strong>Batch</strong>
                <p>{formData.batch}</p>

                <strong>Semester</strong>
                <p>{formData.semester}</p>

                <strong>Major</strong>
                <p>{formData.major}</p>

                <strong>Current GPA</strong>
                <p>{formData.gpa}</p>

                <strong>CV</strong>
                <p>{formData.cv.name}</p>

                {formData.company === "Shopee" && (
                  <>
                    <strong>Expected Graduation</strong>
                    <p>{formData.graduationDate}</p>

                    <strong>Have you Applied to the Shopee Graduate Development Program?</strong>
                    <p>{formData.appliedToProgram}</p>
                  </>
                )}

              </div>

              {/* Section for longer answers */}
              <div className="max-w-sm w-full text-sm md:max-w-full md:text-base mt-6">
                <div className="border-t border-gray-300 my-4"></div>

                <strong>
                  Motivation to join the StudentsxCEOs International Summit
                  Company Visit 2024
                </strong>
                <p>{formData.experience}</p>

                <div className="border-t border-gray-300 my-4"></div>

                <strong>Proof of following Instagram accounts:</strong>
                <p>{formData.proofFollow.name}</p>

                <strong>Proof of reposting Company Visit poster:</strong>
                <p>{formData.proofStory.name}</p>

                <strong>
                  Proof of like & comment on Company Visit poster:
                </strong>
                <p>{formData.proofPoster.name}</p>
              </div>

              {/* Navigation Buttons */}
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
    title: "Company Visit",
    description: "xxx",
    compvisId: 6,
    regularPrice: 0,
    discountedPrice: 0,
    discount: 0,
    bankAccount: "BCA - [no rek]",
  };

  //All fields for Company Visit
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
    if (file.type === "image/jpeg" || file.type === "image/png") {
      return true;
    }
    const message = "File has to be jpg, jpeg, or png";
    errorAlert({ message: message });
    return false;
  };

  const checkFileTypePdf = (file) => {
    if (file.type === "application/pdf" || file.type === "application/pdf") {
      return true;
    }
    const message = "File has to be pdf";
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
    // Specific case for YGY Shopee
    if (currentView === 4 && formData.company === 'Shopee'){
      // Skip an extra view ahead for Shopee
      setCurrentView((prevView) => prevView + 2);
    } else {
      // Regular next behavior for other cases
      setCurrentView((prevView) => prevView + 1);
    }
  };
  
  const handlePrevious2 = () => {
    if (currentView === 7 && !formData.experience) {
      setCurrentView((prevView) => prevView - 2);
    } else if (currentView === 4 && formData.company === 'Shopee') {
      // Special case for Shopee at view 4: skip the previous view
      setCurrentView((prevView) => prevView - 2);
    } else {
      setCurrentView((prevView) => prevView - 1);
    }
  };
  

  switch (currentView) {
    case 1:
      return (
        <FirstView
          {...eventData}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      );
    case 2:
      return (
        <SecondView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInput}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    case 3:
      return (
        <ThirdView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInput}
          onPrevious={handlePrevious}
          onNext={handleNext}
          checkFileSize={checkFileSize}
          checkFileType={checkFileTypePdf}
        />
      );
    case 4:
      return (
        <FourthView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInput}
          onPrevious={handlePrevious2}
          onNext={handleNext2}
          attendanceType={formData.attendanceType}
        />
      );
    case 5:
      return (
        <ExtraView
          onPrevious={handlePrevious}
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 6:
      return (
        <FifthView
          onPrevious={handlePrevious}
          onNextHave={handleNext}
          onNextHaveNot={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 7:
      return (
        <SixthView
          formData={formData}
          setFormData={setFormData}
          sanitizeInput={sanitizeInputParagraph}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    case 8:
    // skip
    case 9:
      return (
        <NinthView
          formData={formData}
          setFormData={setFormData}
          checkFileSize={checkFileSize}
          checkFileType={checkFileTypeImage}
          onPrevious={handlePrevious}
          onNext={() => {
            setCurrentView(11);
          }}
        />
      );
    case 10:
    //skipped
    //return <PaymentView eventData={eventData} formData={formData} setFormData={setFormData} checkFileType={checkFileTypeImage} checkFileSize={checkFileSize} onPrevious={handlePrevious} onNext={handleNext}/>;
    case 11:
      return (
        <Summary
          eventData={eventData}
          formData={formData}
          onPrevious={() => {
            setCurrentView(9);
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
