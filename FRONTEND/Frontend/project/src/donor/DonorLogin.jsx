import { useState } from 'react';
import './donor.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function DonorLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsDonorLoggedIn } = useAuth();  // Access setIsDonorLoggedIn from AuthContext

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${config.url}/donor/checkdonorlogin`, formData);

      if (response.status === 200) {
        setIsDonorLoggedIn(true);  // Set donor login status
        sessionStorage.setItem('donor', JSON.stringify(response.data));
        navigate('/donorhome');  // Redirect donor to their home page
      } else {
        setMessage(response.data);
      }

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(error.response.data || "Invalid username or password.");
      } else if (error.request) {
        setError("No response from server. Check if backend is running.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="donor-login-container">
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Donor Login</h3>

      {message && (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="donor-login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
