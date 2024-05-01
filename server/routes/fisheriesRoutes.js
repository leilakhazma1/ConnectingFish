let express = require("express");
let router = express.Router();
let fisheriesController = require("../controllers/fisheriesController");

// GET all fisheries
router.get('/', (req, res) => {
  fisheriesController.getFisheries(res);
});

// POST create a new fishery
router.post('/create', (req, res) => {
  fisheriesController.createFishery(req.body, res);
});

// PUT update an existing fishery
router.put('/:id', (req, res) => {
  const { id } = req.params;
  fisheriesController.updateFishery(id, req.body, res);
});

// DELETE delete an existing fishery
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  fisheriesController.deleteFishery(id, res);
});

module.exports = router;
