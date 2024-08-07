import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Landing from "./pages/register/landing";
import UserDetails from "./pages/register/user-details";
import UserDashboard from "./pages/user-dashboard";
import Events from "./pages/event";
import DetailEvents from "./pages/event-details/index";
import BMC_Regist from "./pages/event-registration/bmc";
import FCEO_Regist from "./pages/event-registration/fceo";
import RegistEvents3 from "./pages/event-registration/fceo-leader";
import RegistEvents4 from "./pages/event-registration/fceo-member";
import RegistEvents5 from "./pages/event-registration/fceo-member2";
import RegistEvents6 from "./pages/event-registration/fceo-summary";

import {
  HOME,
  LANDING_PAGE,
  USER_DETAILS_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
  EVENTS_PAGE,
  FCEO,
  EVENT_DETAILS,
  BMC_REGIST,
  FCEO_REGIST,
  FCEO_REGIST_LEADER,
  FCEO_REGIST_MEMBER_1,
  FCEO_REGIST_MEMBER_2,
  FCEO_REGIST_SUMMARY,
} from "./constants/routes";
import { UserProvider } from "./contexts/user-context";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={LANDING_PAGE} element={<Landing />} />
          <Route path={USER_DETAILS_PAGE} element={<UserDetails />} />
          <Route path={USER_DASHBOARD_PAGE} element={<UserDashboard />} />
          {/* Events */}
          <Route path={EVENTS_PAGE} element={<Events />} />
          <Route
            path={`${EVENT_DETAILS}/:eventId`}
            element={<DetailEvents />}
          />
          <Route path={BMC_REGIST} element={<BMC_Regist />} />
          <Route path={FCEO_REGIST} element={<FCEO_Regist />} />
          <Route path={FCEO_REGIST_LEADER} element={<RegistEvents3 />} />
          <Route path={FCEO_REGIST_MEMBER_1} element={<RegistEvents4 />} />
          <Route path={FCEO_REGIST_MEMBER_2} element={<RegistEvents5 />} />
          <Route path={FCEO_REGIST_SUMMARY} element={<RegistEvents6 />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
