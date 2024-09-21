const Ambulance = require("../models/Ambulance");
const logger = require("../utils/logger");

exports.getAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (err) {
    logger.error("Error fetching ambulances:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createAmbulance = async (req, res) => {
  try {
    const { licensePlate, make, model, latitude, longitude } = req.body;
    if(!licensePlate||!make||!model||!latitude|| !longitude){
       return res.status(401).send("please all fields are  required");
    }
    const findAmbulanceExists= await Ambulance.findOne({licensePlate});
    if(findAmbulanceExists){
      res.status(401).send("the ambulance already exists");
    }

    const newAmbulance = new Ambulance({
      licensePlate,
      make,
      model,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
      if(await newAmbulance.save()){
        return res.status(201).json({message:"ambulance is created",newAmbulance});
      }

      return res.status(401).send("failed to create ambulance");
  } catch (err) {
    logger.error("Error creating ambulance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const { licensePlate, make, model, latitude, longitude } = req.body;

    if(!licensePlate||!make||!model||!latitude|| !longitude){
      return res.status(401).send("please all fields are  required");
   }
   
    const findAmbulanceExists= await Ambulance.findById(id);

    if(!findAmbulanceExists){
    return res.status(404).json({ error: "Ambulance not found" });
    }

    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      id,
      {
        licensePlate,
        make,
        model,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );
    if (!updatedAmbulance) {
      return res.status(404).json({ error: "failed to update the Ambulance" });
    }

    res.json({message:"the ambulance has been updated",updatedAmbulance});
  } catch (err) {
    logger.error("Error updating ambulance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    
    const findAmbulanceExists= await Ambulance.findById(id);
    if(!findAmbulanceExists){
    return res.status(404).json({ error: "Ambulance not found" });
    }
    const deletedAmbulance = await Ambulance.findByIdAndDelete(id);

    if (!deletedAmbulance) {
      return res.status(404).json({ error: " failed to delete ambulance" });
    }

    res.json({ message: "Ambulance deleted" });
  } catch (err) {
    logger.error("Error deleting ambulance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
