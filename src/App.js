import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home/Home";
import DonationPage from "./Home/Donationpage";
import PaymentPage from "./Home/PaymentPage";
import Navbar from "./Home/Navbar";
import MainDonationPage from './Home/MainDonationPage';
import OrphanageList from './Home/OrphanageList';
import Login from './LoginPage/LoginPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DonationHistory from './Home/DonationHistory';
import AdminLogin from './Admin/Adminlogin';
import Dashboard from './Admin/Dashboard';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main-donation-page/:orphanageId" element={<MainDonationPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/orphanages" element={<OrphanageList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/DonationHistory" element={<DonationHistory/>} />
        <Route path="/Admin/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
