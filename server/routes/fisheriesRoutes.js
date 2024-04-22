let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get('/', (req, res) => {
  Controllers.fisheriesController.getFisheries(res);
});

router.post('/create', (req, res) => {
  Controllers.fisheriesController.createFishery(req.body, res);
});

module.exports = router;
