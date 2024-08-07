import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../images/logo.png";
import profile from "./../images/person.png";
import { useUser } from "../contexts/user-context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  HOME,
  LANDING_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
  EVENTS_PAGE,
} from "../constants/routes";

export default function NavbarUser({ currentPath }) {
  const { isLoggedIn, removeUser } = useUser();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleScrollToSponsorship = () => {
    if (currentPath !== HOME) {
      navigate(HOME);
      console.log("AT HOME");
      console.log(currentPath);
    } else {
      const element = document.getElementById('sponsorship');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
<nav className="bg-primary-1 w-full h-16 flex items-center px-10 sticky top-0 z-50">
      <img src={logo} alt="logo" className="w-32" />
      <ul className="flex flex-grow items-center space-x-10 ml-10">
        <li>
          <Link
            to={HOME}
            className={`text-white hover:font-semibold ${currentPath === HOME ? 'font-semibold text-yellow-500' : 'hover:text-yellow-500'}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={ABOUT_PAGE}
            className={`text-white hover:font-semibold ${currentPath === ABOUT_PAGE ? 'font-semibold text-yellow-500' : 'hover:text-yellow-500'}`}
          >
            About
          </Link>
        </li>
        <li className="relative">
          <button 
            onClick={toggleDropdown}
            className={`flex items-center text-white hover:font-semibold ${currentPath === EVENTS_PAGE ? 'font-semibold text-yellow-500' : 'hover:text-yellow-500'}`}
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
        <li>
          <button
            onClick={handleScrollToSponsorship}
            className="text-white hover:font-semibold hover:text-yellow-500"
          >
            Partnership
          </button>
        </li>
        <li>
          <Link
            to="#"
            className="text-white hover:font-semibold hover:text-yellow-500"
          >
            Merchandise
          </Link>
        </li>
      </ul>
      <div className="ml-auto flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              to={USER_DASHBOARD_PAGE}
              className={`flex items-center text-white hover:font-semibold ${currentPath === USER_DASHBOARD_PAGE ? 'font-semibold text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <AccountCircleIcon className="mr-2" />
              My profile
            </Link>
            <button 
              onClick={removeUser}
              className="text-white hover:bg-white hover:text-black px-4 py-1 rounded bg-primary-2 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to={LANDING_PAGE}
            className="text-white hover:underline px-4 py-2 rounded bg-primary-2 cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
 
  );
}
