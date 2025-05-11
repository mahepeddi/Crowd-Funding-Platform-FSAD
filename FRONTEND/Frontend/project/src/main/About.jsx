import './style.css'; 

export default function About() 
{
  return (
    <div style={{ textAlign: 'center', marginTop: '32px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', background: 'rgba(255,255,255,0.95)', borderRadius: '18px', boxShadow: '0 4px 16px rgba(30,200,120,0.10)', padding: '2rem' }}>
      <h2 style={{ color: '#0f2027', fontWeight: 800, marginBottom: '1.2rem' }}>About Our Crowdfunding Platform</h2>
      <p style={{ fontSize: '1.15rem', color: '#333', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Our Crowdfunding Platform is a modern, secure, and user-friendly space where dreams and ideas come to life through the power of community support. Whether you are an innovator seeking funds for your next big project, a non-profit aiming to make a difference, or a donor looking to support causes you care about, our platform connects you with a global network of supporters and changemakers.
      </p>
      <ul style={{ textAlign: 'left', color: '#222', fontSize: '1.05rem', margin: '0 auto 1.5rem auto', maxWidth: '600px', lineHeight: 1.7 }}>
        <li><strong>For Creators & Nonprofits:</strong> Launch campaigns, share your story, and raise funds transparently.</li>
        <li><strong>For Donors:</strong> Discover inspiring projects, contribute securely, and track the impact of your donations.</li>
        <li><strong>For Managers & Admins:</strong> Oversee campaigns, ensure compliance, and foster a trustworthy environment.</li>
      </ul>
      <p style={{ fontSize: '1.08rem', color: '#444', marginBottom: '1.5rem' }}>
        We believe in the power of collective action. Our platform offers real-time updates, secure transactions, and a vibrant community to help turn ideas into reality. Join us and be part of a movement that empowers innovation, compassion, and positive change.
      </p>
      {/* Optional: Add a relevant image if available in public/assets */}
      {/* <img src="/crowdfunding.png" alt="Crowdfunding" style={{ width: '220px', marginTop: '18px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(30,200,120,0.10)' }} /> */}
    </div>
  );
}