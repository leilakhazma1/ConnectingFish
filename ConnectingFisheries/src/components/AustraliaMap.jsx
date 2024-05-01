import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUserContext } from '../context/UserContext';

// Helper function to format string (replace underscores with spaces and capitalize)
const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = () => {
  const { role } = useUserContext(); // Get the user's role from context
  const [fisheries, setFisheries] = useState([]); // State to hold fisheries data
  const [selectedFishery, setSelectedFishery] = useState(null); // State to hold the selected fishery for editing

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

  // Function to handle editing, deleting, and creating fisheries
  const handleEditFishery = async () => {
    if (!selectedFishery) {
      return;
    }

    try {
      if (selectedFishery._id) {
        // Make a PUT request to update the selected fishery
        const response = await fetch(`/api/fisheries/${selectedFishery._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(/* updated fishery data */),
        });

        if (!response.ok) {
          throw new Error('Failed to update fishery');
        }

        const updatedFishery = await response.json();
        // Update the fisheries state with the updated fishery
        setFisheries((prevFisheries) =>
          prevFisheries.map((fishery) =>
            fishery._id === updatedFishery._id ? updatedFishery : fishery
          )
        );
      } else {
        // Make a POST request to create a new fishery
        const response = await fetch(`/api/fisheries/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(/* new fishery data */),
        });

        if (!response.ok) {
          throw new Error('Failed to create fishery');
        }

        const newFishery = await response.json();
        // Add the new fishery to the fisheries state
        setFisheries((prevFisheries) => [...prevFisheries, newFishery]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              // Set the selected fishery when the marker is clicked
              eventHandlers={{
                click: () => setSelectedFishery(fishery),
              }}
            >
              {/* Render a popup with information about the fishery */}
              <Popup>
                <div>
                  <h3>{formatString(fishery.name)}</h3>
                  <p>{formatString(fishery.species)}</p>
                  <p>{formatString(fishery.location)}</p>
                  {/* Render an "Edit Fishery" button for government officials */}
                  {role === 'government_official' && (
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
