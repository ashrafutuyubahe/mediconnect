// routes/ambulanceRoutes.js

const express = require("express");
const router = express.Router();
const ambulanceController = require("../controllers/ambulanceController");
const authMiddleware = require("../middleware/authMiddleware");
const http = require("http");
const socketIo = require("socket.io");
const logger = require("../utils/logger"); // Ensure you have a logger utility
const Ambulance = require("../models/Ambulance"); // Ensure the model is imported

// Initialize Socket.io
const server = http.createServer(router); // Use router instead of app
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Ambulances
 *   description: Ambulance management operations
 */

/**
 * @swagger
 * /ambulances:
 *   get:
 *     summary: Retrieve all ambulances
 *     tags: [Ambulances]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of ambulances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ambulance'
 *       500:
 *         description: Internal server error
 */
router.get("/ambulances", ambulanceController.getAmbulances);

/**
 * @swagger
 * /ambulances:
 *   post:
 *     summary: Create a new ambulance
 *     tags: [Ambulances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Ambulance object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *             required:
 *               - licensePlate
 *               - make
 *               - model
 *               - latitude
 *               - longitude
 *           example:
 *             licensePlate: "RAB 123C"
 *             make: "Toyota"
 *             model: "Hiace"
 *             latitude: -1.2921
 *             longitude: 36.8219
 *     responses:
 *       201:
 *         description: Ambulance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newAmbulance:
 *                   $ref: '#/components/schemas/Ambulance'
 *       401:
 *         description: All fields are required or ambulance already exists
 *       500:
 *         description: Internal server error
 */
router.post("/ambulances", ambulanceController.createAmbulance);

/**
 * @swagger
 * /ambulances/{id}:
 *   put:
 *     summary: Update an existing ambulance
 *     tags: [Ambulances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the ambulance to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Ambulance object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *             required:
 *               - licensePlate
 *               - make
 *               - model
 *               - latitude
 *               - longitude
 *           example:
 *             licensePlate: "RAB 456D"
 *             make: "Toyota"
 *             model: "Hiace"
 *             latitude: -1.3032
 *             longitude: 36.8210
 *     responses:
 *       200:
 *         description: Ambulance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedAmbulance:
 *                   $ref: '#/components/schemas/Ambulance'
 *       401:
 *         description: All fields are required
 *       404:
 *         description: Ambulance not found
 *       500:
 *         description: Internal server error
 */
router.put("/ambulances/:id", ambulanceController.updateAmbulance);

/**
 * @swagger
 * /ambulances/{id}:
 *   delete:
 *     summary: Delete an ambulance
 *     tags: [Ambulances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the ambulance to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ambulance deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Ambulance not found
 *       500:
 *         description: Internal server error
 */
router.delete("/ambulances/:id", ambulanceController.deleteAmbulance);

// Socket.io for updating ambulance location
io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("updateLocation", async (data) => {
    try {
      const ambulance = await Ambulance.findByIdAndUpdate(
        data.id,
        {
          location: {
            type: "Point",
            coordinates: [data.longitude, data.latitude],
          },
        },
        { new: true }
      );
      io.emit("locationUpdate", ambulance);
    } catch (err) {
      logger.error("Error updating location:", err);
    }
  });

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
});

module.exports = router;
