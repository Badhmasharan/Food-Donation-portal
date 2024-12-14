import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Metrics.css';

const Metrics = () => {
    const [beneficiaries, setBeneficiaries] = useState(200);
    const [quantitySum, setQuantitySum] = useState(1200);
    const [weightSum, setWeightSum] = useState(5000);
    const [donationCount, setDonationCount] = useState(0);
    const [orphanageCount, setOrphanageCount] = useState(0);
    const [donorCount, setDonorCount] = useState(0);
    const [volunteerCount, setVolunteerCount] = useState(0); // New state for delivery login count

    // Animated state values
    const [beneficiariesAnimated, setBeneficiariesAnimated] = useState(0);
    const [quantitySumAnimated, setQuantitySumAnimated] = useState(0);
    const [weightSumAnimated, setWeightSumAnimated] = useState(0);
    const [donationCountAnimated, setDonationCountAnimated] = useState(0);
    const [orphanageCountAnimated, setOrphanageCountAnimated] = useState(0);
    const [donorCountAnimated, setDonorCountAnimated] = useState(0);
    const [volunteerCountAnimated, setVolunteerCountAnimated] = useState(0);

    const animateCount = (targetValue, setter) => {
        let start = 0;
        const interval = setInterval(() => {
            if (start < targetValue) {
                start += Math.ceil(targetValue / 100);
                setter(start);
            } else {
                clearInterval(interval);
            }
        }, 20);
    };

    useEffect(() => {
        // Fetch donation count
        fetch('http://localhost:5000/donations')
            .then((response) => response.json())
            .then((data) => {
                const pendingDonations = data.filter((donation) => donation.status === 'pending');
                setDonationCount(pendingDonations.length);
                animateCount(pendingDonations.length, setDonationCountAnimated);
            })
            .catch((error) => console.error('Error fetching donations:', error));

        // Fetch orphanage count
        fetch('http://localhost:5000/orphanages')
            .then((response) => response.json())
            .then((data) => {
                setOrphanageCount(data.length);
                animateCount(data.length, setOrphanageCountAnimated);
            })
            .catch((error) => console.error('Error fetching orphanages:', error));

        // Fetch donor count
        fetch('http://localhost:5000/donarlogin')
            .then((response) => response.json())
            .then((data) => {
                setDonorCount(data.length);
                animateCount(data.length, setDonorCountAnimated);
            })
            .catch((error) => console.error('Error fetching donor data:', error));

        // Fetch volunteer (delivery login) count
        fetch('http://localhost:5000/deliverylogin')
            .then((response) => response.json())
            .then((data) => {
                setVolunteerCount(data.length);
                animateCount(data.length, setVolunteerCountAnimated);
            })
            .catch((error) => console.error('Error fetching delivery login data:', error));

        // Animate other fixed values
        animateCount(beneficiaries, setBeneficiariesAnimated);
        animateCount(quantitySum, setQuantitySumAnimated);
        animateCount(weightSum, setWeightSumAnimated);

    }, []);

    return (
        <div>
            <div className="row mb-3 flex justify-center">
                {/* Food Items Donated */}
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fas fa-carrot fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Food Items Donated</h6>
                            <h1 className="display-4">{quantitySumAnimated + "+"}</h1>
                        </div>
                    </div>
                </div>

                {/* Meals Provided */}
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fas fa-balance-scale fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Meals Provided</h6>
                            <h1 className="display-4">{weightSumAnimated + " Kg"}</h1>
                        </div>
                    </div>
                </div>

      

                {/* Donors */}
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fas fa-hand-holding-heart fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Donors</h6>
                            <h1 className="display-4">{donorCountAnimated + "+"}</h1>
                        </div>
                    </div>
                </div>

            

                {/* Orphanages */}
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-info h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fas fa-house-user fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Orphanages</h6>
                            <h1 className="display-4">{orphanageCountAnimated}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metrics;