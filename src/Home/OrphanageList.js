import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const OrphanageList = () => {
  const navigate = useNavigate();
  const [orphanages, setOrphanages] = useState([]);
  const [userCity, setUserCity] = useState('');
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await fetch('/orphanages.json');
        const data = await response.json();
        setOrphanages(data);
      } catch (error) {
        console.error('Error fetching orphanage data:', error);
        setError('Failed to load orphanages data.');
      }
    };

    fetchOrphanages();
  }, []);

  const handleSelectOrphanage = (id) => {
    navigate(`/main-donation-page/${id}`);
  };

  const handleFindInYourCity = () => {
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=92bb668ed53f483ca43a0175a02c43dd`
          );
          const locationData = await response.json();

          const components = locationData.results[0]?.components;
          const city =
            components.city ||
            components.town ||
            components.village ||
            components.county;

          if (city) {
            setUserCity(city);
            const cityOrphanages = orphanages.filter((orphanage) => orphanage.city === city);
            setFilteredOrphanages(cityOrphanages);
          } else {
            setError('City not found for your location. Please enter your city manually.');
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          setError('Failed to fetch city from your location.');
        }
      },
      (error) => {
        console.error('Error getting user location:', error);
        setError('Unable to retrieve location. Please ensure location services are enabled.');
      },
      { enableHighAccuracy: true }
    );
  };

  const handleCityFilterChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    if (city) {
      const filtered = orphanages.filter((orphanage) => orphanage.city === city);
      setFilteredOrphanages(filtered);
    } else {
      setFilteredOrphanages(orphanages); // Show all orphanages if no city is selected
    }
  };

  const uniqueCities = [...new Set(orphanages.map((orphanage) => orphanage.city))];

  return (
    <div>
      <Navbar/>
    <div className="orphanage-list">
      <h2>Orphanage List</h2>

      <div className="actions">
        <button onClick={handleFindInYourCity}>Find Orphanages in Your City</button>
        {userCity && <span className="user-city">Currently in: {userCity}</span>}

        {/* City Filter Dropdown */}
        <select value={selectedCity} onChange={handleCityFilterChange} className="city-filter">
          <option value="">-- Select City --</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>} {/* Display error if any */}

      <div className="orphanage-cards">
        {filteredOrphanages.length > 0 ? (
          filteredOrphanages.map((orphanage) => (
            <div className="orphanage-card" key={orphanage.id}>
              <h3>{orphanage.name}</h3>
              <p>{orphanage.description}</p>
              <div className="info">
                <p><span>City:</span> {orphanage.city}</p>
                <p><span>Number of Persons:</span> {orphanage.numberOfPersons}</p>
                <p><span>Address:</span> {orphanage.address}</p>
              </div>
              <button onClick={() => handleSelectOrphanage(orphanage.id)}>Select Orphanage</button>
            </div>
          ))
        ) : (
          userCity && <p>No orphanages found in {userCity}.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrphanageList;
