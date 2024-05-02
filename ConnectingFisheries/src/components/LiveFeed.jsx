import React from 'react';

const LiveFeed = () => {
  return (
    <div>
      <iframe
        title="AFMA Commercial Fishers"
        src="https://www.afma.gov.au/fisheries-management/monitoring-tools/logbooks-and-elogs"
        style={{ width: '100%', height: '600px', border: 'none' }}
      />
    </div>
  );
};

export default LiveFeed;
