import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StoreLocator = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Store added successfully!');
        // Reset the form after successful submission
        setFormData({
          storeName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          contactPerson: '',
          contactEmail: '',
          contactPhone: '',
        });
      } else {
        alert('Failed to add store. Please try again.');
      }
    } catch (error) {
      console.error('Error adding store:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Add Your Fish Retail Store</h2>
      <form onSubmit={handleSubmit}>
       
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default StoreLocator;
