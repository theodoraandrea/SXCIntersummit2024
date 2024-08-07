import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";

const MemberForm = ({ formData, handleChange }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-4">Member's Identity</h2>
    {[
      { label: "Full Name", name: "fullName-member", type: "text" },
      { label: "Gender", name: "gender-member", type: "text" },
      { label: "School", name: "school-member", type: "text" },
      { label: "Phone", name: "phone-member", type: "text" },
      { label: "Email", name: "email-member", type: "email" },
      {
        label: "National Student Identification Number",
        name: "studentId-member",
        type: "text",
      },
      { label: "Student ID Card", name: "studentCard-member", type: "file" },
      {
        label:
          "Proof of Following @sxcintersummit and @sxcintersummitcompetition Instagram Account",
        name: "proofFollow-member",
        type: "file",
      },
      {
        label: "Proof of Twibbon Post",
        name: "proofTwibbon-member",
        type: "file",
      },
      {
        label: "Proof of Sharing Instagram Story Posters",
        name: "proofStory-member",
        type: "file",
      },
      {
        label: "Proof of Sharing Posters to 3 Whatsapp Group",
        name: "proofWhatsapp-member",
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
          {...(field.type !== "file" && {
            value: formData[field.name],
          })}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg"
        />
      </div>
    ))}
  </div>
);

const FutureCEOPage = () => {
  const [formData, setFormData] = useState({
    "fullName-member": "",
    "gender-member": "",
    "school-member": "",
    "phone-member": "",
    "email-member": "",
    "studentId-member": "",
    "studentCard-member": null,
    "proofFollow-member": null,
    "proofTwibbon-member": null,
    "proofStory-member": null,
    "proofWhatsapp-member": null,
    teamName: "",
    proofPayment: null,
  });

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

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-primary w-full min-h-screen flex items-center justify-center py-5">
        <div className="bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Future CEO Team Registration
          </h1>
          <form onSubmit={handleSubmit} className="text-left">
            <MemberForm formData={formData} handleChange={handleChange} />
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
