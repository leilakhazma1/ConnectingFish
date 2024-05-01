"use strict";
let Models = require("../models");

const getUsers = (res) => {
  Models.User.find({})
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

const createUser = (data, res) => {
  const { username, email, password, role } = data;

  // Validate role
  if (!role || !['sole_trader', 'government_official'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role specified' });
  }

  new Models.User({ username, email, password, role }).save()
    .then(data => res.send({ result: 200, data: data }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  getUsers,
  createUser
};
