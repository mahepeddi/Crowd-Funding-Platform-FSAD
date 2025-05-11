//import React from 'react';
import './style.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <div className="admin-section">
        <h3>Admin</h3>
        <p style={{color:'#333', fontSize:'1.08rem', lineHeight:1.7}}>
          The Admin oversees the entire platform, manages user accounts, approves or removes campaigns, and ensures the security and integrity of the crowdfunding environment. Admins are responsible for maintaining trust, compliance, and smooth operation across all users and activities.
        </p>
      </div>
      <div className="manager-section">
        <h3>Manager</h3>
        <p style={{color:'#333', fontSize:'1.08rem', lineHeight:1.7}}>
          Managers are responsible for creating, updating, and monitoring campaigns. They interact with donors, provide updates, and ensure that all campaign information is accurate and transparent. Managers help drive the success of fundraising efforts on the platform.
        </p>
      </div>
      <div className="customer-section">
        <h3>Donors</h3>
        <p style={{color:'#333', fontSize:'1.08rem', lineHeight:1.7}}>
          Donors are the heart of the platform, supporting campaigns with their contributions. They can browse, select, and donate to causes they care about, track their impact, and become part of a community that empowers change and innovation.
        </p>
      </div>
    </div>
  );
}
