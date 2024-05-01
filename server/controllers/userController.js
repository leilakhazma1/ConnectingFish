"use strict";
let User = require("../models/user");

const getUsers = (res) => {
  User.find({})
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
      console.log(err);
      res.send({result: 500, error: err.message});
    });
};

const createUser = async (data, res) => {
  const { username, email } = data;

  try {
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.send({ result: 400, error: 'User with the same username or email already exists' });
    } else {
      // No existing user found, create a new user
      new User(data).save()
        .then(data => res.send({result: 200, data: data}))
        .catch(err => {
          console.log(err);
          res.send({result: 500, error: err.message});
        });
    }
  } catch (error) {
    console.error(error);
    res.send({result: 500, error: 'Internal server error'});
  }
};

const loginUser = async (data, res) => {
  const { username, password } = data;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, return success message or token
      res.send({ result: 200, message: 'Login successful' });
    } else {
      // User not found or password incorrect
      res.send({ result: 401, error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.send({ result: 500, error: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser
};
