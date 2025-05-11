import { Routes, Route, Link } from 'react-router-dom';
import './donor.css';
import DonorHome from './DonorHome';
import DonorProfile from './DonorProfile';
import DonorLogin from './DonorLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import BookCampaign from './BookCampaign';
import ViewAllCampaigns from './ViewAllCampaigns';
import BookedCampaigns from './BookedCampaigns';

export default function DonorNavBar() 
{
  const { setIsDonorLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
    setIsDonorLoggedIn(false);
    sessionStorage.clear()
  };

  // Razorpay payment handler
  const handleDonate = (amount = 500) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Crowdfunding Platform",
      description: "Donation",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Optionally, send payment ID to backend for verification
      },
      prefill: {
        name: "Donor Name",
        email: "donor@example.com",
      },
      theme: {
        color: "#1de982",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Donor</div>
        <ul className="nav-links">
          <li><Link to="/Donorhome">Home</Link></li>
          <li><Link to="/donorprofile">Donor Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/viewallCampaigns">view Campaigns</Link></li>
          <li><Link to="/bookedcampaigns">Booked Campaigns</Link></li>
          <li><button style={{background: 'linear-gradient(90deg, #1de982 0%, #0f2027 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', cursor: 'pointer', fontWeight: 600}} onClick={() => handleDonate(500)}>Donate</button></li>
          <li><Link to="/donorlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/donorhome" element={<DonorHome />} exact />
        <Route path="/donorprofile" element={<DonorProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/viewallcampaigns" element={<ViewAllCampaigns/>} exact />
        <Route path="/bookcampaign" element={<BookCampaign/>} />
        <Route path="/bookedcampaigns" element={<BookedCampaigns/>} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
      </Routes>
    </div>
  );
}