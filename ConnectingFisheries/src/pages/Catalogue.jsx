import React from 'react';
import DPIFishSpeciesLiveFeed from '../components/DPIFishSpeciesLiveFeed';
import '../App.css';

function Catalogue() {
  return (
    <div className="Catalogue">
      <h1>Australian Species</h1>
      <p>Department of Primary Industries</p>
      <DPIFishSpeciesLiveFeed />
    </div>
  );
}

export default Catalogue;
