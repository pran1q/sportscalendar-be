const express = require("express");
const router = express.Router();
const { Sport } = require("../models/models");

// GET /api/sports - Retrieve all sports
router.get("/", async (req, res) => {
  try {
    const sports = await Sport.findAll({ attributes: ["sport_id", "name"] }); // Get sport IDs and names
    res.status(200).json(sports);
  } catch (err) {
    console.error("Error fetching sports:", err);
    res.status(500).json({ message: "Error fetching sports" });
  }
});

module.exports = router;
