"use strict";
const Store = require('../models/store');

const getStores = (res) => {
  Store.find({})
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
      console.log(err);
      res.send({result: 500, error: err.message});
    });
};

const createStore = (data, res) => {
  new Store(data).save()
    .then(data => res.send({result: 201, data: data}))
    .catch(err => {
      console.error('Error creating store:', err);
      res.send({result: 500, error: 'Could not create store'});
    });
};

module.exports = {
  getStores,
  createStore
};
