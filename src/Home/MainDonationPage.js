// MainDonationPage.js
import React, { useState } from 'react';
import './Donationpage.css';
import FoodDonationForm from './FoodDonationForm';
import MoneyDonationPage from './MoneyDonationPage';
import Navbar from './Navbar';

const MainDonationPage = () => {
  const [donationType, setDonationType] = useState('food');

  return (
    <div>
      <Navbar/>
    <div className="donation-page">
      <div className="donation-container">
        <h2>Donate to Help the Needy</h2>
        <div className="donation-type-switch">
          <button 
            className={`switch-btn ${donationType === 'food' ? 'active' : ''}`} 
            onClick={() => setDonationType('food')}
          >
            Donate Food
          </button>
          <button 
            className={`switch-btn ${donationType === 'money' ? 'active' : ''}`} 
            onClick={() => setDonationType('money')}
          >
            Donate Money
          </button>
        </div>

        {donationType === 'money' ? (
          <MoneyDonationPage />
        ) : (
          <FoodDonationForm />
        )}
      </div>
    </div>
    </div>
  );
};

export default MainDonationPage;
