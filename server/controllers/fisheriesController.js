"use strict";
let Models = require("../models");

const getFisheries = (res) => {
  Models.Fishery.find({})
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
      console.log(err);
      res.send({result: 500, error: err.message});
    });
};

const createFishery = (data, res) => {
  new Models.Fishery(data).save()
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
      console.log(err);
      res.send({result: 500, error: err.message});
    });
};

const updateFishery = (id, data, res) => {
  Models.Fishery.findByIdAndUpdate(id, data, { new: true })
    .then(updatedFishery => {
      if (!updatedFishery) {
        throw new Error('Fishery not found');
      }
      res.send({ result: 200, data: updatedFishery });
    })
    .catch(err => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteFishery = (id, res) => {
  Models.Fishery.findByIdAndDelete(id)
    .then(deletedFishery => {
      if (!deletedFishery) {
        throw new Error('Fishery not found');
      }
      res.send({ result: 200, data: deletedFishery });
    })
    .catch(err => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getFisheries,
  createFishery,
  updateFishery,
  deleteFishery
};
