import React from 'react';
import '../App.css'
import StoreForm from '../components/StoreForm';
import LiveFeed from '../components/LiveFeed';

function YourFish() {
  return (
    <div className="About">
      <h1>Register as a Retailer</h1>
      <p>Connect your store with local Australian Fisheries</p>
      <div style={{ display: 'flex', gap: '30px', padding: '30px' }}>
        <div style={{ flex: '1', border: '3px solid #ccc', padding: '10px' }}>
          <StoreForm />
        </div>
        <div style={{ flex: '1', border: '3px solid #ccc', padding: '40px' }}>
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}

export default YourFish;

