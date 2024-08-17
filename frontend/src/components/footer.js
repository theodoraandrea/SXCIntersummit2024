import { Link } from "react-router-dom";
import { EVENTS_PAGE } from "../constants/routes";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const logo = "/images/logo.png";

export default function Footer() {
  return (
    <div className="bg-primary-3 w-full py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-center md:text-left">
            Innovate or Obsolete: Thriving in a world of technology disruption
          </p>
        </div>
        <div className="flex flex-row items-center md:items-end mt-6 md:mt-0">
          <div className="flex gap-5 items-center">
            <a href="https://www.instagram.com/sxcintersummit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <InstagramIcon/>
            </a>
          </div>
          <div className="flex gap-5 items-center">
            <a href="https://id.linkedin.com/company/studentsxceos-summit">
              <LinkedInIcon/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
