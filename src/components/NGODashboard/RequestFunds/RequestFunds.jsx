import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css';
import ProgressBar from '../Campaigns/ProgressBar';

const RequestFunds = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [upperlimittemp,setupperlimittemp]= useState([]);
  const [currentlimit,setcurrentlimit]= useState([]);
  var realupper
  var isFieldDisabled=true
  
  const [campaignData, setCampaignData] = useState({
    UniqueID: '',
    Reason: '',
    Amount: ''
    // Add other campaign details here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/api/storeData/api/debitbalance', campaignData);
    console.log(response)
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/storeparticularcampaignbalance')
      .then(response => {
        const campaignsArray = response.data.data.allCampaignDetails;
        console.log(campaignsArray);
        if (Array.isArray(campaignsArray)) {
          setCampaigns(campaignsArray);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })


      axios.get('http://localhost:3001/api/compare')
      .then(response => {
        const campaignscompare = response.data.data;
        setcurrentlimit(response.data.data.Currentlimit);
        const upperlimitValue = response.data.data.Upperlimit[0];
        setupperlimittemp(upperlimitValue);
        realupper = upperlimitValue;
        console.log('Upperlimit Value:', upperlimitValue);
        console.log('currentlimit Value:', currentlimit[0]);


        if(currentlimit>upperlimitValue)
        {
          isFieldDisabled=false

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
                View Campaigns
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
            <a href="#">
              <i className='bx bx-cog'></i>
              <span className="links_name">
                Request Funds
              </span>
            </a>
          </li>
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
        <div className="details">
        <div className="recent_project" style={{ marginLeft: '250px', width: '1500px' }}>
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
                  <td>Progress</td>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td>{campaign.campaignName}</td>
                    <td>{campaign.uniqueID}</td>
                    <td>{campaign.userInput}</td>
                    <td><ProgressBar 
                    currentValue={currentlimit} 
                    targetValue={upperlimittemp}
                  /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div className="card campaign-form-card">
          <h2>Create New Campaign</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Enter UniqueID
              <input type="text" name="UniqueID" value={campaignData.UniqueID} onChange={handleChange} required />
            </label>
            <label>
              Enter Reason
              <input type="text" name="Reason" value={campaignData.Reason} onChange={handleChange} required />
            </label>
            <label>
  Enter Amount
  <input
    type="text"
    name="Amount"
    value={campaignData.Amount}  // Set the value to the constant value
    onChange={handleChange}
    required
    //disabled={isFieldDisabled}  // Disable the field based on the variable
    //style={{ backgroundColor: isFieldDisabled ? "#dullColor" : "#normalColor" }}  // Set dull color when disabled
  />
</label>

         
            {/* Add other campaign details input fields here */}
            <button
      //disabled={isFieldDisabled}
      //style={{ backgroundColor: isFieldDisabled ? "#dullColor" : "#normalColor" }}
      type="submit"
    >
      Submit
    </button>

          </form>
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


export default RequestFunds;

