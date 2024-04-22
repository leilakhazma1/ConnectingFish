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

module.exports = {
  getFisheries,
  createFishery
};
