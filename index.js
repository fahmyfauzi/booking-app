//import packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import files
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

// Fungsi untuk menghubungkan ke MongoDB
const connect = async () => {
  try {
    // Menggunakan metode connect dari Mongoose untuk menghubungkan ke MongoDB
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to mongoDB");
  } catch (err) {
    throw err;
  }
};

// Event handler untuk event disconnected pada koneksi MongoDB
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Event handler untuk event connected pada koneksi MongoDB
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

//middleware
app.use(cookieParser());
app.use(express.json());

//router
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connect();
  console.log(`Connected to backend on http://localhost:${port}`);
});
