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
    <div className="form-container">
      <h2>Store Information Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="storeName">Store Name</label>
          <input
            type="text"
            id="storeName"
            {...register('storeName', { required: true })}
          />
          {errors.storeName && <span className="error">Store Name is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            {...register('location', { required: true })}
          />
          {errors.location && <span className="error">Location is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && <span className="error">Description is required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Form submitted successfully!</p>}
    </div>
  );
};

export default StoreForm;
