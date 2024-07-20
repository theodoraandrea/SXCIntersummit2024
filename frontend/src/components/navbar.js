import { Link } from "react-router-dom";
import logo from "./../images/logo.png";
import profile from "./../images/person.png";
import { useUser } from "../contexts/user-context";
import { HOME, REGISTER, USER_DASHBOARD, ABOUT } from "../constants/routes";
import { API_LOGOUT } from "../config/endpoints";

export default function NavbarUser() {
  const { profileData, isLoggedIn } = useUser();
  console.log(isLoggedIn);
  return (
    <nav className="bg-primary-1 w-full h-16 flex items-center justify-between px-10 sticky top-0">
      <img src={logo} className="w-32" />
      <ul className="flex space-x-20">
        <li className="ml-auto">
          <Link to={HOME} className="text-white hover:underline cursor-pointer">
            Home
          </Link>
        </li>
        <li className="ml-auto">
          <Link
            to={ABOUT}
            className="text-white hover:underline cursor-pointer"
          >
            About
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="#" className="text-white hover:underline cursor-pointer">
            Events
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="#" className="text-white hover:underline cursor-pointer">
            Partnership
          </Link>
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
                to={USER_DASHBOARD}
                className=" gap-1 cursor-pointer flex items-center"
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
              to={REGISTER}
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
