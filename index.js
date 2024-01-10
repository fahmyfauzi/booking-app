import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.listen(3000, () => {
  connect();
  console.log(`Connected to backend!`);
});
