import React, { useState } from 'react';

const StoreForm = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/stores/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          location,
          contact,
          email,
        }),
      });

      if (response.ok) {
        // Reset form fields on successful submission
        setStoreName('');
        setLocation('');
        setContact('');
        setEmail('');
        alert('Store information submitted successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit store information');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="storeName">Store Name:</label>
      <input
        type="text"
        id="storeName"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label htmlFor="contact">Contact:</label>
      <input
        type="text"
        id="contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default StoreForm;
