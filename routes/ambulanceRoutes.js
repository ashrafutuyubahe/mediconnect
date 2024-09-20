const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
const router = express.Router();
const ambulanceController = require("../controllers/ambulanceController");
const authMiddleware = require("../middleware/authMiddleware");

// router.use(authMiddleware);

router.get("/ambulances", ambulanceController.getAmbulances);
router.post("/ambulances", ambulanceController.createAmbulance);
router.put("/ambulances/:id", ambulanceController.updateAmbulance);
router.delete("/ambulances/:id", ambulanceController.deleteAmbulance);
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
