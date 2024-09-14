import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import CurrencyToEthConverter from './currencytoethconverter';
import '../UserAdPage/style.css';
import SimpleStorage from "../../../src/contracts/SimpleStorage.json";

const Transaction = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [userInput, setUserInput] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [debitCampaigns, setDebitCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempaccounts, setAccountstemp] = useState([]);
  var data;
  var uniqueID;
  var campaignName;
  var objid;
  var value;
  var firstAccount
  var realaccounts

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/uniquecampaignid');
      setCampaigns(response.data.data.allCampaignDetails);

      const allocatedResp = await axios.get('http://localhost:3001/api/storeData/api/debitbalance');
      setDebitCampaigns(allocatedResp.data.data.allCampaignDetails);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError(error);
      setLoading(false);
    }
  };

  const initWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

         realaccounts = await web3Instance.eth.getAccounts();
        setAccountstemp(realaccounts[0]);
        setAccount(realaccounts[0])

        firstAccount = realaccounts[0];
        console.log('First account:', firstAccount);

        window.ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0]);
        });
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not found. Install or enable it.');
    }
  };

  useEffect(() => {
    const setupData = async () => {
      try {
        await fetchData();
        await initWeb3();
      } catch (error) {
        console.error('Error setting up data:', error);
      }
    };

    setupData();
  }, []);

  const checkStoredBlockData = async () => {
    try {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);

      const contractAddress = '0x8e040B05b6a415e55f3cd65e762332fe500f4E08';
      const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

      const storedData = await SimpleStorageContract.methods.getTransactionDetails().call({ from: firstAccount });

      console.log('User details stored in the blockchain:', storedData);
    } catch (error) {
      console.error('Error reading stored data:', error.message);
    }
  };

  const storeBlockChain = async () => {
    try {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = await new Web3(provider);

      const contractAddress = '0x8e040B05b6a415e55f3cd65e762332fe500f4E08';
      const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

      const accounts = await web3.eth.getAccounts();

      const gasLimit = 3000000;
      const gasPrice = '5000000000';

      await SimpleStorageContract.methods
        .storeTransactionDetails(userInput, uniqueID, campaignName)
        .send({ from: accounts[0], gas: gasLimit, gasPrice: gasPrice });

      console.log('User details stored on the blockchain successfully');
      await checkStoredBlockData();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    value = event.target.value;
  };

  const sendDataToServer = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/uniquecampaignid');
      data = response.data.data.allCampaignDetails;
      uniqueID = data[0].uniqueID;
      campaignName = data[0].campaignName;
      objid = data[0]._id;


      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
  
         var  hereaccounts = await web3Instance.eth.getAccounts();

      const tempaccounts =  hereaccounts[0];
      console.log("Hereeeeeeee",hereaccounts[0])


      console.log('Server data:', data);
      console.log("realaccounts",realaccounts[0],'User input:', userInput, 'Unique ID:', uniqueID, 'Campaign Name:', campaignName, 'Object ID:', objid);
      console.log('First Account:', firstAccount);
        }
        catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }
      

      await axios.post('http://localhost:3001/api/storecampaignbalance', {
        tempaccounts,
        userInput,
        uniqueID,
        campaignName,
        objid,
      });

      await storeBlockChain();
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const sendTransaction = async () => {
    if (!web3 || !account || !userInput || isNaN(userInput)) {
      alert('Please connect to MetaMask and enter a valid value');
      return;
    }

    try {
      const valueInWei = web3.utils.toWei(userInput.toString(), 'ether');
      const recipientAddress = '0x9fBFb24AAd33Ee8C8fE7Ac953eAc5b9B49214f5b';

      const transactionObject = {
        to: recipientAddress,
        value: valueInWei,
        from: account,
        gas: 21000,
      };

      await sendDataToServer();

      const hash = await web3.eth.sendTransaction(transactionObject);
      setTransactionHash(hash);
    } catch (error) {
      console.error('Transaction error:', error);
      alert('Transaction failed. Check the console for details.');
    }
  };

  return (
    <div className='dono'>
      <div className="header" style={{backgroundColor: '#FABC3F'}}>
      <a href='\'>
      <h2>Pegasus Charity</h2>
      </a>
      </div>

      <div className="sectionCard">
        <h1>Campaign Details</h1>
        {Array.isArray(campaigns) && campaigns.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>NGO Name</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign._id}>
                  <td>{campaign.campaignName}</td>
                  <td>{campaign.ngoname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No campaign details found.</p>
        )}
        {Array.isArray(debitCampaigns) && debitCampaigns.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Funds Utilized</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {debitCampaigns.map((debitCampaign) => (
                <tr key={debitCampaign._id}>
                  <td>{debitCampaign.Amount}</td>
                  <td>{debitCampaign.Reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>

      <div className="sectionCard">
    <h1>Currency to ETH Converter</h1>
    <CurrencyToEthConverter conversionRates={{
      USD: 0.00044,   // Example rate: 1 USD = 0.00044 ETH
      EUR: 0.00048,   // Example rate: 1 EUR = 0.00048 ETH
      INR: 0.0000053, // Example rate: 1 INR = 0.0000053 ETH
      GBP: 0.00034,   // Example rate: 1 GBP = 0.00034 ETH
      JPY: 0.0000031, // Example rate: 1 JPY = 0.0000031 ETH
      AUD: 0.00030,   // Example rate: 1 AUD = 0.00030 ETH
      CAD: 0.00032,   // Example rate: 1 CAD = 0.00032 ETH
      CHF: 0.00046,   // Example rate: 1 CHF = 0.00046 ETH
      CNY: 0.000063,  // Example rate: 1 CNY = 0.000063 ETH
      NZD: 0.00028,   // Example rate: 1 NZD = 0.00028 ETH
      SGD: 0.00032,   // Example rate: 1 SGD = 0.00032 ETH
      HKD: 0.000057,  // Example rate: 1 HKD = 0.000057 ETH
      KRW: 0.00000035 // Example rate: 1 KRW = 0.00000035 ETH
    }} />
</div>


      <div className="sectionCard">
        <h1>MetaMask Transaction</h1>
        <div style={{ marginTop: '15px' }}>
          {account ? (
            <p>Connected Account: {account}</p>
          ) : (
            <p>Connect to MetaMask...</p>
          )}
        </div>
        <br></br>
        <input
          type="text"
          placeholder="Enter value in Ether"
          value={userInput}
          onChange={handleUserInput}
        />
        <div style={{ marginTop: '5px' }}></div>
        <button onClick={sendTransaction} style={{ backgroundColor: '#6439FF', color: 'white' }}>Send Transaction</button>
        <div className='sectioncard'>
        {transactionHash && (
          <p>
            Transaction Hash:{' '}
            <a
              href={`https://sepolia.etherscan.io//tx/${transactionHash.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash.transactionHash}
            </a>
          </p>
        )}
        </div>
      </div>

      {/* Additional sections from UserAdPage (Add as needed) */}
      <div className='sectionCard'>
            <button 
        onClick={() => window.location.href='/feedback'} 
        style={{
          backgroundColor: '#6439FF',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#6439FF'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#6439FF'}
      >
        Rate Us!
      </button>
      </div>
    </div>
  );
};

export default Transaction;