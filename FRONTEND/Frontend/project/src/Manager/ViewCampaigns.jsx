import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [managerId, setManagerId] = useState(null);

  // Fetch campaigns when the component mounts
  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      const manager = JSON.parse(storedManager);
      setManagerId(manager.id);
      fetchCampaigns(manager.id);
    } else {
      setError('Manager not logged in!');
    }
  }, []);

  // Function to fetch campaigns from the backend
  const fetchCampaigns = async (managerId) => {
    try {
      const response = await axios.get(`${config.url}/manager/viewcampaignsbymanager/${managerId}`);
      setCampaigns(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch your campaigns');
      setCampaigns([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>My Campaigns</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {campaigns.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No campaigns added yet.</p>
      ) : (
        <table style={{ margin: '0 auto', width: '90%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th>Members</th>
              <th>Donation</th>
              <th>Manager Name</th>
              <th>Manager Email</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.category}</td>
                <td>{campaign.title}</td>
                <td>{campaign.description}</td>
                <td>{campaign.members}</td>
                <td>{campaign.donation}</td>
                <td>{campaign.manager?.name}</td>
                <td>{campaign.manager?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
