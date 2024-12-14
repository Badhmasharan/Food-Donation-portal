import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigateSidebar from './NavigateSidebar';
import Metrics from './Metrics';
// import Footer from './AdminFooter';
// import RequestListing from './RequestListing';
// import GoogleMaps from './GoogleMaps';

export default function Dashboard() {
    const [userName, setUserName] = useState('John Doe');
    const [userRole, setUserRole] = useState('Donor');
    const [selectedLocationLat, setSelectedLocationLat] = useState(null);
    const [selectedLocationLng, setSelectedLocationLng] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const navigate = useNavigate();

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Placeholder function for location click
    const handleLocationClick = (lat, lng) => {
        setSelectedLocationLat(lat);
        setSelectedLocationLng(lng);
    };

    return (
        <div className="container-fluid m-0 p-0">
            <div className="container-fluid row p-0">
                {/* Sidebar */}
                <NavigateSidebar
                    userName={userName} 
                    isSidebarVisible={isSidebarVisible} 
                    toggleSidebar={toggleSidebar} 
                />

                <div className="col-10">
                    <p className="header-title">Hunger Help</p>

                    {/* Metrics */}
                    <Metrics />

                    {/* Uncomment below components to show them in the dashboard */}
                    {/* 
                    <RequestListing 
                        dashboardView={true} 
                        handleLocationClick={handleLocationClick} 
                    />
                    
                    <GoogleMaps 
                        selectedLocationLat={selectedLocationLat} 
                        selectedLocationLng={selectedLocationLng} 
                    />
                    */}
                </div>
            </div>

            <div className="mt-3">
                {/* Uncomment this for Footer */}
                {/* <Footer /> */}
            </div>
        </div>
    );
}
