import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayDonations = () => 
{
  const [donations, setDonations] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [donationDetails, setDonationsDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllDonations();
  }, []);

  const fetchAllDonations = async () => {
    try {
      const response = await axios.get(`${config.url}/donation/viewalldonation`);
      setDonations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch donations: ' + err.message);
    }
  };

  const fetchDonationById = async (id) => {
    try {
      const response = await axios.post(`${config.url}/donation/displaydonationbyid?pid=${id}`);
      setDonationDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching donation: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchDonationById(id);
    } 
    else 
    {
      setDonationDetails(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Donation Details</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Donation:</strong></label>
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Donation --</option>
          {donations.map(donation => (
            <option key={donation.id} value={donation.id}>
              {donation.name}
            </option>
          ))}
        </select>
      </div>

      {donationDetails && (
        <div className="card mt-3">
          <img
            src={`${config.url}/donation/displaydonationimage?id=${donationDetails.id}`}
            className="card-img-top"
            alt="Donation"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{donationDetails.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {donationDetails.category}<br />
              <strong>Description:</strong> {donationDetails.description}<br />
              <strong>Cost:</strong> ₹{donationDetails.cost}<br />
              <strong>URL:</strong> <a href={donationDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDonations;