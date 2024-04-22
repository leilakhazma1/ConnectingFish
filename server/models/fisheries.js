const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fisheriesSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  location: { type: String, required: true },
  target_species: { type: String, required: true },
  main_species: { type: String },
  fishing_method: { type: String, required: true },
  equipment: { type: String },
  vessels: { type: String },
  operators: { type: String },
  collection_methods: { type: String, required: true },
  depth_range: { type: String },
  key_species: { type: String },
  nets: { type: String },
  tow_duration: { type: String },
  tow_speed: { type: String },
  bycatch_methods: { type: String },
  species: { type: String },
  fishing_methods: { type: String },
  bycatch_methods: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fisheries", fisheriesSchema);
