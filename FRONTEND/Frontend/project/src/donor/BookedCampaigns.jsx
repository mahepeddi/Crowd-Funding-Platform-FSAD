import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function BookedCampaigns() {
  const [bookedCampaigns, setBookedCampaigns] = useState([]);
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const fetchBookedCampaigns = async () => {
      const storedDonor = sessionStorage.getItem('donor');
      if (storedDonor) {
        const donorData = JSON.parse(storedDonor);
        setDonor(donorData);
        try {
          const response = await axios.get(`${config.url}/donor/bookedcampaigns/${donorData.id}`);
          setBookedCampaigns(response.data);
        } catch (error) {
          console.error('Error fetching booked campaigns:', error);
        }
      } else {
        alert('Please log in to view your booked campaigns.');
      }
    };

    fetchBookedCampaigns();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Your Booked Campaigns</h3>
      {donor ? (
        <div>
          <table style={{ width: '100%', textAlign: 'center', marginBottom: '30px' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th>Booking ID</th>
                <th>Campaigns Category</th>
                <th>Campaign Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booked members</th>
                <th>Status</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {
                bookedCampaigns.length > 0 ? bookedCampaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td>{campaign.id}</td>
                    <td>{campaign.campaign.category}</td>
                    <td>{campaign.campaign.title}</td>
                    <td>{campaign.startdate}</td>
                    <td>{campaign.enddate}</td>
                    <td>{campaign.bookedcapacity}</td>
                    <td>{campaign.status}</td>
                    <td>{new Date(campaign.bookingtime).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8">No booked campaigns found.</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading your details...</p>
      )}
    </div>
  );
}