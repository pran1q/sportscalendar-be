const express = require("express");
const router = express.Router();
// Importing validators for validating request data
const { body } = require("express-validator");

const eventController = require("../controllers/eventController");

// POST /api/events - Add a new event
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

// GET /api/events - Get all events (optionally filter by date using query param: ?date=YYYY-MM-DD)
router.get("/events", eventController.getAllEvents);

// GET /api/events/today - Get events happening today
router.get("/events/today", eventController.getTodaysEvents); // Ensure this exists in eventController.js

// GET /api/events/:id - Get one event by ID
router.get("/events/:id", eventController.getEventById);

module.exports = router;
