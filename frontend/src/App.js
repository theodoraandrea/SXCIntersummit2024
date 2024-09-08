import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams, Navigate } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Landing from "./pages/register/landing";
import UserDetails from "./pages/register/user-details";
import UserDashboard from "./pages/user-dashboard";
import Events from "./pages/event";
import DetailEvents from "./pages/event-details/index";
import BMCRegistration from "./pages/event-registration/bmc";
import BMCSummary from "./pages/event-registration/bmc-summary";
import FCEORegistration from "./pages/event-registration/fceo";
import FCEOSummary from "./pages/event-registration/fceo-summary";
import IBPCRegistration from "./pages/event-registration/ibpc";
import IBPCSummary from "./pages/event-registration/ibpc-summary";
import IBCCRegistration from "./pages/event-registration/ibcc";
import IBCCSummary from "./pages/event-registration/ibcc-summary";

import {
  HOME,
  LANDING_PAGE,
  USER_DETAILS_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
  EVENTS_PAGE,
  EVENT_DETAILS,
  BMC_REGIST,
  BMC_REGIST_SUMMARY,
  FCEO_REGIST,
  FCEO_REGIST_SUMMARY,
  IBPC_REGIST,
  IBPC_REGIST_SUMMARY,
  IBCC_REGIST,
  IBCC_REGIST_SUMMARY
} from "./constants/routes";
import { UserProvider } from "./contexts/user-context";

const ProtectedEventDetails = () => {
  const { eventId } = useParams();
  const allowedEventIds = ['event_1', 'event_5', 'event_6', 'event_7', 'comp_1', 'comp_2', 'comp_3'];

  return allowedEventIds.includes(eventId) ? (
    <DetailEvents />
  ) : (
    <Navigate to={HOME} />
  );
}
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
            element={<ProtectedEventDetails />}
          />
          <Route path={BMC_REGIST} element={<BMCRegistration/>} />
          <Route path={BMC_REGIST_SUMMARY} element={<BMCSummary/>}/>
          <Route path={FCEO_REGIST} element={<FCEORegistration />} />
          <Route path={FCEO_REGIST_SUMMARY} element={<FCEOSummary />} />
          <Route path={IBPC_REGIST} element={<IBPCRegistration />} />
          <Route path={IBPC_REGIST_SUMMARY} element={<IBPCSummary />} />
          <Route path={IBCC_REGIST} element={<IBCCRegistration/>} />
          <Route path={IBCC_REGIST_SUMMARY} element={<IBCCSummary />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
