import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import {
  HOME,
  LANDING_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
  EVENTS_PAGE,
} from "../constants/routes";

const logo = "/images/logo.png";


export default function NavbarUser({ currentPath }) {
  const { isLoggedIn, removeUser } = useUser();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const MERCH_LINK = "https://linktr.ee/PurchaseSummit2024";

  return (
    <nav className="bg-primary-1 w-full h-16 flex items-center px-5 md:px-10 sticky top-0 z-50">
      <Link to={HOME}>
        <img src={logo} alt="logo" className="w-14 md:w-16" />
      </Link>

      {/* Navigation Links for Desktop View */}
      <ul className="hidden md:flex flex-grow items-center space-x-10 ml-10">
        <li>
          <Link
            to={HOME}
            className={`text-white ${
              currentPath === HOME
                ? "font-semibold text-yellow-500"
                : "hover:text-yellow-500"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={ABOUT_PAGE}
            className={`text-white ${
              currentPath === ABOUT_PAGE
                ? "font-semibold text-yellow-500"
                : "hover:text-yellow-500"
            }`}
          >
            About
          </Link>
        </li>
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className={`flex items-center text-white ${
              currentPath === EVENTS_PAGE
                ? "font-semibold text-yellow-500"
                : "hover:text-yellow-500"
            }`}
          >
            Programs
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
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
                to={`${EVENTS_PAGE}?category=Competition`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Competitions
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
                to={`${EVENTS_PAGE}?category=Seminar`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Seminar
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link
            to={MERCH_LINK}
            className="text-white hover:text-yellow-500"
          >
            Merchandise
          </Link>
        </li>
      </ul>

      {/* Burger Menu for Mobile View */}
      <div className="md:hidden ml-auto">
      {
        isLoggedIn && 
        <Link to={USER_DASHBOARD_PAGE}>
          <AccountCircleIcon className="text-primary-3 mr-4"/>
        </Link>
      }
      <button
        className="text-yellow-500 md:hidden"
        onClick={toggleMenu}
      >
        <MenuIcon fontSize="large" />
      </button>
      </div>

      {/* Full-Screen Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col items-center justify-center text-white">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <ul className="flex flex-col items-center space-y-6">
            <li>
              <Link
                to={HOME}
                className={`text-white text-2xl ${
                  currentPath === HOME
                    ? "font-semibold text-yellow-500"
                    : "hover:text-yellow-500"
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={ABOUT_PAGE}
                className={`text-white text-2xl ${
                  currentPath === ABOUT_PAGE
                    ? "font-semibold text-yellow-500"
                    : "hover:text-yellow-500"
                }`}
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDropdown}
                className={`text-white text-2xl ${
                  currentPath === EVENTS_PAGE
                    ? "font-semibold text-yellow-500"
                    : "hover:text-yellow-500"
                }`}
              >
                Programs
              </button>
              {dropdownOpen && (
                <div className="mt-4 space-y-2">
                  <Link
                    to={`${EVENTS_PAGE}?category=All`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    All
                  </Link>
                  <Link
                    to={`${EVENTS_PAGE}?category=Competition`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Competitions
                  </Link>
                  <Link
                    to={`${EVENTS_PAGE}?category=Workshop`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Workshop
                  </Link>
                  <Link
                    to={`${EVENTS_PAGE}?category=Company Visit`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Company Visit
                  </Link>
                  <Link
                    to={`${EVENTS_PAGE}?category=Seminar`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Seminar
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to={MERCH_LINK}
                className="text-white text-2xl hover:text-yellow-500"
                onClick={toggleMenu}
              >
                Merchandise
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to={USER_DASHBOARD_PAGE}
                    className="flex items-center text-white text-2xl hover:text-yellow-500"
                    onClick={toggleMenu}
                  >
                    My profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      removeUser();
                      navigate(LANDING_PAGE);
                    }}
                    className="text-white text-2xl px-4 py-2 rounded hover:text-yellow-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to={LANDING_PAGE}
                  className="text-white text-2xl px-4 py-2 rounded hover:text-yellow-500 border-2 border-primary-3 rounded-full px-8 py-1"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* User Actions */}
      <div className="hidden md:flex ml-auto flex-col md:flex-row items-center space-x-4 space-y-2 md:space-y-0">
        {isLoggedIn ? (
          <>
            <Link
              to={USER_DASHBOARD_PAGE}
              className={`flex items-center text-white ${
                currentPath === USER_DASHBOARD_PAGE
                  ? "font-semibold text-yellow-500"
                  : "hover:text-yellow-500"
              }`}
            >
              <AccountCircleIcon className="mr-2" />
              My profile
            </Link>
            <button
              onClick={() => {
                removeUser();
                navigate(LANDING_PAGE);
              }}
              className="text-white hover:text-gradient transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to={LANDING_PAGE}
            className="text-gradient transition duration-300 cursor-pointer border-2 border-primary-3 rounded-full px-4 py-1"
            >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
