const express = require("express");
const router = express.Router();
const sportController = require("../controllers/sportController");

router.get("/sports", sportController.getAllSports);

module.exports = router;
