import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("helo this is a auth endpoint");
});

export default router;
