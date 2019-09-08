const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedoosaSchema = new Schema({
  name: {
    type: String,
    required: "Kindly enter the name of the medoosa"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  color: {
    type: Number,
    required: "Kindly enter the index of the color mod"
  },
  eyes: {
    type: Number,
    required: "Kindly enter the index of the eyes mod"
  },
  mouth: {
    type: Number,
    required: "Kindly enter the index of the mouth mod"
  },
  arms: {
    type: Number,
    required: "Kindly enter the index of the arms mod"
  },
  head: {
    type: Number,
    required: "Kindly enter the index of the head mod"
  }
});

module.exports = mongoose.model("Medoosa", MedoosaSchema);
