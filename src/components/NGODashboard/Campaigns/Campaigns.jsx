import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css';
import ProgressBar from './ProgressBar'; // Ensure the path is correct
import { format } from 'date-fns';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [upperlimittemp, setupperlimittemp] = useState([]);
  const [currentlimit, setcurrentlimit] = useState([]);
  let realupper;

  useEffect(() => {
    axios.get('http://localhost:3001/api/getcampaigndetails/particular')
      .then(response => {
        const campaignsArray = response.data.data.allCampaignDetails;
        if (Array.isArray(campaignsArray)) {
          setCampaigns(campaignsArray);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get('http://localhost:3001/api/compare')
      .then(response => {
        const campaignscompare = response.data.data;
        setcurrentlimit(response.data.data.Currentlimit);
        const upperlimitValue = response.data.data.Upperlimit[0];
        setupperlimittemp(upperlimitValue);
        realupper = upperlimitValue;
        console.log('Upperlimit Value:', upperlimitValue);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#343a40', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#fff' }}>
          <i className='bx bx-code-alt' style={{ fontSize: '24px', marginRight: '10px' }}></i>
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Pegasus Charity</div>
        </div>
        {/* Menu Links */}
        <ul style={{ listStyleType: 'none', padding: '0', color: '#fff' }}>
          <li style={{ marginBottom: '15px' }}>
            <a href="/ngo-dashboard" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <i className='bx bx-grid-alt' style={{ fontSize: '20px', marginRight: '10px' }}></i>
              <span style={{fontSize: '22px'}}>Dashboard</span>
            </a>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <a href="/campaign" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <i className='bx bxs-truck' style={{ fontSize: '20px', marginRight: '10px' }}></i>
              <span style={{fontSize: '22px'}}>View Campaigns</span>
            </a>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <a href="/create" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
              <i className='bx bx-dollar' style={{ fontSize: '20px', marginRight: '10px' }}></i>
              <span style={{fontSize: '22px'}}>Create Campaigns</span>
            </a>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <i className='bx bx-cog' style={{ fontSize: '20px', marginRight: '10px' }}></i>
              <span style={{fontSize: '22px'}}>Log Out</span>
            </a>
          </li>
        </ul>
      </div>


      {/* Main Content */}
      <div className="home_section" style={{ marginLeft: '50px', padding: '20px' }}>
        {/* Top Bar */}
        <div className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          {/* Toggle Button */}
          <div className="toggle" style={{ cursor: 'pointer' }}>
            <i className='bx bx-menu' id="btn" style={{ fontSize: '24px' }}></i>
          </div>
          {/* Search Bar */}
        </div>

        {/* Campaign Details */}
        <div className="details" style={{ marginTop: '20px' }}>
          <div className="recent_project" style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div className="card_header" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', margin: '0' }}>Campaigns Uploaded</h2>
            </div>
            <div className='table-responsive'>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Campaign Name</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>NGO Name</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Description</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Start Date</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>End Date</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}></th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Target Amount</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Current Amount</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <tr key={index}>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{campaign.campaignName}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{campaign.ngoname}</td>
                      <td className="description-cell" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{campaign.description}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{format(new Date(campaign.startDate), 'MM/dd/yyyy')}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{format(new Date(campaign.endDate), 'MM/dd/yyyy')}</td>
                      <td></td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{upperlimittemp}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{currentlimit}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                        <ProgressBar 
                          currentValue={currentlimit} 
                          targetValue={upperlimittemp}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Script tag */}
      <script>
        {`
          let sidebar = document.querySelector(".sidebar");
          let closeBtn = document.querySelector("#btn");

          closeBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            // call function
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

export default Campaigns;
