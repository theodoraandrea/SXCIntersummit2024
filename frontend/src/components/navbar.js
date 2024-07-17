import { Link } from "react-router-dom";
import logo from "./../images/logo.png";
import profile from "./../images/person.png";


export default function NavbarUser() {
  return (
    <nav className="bg-primary-1 w-full h-16 flex items-center justify-between px-10 sticky top-0">
      <img src={logo} className="w-32"/>
      <ul className="flex space-x-20">
        <li className="ml-auto">
          <Link to="/" className="text-white hover:underline cursor-pointer">
            Home
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="/about" className="text-white hover:underline cursor-pointer">
            About
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="/" className="text-white hover:underline cursor-pointer">
            Events
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="/" className="text-white hover:underline cursor-pointer">
            Partnership
          </Link>
        </li>
        <li className="ml-auto">
          <Link to="/" className="text-white hover:underline cursor-pointer">
            Merchandise
          </Link>
        </li>
        <li>
          <Link
            to="/user-dashboard"
            className="text-white underline gap-1 cursor-pointer flex"
          ><img src={profile}/>
            User
          </Link>
        </li>
      </ul>
    </nav>
  );
}
