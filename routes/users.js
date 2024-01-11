import express from "express";
import {
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
} from "../controllers/users.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CEK VERIFY
// router.get("/check-authentication", verifyToken, (req, res, next) => {
//   res.send("hello user, youu are logged in!");
// });

router.get("/check-user/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete all account");
});

//CREATE
router.post("/", verifyUser, addUserHandler);

//UPDATE
router.put("/:id", verifyUser, updateUserHandler);

//DELETE
router.delete("/:id", verifyUser, deleteUserHandler);

// GET
router.get("/:id", verifyUser, getUserByIdHandler);

//GET ALL
router.get("/", verifyAdmin, getAllUserHandler);
export default router;
