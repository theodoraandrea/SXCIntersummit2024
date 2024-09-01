import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Spinner from "../../components/elements/spinner";
import ReferralModal from "../../components/referral-modal";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { USER_DASHBOARD_PAGE, USER_DETAILS_PAGE } from "../../constants/routes";
import { postNewIbpcMember, postNewIbpcTeam } from "../../service/services";
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
    setEmail(profileData?.email);
    setPhoneNumber(profileData?.phoneNumber);
    setinstitution(profileData?.institution);
    setBatch(profileData?.batch);
  }, [profileData]);

  const [fullName, setFullName] = useState("");
  const [institution, setinstitution] = useState("");
  const [batch, setBatch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState(formData.teamName ?? "");
  const [members, setMembers] = useState(3);
  const [studentIds, setStudentIds] = useState(formData.studentIds?.name ?? "");
  const [proofOfFollow, setproofOfFollow] = useState(
    formData.proofOfFollow?.name ?? ""
  );
  const [proofOfTwibbon, setproofOfTwibbon] = useState(
    formData.proofOfTwibbon ?? ""
  );
  const [proofOfStory, setproofOfStory] = useState(formData.proofOfStory?.name ?? ""
  );
  const [proofOfComment, setproofOfComment] = useState(formData.proofOfComment?.name ?? ""
  );
  const [proofOfPayment, setproofOfPayment] = useState(
    formData.proofOfPayment?.name ?? ""
  );
  const [originalityStatement, setOriginalityStatement] = useState(
    formData.originalityStatement?.name ?? ""
  )

  const [question, setquestion] = useState(formData.question?.name ?? "");
  const [questionOther, setquestionOther] = useState(
    formData.questionOther?.name ?? "Other"
  );
  const [option, setOption] = useState(formData.question?.name ?? "");

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setquestion(e.target.value);
    if (e.target.value !== 4) {
      setquestionOther("");
    }
  };

  //REFERRAL & PAYMENT DATA
  const { regularPrice, bankAccount, bank, recipient, discountedPrice, discount } = eventData;
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
          email: email,
          phoneNumber: phoneNumber,
          institution: sanitizeInput(institution),
          batch : batch,
          teamName: sanitizeInput(teamName),
          members: 3,
          proofOfTwibbon: sanitizeInput(proofOfTwibbon),
          question : question,
          questionOther : questionOther,
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
      proofOfPayment &&
      fullName &&
      email &&
      phoneNumber &&
      institution &&
      batch &&
      teamName &&
      members && 
      studentIds &&
      proofOfFollow &&
      proofOfTwibbon &&
      proofOfStory && 
      proofOfComment && 
      question &&
      originalityStatement
    ) {
      return true;
    }
    errorAlert({ message: "All fields are required"});
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
    } else if (name === "proofOfFollow") {
      setproofOfFollow(file.name);
    // } else if (name === "proofOfTwibbon") {
    //   setproofOfTwibbon(file.name);
    } else if (name === "proofOfStory") {
      setproofOfStory(file.name);
    } else if (name === "proofOfComment") {
      setproofOfComment(file.name);
    } else if (name === "proofOfPayment") {
      setproofOfPayment(file.name);
    } else if (name === "question") {
      setquestion(file.name);
    } else if (name === "originalityStatement") {
      setOriginalityStatement(file.name);
    }
  };

  const checkFileSize = (file) => {
    if (file.size <= 2000000) {
      return true;
    }
    const message = "File size has to be 2MB or less";
    errorAlert({ message: message });
    return false;
  }
  
  const checkFileType = (file) => {
      if (
        file.type === "application/pdf" 
      ) {
        return true;
      }
      const message = "File has to be pdf";
      errorAlert({ message: message });
      return false;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "{LINK}"; // REPLACE LINK
    link.download = "IBPC-OriginalityStatement.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPrice = (refCodeValid) => {
    const currentDate = new Date();
    let price = 0;

    // 2 8 9 25 26 1 

    const earlyBirdStart = new Date("2024-09-02"); 
    const earlyBirdEnd = new Date("2024-09-08");
    const regularStart = new Date("2024-09-09");
    const regularEnd = new Date("2024-09-25");
    const lateStart = new Date("2024-09-26");
    const lateEnd = new Date("2024-10-01");

    if (currentDate >= earlyBirdStart && currentDate <= earlyBirdEnd) {
      price += 150000;
    } else if (currentDate >= regularStart && currentDate <= regularEnd) {
      price += 175000;
    } else if (currentDate >= lateStart && currentDate <= lateEnd) {
      price += 200000;
    }

    if (refCodeValid){
      price -= discount;
    }

    return price;
  }

  const price = getPrice(refCodeValid);

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 text-center py-8">
        <h1 className="text-2xl font-bold text-white">
              Internasional Business Plan Competition Registration
        </h1>
      </div>
      <div className="bg-primary-1 lg:space-x-8 lg:gap-y-4 lg:px-16 min-h-screen grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 w-fit mx-auto p-4 pt-0 text-center">
          <div className="mb-4 p-8 bg-primary-4
          text-white rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-2">
              Registration Fee
            </h1>
            <p className="mb-2 text-center text-sm">
              Please pay the following amount to complete your registration
            </p>
            <p className="text-3xl">
              <strong>
                IDR {price.toLocaleString()}
              </strong>
            </p>
            <p className="text-sm">
              {
              verifiedRefCode && refCodeValid && (
                "Referral discount applied"
              )
              }
            </p>
          </div>
          <div className="text-white bg-primary-4 rounded-lg shadow-lg p-8 text-left">
          <p className="text-xl text-center">
              <strong>Transfer to</strong>
            </p>
            <div className="text-sm mt-2 w-fit mx-auto text-center">
              <p><strong>{bankAccount}</strong> - {bank}</p>
              <p>{recipient}</p>
            </div>
            <div className="text-sm mt-4 w-fit mx-auto text-center">
              <p><strong>{eventData.bankAccount_2}</strong> - {eventData.bank_2}</p>
              <p>{eventData.recipient_2}</p>
            </div>
          </div>
          <div className="bg-primary-4 mt-4 rounded-lg">
          <ReferralModal
            eventName="ibc_bpc"
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
              <label className="block text-white mb-2" htmlFor="institution">
                Institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={institution}
                disabled={true}
                onChange={(e) => setinstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="batch">
                Batch
              </label>
              <select
                id="batch"
                name="batch"
                value={batch}
                disabled={true}
                className="w-full px-3 py-2 rounded-lg"
              >
                <option value="" disabled>
                  Select Batch
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
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
            <div className="mb-4 hidden">
              <label className="block text-white mb-2" htmlFor="selectMembers">
                Number of members
              </label>
              <select
              id="selectMembers"
              name="selectMembers"
              className="w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setMembers(e.target.value)}}
              value={members}
            >
              <option value="" disabled>
                Select number of members
              </option>
              <option value="2" disabled>
                2
              </option>
              <option value="3">
                3
              </option>
            </select>

            </div>
            <h1 className="text-lg font-bold text-white mt-10">Uploads</h1>
            <label className="block text-white">
              Combine files of <strong>ALL MEMBERS</strong> into 1 PDF file
            </label>
            <label className="block text-white mb-4">
              File size has to be less than 2MB
            </label>
            <label className="block text-white">Proof of Payment</label>
            <div className="my-4 w-fit flex flex-col space-y-2 sm:flex-row">
              <div className="relative">
              <input
                  type="file"
                  id="proofOfPayment"
                  name="proofOfPayment"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="proofOfPayment"
                  className="bg-primary-3 text-white px-6 py-2 my-2 rounded-full cursor-pointer z-20"
                >
                Choose file
              </label>
              </div>
              <div className="text-sm text-white ml-2 max-w-full">{proofOfPayment}</div>
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
              Proof of following @sxcintersummit & @sxcintersummitcompetition on IG
              (all members)
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
              Proof of Twibbon post (all members)
            </label>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="proofOfTwibbon">
                Link:
              </label>
              <input
                type="text"
                id="proofOfTwibbon"
                name="proofOfTwibbon"
                value={proofOfTwibbon}
                onChange={(e) => setproofOfTwibbon(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <label className="block text-white">
              Proof of sharing Instagram story posters (all members)
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
            Proof Tag 3 friends in the Open Registration Feeds comment Section (all members)
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

            {/* originalityStatement */}
            <div className="py-10">
              <div className="space-x-4">
                <button
                  className="border-2 border-primary-3 text-primary-3 px-6 py-2 rounded-full mb-4"
                  onClick={handleDownload}
                >
                  Download Agreement Paper
                </button>
                <div className="relative inline-block mb-5">
                  <input
                    type="file"
                    id="originalityStatement"
                    name="originalityStatement"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="originalityStatement"
                    className="bg-primary-3 text-white px-5 py-2 my-2 rounded-full cursor-pointer z-20"
                  >
                    Submit Originality Statement Paper
                  </label>
                <label className="mx-5 text-white mt-6">{originalityStatement}</label>
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
                    value="Instagram"
                    checked={option === "Instagram"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="question1"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    SxC InterSummit Instagram
                  </label>
                </div>
                <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="question2"
                    name="questionRadio"
                    type="radio"
                    value="LinkedIn"
                    checked={option === "LinkedIn"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="question2"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    SxC InterSummit LinkedIn
                  </label>
                </div>
                <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="question3"
                    name="questionRadio"
                    type="radio"
                    value="Tiktok"
                    checked={option === "Tiktok"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="question3"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    SxC InterSummit Tiktok
                  </label>
                </div>
                <div className="flex p-4 items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="question4"
                    name="questionRadio"
                    type="radio"
                    value="Media Partners"
                    checked={option === "Media Partners"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="question4"
                    className="w-full ml-2 text-xs sm:text-sm text-gray-800"
                  >
                    Media Partners
                  </label>
                </div>
                <div className="flex p-4 col-span-2 text-xs sm:text-sm items-center bg-gray-100 border-gray-300 rounded">
                  <input
                    id="question5"
                    name="questionRadio"
                    type="radio"
                    value="Other"
                    checked={option === "Other"}
                    onChange={handleOptionChange}
                  />
                  <input
                    id="question5"
                    className="ml-2 bg-gray-100 w-full"
                    name="question"
                    type="text"
                    value={questionOther}
                    placeholder="Other"
                    onChange={(e) => setquestionOther(e.target.value)}
                    disabled={option !== "Other"}
                  />
                </div>
              </div>
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
  const [institution, setinstitution] = useState(formData.institution ?? "");
  const [batch, setBatch] = useState(formData.batch ?? "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? "+62");
  const [email, setEmail] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const handleSubmit = () => {
    if (checkAllFilled()) {
      if (!emailError && !phoneError) {
        formData = {
          ...formData,
          fullName: sanitizeInput(fullName),
          email: email,
          phoneNumber: phoneNumber,
          institution: sanitizeInput(institution),
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
    if (fullName && batch && institution && phoneNumber && email) {
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
                institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={institution}
                onChange={(e) => setinstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="batch">
                Batch
              </label>
              <select
                id="batch"
                name="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              >
                <option value="" disabled>
                  Select Batch
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
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
  const [institution, setInstitution] = useState(formData.institution ?? "");
  const [batch, setBatch] = useState(formData.batch ?? "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? "+62");
  const [email, setEmail] = useState(formData.email ?? "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

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
          email: email,
          phoneNumber: phoneNumber,
          institution: sanitizeInput(institution),
          batch: batch,
        };
        setFormData(formData);
        return true;
      }
    }
    errorAlert({ message: "All fields must be filled"});
    return false;
  };

  const checkAllFilled = () => {
    if (fullName && batch && email && phoneNumber && institution) {
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
                Institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="batch">
                Batch
              </label>
              <select
                type="integer"
                id="batch"
                name="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
              >
                <option value="" disabled>
                  Select Batch
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
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

const Summary = ({ eventData, formData, numberOfMembers, member1Data, member2Data, setCurrentView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setRegisteredCompetitions } = useUser();
  const membersData = [member1Data, member2Data];

  const { ibpcId } = eventData;

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await registerTeam(formData);
      if (response.teamId) {
        let memberCounter = 1;
        for (const member of membersData) {
          if (member.fullName) {
            const memberData = {
              teamId: response.teamId,
              fullname: member.fullName,
              email: member.email,
              institution: member.institution,
              batch: member.batch,
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
                setRegisteredCompetitions((prevData) => [...prevData, ibpcId]);
                successAlert({ title: "Successfully registered for International Business Plan Competition!",
                  message: "Please check your email and user dashboard for further details."
                });
              }
            } catch (memberError) {
              setIsLoading(false);
              errorAlert({
                message: "Something went wrong. Please try again"
              });
              navigate(-1);
            }
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert({
        message: "Something went wrong. Please try to register again."
      });
      navigate(-1);
    }
  };

  const registerTeam = async (data) => {
    try {
      const response = await postNewIbpcTeam(data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerMember = async (data) => {
    try {
      const response = await postNewIbpcMember(data);
      console.log(response);
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
              <p className="text-base md:text-lg font-semibold mt-2">Team Data</p>
              <p>
                <strong>Team Name:</strong> {formData.teamName}
              </p>
              <p>
                <strong>Student IDs:</strong> {formData.studentIds?.name}
              </p>
              <p>
                <strong>Proof of Payment:</strong>{" "}
                {formData.proofOfPayment?.name}
              </p>
              <p>
                <strong>Proof of Following Instagram:</strong>{" "}
                {formData.proofOfFollow?.name}
              </p>
              <p>
                <strong>Proof of Twibbon Post:</strong>
                {formData.proofOfTwibbon}
              </p>
              <p>
                <strong>Proof of Sharing Instagram Story Posters:</strong>{" "}
                {formData.proofOfStory?.name}
              </p>
              <p>
                <strong>Proof of Tag 3 friends in the Open Registration Feeds comment Section:</strong>{" "}
                {formData.proofOfComment?.name}
              </p>
              <p>
                <strong>Proof of Originality Statement</strong>{" "}
                {formData.originalityStatement?.name}
              </p>
              <p>
                <strong>How did you know this event?</strong>{" "}
                {formData.question}
              </p>
              <p className="text-base md:text-lg font-semibold mt-2">Team Leader</p>
              <p>
                <strong>Full Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>institution:</strong> {formData.institution}
              </p>
              <p>
                <strong>Batch:</strong> {formData.batch}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              {formData.referralCode && (
                <>
                  <p className="text-base md:text-lg font-semibold mt-2">Referral Code</p>
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
                      <strong>institution:</strong> {member.institution}
                    </p>
                    <p>
                      <strong>Batch:</strong> {member.batch}
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
    ibpcId: 3,
    bankAccount: "xxx",
    bank: "xxx",
    recipient: "xxx",
    bankAccount_2: "xxx",
    bank_2: "xxx",
    recipient_2: "xxx",
    discount: '5.000',
    regularPrice: '150.000',
    discountedPrice: 'xxx',
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
  }

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
          goToNext={()=>{setCurrentView((3))}}
          goToSummary={()=>(setCurrentView(4))}
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
