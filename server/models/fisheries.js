const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fisheriesSchema = new Schema({
  name: {type: String, required: true},
  id: { type: Number, required: true, unique: true },
  species: { type: String, required: true },
  location: { type: String, required: true },
  fishing_method: { type: String},
  equipment: { type: String },
  vessels: { type: String },
  operators: { type: String },
  collection_methods: { type: String },
  depth_range: { type: String },
  nets: { type: String },
  tow_duration: { type: String },
  tow_speed: { type: String },
  bycatch_methods: { type: String },
  fishing_methods: { type: String },
  bycatch_methods: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fisheries", fisheriesSchema);
