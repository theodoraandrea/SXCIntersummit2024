import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { LANDING_PAGE } from "../../constants/routes";

const LeaderForm = ({
  formData,
  handleChange,
  isProfilePrefilled,
  profileData,
}) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-4">Leader Identity</h2>
    {[
      {
        label: "Full Name",
        name: "fullName-leader",
        type: "text",
        prefillKey: "fullname",
      },
      {
        label: "Gender",
        name: "gender-leader",
        type: "text",
        prefillKey: "gender",
      },
      {
        label: "School",
        name: "school-leader",
        type: "text",
        prefillKey: "institution",
      },
      {
        label: "Phone",
        name: "phone-leader",
        type: "text",
        prefillKey: "phoneNumber",
      },
      {
        label: "Email",
        name: "email-leader",
        type: "email",
        prefillKey: "email",
      },
      {
        label: "National Student Identification Number",
        name: "studentId-leader",
        type: "text",
      },
      { label: "Student ID Card", name: "studentCard-leader", type: "file" },
      {
        label:
          "Proof of Following @sxcintersummit and @sxcintersummitcompetition Instagram Account",
        name: "proofFollow-leader",
        type: "file",
      },
      {
        label: "Proof of Twibbon Post",
        name: "proofTwibbon-leader",
        type: "file",
      },
      {
        label: "Proof of Sharing Instagram Story Posters",
        name: "proofStory-leader",
        type: "file",
      },
      {
        label: "Proof of Sharing Posters to 3 Whatsapp Group",
        name: "proofWhatsapp-leader",
        type: "file",
      },
    ].map((field) => (
      <div key={field.name} className="mb-4">
        <label className="block text-white mb-2" htmlFor={field.name}>
          {field.label}
        </label>
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg"
          // Disable the input if it can be prefilled and isProfilePrefilled is true
          disabled={
            isProfilePrefilled && profileData && profileData[field.prefillKey]
          }
        />
      </div>
    ))}
  </div>
);

const FutureCEOPage = () => {
  const { isLoggedIn, profileData, loading } = useUser();
  const [isProfilePrefilled, setIsProfilePrefilled] = useState(false);
  const [formData, setFormData] = useState({
    "fullName-leader": "",
    "gender-leader": "",
    "school-leader": "",
    "phone-leader": "",
    "email-leader": "",
    "studentId-leader": "",
    "studentCard-leader": null,
    "proofFollow-leader": null,
    "proofTwibbon-leader": null,
    "proofStory-leader": null,
    "proofWhatsapp-leader": null,
    teamName: "",
    proofPayment: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate(LANDING_PAGE);
      }

      if (profileData) {
        setFormData({
          "fullName-leader": profileData.fullname,
          "gender-leader": profileData.gender,
          "school-leader": profileData.institution,
          "phone-leader": profileData.phoneNumber,
          "email-leader": profileData.email,
        });
        setIsProfilePrefilled(true);
      }
    }
  }, [loading, isLoggedIn, profileData]);

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-primary w-full min-h-screen flex items-center justify-center py-5">
        <div className="bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Future CEO Team Registration
          </h1>
          <form onSubmit={handleSubmit} className="text-left">
            <LeaderForm
              formData={formData}
              handleChange={handleChange}
              profileData={profileData}
              isProfilePrefilled={isProfilePrefilled}
            />
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="teamName">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="proofPayment">
                Proof of Registrant Payment (Early, Regular, Student Ambassador,
                Last Call)
              </label>
              <input
                type="file"
                id="proofPayment"
                name="proofPayment"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <Link to="/events/detail-events/regist-events-2/summary">
              <button
                type="submit"
                className="bg-primary-3 text-white px-6 py-2 rounded-full"
              >
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FutureCEOPage;
