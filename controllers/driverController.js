const Driver = require('../models/Driver');
const Ambulance = require('../models/Ambulance');
const logger = require('../utils/logger');

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate('ambulance');
    res.json(drivers); 
  } catch (err) {
    logger.error('Error fetching drivers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createDriver = async (req, res) => {
  try {
    const { name, license, ambulanceId } = req.body;
     
    if(!name||!license||!ambulanceId){
        return res.status(400).send("please all fields are required");
    }


    const ambulance = await Ambulance.findById(ambulanceId);
    
    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }

    const findDriverExists= await Driver.findOne({license,name});

    if(findDriverExists){
      return res.status(401).send("driver  already exists");
    }

    const newDriver = new Driver({ name, license, ambulance: ambulance._id });
   if( await newDriver.save()){
     return res.status(201).json({message:"driver has been created successfully",newDriver}); 
   }
   return res.status(401).send("failed to create driver");

  } catch (err) {
    logger.error('Error creating driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, license, ambulanceId } = req.body;

    if(!name||!license||!ambulanceId){
      return res.status(400).send("please all fields are required");
  }

    const ambulance = await Ambulance.findById(ambulanceId);
    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }

  const findDriverExists= await Driver.findById(id);
    if(!findDriverExists){
      return res.status(401).send("driver not found");
    }
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { name, license, ambulance: ambulance._id },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ error: ' failed to update the driver' });
    }
    res.json({message:"driver updated",updatedDriver});
  } catch (err) {
    logger.error('Error updating driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const findDriverExists= await Driver.findById(id);
    if(!findDriverExists){
      return res.status(401).send("driver not found");
    }

    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: 'failed to delete the driver' });
    }
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    logger.error('Error deleting driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};