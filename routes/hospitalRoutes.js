const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.get('/hospitals', hospitalController.getHospitals);
router.post('/hospitals', hospitalController.createHospital);
router.put('/hospitals/:id', hospitalController.updateHospital);
router.delete('/hospitals/:id', hospitalController.deleteHospital);

module.exports = router;
