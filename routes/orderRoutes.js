const express = require("express");
const {
  createOrder,
  getOrder,
  getUserOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/orders", protect, createOrder);
router.get("/orders/:id", protect, getOrder);
router.get("/users/:id/orders", protect, getUserOrders);

module.exports = router;
