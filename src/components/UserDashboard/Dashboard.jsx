import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import UserProfile from '../UserProfile/UserProfile';
import UserCampaigns from '../UserCampaign/UserCampaign';
import { Link } from 'react-router-dom';
import cashFlowImage from '../Images/cash-flow.png';
import blockchain from '../Images/blockchain.png';
import statistics from '../Images/statistics.png';

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x21402d28e89210CB83ED0a956e14E89486696846&apikey=522S41AYJWE1TPGCXNF2RYKEIA228HUIA4'); // Replace with your API URL
        setTransactions(response.data.result); // Assuming the data is in response.data.result
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dono">
      {/* Header and other content */}
      <header>
        <div className="header" style={{ backgroundColor: '#FABC3F' }}>
          <a href='\\'>
            <h2>Pegasus Charity</h2>
          </a>
          <div className="button-card">
            <Link to="/user" className="metamask-button" style={{ marginLeft: '1600px', padding: '25px', backgroundColor: '#E85C0D' }}>
              <span>Donate</span>
            </Link>
          </div>
          <div className="button-card">
            <Link to="/user-login" className="metamask-button" style={{ marginLeft: '12px', padding: '25px', backgroundColor: '#E85C0D' }}>
              <span>Log Out</span>
            </Link>
          </div>
        </div>
      </header>

      
      
      <hr />
      
      <div style={{ padding: "19px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ fontSize: "47px", color: "#6439FF", marginBottom: "10px" }}>
          Hey There, Welcome Back!
        </h1>
        <p style={{ fontSize: "21px", color: "#333", marginTop: "10px" }}>
          We’re thrilled to have you back! Your commitment to our cause is truly inspiring. As always, we are dedicated to keeping you updated on the latest developments and providing you with tools to make your involvement even more impactful. Whether you’re here to track your contributions, explore recent transactions, or just catch up on what’s new, we’ve got you covered.
        </p>

        <p style={{ fontSize: "21px", color: "#333", marginTop: "20px" }}>
          Dive into the dashboard to see a detailed overview of your recent transactions. Our easy-to-read tables and insightful graphs give you a clear picture of your activities and their impact. We’ve also incorporated advanced visualizations to help you better understand transaction trends and make informed decisions about future contributions.
        </p>

        <p style={{ fontSize: "21px", color: "#333", marginTop: "20px" }}>
          Explore the latest campaigns and initiatives by navigating through the user dashboard. We regularly update our campaigns to align with our mission and current needs, so you always have new opportunities to make a difference. Your support helps drive our efforts forward, and we want to ensure you’re always aware of how your contributions are making an impact.
        </p>

        <p style={{ fontSize: "21px", color: "#333", marginTop: "20px" }}>
          If you have any questions or need assistance, don’t hesitate to reach out. Our support team is here to help you navigate through any issues or queries you might have. You can also check out our FAQ section for quick answers to common questions. We’re here to make your experience as smooth and rewarding as possible.
        </p>
        <div className="home_content">
         <div className="details">
          <div className="sectionCard">
            <h1>Latest Transactions</h1>
            <table>
              <thead>
                <tr>
                  <th>Block Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td style={{ width: '50%' }}>{transaction.blockNumber}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.value / 1000000000000000000}</td>
                    {/* Add more data cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <h1 style={{ fontSize: "47px", color: "#6439FF", marginBottom: "10px" }}>
          IMPORTANT NOTICE FOR TAX BARRER'S
        </h1>
        <p style={{ fontSize: "21px", color: "#333", marginTop: "20px" }}>
        To claim the deduction under section 80G, the taxpayer must obtain a receipt or 80G certificate from the institution or fund to which the donation has been made. The receipt should contain the name and address and PAN no.
        </p>

        

        <div style={{ marginTop: "39px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "250px" }}>
            <img 
              src={cashFlowImage}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
            />
          </div>

          <div style={{ textAlign: "center", maxWidth: "250px" }}>
            <img 
              src={blockchain}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
            />
          </div>

          <div style={{ textAlign: "center", maxWidth: "250px" }}>
            <img 
              src={statistics} 
              style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
            />
          </div>
        </div>
        <br/><br/><br/><br/><br/>
        <div style={{ marginTop: "20px" }}>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
