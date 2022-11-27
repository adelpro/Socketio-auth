require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsConfigs = require("./config/corsConfigs");
const allowedOrigins = require("./config/allowedOrigins");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3500;
app.use(cors(corsConfigs));
app.use(express.json());
const connectDB = require("./config/dbConn");

// Socketio must be declared before API routes
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  transports: ["websocket","polling"],
  maxHttpBufferSize: 1e8, // 100 MB we can upload to server (By Default = 1MB)
  pingTimeout: 60000, // increate the ping timeout
  cors: { origin: allowedOrigins },
});
require("./socketio.js")(io);

// socketio auth
// io.use(auth);

connectDB();
mongoose.connection.once("open", () => {
  server.listen(port, () => {
    console.log("🔗 Successfully Connected to MongoDB");
    console.log(`✅ Application running on port: ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
