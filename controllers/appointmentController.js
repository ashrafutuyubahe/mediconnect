
const Appointment = require('../models/Appointment');
const logger = require('../utils/logger');

exports.getAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    logger.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { date, time, provider } = req.body;
    if(!date||!time||!provider){
      res.status(401).send("please provide all fields");
    }
    
    const checkAppointmentIsValid= await Appointment.findOne({ date, time, provider});

     if(checkAppointmentIsValid){
      res.status(401).send("please provide different appointment,that one already exists");
     }

    

    const newAppointment = new Appointment({date: new Date(date), time, provider, user: req.user.id });
    await newAppointment.save();

    res.status(201).json({newAppointment,message:"successfully created the appointment"});
  } catch (err) {
    logger.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, provider } = req.body;


    if(!date||!time ||!provider){
      res.status(400).send("please provide all fields");
    }

    const doesAppointmentExist = await Appointment.findOne({id});

    if(!doesAppointmentExist){
      res.status(400).send("Appointment doesn't exists");
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {date: new Date(date), time, provider },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'failed to update the Appointment' });
    }
    res.json(updatedAppointment);
  } catch (err) {
    logger.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doesAppointmentExist = await Hospital.findOne({id});

    if(!doesAppointmentExist){
      res.status(400).send("Hospital doesn't exists");
    }

    const deletedAppointment = await Appointment.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    logger.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};