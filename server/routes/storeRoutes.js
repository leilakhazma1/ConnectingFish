const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Route to create a new store
router.post('/', storeController.createStore);

module.exports = router;
