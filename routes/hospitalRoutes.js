const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const hospitalController = require('../controllers/hospitalController');

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: Hospital management operations
 */

router.use(authMiddleware);

/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: Retrieve all hospitals
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Internal server error
 */
router.get('/hospitals', hospitalController.getHospitals);

/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Hospital object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the hospital
 *               location:
 *                 type: string
 *                 description: Location of the hospital
 *           example:
 *             name: "City Hospital"
 *             location: "123 Main St, Cityville"
 *     responses:
 *       201:
 *         description: Hospital has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       400:
 *         description: All fields are required or hospital already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "please provide all fields"
 *       500:
 *         description: Internal server error
 */
router.post('/hospitals', hospitalController.createHospital);

/**
 * @swagger
 * /hospitals/{id}:
 *   put:
 *     summary: Update an existing hospital
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the hospital to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Hospital object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the hospital
 *               location:
 *                 type: string
 *                 description: Location of the hospital
 *           example:
 *             name: "Updated Hospital"
 *             location: "456 Side St, Cityville"
 *     responses:
 *       200:
 *         description: Hospital updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "hospital updated successfully"
 *                 updatedHospital:
 *                   $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The hospital doesn't exist"
 *       500:
 *         description: Internal server error
 */
router.put('/hospitals/:id', hospitalController.updateHospital);

/**
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Delete a hospital
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the hospital to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hospital deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hospital deleted successfully"
 *       404:
 *         description: Hospital not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The hospital doesn't exist"
 *       500:
 *         description: Internal server error
 */
router.delete('/hospitals/:id', hospitalController.deleteHospital);

module.exports = router;
