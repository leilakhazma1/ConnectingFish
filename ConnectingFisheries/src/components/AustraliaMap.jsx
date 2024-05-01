import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUserContext } from '../context/UserContext';
import EditFisheryModal from './EditFisheryModal'; // Make sure this import is correct

// Helper function to format string (replace underscores with spaces and capitalize)
const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = () => {
  const { role } = useUserContext();
  const [fisheries, setFisheries] = useState([]);
  const [selectedFishery, setSelectedFishery] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchFisheries = async () => {
      try {
        const response = await fetch('/api/fisheries');
        if (!response.ok) {
          throw new Error('Failed to fetch fisheries');
        }
        const data = await response.json();
        setFisheries(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFisheries();
  }, []);

  // Function to handle clicking the "Edit Fishery" button
  const handleEditClick = (fishery) => {
    setSelectedFishery(fishery);
    setShowEditModal(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px', marginLeft: '30px' }}>
      <div style={{ border: '2px solid #ccc', padding: '15px' }}>
        <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '400px', width: '600px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {fisheries.map((fishery, index) => (
            <Marker key={index} position={[fishery.lat, fishery.lng]}>
              <Popup>
                <div>
                  <h3>{formatString(fishery.name)}</h3>
                  <p>{formatString(fishery.species)}</p>
                  <p>{formatString(fishery.location)}</p>
                  {role === 'government_official' && (
                    <button onClick={() => handleEditClick(fishery)}>Edit Fishery</button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {showEditModal && selectedFishery && (
          <EditFisheryModal
            selectedFishery={selectedFishery}
            onClose={() => setShowEditModal(false)}
            onUpdate={(updatedFishery) => {
              setFisheries((prevFisheries) =>
                prevFisheries.map((fishery) =>
                  fishery._id === updatedFishery._id ? updatedFishery : fishery
                )
              );
              setShowEditModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AustraliaMap;
