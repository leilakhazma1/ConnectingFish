import React, { useState } from 'react';

const EditFisheryModal = ({ selectedFishery, onClose, onUpdate }) => {
  const [name, setName] = useState(selectedFishery.name);
  const [species, setSpecies] = useState(selectedFishery.species);
  const [location, setLocation] = useState(selectedFishery.location);

  const handleUpdate = async () => {
    const updatedFishery = {
      ...selectedFishery,
      name,
      species,
      location,
    };

    try {
      const response = await fetch(`/api/fisheries/${selectedFishery._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFishery),
      });

      if (!response.ok) {
        throw new Error('Failed to update fishery');
      }

      onUpdate(updatedFishery); // Update the state in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Fishery</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="species">Species:</label>
          <input
            type="text"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button type="button" onClick={handleUpdate}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditFisheryModal;
