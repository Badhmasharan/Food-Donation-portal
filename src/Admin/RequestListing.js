import React, { useState, useEffect } from 'react';
import DonationHeader from "./DonationHeader";
import Footer from '../admin/Footer';
import '../admin/RequestListing.css';
// import "../admin/donationHeader.css";

const RequestListing = ({ dashboardView, handleLocationClick }) => {
    const [showForm, setShowForm] = useState(false);
    const [userName, setUserName] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        expirationDate: '',
        foodType: '',
        foodQuantity: '',
        foodWeight: '',
        pickupDateTime: '',
    });
    const [tableData, setTableData] = useState([]);
    const [userRole, setUserRole] = useState("volunteer"); // Mock role for testing purposes
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // Replace Firebase data fetching with mock data
        const mockRequests = [
            { title: 'Canned Goods Donation', description: 'A variety of canned goods', foodType: 'Canned Goods', foodQuantity: '50', foodWeight: '30kg', pickupDateTime: '2024-11-10T15:00', status: 'deliver', location: { lan: 40.7128, lng: -74.0060 } },
            { title: 'Fresh Vegetables', description: 'Freshly harvested veggies', foodType: 'Fresh Produce', foodQuantity: '100', foodWeight: '50kg', pickupDateTime: '2024-11-12T10:00', status: 'pending', location: { lan: 34.0522, lng: -118.2437 } },
        ];

        const filteredRequests = mockRequests.filter(request => request.status !== "received");
        setTableData(dashboardView ? filteredRequests.slice(-5) : filteredRequests);
    }, [dashboardView]);

    const getStatusButtonText = (status) => {
        switch (status) {
            case "pending":
                return "Pending";
            case "received":
                return "Received";
            case "deliver":
                return "To Deliver";
            default:
                return "Unknown Status";
        }
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleAccept = (requestId) => {
        if (userRole === "volunteer") {
            const updatedTableData = tableData.map((data) => {
                if (data.title === requestId) {
                    return { ...data, status: "pending", deliveredBy: "mockUserId" };
                }
                return data;
            });
            setTableData(updatedTableData);
        }
    };

    const handlePending = (requestId, status) => {
        if (userRole === "recipient" && status === "pending") {
            const updatedTableData = tableData.map((data) => {
                if (data.title === requestId) {
                    return { ...data, status: "received", receivedBy: "mockUserId" };
                }
                return data;
            });
            setTableData(updatedTableData);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'location') {
            const [lan, lng] = value.split(',').map(coord => coord.trim());
            setFormData(prevData => ({
                ...prevData,
                location: { lan, lng },
            }));
            setCurrentLocation({ lan, lng });
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleShowLocation = (lan, lng) => {
        window.open(`https://www.google.com/maps?q=${lan},${lng}`, '_blank');
        handleLocationClick(lan, lng);
    };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const currentTime = new Date();

        // Add the new data to the tableData state
        setTableData([
            ...tableData,
            { 
                ...formData,
                userRole,
                donatedBy: "mockUserId",
                deliveredBy: "",
                receivedBy: "",
                status: "deliver",
                time: currentTime.toISOString(),
            }
        ]);

        // Reset the form data and hide the form
        setFormData({
            title: '',
            description: '',
            location: '',
            expirationDate: '',
            foodType: '',
            foodQuantity: '',
            foodWeight: '',
            pickupDateTime: '',
        });
        setShowForm(false);
    };

    const columnsForDashboard = [
        'title',
        'description',
        'foodType',
        'pickupDateTime',
    ];

    const columnsForDonationsPage = [
        'title',
        'description',
        'expirationDate',
        'foodType',
        'foodQuantity',
        'foodWeight',
        'pickupDateTime',
    ];

    const displayedColumns = dashboardView ? columnsForDashboard : columnsForDonationsPage;

    return (
        <div className="container-fluid pb-3">
            <div className="row">
                {!dashboardView && <DonationHeader />}
                <div className={'col-md-12 pt-3'}>
                    {dashboardView && (
                        <h5 className="title mb-3 text-secondary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Donation Requests
                            {userRole === "donor" && (
                                <button
                                    className="btn btn-primary mb-3 mt-3"
                                    onClick={() => setShowForm(true)}
                                >
                                    Donate
                                </button>
                            )}
                        </h5>
                    )}
                    {showForm && (
                        <div className="form-popup">
                            <div className="form-container">
                                <form className="row g-3" onSubmit={handleFormSubmit}>
                                    {/* Form fields as before */}
                                    <div className="col-md-6">
                                        <label htmlFor="inputTitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter a title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className='form-control'
                                        />
                                    </div>
                                    {/* Additional form fields here */}
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="thead-light">
                                <th>S.No</th>
                                {displayedColumns.map(column => (
                                    <th key={column}>{capitalizeFirstLetter(column)}</th>
                                ))}
                            </thead>
                            <tbody className='table-body'>
                                {tableData?.map((data, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "50px" }}>{index + 1}</td>
                                        {displayedColumns.map(column => (
                                            <td key={column} style={{ width: "216px" }}>
                                                {data[column]}
                                            </td>
                                        ))}
                                        <td style={{ width: "216px" }}>
                                            {userRole === "volunteer" && (
                                                <div className="btn-group" role="group">
                                                    <button
                                                        type="button"
                                                        className={`btn ${data.status === "pending" ? "btn-warning" : "btn-primary"}`}

                                                        onClick={() => handleAccept(data.title)}
                                                        disabled={data.status === "pending"}
                                                    >
                                                        {getStatusButtonText(data.status)}
                                                    </button>
                                                </div>
                                            )}
                                            {userRole === "recipient" && (
                                                <div className="btn-group" role="group">
                                                    <button
                                                        type="button"
                                                        className={`btn ${data.status === "pending" ? "btn-warning" : data.status === "deliver" ? "btn-primary" : "btn-success"}`}
                                                        onClick={() => handlePending(data.title, data.status)}
                                                    >
                                                        {getStatusButtonText(data.status)}
                                                    </button>
                                                </div>
                                            )}
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleShowLocation(data.location.lan, data.location.lng)}
                                                >
                                                    Location
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {!dashboardView && <Footer />}
            </div>
        </div>
    );
};

export default RequestListing;