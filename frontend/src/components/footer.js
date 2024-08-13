import logo from "./../images/logo.png";
import { Link } from 'react-router-dom';
import { EVENTS_PAGE } from "../constants/routes";
import instagramLogo from "./../images/Instagram.png";
import YoutubeLogo from "./../images/Youtube.png";

export default function Footer() {
  return (
    <div className="bg-primary-3 w-full py-10 mx-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <img src={logo} alt="Logo" className="w-32" />
          <p>Innovate or Obsolete: Thriving in a world of technology disruption</p>
        </div>
        <div>
          <div className="flex mx-10 my-5 justify-end gap-5">
            <a href="https://www.instagram.com/sxcintersummit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
            <img src={instagramLogo} alt="instagram logo"/>
            </a>
            <img src={YoutubeLogo} alt="youtube logo"/>
          </div>
        </div>
      </div>
    </div>
  );
}
