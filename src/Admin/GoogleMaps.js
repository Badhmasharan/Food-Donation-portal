import React, { useState,useRef } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import './GoogleMaps.css';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 24.8607,
    lng: 67.0011, // Coordinates for Karachi
};

const GoogleMaps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [selectedLocationLat, setSelectedLocationLat] = useState(null);
    const [selectedLocationLng, setSelectedLocationLng] = useState(null);

    const mapRef = useRef(null);
    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    const handleMapClick = (e) => {
        setSelectedLocationLat(e.latLng.lat());
        setSelectedLocationLng(e.latLng.lng());
    };

    const mapComponent = isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: selectedLocationLat || center.lat, lng: selectedLocationLng || center.lng }}
            zoom={selectedLocationLat && selectedLocationLng ? 15 : 12}
            onLoad={handleMapLoad}
            onClick={handleMapClick} // Allow the user to click and set the marker
        >
            {selectedLocationLat && selectedLocationLng && (
                <MarkerF position={{ lat: selectedLocationLat, lng: selectedLocationLng }} />
            )}
            <MarkerF position={center}></MarkerF>
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );

    return (
        <div className="row">
            <div className="col-12">
                <h4 className="title mt-3 mb-3 text-secondary">Google Maps</h4>
                {mapComponent}
                <div className="mt-3">
                    {selectedLocationLat && selectedLocationLng ? (
                        <p>
                            Selected Location: {selectedLocationLat}, {selectedLocationLng}
                        </p>
                    ) : (
                        <p>Select a location by clicking on the map</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoogleMaps;