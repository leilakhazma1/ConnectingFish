// AustraliaMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUserContext } from '../context/UserContext';
import EditFisheryModal from './EditFisheryModal';

// Helper function to format string (replace underscores with spaces and capitalize)
const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = () => {
  const { role } = useUserContext(); // Get the user's role from context
  const [fisheries, setFisheries] = useState([]); // State to hold fisheries data
  const [selectedFishery, setSelectedFishery] = useState(null); // State to hold the selected fishery for editing
  const [showEditModal, setShowEditModal] = useState(false); // State to control the display of the edit modal

  // Fetch fisheries data from the API when the component mounts
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px', marginLeft: '30px' }}>
      <div style={{ border: '2px solid #ccc', padding: '15px' }}>
        {/* Render the Leaflet map */}
        <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '400px', width: '600px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Map over the fisheries array and render a marker for each fishery */}
          {fisheries.map((fishery, index) => (
            <Marker
              key={index}
              position={[fishery.lat, fishery.lng]}
            >
              {/* Render a popup with information about the fishery */}
              <Popup>
                <div>
                  <h3>{formatString(fishery.name)}</h3>
                  <p>{formatString(fishery.species)}</p>
                  <p>{formatString(fishery.location)}</p>
                  {/* Render an "Edit Fishery" button for government officials */}
                  {role === 'government_official' && (
                    <button onClick={() => {
                      setSelectedFishery(fishery);
                      setShowEditModal(true);
                    }}>Edit Fishery</button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {showEditModal && selectedFishery && role === 'government_official' && (
          <EditFisheryModal
            selectedFishery={selectedFishery}
            onClose={() => setShowEditModal(false)}
            onUpdate={(updatedFishery) => {
              // Implement your update logic here
              setShowEditModal(false); // Close the modal after successful update
            }}
            onDelete={(deletedFisheryId) => {
              // Implement your delete logic here
              setShowEditModal(false); // Close the modal after successful delete
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AustraliaMap;
