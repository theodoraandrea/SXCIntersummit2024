import { Link } from "react-router-dom";
import logo from "./../images/logo.png";


export default function NavbarLanding() {
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
            to="/register1"
            className="text-white hover:underline px-4 py-2 rounded bg-primary-2 cursor-pointer"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
