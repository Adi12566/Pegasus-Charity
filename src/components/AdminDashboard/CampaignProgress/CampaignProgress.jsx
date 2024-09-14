import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css';

const CampaignProgress = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/storecampaignbalance')
      .then(response => {
        // Check if the 'data' property exists and is an array
        const campaignsArray = response.data.data.allCampaignDetails;
        console.log(campaignsArray)
        if (Array.isArray(campaignsArray)) {
          setCampaigns(campaignsArray);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  return (
    <div className='ngodashboard'>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo_details">
          <i className='bx bx-code-alt'></i>
          <div className="logo_name">
            Pegasus Charity
          </div>
        </div>
        {/* Menu Links */}
        <ul>
          <li>
            <a href="/admin-dashboard" className="active">
              <i className='bx bx-grid-alt'></i>
              <span className="links_name">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a href="/campaign-progress">
              <i className='bx bxs-truck'></i>
              <span className="links_name">
                Campaign Progress
              </span>
            </a>
          </li>
          <li>
            <a href="/campaign">
              <i className='bx bxs-truck'></i>
              <span className="links_name">
                NGO requests
              </span>
            </a>
          </li>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <li>
            <a href="/ngo-login">
              <i className='bx bx-cog'></i>
              <span className="links_name login_out">
                Log Out
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="home_section">
        {/* Top Bar */}
        <div className="topbar">
          {/* Toggle Button */}
          <div className="toggle">
            <i className='bx bx-menu' id="btn"></i>
          </div>
          {/* Search Bar */}
          <div className="search_wrapper">
            <label>
              <span>
                <i className='bx bx-search'></i>
              </span>
              <input type="search" placeholder="Search..." />
            </label>
          </div>
          {/* User Avatar */}
          <div className="user_wrapper">
            <img src="img/avatar-6.jpg" alt="" />
          </div>
        </div>

        {/* Campaign Details */}
        <div className="details">
          <div className="recent_project" style={{paddingLeft:130, width: '1500px'}}>
            <div className="card_header">
              <h2>Campaigns Uploaded</h2>
            </div>
            <div className='table-responsive'>
            <table>
              <thead>
                <tr>
                  <td>Campaign Name</td>
                  {/* <td>NGO Name</td>
                  <td>Description</td>
                  <td>Status</td>
                  <td>Start Date</td>
                  <td>End Date</td>
                  <td>Amount</td> */}
                <td>uniqueId</td> 

                  <td>Balance</td>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td>{campaign.campaignName}</td>
                    {/* <td>{campaign.ngoname}</td>
                    <td className="description-cell" style={{width:'10px'}}>{campaign.description}</td>
                    <td>{campaign.status}</td>
                    <td>{campaign.startDate}</td>
                    <td>{campaign.endDate}</td>
                    <td>{campaign.amount}</td> */}
                    <td>{campaign.uniqueID}</td>

                    <td>{campaign.userInput}</td>
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

export default CampaignProgress;
