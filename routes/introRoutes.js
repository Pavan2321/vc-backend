const express = require("express");
const { introController } = require("../controllers/introController");
const router = express.Router();

router.get("/", introController);

module.exports = router;