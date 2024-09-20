const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    required: true,
  },
  make: {
    type: String, 
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

ambulanceSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Ambulance", ambulanceSchema);
