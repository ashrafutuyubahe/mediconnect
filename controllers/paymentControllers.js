const PaymentMethod = require("../models/Payment");
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Appointment= require("../models/Appointment");

exports.addPaymentMethod = async (req, res) => {
  try {
    const { type, last4, expMonth, expYear } = req.body;
    if( !type||!last4 ||!expMonth ||!expYear){
      return res.status(401).send("please provide all fields");
    }

     const  findPaymentExist= await PaymentMethod.findOne({type});
     if(findPaymentExist){
      return res.status(401).send("payment method already exists");
     }

    const newPaymentMethod = new PaymentMethod({ type, last4, expMonth, expYear, user: req.user.id });
    await newPaymentMethod.save();
    res.status(201).json({message:"payment method added",newPaymentMethod});
  } catch (err) {
    logger.error('Error adding payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ user: req.user.id });
    res.json(paymentMethods);
  } catch (err) {
    logger.error('Error fetching payment methods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, last4, expMonth, expYear } = req.body;

    if( !type||!last4 ||!expMonth ||!expYear){
      return res.status(401).send("please provide all fields");
    }

    const  findPaymentExist= await PaymentMethod.findOne({type});
     if(!findPaymentExist){
      return res.status(401).send("payment method not found");
     }

    const updatedPaymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { type, last4, expMonth, expYear },
      { new: true }
    );
    if (!updatedPaymentMethod) {
      return res.status(404).json({ error: 'failed  to update the payment method' });
    }
    res.json(updatedPaymentMethod);
  } catch (err) {
    logger.error('Error updating payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const  findPaymentExist= await PaymentMethod.findById(id);
     if(!findPaymentExist){
      return res.status(401).send("payment method not found");
     }

    const deletedPaymentMethod = await PaymentMethod.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deletedPaymentMethod) {
      return res.status(404).json({ error: 'failed to delete payment method' });
    }
    res.json({ message: 'Payment method deleted' });
  } catch (err) {
    logger.error('Error deleting payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.processPayment = async (req, res) => {
  try {
    const { appointmentId, paymentMethodId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const paymentMethod = await PaymentMethod.findById(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const { amount } = appointment; 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'usd',
      payment_method: paymentMethod.id,
      customer: req.user.id,
      off_session: true,
      confirm: true
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    logger.error('Error processing payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};