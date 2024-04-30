const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Route to create a new store
router.post('/', storeController.createStore);

// Route to get all stores
router.get('/', storeController.getStores);

module.exports = router;
