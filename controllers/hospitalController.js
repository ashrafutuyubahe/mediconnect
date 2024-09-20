const Hospital = require('../models/Hospital');
const logger = require('../utils/logger');
const mongoose= require("mongoose");

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    logger.error('Error fetching hospitals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createHospital = async (req, res) => {
  try {
    const { name, location } = req.body;

      if(!location || !name){
        res.status(400).send("please provide all fields");
      }
 
      const doesHospitalExist = await Hospital.findOne({name});
      if(doesHospitalExist){
        res.status(400).send("Hospital already exists");
      }   

    const newHospital = new Hospital({ name, location });
    await newHospital.save();
    res.status(201).json(newHospital);
  } catch (err) {
    logger.error('Error creating hospital:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const doesHospitalExist = await Hospital.findById(id);

    if (!doesHospitalExist) {
      return res.status(404).json({ error: "The hospital doesn't exist" });
    }
    
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ error: ' failed to update the hospital' });
    }
    res.json({updatedHospital,message:"hospital updated  successfully"});
  } catch (err) {
    logger.error('Error updating hospital:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
 
   
    const doesHospitalExist = await Hospital.findById(id);

    if (!doesHospitalExist) {
      return res.status(404).json({ error: "The hospital doesn't exist" });
    }

    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    res.json({ message: 'Hospital deleted successfully' });
  } catch (err) {
    logger.error('Error deleting hospital:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};