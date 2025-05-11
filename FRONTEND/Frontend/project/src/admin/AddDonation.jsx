import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'
import { useAuth } from '../contextapi/AuthContext';

const AddDonation = () => 
{
  const [donation, setDonation] = useState({
    category: '',
    name: '',
    description: '',
    cost: '',
    url: ''
  });
  const [message, setMessage] = useState('');
  const [error,setError] = useState("")

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setDonationImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => 
 {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', donation.category);
    formData.append('name', donation.name);
    formData.append('description', donation.description);
    formData.append('cost', donation.cost);
    formData.append('url', donation.url);

    try 
    {
      const response = await axios.post(`${config.url}/donation/adddonation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Login response:', response);
      setMessage(response.data);
      setError("")

      //Clear form fields
    setDonation({
        category: '',
        name: '',
        description: '',
        cost: '',
        url: ''
      });

    } 
    catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleDonate = (amount = 500) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection or script tag.");
      return;
    }
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: amount * 100,
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
    <div className="container mt-4">
       <h3 style={{ textAlign: "center",textDecoration: "underline"}}>Add Donation</h3>
      {
            message?
            <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{message}</p>:
            <p style={{textAlign: "center",color:"red",fontWeight:"bolder"}}>{error}</p>
      }
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      
      <div className="mb-3">
  <label>Category:</label>
  <select className="form-control" name="category" onChange={handleChange} required>
    <option value="">-- Select Category --</option>
    <option value="Electronics">Electronics</option>
    <option value="Fashion">Fashion</option>
    <option value="Books">Books</option>
    <option value="Others">Others</option>
  </select>
</div>


        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea className="form-control" name="description" rows="3" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Cost:</label>
          <input type="number" step="0.01" className="form-control" name="cost" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>URL:</label>
          <input type="text" className="form-control" name="url" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Donation</button>
        <button onClick={() => handleDonate(500)}>Donate ₹500</button>
      </form>
    </div>
  );
};

export default AddDonation;