//import packages
import express from "express";

//import files
import {
  addHotelHandler,
  updateHotelHandler,
  deleteHotelHandler,
  getHotelByIdHandler,
  getAllHotelHandler,
  countByCityHandler,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, addHotelHandler);

//UPDATE
router.put("/:id", verifyAdmin, updateHotelHandler);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotelHandler);

// GET
router.get("find/:id", getHotelByIdHandler);

//GET ALL
router.get("/", getAllHotelHandler);

//COUNT BY CITI, TYPE
router.get("/countByCity", countByCityHandler);

export default router;
