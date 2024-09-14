import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import UserLogin from './components/UserLogin/UserLogin';
import SignUp from './components/SignUp/SignUp'
import UserSignUp from './components/UserSignUp/UserSignUp'
import Dashboard from './components/NGODashboard/Dashboard';
import UserDashboard from './components/UserDashboard/Dashboard';
import Campaigns from './components/NGODashboard/Campaigns/Campaigns'
import UserAdPage from './components/UserAdPage/UserAdPage';
import CreateCampaigns from './components/NGODashboard/CreateCampaign/CreateCampaign';
import Transaction from './components/Metamask-gateway/MetaTransaction';
// import Feedback from './components/Feedback/Feedback';
import Profile from './components/NGODashboard/Profile/Profile';
import UserProfile from './components/UserProfile/UserProfile';
import UserCampaigns from './components/UserCampaign/UserCampaign';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CampaignProgress from './components/AdminDashboard/CampaignProgress/CampaignProgress';
import RequestFunds from './components/NGODashboard/RequestFunds/RequestFunds';
import Pan from "../src/components/pan"
import BlockchainDoc from "./components/Documentation/BlockchainDoc."
import MetamaskDoc from "./components/Documentation/MetamaskDoc"
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
// import Gateway from './components/Payment-gateway/Gateway';

import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route path ="/ngo-login" element ={<Login />}/>
        <Route path ="/user-login" element ={<UserLogin />}/>
        <Route path ="/ngo-signup" element={<SignUp/>}/>
        <Route path ="/user-signup" element={<UserSignUp/>}/>
        <Route path ="/ngo-dashboard" element={<Dashboard/>}/>
        <Route path ="/user-dashboard" element={<UserDashboard/>}/>
        <Route path ="/campaign" element={<Campaigns/>}/>
        <Route path ="/user" element={<UserAdPage/>}/>
        <Route path ="/create" element={<CreateCampaigns/>}/>
        <Route path ="/gatewaylink" element={<Transaction/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/user-campaign' element={<UserCampaigns/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/campaign-progress' element={<CampaignProgress/>}/>
        <Route path='/request-funds' element={<RequestFunds/>}/>
        <Route path='/metamaskdoc' element={<MetamaskDoc/>}/>
        <Route path='/blockchaindoc' element={<BlockchainDoc/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path='/pancard' element={<Pan/>}/>

      </Routes>
    </Router>
  );
}

export default App;
