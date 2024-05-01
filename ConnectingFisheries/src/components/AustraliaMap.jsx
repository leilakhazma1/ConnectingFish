import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUserContext } from '../context/UserContext';

const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = () => {
  const { role } = useUserContext();
  const [fisheries, setFisheries] = useState([]);
  const [selectedFishery, setSelectedFishery] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/fisheries');
      const data = await response.json();
      setFisheries(data.data);
    };

    fetchData();
  }, []);

  const handleEditFishery = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/fisheries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Fishery updated successfully!');
        // Refresh fisheries data after update
        const updatedFisheries = await response.json();
        setFisheries(updatedFisheries.data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update fishery');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMarkerClick = (fishery) => {
    if (role === 'government_official') {
      setSelectedFishery(fishery);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px', marginLeft: '30px' }}>
      <div style={{ border: '2px solid #ccc', padding: '15px' }}>
        <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '400px', width: '600px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {fisheries.map((fishery, index) => (
            <Marker key={index} position={[fishery.lat, fishery.lng]} onClick={() => handleMarkerClick(fishery)}>
              <Popup>
                <div>
                  <h3>{formatString(fishery.name)}</h3>
                  <p>{formatString(fishery.species)}</p>
                  <p>{formatString(fishery.location)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {selectedFishery && role === 'government_official' && (
          <div>
            <h3>Edit Fishery</h3>
            <p>Name: {selectedFishery.name}</p>
            <p>Species: {selectedFishery.species}</p>
            <p>Location: {selectedFishery.location}</p>
            <button onClick={() => handleEditFishery(selectedFishery._id, { name: 'New Name' })}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AustraliaMap;
