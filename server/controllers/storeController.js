const Store = require('../models/store');

const getStores = (res) => {
  Store.find({})
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.send({ result: 200, data: data });
    })
    .catch(err => {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send({ result: 500, error: err.message });
    });
};

const createStore = (req, res) => {
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

  newStore.save()
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).send({ result: 201, data: data });
    })
    .catch(err => {
      console.error('Error creating store:', err);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ result: 500, error: 'Could not create store' });
    });
};

module.exports = {
  getStores,
  createStore
};
