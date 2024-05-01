import React from 'react';

function About() {
  return (
    <div className="About" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
      <div className="content" style={{ maxWidth: '800px', padding: '20px', textAlign: 'center' }}>
        <h1 className="heading" style={{ textAlign: 'center' }}>About ConnectingFish</h1>
        <div className="text" style={{ textAlign: 'left' }}>
          <p>
            ConnectingFish is an application that aims to connect local Australian fisheries with retailers
            to promote sustainable fishing practices and support local businesses.
          </p>
          <p>
            The application allows retailers to register their stores and connect with nearby fisheries,
            facilitating the sale of fresh, locally sourced seafood to consumers.
          </p>
          <p>
            Through ConnectingFish, retailers can easily access information about available fish species,
            fishing locations, and sustainable fishing practices, helping to promote responsible seafood
            consumption and support local fishing communities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

