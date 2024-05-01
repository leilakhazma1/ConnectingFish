const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for creating a new user (signup)
router.post('/create', (req, res) => {
  userController.createUser(req.body, res);
});

// Route for logging in an existing user
router.post('/login', (req, res) => {
  userController.loginUser(req.body, res);
});

module.exports = router;
