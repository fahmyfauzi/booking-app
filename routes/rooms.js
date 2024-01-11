import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoomHandler,
  updateRoomHandler,
  deleteRoomHandler,
  getAllRoomHandler,
  getRoomByIdHandler,
} from "../controllers/room.js";
const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoomHandler);

//UPDATE
router.put("/:id", verifyAdmin, updateRoomHandler);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoomHandler);

// GET
router.get("/:id", getRoomByIdHandler);

//GET ALL
router.get("/", getAllRoomHandler);

export default router;
