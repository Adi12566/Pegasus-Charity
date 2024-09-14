import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../NGODashboard/main.css'
import { format } from 'date-fns';
const UserCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getcampaigndetails/')
      .then(response => {
        // Check if the 'data' property exists and is an array
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
  }, []);
  

  return (
    <div className='userdashboard'>
      {/* Sidebar */}
      {/* Main Content */}
        {/* Campaign Details */}
        <div className="details">
          <div className="recent_project" style={{margin:'0px'}}>
            <div className="card_header" style={{margin:'0px', height:'10px'}}>
              <h2>Campaigns Uploaded</h2>
            </div>
            <table style={{marginTop:'0px'}}>
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>NGO Name</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Wallet ID</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td>{campaign.campaignName}</td>
                    <td></td>
                    <td></td>
                    <td>{campaign.ngoname}</td>
                    <td>{campaign.status}</td>
                    <td>{format(new Date(campaign.startDate), 'MM/dd/yyyy')}</td>
                    {/* Format End Date */}
                    <td>{format(new Date(campaign.endDate), 'MM/dd/yyyy')}</td>
                    <td>{campaign.amount}</td>
                    <td>{campaign.walletId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>  
      </div>
  );
};

export default UserCampaigns;
