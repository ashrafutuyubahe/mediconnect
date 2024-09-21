const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const connectDB = require("./database/connection");
const logger = require("./utils/logger");
const authRoutes = require("./routes/authRoutes");
const appointmentsRoutes = require("./routes/appointmentRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const driverRoutes = require("./routes/driverRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
// const payment_methodRoutes = require("./routes/paymentRoute");
app.use(express.json());
connectDB();

app.use("/auth/authRoute", authRoutes);
app.use("/api/appointmentsRoutes", appointmentsRoutes);
app.use("/api/ambulanceRoutes", ambulanceRoutes);
app.use("/api/driverRoutes", driverRoutes);
app.use("/api/hospitalRoutes", hospitalRoutes);
// app.use("/api/payment_methodRoutes",payment_methodRoutes)

//swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





app.use((err, req, res, next) => {
  logger.error("An error occurred:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Socket.IO
io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("updateLocation", async (data) => {
    try {
      const ambulance = await ambulance.findByIdAndUpdate(
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

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
