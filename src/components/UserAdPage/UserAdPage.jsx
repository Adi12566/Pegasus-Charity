import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

// Utility function to get a random image
const imageLabels = {
  flood: [
    'flood_1.jpeg',
    'flood_2.jpeg',
    'flood_3.jpeg',
  ],
  feed: [
    'food_donation1.jpeg',
    'food_2.jpeg',
    'food_3.jpeg',
    'food_4.jpeg',
  ],
  educate: [
    'edu_1.jpeg',
    'edu_2.jpeg',
    'edu_3.jpeg',
  ],
  clothes: [
    'Clothes_1.jpeg',
    'clothes_2.jpeg',
    'clothes_3.jpeg',
  ],
  // Add more labels and image names here
};

const getRandomImage = (keyword) => {
  console.log(`Keyword for image: ${keyword}`); // Debugging line
  const label = Object.keys(imageLabels).find(label => keyword.includes(label));
  console.log(`Label found: ${label}`); // Debugging line
  if (label) {
    const images = imageLabels[label];
    const randomIndex = Math.floor(Math.random() * images.length);
    const imagePath = `/images/${images[randomIndex]}`;
    console.log(`Image path: ${imagePath}`); // Debugging line
    return imagePath;
  }
  // Return a default image if no label matches
  return '/images/default.jpg';
};

// Utility function to extract keywords from campaign name
const extractKeywords = (campaignName) => {
  const words = campaignName.split(' ');
  const keyword = words.slice(0, 2).join(','); // Combining first two words as an example
  return keyword.toLowerCase(); // Ensure keyword is in lower case for matching
};

const getRandomColor = () => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.1)`;
  return randomColor;
};

const UserAdPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getcampaigndetails');
        setCampaigns(response.data.data.allCampaignDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDonateClick = async (campaignId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/uniquecampaignid', { campaignId });
      const responseget = await axios.get('http://localhost:3001/api/uniquecampaignid');
      const helpingid = responseget.data.data.allCampaignDetails[0].uniqueID;
      await axios.post('http://localhost:3001/api/help', { helpingid });
      window.location.href = '/gatewaylink';
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Main Content */}
      <div className="dono">
        {/* Header */}
        <div className="header" style={{ backgroundColor: '#FABC3F' }}>
          <a href='/'>
            <h2>Pegasus Charity</h2>
          </a>
        </div>
        {/* Campaign Details */}
        <div className="dono" id='details' style={{ paddingBottom: "100px" }}>
          <div className="recent_project">
            <div className="card_header">
              <pre>
                <h1 style={{ fontSize: "30px", textAlign: "center" }}>Transform Lives with Your Contribution</h1>
              </pre>
              <br/>
              <p style={{ fontSize: "30px", textAlign: "center" }}>
                Explore and support the latest campaigns addressing critical issues across the globe. Your donation can make a significant impact.
              </p>
            </div>
            <h1 style={{ fontSize: "30px", textAlign: "center" }}>Current Campaigns</h1><br/>
            <div className='sectionCard'>
              <div className="dono" id="imgCards">
                {Array.isArray(campaigns) && campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <div key={campaign._id} className="card" style={{ backgroundColor: getRandomColor() }}>
                      <img
                        src={getRandomImage(extractKeywords(campaign.campaignName))}
                        className="img"
                        alt={campaign.campaignName}
                      />
                      <h3>{campaign.campaignName}</h3>
                      <p>{campaign.ngoName}</p>
                      <button onClick={() => handleDonateClick(campaign._id)}>Donate now</button>
                    </div>
                  ))
                ) : (
                  <p>No campaigns to display.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Services */}
        <div className="sectionCard" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <section id="services">
            <div>
              <h1 style={{ fontSize: '36px', color: '#333' }}>Our Services</h1>
              <p style={{ fontSize: '30px', lineHeight: '1.6', color: '#333' }}>
                At Pegasus Foundation, we are committed to providing exceptional services tailored to meet your unique needs. Our diverse range of services is designed to support your growth and success. Here’s a closer look at what we offer:
              </p>

              <ul style={{ listStyleType: 'disc', paddingLeft: '10px', fontSize: '20px', color: '#555' }}>
                <li><strong>Online Presence Management:</strong> Enhance your digital footprint with our comprehensive online presence solutions. From website development to SEO optimization, we ensure your brand stands out in the digital landscape.</li>
                <li><strong>Targeted Marketing Campaigns:</strong> Reach your target audience effectively with our data-driven marketing campaigns. We create and manage strategies that maximize your ROI and drive meaningful engagement.</li>
                <li><strong>Content Creation:</strong> Engage your audience with high-quality content tailored to your brand’s voice. Our content creation services include blog writing, social media posts, and multimedia content that captures attention and delivers results.</li>
                <li><strong>Consulting Services:</strong> Benefit from expert advice and strategies to streamline your operations and achieve your business goals. Our consulting services cover various aspects, including business development, strategy planning, and market analysis.</li>
                <li><strong>Fundraising Support:</strong> Drive impactful fundraising efforts with our support. We assist in organizing events, managing donor relations, and creating compelling campaigns to boost your fundraising success.</li>
                <li><strong>Community Engagement:</strong> Strengthen your connection with the community through our engagement programs. We help you build meaningful relationships and create positive impacts through community initiatives and outreach efforts.</li>
              </ul>
              <p style={{ fontSize: '24px', lineHeight: '1.6', color: '#333' }}>
                Our team of dedicated professionals is here to provide you with the tools and support needed to thrive. Whether you're looking to enhance your online presence, boost your marketing efforts, or engage with your community, we have the expertise to help you achieve your goals.
              </p>
              <p style={{ fontSize: '24px', lineHeight: '1.6', color: '#333' }}>
                Explore our services and discover how we can partner with you to drive success. For more information or to get started, <a href="/contact" style={{ color: '#E85C0D', textDecoration: 'underline' }}>contact us</a> today!
              </p>
            </div>
          </section>
        </div>

        {/* Section 2: About Us */}
        <div className="sectionCard" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <section id="about">
            <div>
              <h1 style={{ fontSize: '24px', color: '#333' }}>About Pegasus Foundation</h1>
              <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
                Pegasus Foundation is more than just a marketing agency. We are a team of dedicated professionals committed to making a difference in the world through our comprehensive services and community-driven initiatives. Our mission is to empower businesses and organizations to reach their full potential while positively impacting society.
              </p>
              <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
                With a passion for innovation and excellence, we strive to deliver outstanding results in every project we undertake. Our approach combines creativity, expertise, and a deep understanding of market trends to provide solutions that drive success.
              </p>
              <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
                At Pegasus Foundation, we believe in the power of collaboration and partnership. We work closely with our clients to understand their unique needs and goals, tailoring our services to meet their specific requirements. Our commitment to integrity, transparency, and client satisfaction sets us apart as a trusted partner in your journey to success.
              </p>
              <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
                Join us in our mission to create positive change and achieve remarkable results. Together, we can make a meaningful impact and drive progress in the world. For more information about our services or to get in touch with our team, <a href="/contact" style={{ color: '#E85C0D', textDecoration: 'underline' }}>contact us</a> today!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserAdPage;
