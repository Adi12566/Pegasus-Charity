import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    axios.get('http://localhost:3001/api/getcampaigndetails') // Replace '/api/transactions' with your actual API endpoint
      .then(response => {
        setTransactions(response.data.data.allCampaignDetails);
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
            <a href="/ngo-dashboard" className="active">
              <i className='bx bx-grid-alt'></i>
              <span className="links_name">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-user'></i>
              <span className="links_name">
                Profile
              </span>
            </a>
          </li>
          <li>
            <a href="/campaign">
              <i className='bx bxs-truck'></i>
              <span className="links_name">
                Manage Campaigns
              </span>
            </a>
          </li>
          <li>
            <a href="/create">
              <i className='bx bx-dollar' ></i>
              <span className="links_name">
                Create Campaigns
              </span>
            </a>
          </li>
          <li>
            <a href="/transaction">
              <i className='bx bx-dollar'></i>
              <span className="links_name">
                Transactions
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-cog'></i>
              <span className="links_name">
                Settings
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

        {/* Transaction Details */}
        <div className="details">
          <div className="recent_project">
            <div className="card_header">
              <h2>Transaction History</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Transaction ID</td>
                  <td>Amount</td>
                  <td>Time of Transaction</td>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.TransactionId}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span className="badge bg_danger">
                        {transaction.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Transactions;
