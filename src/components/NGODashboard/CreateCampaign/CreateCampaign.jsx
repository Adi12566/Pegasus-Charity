import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import SimpleStorage from "../../../contracts/SimpleStorage.json";

const useCheckStoredData = () => {
  const checkStoredData = async () => {
    try {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);

      const contractAddress = '0xBC4fCEb2E4b2D989A838209e306b508C660295b0';
      const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

      const storedData = await SimpleStorageContract.methods.getUserDetails().call({ from: (await web3.eth.getAccounts())[0] });

      console.log('User details stored in the blockchain:', storedData);
    } catch (error) {
      console.error('Error reading stored data:', error.message);
    }
  };

  useEffect(() => {
    checkStoredData();
  }, []);

  return checkStoredData;
};

const CreateCampaigns = () => {
  const [campaignData, setCampaignData] = useState({
    campaignName: '',
    ngoname: '',
    description: '',
    uniqueID: '',
    startDate: '',
    endDate: '',
    amount: '',
    walletId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [campaigns, setCampaigns] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit data to the server
      const response = await axios.post('http://localhost:3001/api/storecampaigndetails', campaignData);
      console.log('NGO data submitted successfully:', response.data);

      // Connect to the blockchain
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);

      const contractAddress = '0xBC4fCEb2E4b2D989A838209e306b508C660295b0';
      const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

      const accounts = await web3.eth.getAccounts();

      const gasLimit = 3000000;
      const gasPrice = '5000000000';

      await SimpleStorageContract.methods
        .storeUserDetails(
          campaignData.campaignName,
          campaignData.ngoname,
          campaignData.description,
          campaignData.uniqueID,
          campaignData.startDate,
          campaignData.endDate,
          campaignData.amount,
          campaignData.walletId
        )
        .send({ from: accounts[0], gas: gasLimit, gasPrice: gasPrice });

      console.log('User details stored on the blockchain successfully');

      // Update stored details after a new entry is added
      checkStoredData();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const checkStoredData = useCheckStoredData();

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
      <div style={{ flex: 1, backgroundColor: '#e9ecef', padding: '20px' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
          {/* Toggle Button */}
          <div style={{ fontSize: '24px', cursor: 'pointer' }}>
            <i className='bx bx-menu' id="btn"></i>
          </div>
          {/* Search Bar */}
        </div>
        {/* Campaign Form Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <h1>Create New Campaign</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Campaign Name:
                <input type="text" name="campaignName" value={campaignData.campaignName} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                NGO Name:
                <input type="text" name="ngoname" value={campaignData.ngoname} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Description:
                <input type="text" name="description" value={campaignData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Unique ID:
                <input type="text" name="uniqueID" value={campaignData.uniqueID} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Start Date:
                <input type="date" name="startDate" value={campaignData.startDate} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                End Date:
                <input type="date" name="endDate" value={campaignData.endDate} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Amount:
                <input type="number" name="amount" value={campaignData.amount} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Wallet ID:
                <input type="text" name="walletId" value={campaignData.walletId} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </label>
            </div>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
              Create Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaigns;
