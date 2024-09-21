// routes/driverRoutes.js

const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management operations
 */

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Retrieve a list of all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of drivers successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/drivers', driverController.getDrivers);

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a new driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Driver object that needs to be added to the system
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - license
 *               - ambulanceId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the driver
 *                 example: "John Doe"
 *               license:
 *                 type: string
 *                 description: Driver's license number
 *                 example: "D1234567"
 *               ambulanceId:
 *                 type: string
 *                 description: ID of the ambulance assigned to the driver
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       201:
 *         description: Driver has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver has been created successfully"
 *                 newDriver:
 *                   $ref: '#/components/schemas/Driver'
 *       400:
 *         description: All fields are required
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Please provide all fields"
 *       401:
 *         description: Driver already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Driver already exists"
 *       404:
 *         description: Ambulance not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/drivers', driverController.createDriver);

/**
 * @swagger
 * /drivers/{id}:
 *   put:
 *     summary: Update an existing driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the driver to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4a67d0d8992e610c87"
 *     requestBody:
 *       description: Driver object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - license
 *               - ambulanceId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the driver
 *                 example: "Jane Smith"
 *               license:
 *                 type: string
 *                 description: Driver's license number
 *                 example: "D7654321"
 *               ambulanceId:
 *                 type: string
 *                 description: ID of the ambulance assigned to the driver
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver updated successfully"
 *                 updatedDriver:
 *                   $ref: '#/components/schemas/Driver'
 *       400:
 *         description: All fields are required
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Please provide all fields"
 *       401:
 *         description: Driver not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Driver not found"
 *       404:
 *         description: Ambulance not found or failed to update the driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/drivers/:id', driverController.updateDriver);

/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the driver to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4a67d0d8992e610c87"
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver deleted successfully"
 *       401:
 *         description: Driver not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Driver not found"
 *       404:
 *         description: Failed to delete the driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;
