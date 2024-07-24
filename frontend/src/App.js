import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Register1 from "./pages/register/register1";
import Register2 from "./pages/register/register2";
import UserDashboard from "./pages/user-dashboard";
import {
  HOME,
  HOME2,
  HOME3,
  REGISTER_PAGE,
  FILL_DETAILS_PAGE,
  USER_DASHBOARD_PAGE,
  ABOUT_PAGE,
} from "./constants/routes";
import { UserProvider } from "./contexts/user-context";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={HOME2} element={<Home />} />
          <Route path={HOME3} element={<Home />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={REGISTER_PAGE} element={<Register1 />} />
          <Route path={FILL_DETAILS_PAGE} element={<Register2 />} />
          <Route path={USER_DASHBOARD_PAGE} element={<UserDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
