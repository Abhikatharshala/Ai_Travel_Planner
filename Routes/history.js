const express = require("express");
const router = express.Router();
const { getHistory } = require("../Controller/historyController");
const middleware = require("../middleware/authMiddleware");

router.get("/getHistory", middleware, getHistory);   

module.exports = router;
