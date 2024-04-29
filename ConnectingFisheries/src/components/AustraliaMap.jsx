import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AustraliaMap = () => {
  const [fisheries, setFisheries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/fisheries');
      const data = await response.json();
      setFisheries(data);
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '800px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fisheries.map((fishery, index) => (
        <Marker key={index} position={[fishery.lat, fishery.lng]}>
          <Popup>
            <div>
              <h3>{fishery.name}</h3>
              <p>{fishery.species}</p>
              <p>{fishery.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AustraliaMap;
