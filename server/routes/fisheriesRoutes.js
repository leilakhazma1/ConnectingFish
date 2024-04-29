let express = require("express");
let router = express.Router();
let fisheriesController = require("../controllers/fisheriesController");

router.get('/', (req, res) => {
  fisheriesController.getFisheries(res);
});

router.post('/create', (req, res) => {
  fisheriesController.createFishery(req.body, res);
});

module.exports = router;
