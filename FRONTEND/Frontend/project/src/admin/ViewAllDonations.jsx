import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

const ViewAllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/donation/viewalldonations`);
      setDonations(response.data);
      setError('');
    } 
    catch (err) 
    {
      setError('Failed to fetch donations. ' + err.message);
    }
  };

  return (
    <div className="donation-table-container">
      <h3 className="donation-heading">All Donations</h3>

      <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{error}</p>

      <div className="table-responsive">
        <table className="donation-table" style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index}>
                <td>{donation.id}</td>
                <td>{donation.name}</td>
                <td>{donation.category}</td>
                <td>{donation.description}</td>
                <td>₹{donation.cost}</td>
                <td>
                  <a href={donation.url} target="_new" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <img
                    src={`${config.url}/donation/displaydonationimage?id=${donation.id}`}
                    alt="Donation"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllDonations;