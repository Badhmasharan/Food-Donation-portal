import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './FoodDonationForm.css';

const FoodDonationForm = () => {
  const [foodName, setFoodName] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        console.log(response.data); // Log the response data
    
        const loggedInUser = response.data.find(user => user.isloggedin === 1);
        if (loggedInUser) {
          setCurrentUser({ id: loggedInUser.userId, name: loggedInUser.userName });
        } else {
          setMessage('No logged-in user found');
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        setMessage('Failed to retrieve user data');
      }
    };
    
    fetchLoggedInUser();
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=92bb668ed53f483ca43a0175a02c43dd`
      );
      const address = response.data.results[0]?.formatted || 'Location not found';
      setPickupLocation(address);
    } catch (error) {
      console.error('Error fetching address:', error);
      setMessage('Failed to retrieve address');
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessage('Failed to retrieve location. Please enable location services.');
        }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setMessage('User is not logged in');
      return;
    }
  
    try {
      setLoading(true);
      setMessage('');
  
      if (!foodName || !donorName || !donorEmail || !donorPhone || !quantity) {
        setMessage('Please fill in all fields');
        setLoading(false);
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(donorEmail)) {
        setMessage('Please provide a valid email address');
        setLoading(false);
        return;
      }
  
      if (!/^\d{10}$/.test(donorPhone)) {
        setMessage('Phone number must be 10 digits');
        setLoading(false);
        return;
      }
  
      const donationId = uuidv4();
      const currentDate = new Date();
      const dateOfDonation = currentDate.toISOString().split('T')[0];
      const timeOfDonation = currentDate.toTimeString().split(' ')[0];
  
      const donationData = {
        id: donationId,
        foodName,
        donorName,
        donorEmail,
        donorPhone,
        quantity,
        pickupLocation,
        dateOfDonation,
        timeOfDonation,
        userId: currentUser.id,
        userName: currentUser.name
      };
  
      await axios.post('http://localhost:3008/donations', donationData);
  
      setMessage('Donation submitted successfully');
      setLoading(false);
      setShowSuccessMessage(true);
  
      setFoodName('');
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setQuantity('');
      setPickupLocation('');
  
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
    } catch (error) {
      console.error('Submission failed:', error.message);
      setMessage('Failed to submit donation');
      setLoading(false);
    }
  };

  return (
    <div className="food-donation-form">
      <h2>Food Donation Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <label>Food Type:</label><br />
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Donor Name:</label><br />
          <input
            type="text"
            placeholder="Donor Name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Donor Email:</label><br />
          <input
            type="text"
            placeholder="Donor Email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Donor Phone:</label><br />
          <input
            type="text"
            placeholder="Donor Phone"
            maxLength="10"
            value={donorPhone}
            onChange={(e) => setDonorPhone(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Quantity:</label><br />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Pickup Location:</label><br />
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Enter Pickup Address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              className="selectloca"
              type="button"
              onClick={handleDetectLocation}
              style={{ marginLeft: '8px' }}
            >
              Detect Location
            </button>
          </div>
        </div>
        <button type="button" onClick={handleSubmit} className="submitdetailsbutton">
          Submit Donation
        </button>
      </form>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
      {showSuccessMessage && <p>Donation submitted successfully!</p>}
    </div>
  );
};

export default FoodDonationForm;
