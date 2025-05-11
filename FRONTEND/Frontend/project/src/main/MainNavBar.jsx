import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';
import DonorLogin from './../donor/DonorLogin';
import DonorRegistration from './../donor/DonorRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import ManagerLogin from '../Manager/ManagerLogin';

export default function MainNavBar() 
{
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-center">
          <div className="logo">Crowd funding platform</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/donorregistration">Register</Link></li>
            <li className="dropdown">
              <span>Login ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/donorlogin">donor</Link></li>
                <li><Link to="/managerlogin">Manager</Link></li>
                <li><Link to="/adminlogin">Admin</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/donorregistration" element={<DonorRegistration />} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/managerlogin" element={<ManagerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
      </Routes>
    </div>
  );
}
