const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", protect, createProduct);
router.put("/products/:id", protect, updateProduct);
router.delete("/products/:id", protect, deleteProduct);

module.exports = router;
