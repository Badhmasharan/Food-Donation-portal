import React, { useState } from 'react';
import './Donationpage.css';
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const [donationType, setDonationType] = useState('food');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    foodType: '',
    quantity: '',
    pickupTime: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    amount: ''
  });
  const [donationAmount, setDonationAmount] = useState(360);
  const [isMonthly, setIsMonthly] = useState(false);
  const [meals, setMeals] = useState(6);
  const [donationStatus, setDonationStatus] = useState(null);
  const [userLocation, setUserLocation] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setDonationAmount(amount);
    setMeals(Math.floor(amount / 60));
  };

  const handleMonthlyChange = () => {
    setIsMonthly(!isMonthly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationDetails = { ...formData, status: 'pending' };
    navigate('/pay', { state: { donationDetails } });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = '92bb668ed53f483ca43a0175a02c43dd';

        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const location = data.results[0].formatted;
            setUserLocation({ latitude, longitude, address: location });
            setFormData({ ...formData, streetAddress: location });
          } else {
            console.error('No location data found');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="donation-page">
      <div className="donation-container">
        <h2>Donate to Help the Needy</h2>

        <div className="donation-type-switch">
          <button className={`switch-btn ${donationType === 'food' ? 'active' : ''}`} onClick={() => setDonationType('food')}>Donate Food</button>
          <button className={`switch-btn ${donationType === 'money' ? 'active' : ''}`} onClick={() => setDonationType('money')}>Donate Money</button>
        </div>

        {donationType === 'money' ? (
          <MoneyDonationSection
            meals={meals}
            donationAmount={donationAmount}
            handleAmountChange={handleAmountChange}
            handleMonthlyChange={handleMonthlyChange}
            isMonthly={isMonthly}
            handleSubmit={handleSubmit}
          />
        ) : (
          <FoodDonationForm
            formData={formData}
            handleChange={handleChange}
            getLocation={getLocation}
            handleSubmit={handleSubmit}
          />
        )}

        {donationStatus && <p className="donation-status">{donationStatus}</p>}
      </div>
    </div>
  );
};

const MoneyDonationSection = ({ meals, donationAmount, handleAmountChange, handleMonthlyChange, isMonthly, handleSubmit }) => (
  <div className="donation-section">
    <h3>Palestine: Give life-saving aid</h3>
    <div className="donation-info">
      <img src="/meal-donation-illustration.png" alt="Meal Donation" className="donation-image" />
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

const FoodDonationForm = ({ formData, handleChange, getLocation, handleSubmit }) => (
  <form className="donation-form" onSubmit={handleSubmit}>
    <div className="horizontal-form">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
    </div>
    <div className="horizontal-form">
      <div className="form-group">
        <label>Food Type:</label>
        <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </div>
    </div>
    <div className="horizontal-form">
      <div className="form-group">
        <label>Pickup Time:</label>
        <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Street Address:</label>
        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
        <button type="button" onClick={getLocation} className='Getlocation'>Get Current Location</button>
      </div>
    </div>
    <div className="horizontal-form">
      <div className="form-group">
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>State:</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
      </div>
    </div>
    <div className="horizontal-form">
      <div className="form-group">
        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
      </div>
    </div>
    <button type="submit" className="donate-btn">Donate Now</button>
  </form>
);

export default DonationPage;
