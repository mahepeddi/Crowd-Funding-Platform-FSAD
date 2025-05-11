import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddManager from './AddManager';
import ViewManagers from './ViewManagers';
import ViewDonors from './ViewDonors';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate(); // Use navigate to programmatically redirect after logout

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/adminlogin'); // Redirect to login page after logout
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addmanager">Add Managers</Link></li>
          <li><Link to="/viewmanagers">View Managers</Link></li>
          <li><Link to="/viewalldonors">View All Donors</Link></li>
          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addmanager" element={<AddManager />} />
        <Route path="/viewmanagers" element={<ViewManagers />} />
        <Route path="/viewalldonors" element={<ViewDonors />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
