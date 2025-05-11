import { useState, useEffect } from 'react';

export default function DonorProfile() 
{
  const [donor, setDonor] = useState("");
     
  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
     setDonor(JSON.parse(storedDonor));
    }
  }, []);

  if (!donor) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '26px', color: '#333', marginBottom: '20px' }}>
        Donor Profile
      </h2>

      <div
        style={{
          backgroundColor: 'light grey',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '20px',
          width: '350px',
        }}
      >
        <p><strong>Name:</strong> {donor.name}</p>
        <p><strong>Gender:</strong> {donor.gender}</p>
        <p><strong>Date of Birth:</strong> {donor.dob}</p>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>Username:</strong> {donor.username}</p>
        <p><strong>Mobile No:</strong> {donor.mobileno}</p>
        <p><strong>Company:</strong> {donor.location}</p>
      </div>
    </div>
  );
}