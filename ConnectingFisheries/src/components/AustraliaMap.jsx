import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const formatString = (str) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const AustraliaMap = () => {
  const [fisheries, setFisheries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/fisheries');
      const data = await response.json();
      setFisheries(data.data);
    };

    fetchData();
  }, []);

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
