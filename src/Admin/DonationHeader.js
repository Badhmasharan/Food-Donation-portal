import React from 'react';
import { Link } from 'react-router-dom';

const DonationHeader = () => {
    return (
        <header className="custom-header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="header-title">Donations Page</h1>
                    <p className="header-description">Make a difference by donating today!</p>
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">
                        <i className="fas fa-home font-weight-bold"></i>
                        Home
                    </Link>
                    <Link to="/dashboard" className="header-link">
                        <i className="fas fa-chart-bar font-weight-bold"></i>
                        Dashboard
                    </Link>
                    <Link to="/analytics" className="header-link">
                        <i className="fas fa-user font-weight-bold"></i>
                        Profile
                    </Link>
                    <Link to="/" className="header-link">
                        <i className="fas fa-sign-out-alt"></i>
                        Sign Out
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default DonationHeader;