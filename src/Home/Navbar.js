import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on component load
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const loggedInUser = response.data.find(user => user.isloggedin === 1);

        if (loggedInUser) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };
  const handleDonationHistory = () => {
    navigate('/DonationHistory');
  };

  const handleProfile = () => {
    setDropdownVisible(false);
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const loggedInUser = response.data.find(user => user.isloggedin === 1);

      if (loggedInUser) {
        // Update the user's isloggedin status to 0 in the backend
        await axios.patch(`http://localhost:5000/users/${loggedInUser.id}`, {
          isloggedin: 0
        });

        setIsLoggedIn(false);
        setDropdownVisible(false);
        alert("Logged out successfully");
      }
    } catch (error) {
      console.error('Error during logout', error);
      alert('Logout failed');
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleHome}>Hunger Help</div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <div className="profile-icon-container" onClick={toggleDropdown}>
            <i className="fas fa-user-circle profile-icon"></i>
            {dropdownVisible && (
              <div className="profile-dropdown">
                <button onClick={handleProfile}>View Profile</button>
                <button onClick={handleDonationHistory}>Donation History</button>
                <button onClick={handleProfile}>Donation Status</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login/Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
