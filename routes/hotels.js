//import packages
import express from "express";

//import files
import {
  addHotelHandler,
  updateHotelHandler,
  deleteHotelHandler,
  getHotelByIdHandler,
  getAllHotelHandler,
} from "../controllers/hotel.js";
const router = express.Router();

//CREATE
router.post("/", addHotelHandler);

//UPDATE
router.put("/:id", updateHotelHandler);

//DELETE
router.delete("/:id", deleteHotelHandler);

// GET
router.get("/:id", getHotelByIdHandler);

//GET ALL
router.get("/", getAllHotelHandler);
export default router;
