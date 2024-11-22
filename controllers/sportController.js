const { Sport } = require("../models/models");

exports.getAllSports = async (req, res) => {
  try {
    const sports = await Sport.findAll(); // Query all sports
    res.status(200).json(sports); // Return the sports data as a JSON response
  } catch (err) {
    console.error("Error retrieving sports:", err);
    res.status(500).json({ message: "Error retrieving sports data" });
  }
};
