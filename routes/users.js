import express from "express";
import {
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
} from "../controllers/users.js";
const router = express.Router();

//CREATE
router.post("/", addUserHandler);

//UPDATE
router.put("/:id", updateUserHandler);

//DELETE
router.delete("/:id", deleteUserHandler);

// GET
router.get("/:id", getUserByIdHandler);

//GET ALL
router.get("/", getAllUserHandler);
export default router;
