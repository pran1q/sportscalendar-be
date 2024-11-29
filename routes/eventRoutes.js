const express = require("express");
const router = express.Router();
// importing validators for validating req data
const { body } = require("express-validator");

const eventController = require("../controllers/eventController");

// POST /api/events ADD NEW EVENT
router.post(
  "/events",
  [
    body("_sport_id").isInt().withMessage("Sport ID must be an integer"),
    body("_category_id").isInt().withMessage("Category ID must be an integer"),
    body("_venue_id").isInt().withMessage("Venue ID must be an integer"),
    body("data_time").isISO8601().withMessage("Invalid date format"),
  ],
  eventController.addEvent
);

// GET /api/events GET ALL EVENTS
router.get("/events", eventController.getAllEvents);

// GET /api/events GET ONE EVENT
router.get("/events/:id", eventController.getEventById);

module.exports = router;
