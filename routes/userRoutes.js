const express = require("express");
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/users", registerUser);
router.get("/users/:id", protect, getUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

module.exports = router;
