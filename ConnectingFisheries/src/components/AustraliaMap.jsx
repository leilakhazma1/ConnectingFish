import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = ({ userRole }) => {
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

  const handleEditFishery = async () => {
    try {
      const response = await fetch(`/api/fisheries/${selectedFishery._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFishery),
      });

      if (response.ok) {
        const updatedFishery = await response.json();
        console.log('Fishery updated successfully:', updatedFishery);
        // Update the fisheries state to reflect the changes
        setFisheries((prevFisheries) =>
          prevFisheries.map((fishery) =>
            fishery._id === updatedFishery.data._id ? updatedFishery.data : fishery
          )
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update fishery');
      }
    } catch (error) {
      console.error('Error updating fishery:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px', marginLeft: '30px' }}>
      <div style={{ border: '2px solid #ccc', padding: '15px' }}>
        <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '400px', width: '600px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {fisheries.map((fishery, index) => (
            <Marker
              key={index}
              position={[fishery.lat, fishery.lng]}
              eventHandlers={{
                click: () => setSelectedFishery(fishery),
              }}
            >
              <Popup>
                <div>
                  <h3>{formatString(fishery.name)}</h3>
                  <p>{formatString(fishery.species)}</p>
                  <p>{formatString(fishery.location)}</p>
                  {userRole === 'government_official' && (
                    <button onClick={handleEditFishery}>Edit Fishery</button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AustraliaMap;

