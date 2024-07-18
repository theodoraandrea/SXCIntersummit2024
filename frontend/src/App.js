import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Register1 from "./pages/register/register1";
import Register2 from "./pages/register/register2";
import UserDashboard from "./pages/user-dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register1/register2/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register1/register2" element={<Register2 />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}
