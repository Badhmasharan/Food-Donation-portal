// MoneyDonationPage.js
import React, { useState } from 'react';
import './Donationpage.css';
import Navbar from './Navbar';

const MoneyDonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(360);
  const [isMonthly, setIsMonthly] = useState(false);
  const [meals, setMeals] = useState(6);

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setDonationAmount(amount);
    setMeals(Math.floor(amount / 60));
  };

  const handleMonthlyChange = () => {
    setIsMonthly(!isMonthly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect or handle payment submission
  };

  return (
 
    <div className="donation-section">
    
      <div className="donation-info">
        <img src="/fooddonation.png" alt="Meal Donation" className="donation-image" />
        <div className="donation-details-page">
          <p>{meals} meals</p>
          <div className="donation-amount">
            <span>₹</span>
            <input type="number" value={donationAmount} onChange={handleAmountChange} className="amount-input" />
          </div>
          <input type="range" min="60" max="1000" value={donationAmount} onChange={handleAmountChange} className="amount-slider" />
          <div className="monthly-donation">
            <label>
              <input type="checkbox" checked={isMonthly} onChange={handleMonthlyChange} />
              Make my donation monthly
            </label>
          </div>
          <button className="donate-btn" onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
    
  );
};

export default MoneyDonationPage;
