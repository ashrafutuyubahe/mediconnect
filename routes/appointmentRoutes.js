// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/appointmentsRoutes/appointments:
 *   get:
 *     summary: Retrieve a list of appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.get('/appointments', appointmentsController.getAppointments);

/**
 * @swagger
 * /api/appointmentsRoutes/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *           example:
 *             date: "2023-08-24T14:30:00Z"
 *             time: "14:30"
 *             provider: "Dr. John Doe"
 *             user: "60d21b4967d0d8992e610c86"
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post('/appointments', appointmentsController.createAppointment);

/**
 * @swagger
 * /api/appointmentsRoutes/appointments/{id}:
 *   put:
 *     summary: Update an existing appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The appointment ID
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *           example:
 *             date: "2023-09-01T10:00:00Z"
 *             time: "10:00"
 *             provider: "Dr. Jane Smith"
 *             user: "60d21b4967d0d8992e610c86"
 *     responses:
 *       200:
 *         description: Appointment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/appointments/:id', appointmentsController.updateAppointment);

/**
 * @swagger
 * /api/appointmentsRoutes/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The appointment ID
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Appointment deleted successfully.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/appointments/:id', appointmentsController.deleteAppointment);

module.exports = router;
