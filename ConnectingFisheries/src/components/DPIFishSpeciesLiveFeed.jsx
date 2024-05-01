import React from 'react';

const DPIFishSpeciesLiveFeed = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <iframe
        title="DPI Fish Species"
        src="https://www.dpi.nsw.gov.au/fishing/fish-species"
        style={{ width: '50%', height: '600px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default DPIFishSpeciesLiveFeed;
