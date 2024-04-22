const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/create', (req, res) => {
  userController.createUser(req.body, res);
});

module.exports = router;
