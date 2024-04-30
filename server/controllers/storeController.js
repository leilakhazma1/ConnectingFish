const Store = require('../models/store');

// Controller function to create a new store
const createStore = async (req, res) => {
  try {
    const {
      storeName,
      address,
      city,
      state,
      postalCode,
      country,
      contactPerson,
      contactEmail,
      contactPhone,
    } = req.body;

    // Create a new store document
    const newStore = new Store({
      storeName,
      address,
      city,
      state,
      postalCode,
      country,
      contactPerson,
      contactEmail,
      contactPhone,
    });

    // Save the new store to the database
    const savedStore = await newStore.save();

    res.status(201).json(savedStore);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ error: 'Could not create store' });
  }
};

module.exports = {
  createStore,
};
