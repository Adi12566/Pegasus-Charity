import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const getRandomColor = () => {
  // Generate a random color in rgba format with 10% opacity
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.1)`;
  return randomColor;
};

const extractKeywords = (campaignName) => {
  // Split the campaignName into words
  const words = campaignName.split(' ');

  // Use the first word as the keyword, or combine a few words if needed
  const keyword = words.slice(0, 2).join(','); // Combining first two words as an example

  return keyword;
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
      // Your POST request to the donation endpoint
      const response = await axios.post('http://localhost:3001/api/uniquecampaignid', { campaignId });
      const responseget = await axios.get('http://localhost:3001/api/uniquecampaignid');
      var helpingid = responseget.data.data.allCampaignDetails[0].uniqueID;
      const responsepost = await axios.post('http://localhost:3001/api/help', { helpingid });
      window.location.href = '/gatewaylink';
      // Log the response from the server
    } catch (error) {
      console.error('Error donating:', error);
      // Handle error as needed
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
        <a href='\'>
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
              <p style={{ fontSize: "30px", textAlign: "center"}}>
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
                        src={`https://source.unsplash.com/512x768/?${extractKeywords(campaign.campaignName)}`}
                        className="img"
                        alt={campaign.campaignName}
                        onError={(e) => e.target.src = 'https://img.freepik.com/premium-vector/helping-hand-concept-gesture-sign-help-hope-two-hands-taking-each-other_158483-1746.jpg?w=740'} // Fallback image
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
        Pegasus Foundation is more than just a marketing agency. We are a team of dedicated professionals committed to making a positive impact on the world. Our mission is to bridge the gap between innovative ideas and actionable strategies, helping our clients achieve their goals while contributing to the greater good.
      </p>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        Founded on the principles of integrity, creativity, and excellence, Pegasus Foundation specializes in delivering comprehensive solutions that drive growth and foster sustainable success. We leverage cutting-edge technology and data-driven insights to create tailored strategies that meet the unique needs of each client.
      </p>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        Our team brings together a wealth of experience across various industries, ensuring that we offer a diverse range of services designed to address the specific challenges and opportunities faced by our clients. From developing impactful marketing campaigns to optimizing online presence, we are here to support you every step of the way.
      </p>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        At Pegasus Foundation, we believe in the power of collaboration and transparency. We work closely with our clients to understand their vision and goals, providing clear communication and regular updates throughout the process. Our commitment to excellence drives us to continually seek out new and innovative ways to deliver outstanding results.
      </p>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        Beyond our professional services, we are passionate about giving back to the community and supporting causes that align with our values. We actively engage in charitable initiatives and partnerships that contribute to positive change and make a meaningful difference in the lives of others.
      </p>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        Join us on this journey of growth and impact. Discover how Pegasus Foundation can help you reach new heights and make a lasting impression. We are excited to collaborate with you and explore the endless possibilities that lie ahead.
      </p>
    </div>
  </section>
</div>



        {/* Section 3: Contact */}
        <div className="sectionCard" style={{ backgroundColor: '#E85C0D' }}>
          <section id="contact" style={{ backgroundColor: '#E85C0D' }}>
            <div className='dono' element id='contact' style={{ backgroundColor: '#E85C0D' }}>
              <h1 style={{ color: 'white' }}>Contact Us</h1>
              <p style={{ color: 'white' }}>
                Have questions or want to collaborate? Reach out to us, and let's discuss how we can work together to achieve great things.
              </p>
              {/* Contact form or details... */}
              <p style={{ color: 'white' }}>Follow us on social media:</p>
              <p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/picons-social/57/46-facebook-512.png"
                    alt="Facebook"
                    style={{ width: '50px', height: '50px' }} // Adjust the width and height as needed
                  />
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Section 4: Footer */}
        <div className="sectionCard" style={{ backgroundColor: '#C7253E' }}>
          <footer style={{ backgroundColor: '#C7253E' }}>
            <p>&copy; 2024 Pegasus Foundation. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Script tag */}
      <script>
        {`
          let sidebar = document.querySelector(".sidebar");
          let closeBtn = document.querySelector("#btn");

          closeBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            changeBtn();
          });

          function changeBtn() {
            if (sidebar.classList.contains("open")) {
              closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
              closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }
          }
        `}
      </script>
    </div>
  );
};

export default UserAdPage;
