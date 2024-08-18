import { Link } from "react-router-dom";
import { EVENTS_PAGE } from "../constants/routes";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const instagram = "images/instagram.png";
const linkedin = "images/linkedin.png";
const tiktok = "images/tiktok.png";

const logo = "/images/logo.png";

const TIKTOK_LINK = "https://www.tiktok.com/@intersummitsxc";
const INSTAGRAM_LINK_1 = "https://www.instagram.com/sxcintersummit/?hl=en";
const INSTAGRAM_LINK_2 = "https://www.instagram.com/sxcintersummitcompetition/p/C-sK8J5TpDb/";
const LINKEDIN_LINK = "https://id.linkedin.com/company/studentsxceos-summit";

export default function Footer() {
  return (
    <div className="bg-primary-3 h-fit w-full pt-8 sm:py-4 px-8 flex flex-col items-center text-primary-1 font-bold">
      <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between">
        <img src={logo} alt="Logo" className="w-32" />
        <div className="flex flex-col gap-y-2 items-end lg:flex-row lg:gap-x-4 text-xs md:text-sm lg:text-base">
          <div className="flex flex-row items-center lg:gap-2">
            <div className="text-right">
              <a className="hover:text-white" href={INSTAGRAM_LINK_1}>
                <p>@sxcintersummit</p>
              </a>
              <a className="hover:text-white" href={INSTAGRAM_LINK_2}>
                <p>@sxcintersummitcompetition</p>
              </a>
            </div>
            <a href={INSTAGRAM_LINK_1}>
            <img className="w-[2rem] md:w-[3rem]" src={instagram}/>
            </a>
          </div>
          <a href={LINKEDIN_LINK}>  
          <div className="flex flex-row lg:gap-2 items-center text-right hover:text-white">
            <p>StudentsxCEOs International Summit</p>
              <img className="w-[2rem] md:w-[3rem]" src={linkedin}/>
          </div>
          </a>
          <a href={TIKTOK_LINK}>
          <div className="flex flex-row lg:gap-2 items-center text-right hover:text-white">
            <p className="">@intersummitsxc</p>
                <img className="w-[2rem] md:w-[3rem]" src={tiktok}/>
          </div>
          </a>

        </div>
        </div>
        </div>
  );
}
