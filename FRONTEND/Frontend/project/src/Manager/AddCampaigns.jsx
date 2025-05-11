import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddCampaigns() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    members: '',
    donations: ''
  });

  const [manager, setManager] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      setManager(JSON.parse(storedManager));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manager || !manager.id) {
      setError("Manager not logged in.");
      return;
    }

    const campaignData = {
      ...formData,
      manager_id: manager.id
    };

    try {
      const response = await axios.post(`${config.url}/manager/addcampaign`, campaignData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          category: '',
          title: '',
          description: '',
          members: '',
          donations: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data || 'Something went wrong.');
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add New Campaigns</h3>

      {message && <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p>}
      {error && <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div>
          <label>Category</label>
          <input type="text" id="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Members</label>
          <input type="number" id="members" value={formData.members} onChange={handleChange} required />
        </div>
        <div>
          <label>Donations</label>
          <input type="number" step="0.01" id="donations" value={formData.donations} onChange={handleChange} required />
        </div>
        <button type="submit">Add Campaign</button>
      </form>
    </div>
  );
}
