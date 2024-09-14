import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Create refs for chart instances
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);

  // Create refs for canvases
  const canvas1Ref = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);
  const canvas4Ref = useRef(null);

  useEffect(() => {
    // Fetch data from the database
    axios
      .get('http://localhost:3001/api/getcampaigndetails') // Replace with your actual API endpoint
      .then((response) => {
        setTransactions(response.data.data.allCampaignDetails);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Initialize Chart.js charts and clean them up properly
    const createCharts = () => {
      // Destroy previous charts if they exist
      if (chart1Ref.current) chart1Ref.current.destroy();
      if (chart2Ref.current) chart2Ref.current.destroy();
      if (chart3Ref.current) chart3Ref.current.destroy();
      if (chart4Ref.current) chart4Ref.current.destroy();

      // Create new chart instances and store them in refs
      chart1Ref.current = new Chart(canvas1Ref.current, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'User Growth',
            data: [50, 70, 100, 130, 90, 150],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: false, // Disable responsiveness
          maintainAspectRatio: false, // Prevent aspect ratio from being preserved
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      chart2Ref.current = new Chart(canvas2Ref.current, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Donations Received',
            data: [20, 40, 60, 80, 60, 100],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: false, // Disable responsiveness
          maintainAspectRatio: false, // Prevent aspect ratio from being preserved
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      chart3Ref.current = new Chart(canvas3Ref.current, {
        type: 'pie',
        data: {
          labels: ['Facebook', 'Twitter', 'Instagram', 'Others'],
          datasets: [{
            label: 'Source of Donors',
            data: [40, 30, 20, 10],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false, // Disable responsiveness
          maintainAspectRatio: false // Prevent aspect ratio from being preserved
        }
      });

      chart4Ref.current = new Chart(canvas4Ref.current, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'Pending'],
          datasets: [{
            label: 'Campaign Status',
            data: [60, 25, 15],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false, // Disable responsiveness
          maintainAspectRatio: false // Prevent aspect ratio from being preserved
        }
      });
    };

    createCharts();

    // Cleanup charts when component unmounts or before re-render
    return () => {
      if (chart1Ref.current) chart1Ref.current.destroy();
      if (chart2Ref.current) chart2Ref.current.destroy();
      if (chart3Ref.current) chart3Ref.current.destroy();
      if (chart4Ref.current) chart4Ref.current.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#343a40', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#fff' }}>
          <i className='bx bx-code-alt' style={{ fontSize: '24px', marginRight: '10px' }}></i>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Pegasus Charity</div>
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
      <div style={{ marginLeft: '50px', padding: '20px', width: 'calc(100% - 250px)' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className='bx bx-menu' id="btn"></i>
          </div>
          <div style={{ display: 'flex' }}>
          </div>
        </div>
        <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ fontSize: "48px", color: "#6439FF", marginBottom: "30px" }}>
          Hey There, Welcome Back!
        </h1>
        <p style={{ fontSize: "22px", color: "#333", marginTop: "20px" }}>
          Welcome back to your NGO dashboard! We’re excited to have you here and appreciate your commitment to our cause. This platform provides you with the tools you need to upload and manage your campaigns securely on the blockchain. Whether you’re here to create new campaigns or view existing ones, you’re in the right place.
        </p>

        <p style={{ fontSize: "22px", color: "#333", marginTop: "50px" }}>
          Use the dashboard to upload new campaigns directly to our blockchain network. Our user-friendly interface allows you to manage your campaign submissions easily and ensure they are securely stored on the blockchain. You can also view your current campaigns and the funds recieved by the donors in real time.
        </p>

        {/* <p style={{ fontSize: "21px", color: "#333", marginTop: "20px" }}>
          Stay informed about the latest updates and campaign opportunities by navigating through your dashboard. We regularly update our platform to provide you with new ways to contribute and manage your initiatives. Your engagement helps drive our mission forward, and we want to ensure you’re always aware of how your contributions are making a difference.
        </p> */}

        <p style={{ fontSize: "22px", color: "#333", marginTop: "50px" }}>
          If you have any questions or need assistance, please reach out. Our support team is here to help you with any issues or queries you might have. You can also check out our FAQ section for quick answers to common questions. We’re dedicated to making your experience as smooth and rewarding as possible.
        </p>


        </div>
        {/* Card Boxes for Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '20px', justifyContent: 'center', marginTop: '80px' }}>
          {/* Chart Containers */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div className="numbers">User Growth</div>
            <canvas ref={canvas1Ref}></canvas>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div className="numbers">Donations Received</div>
            <canvas ref={canvas2Ref}></canvas>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div className="numbers">Source of Donors</div>
            <canvas ref={canvas3Ref}></canvas>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div className="numbers">Campaign Status</div>
            <canvas ref={canvas4Ref}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
