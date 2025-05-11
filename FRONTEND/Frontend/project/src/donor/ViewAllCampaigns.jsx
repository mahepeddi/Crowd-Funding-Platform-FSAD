import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './donor.css'; // Include the custom CSS

export default function ViewAllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    manager: '',
    company: '',
    category: '',
    title: '',
    description: '',
    members: '',
    donations: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch(`${config.url}/donor/viewallcampaigns`);
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleBookClick = (campaignId) => {
    const donor = JSON.parse(sessionStorage.getItem("donor"));
    if (!donor || !donor.id) {
      alert("Donor not logged in");
      return;
    }
    navigate(`/bookcampaign?campaignid=${campaignId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    return (
      campaign.id.toString().includes(searchTerms.id) &&
      campaign.manager?.name.toLowerCase().includes(searchTerms.manager.toLowerCase()) &&
      campaign.manager?.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      campaign.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      campaign.title.toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      campaign.description.toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      campaign.members.toString().includes(searchTerms.members) &&
      campaign.donations.toString().includes(searchTerms.donations)
    );
  });

  return (
    <div className="campaign-container">
      <h3 className="campaign-heading">Available Campaigns</h3>
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Campaign ID</th>
            <th>Company Name</th>
            <th>Company Location</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Members</th>
            <th>Donations</th>
            <th>Action</th>
          </tr>
          <tr>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'id')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'manager')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'company')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'category')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'title')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'description')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'members')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'donations')} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(campaign => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.manager?.company_name}</td>
                <td>{campaign.manager?.company_location}</td>
                <td>{campaign.category}</td>
                <td>{campaign.title}</td>
                <td>{campaign.description}</td>
                <td>{campaign.members}</td>
                <td>{campaign.donations}</td>
                <td>
                  <button className="book-button" onClick={() => handleBookClick(campaign.id)}>Book</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No matching campaigns found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
