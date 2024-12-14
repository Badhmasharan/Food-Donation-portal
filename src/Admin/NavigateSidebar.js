import React from 'react';
import { Link } from 'react-router-dom';
import './NavigateSidebar.css';

const NavigateSidebar = ({ userName }) => {
    return (
        <div className="sidebar d-block" id="sidebar" role="navigation">
            <ul className="nav flex-column sticky-top">
                {/* <li className="nav-item mb-3">
                    <a className="nav-link text-secondary" href="#">
                        <h5>Greetings {userName}</h5>
                    </a>
                </li> */}
                <li className="nav-item">
                    <Link to="/admin/Dashboard" className="nav-link">
                        <i className="fas fa-chart-bar font-weight-bold"></i>
                        <span className="ml-3">Dashboard</span>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/deliveryList" className="nav-link">
                        <i className="fas fa-home font-weight-bold"></i>
                        <span className="ml-3">DeliveryPerson</span>
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/new-request" className="nav-link">
                        <i className="fas fa-donate font-weight-bold"></i>
                        <span className="ml-3">Donations</span>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/orphanages" className="nav-link">
                        <i className="fas fa-home font-weight-bold"></i>
                        <span className="ml-3">Orphanages Requests</span>
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/orp" className="nav-link">
                        <i className="fas fa-list font-weight-bold"></i>
                        <span className="ml-3">Orphanage List</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/donar" className="nav-link">
                        <i className="fas fa-address-book"></i>
                        <span className="ml-3">Donors</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavigateSidebar;
