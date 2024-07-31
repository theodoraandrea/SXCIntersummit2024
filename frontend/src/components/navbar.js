import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.png";
import profile from "./../images/person.png";
import { useUser } from "../contexts/user-context";
import {
  HOME,
  REGISTER_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
  EVENTS_PAGE,
} from "../constants/routes";
import { API_LOGOUT } from "../config/endpoints";

export default function NavbarUser() {
  const { profileData, isLoggedIn } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleScrollToSponsorship = () => {
    const element = document.getElementById('sponsorship');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-primary-1 w-full h-16 flex items-center justify-between px-10 sticky top-0">
      <img src={logo} alt="logo" className="w-32" />
      <ul className="flex space-x-20">
        <li className="ml-auto">
          <Link to={HOME} className="text-white hover:underline cursor-pointer">
            Home
          </Link>
        </li>
        <li className="ml-auto">
          <Link to={ABOUT_PAGE} className="text-white hover:underline cursor-pointer">
            About
          </Link>
        </li>
        <li className="ml-auto relative">
          <button 
            onClick={toggleDropdown} 
            className="text-white hover:underline cursor-pointer flex items-center"
          >
            Events
            <svg 
              className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
              <Link
                to={`${EVENTS_PAGE}?category=All`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                All
              </Link>
              <Link
                to={`${EVENTS_PAGE}?category=Workshop`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Workshop
              </Link>
              <Link
                to={`${EVENTS_PAGE}?category=Company Visit`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Company Visit
              </Link>
              <Link
                to={`${EVENTS_PAGE}?category=Competitions`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Competitions
              </Link>
            </div>
          )}
        </li>
        <li className="ml-auto">
          <button
            onClick={handleScrollToSponsorship}
            className="text-white hover:underline cursor-pointer"
          >
            Partnership
          </button>
        </li>
        <li className="ml-auto">
          <Link to="#" className="text-white hover:underline cursor-pointer">
            Merchandise
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link
                to={USER_DASHBOARD_PAGE}
                className="gap-1 cursor-pointer flex items-center"
              >
                <img src={profile} alt="Profile" className="w-6 h-6 mr-1" />
                <p className="text-white">Hello,</p>
                <p className="text-white underline">
                  {profileData?.username + "!" || "User!"}
                </p>
              </Link>
            </li>
            <li>
              <Link to={API_LOGOUT}>
                <p className="text-white hover:bg-white hover:text-black px-4 py-1 rounded bg-primary-2 cursor-pointer">
                  Logout
                </p>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              to={REGISTER_PAGE}
              className="text-white hover:underline px-4 py-2 rounded bg-primary-2 cursor-pointer"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
