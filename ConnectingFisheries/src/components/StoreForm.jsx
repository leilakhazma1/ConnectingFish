import React, { useState } from 'react';

const StoreForm = () => {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

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
          address,
          city,
          state,
          postalCode,
          country,
          contactPerson,
          contactEmail,
          contactPhone,
        }),
      });

      if (response.ok) {
        // Reset form fields on successful submission
        setStoreName('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountry('');
        setContactPerson('');
        setContactEmail('');
        setContactPhone('');
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

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />

      <label htmlFor="postalCode">Postal Code:</label>
      <input
        type="text"
        id="postalCode"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
      />

      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />

      <label htmlFor="contactPerson">Contact Person:</label>
      <input
        type="text"
        id="contactPerson"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
        required
      />

      <label htmlFor="contactEmail">Contact Email:</label>
      <input
        type="email"
        id="contactEmail"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        required
      />

      <label htmlFor="contactPhone">Contact Phone:</label>
      <input
        type="text"
        id="contactPhone"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default StoreForm;

