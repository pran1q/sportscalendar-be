const { validationResult } = require("express-validator");
const { Event, Sport, Venue, EventCategory } = require("../models/models");
const sequelize = require("../util/database");

// Helper function to validate related records
const validateRecordExistence = async (Model, id, modelName) => {
  const record = await Model.findByPk(id);
  if (!record) {
    throw new Error(`${modelName} with ID ${id} not found`);
  }
  return record;
};

// Add a new event
exports.addEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { _sport_id, _category_id, _venue_id, data_time, description } =
      req.body;

    // Validate related records
    await validateRecordExistence(Sport, _sport_id, "Sport");
    await validateRecordExistence(EventCategory, _category_id, "Category");
    await validateRecordExistence(Venue, _venue_id, "Venue");

    // Create the event
    const newEvent = await Event.create({
      _sport_id,
      _category_id,
      _venue_id,
      data_time,
      description,
    });

    // Fetch the created event with associations
    const createdEvent = await Event.findByPk(newEvent.event_id, {
      include: [
        { model: Sport, as: "sport", attributes: ["name"] },
        { model: Venue, as: "venue", attributes: ["name", "location"] },
        { model: EventCategory, as: "category", attributes: ["name"] },
      ],
    });

    res.status(201).json({
      message: "Event created successfully",
      event: createdEvent,
    });
  } catch (error) {
    console.error(`Error adding event: ${JSON.stringify(req.body)}`, error);
    res
      .status(500)
      .json({ message: "Error adding event", error: error.message });
  }
};

// Get all events or filter by date
exports.getAllEvents = async (req, res) => {
  try {
    const { date } = req.query; // Get the optional date query parameter

    let whereClause = {};
    if (date) {
      whereClause = sequelize.where(
        sequelize.fn("DATE", sequelize.col("data_time")),
        date
      );
    }

    const events = await Event.findAll({
      where: whereClause,
      attributes: ["event_id", "data_time", "description"], // Limit fields for efficiency
      include: [
        { model: Sport, as: "sport", attributes: ["name"] },
        { model: Venue, as: "venue", attributes: ["name", "location"] },
        { model: EventCategory, as: "category", attributes: ["name"] },
      ],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ message: "Error retrieving events" });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: [
        { model: Sport, as: "sport", attributes: ["name"] },
        { model: Venue, as: "venue", attributes: ["name", "location"] },
        { model: EventCategory, as: "category", attributes: ["name"] },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(`Error retrieving event with ID ${id}:`, error);
    res.status(500).json({ message: "Error retrieving event" });
  }
};

// Get today's events
exports.getTodaysEvents = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const events = await Event.findAll({
      where: sequelize.where(
        sequelize.fn("DATE", sequelize.col("data_time")),
        today
      ),
      include: [
        { model: Sport, as: "sport", attributes: ["name"] },
        { model: Venue, as: "venue", attributes: ["name", "location"] },
        { model: EventCategory, as: "category", attributes: ["name"] },
      ],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving today's events:", error);
    res.status(500).json({ message: "Error retrieving today's events" });
  }
};
