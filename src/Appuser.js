import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AvailableClaims from './components/AvailableClaims';
import Customers from './components/Customers';
import Claims from './components/Claims';
import SubmitClaim from './components/SubmitClaim';
import CustomerRegistration from './components/CustomerRegistration';
import Profile from './components/Profile';
import AvailablePolicy from './components/AvailablePolicy';
import './App.css';
const Appuser = () => {
return (
<Router>
<div>
<nav className="main-nav">
<Link to="/">Home</Link>
<Link to="/insurancepolicy">Available Policy</Link>
<Link to="/AvailableClaims">Registerd Policy</Link>
<Link to="/claims">Registered Claims</Link>
<Link to="/submit-claim">Approved Claim</Link>
<Link to="/user-profile">User Profile</Link>
</nav>
<main className="app-content">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/insurancepolicy" element={<AvailablePolicy />} />
<Route path="/AvailableClaims" element={<AvailableClaims />} />
<Route path="/customers" element={<Customers />} />
<Route path="/register" element={<CustomerRegistration />} />
<Route path="/claims" element={<Claims />} />
<Route path="/submit-claim" element={<SubmitClaim />} />
<Route path="/user-profile" element={<Profile />} />
</Routes>
</main>
</div>
</Router>
);
};

export default Appuser;