'use strict';
const Mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    await Mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Error: ' + error.message);
  }
};

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.connect = connect;
exports.Mongoose = Mongoose;

