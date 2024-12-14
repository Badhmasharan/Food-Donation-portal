import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardHolder: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedCardNumber = value.replace(/(.{4})/g, '$1 ').trim(); // Add space after every 4 digits
    setFormData({ ...formData, cardNumber: formattedCardNumber });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Razorpay or payment API integration placeholder
    setPaymentStatus('Payment successful! Thank you for your donation.');
  };

  // Format card number for display (1234 5678 1234 5678)
  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Complete Your Payment</h2>

        <div className="card-preview">
          <div className="card-details">
            <p><strong>Card Number:</strong> {formData.cardNumber ? formatCardNumber(formData.cardNumber) : 'XXXX XXXX XXXX XXXX'}</p>
            <p><strong>Expiry Date:</strong> {formData.cardExpiry || 'MM/YY'}</p>
            <p><strong>CVV:</strong> {formData.cardCVV ? '' : ''}</p>
            <p><strong>Cardholder:</strong> {formData.cardHolder || 'John Doe'}</p>
          </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19" // 16 digits + 3 spaces
              placeholder="1234 5678 9123 4567"
              required
            />
          </div>
          <div className="form-group horizontal-form">
            <div>
              <label>Expiry Date:</label>
              <input
                type="month"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="password"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleChange}
                maxLength="3"
                placeholder="123"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Cardholder's Name:</label>
            <input
              type="text"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <button type="submit" className="pay-now-btn">Pay Now</button>
        </form>

        {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;