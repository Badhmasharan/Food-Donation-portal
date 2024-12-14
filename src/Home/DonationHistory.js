import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationHistory.css';
import Navbar from './Navbar';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donation history data
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:3008/donations'); // Replace with your actual endpoint
        setDonations(response.data);
      } catch (err) {
        console.error("Error fetching donation history:", err);
        setError("Failed to load donation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="donation-history-page">
      <h1 className="page-title">Donation History</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="donation-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td>
                  {donation.amount != null 
                    ? `$${donation.amount.toFixed(2)}` 
                    : "N/A"}
                </td>
                <td>{donation.recipient || "Unknown"}</td>
                <td>{donation.message || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default DonationHistory;
