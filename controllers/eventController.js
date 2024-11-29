const { validationResult } = require("express-validator");
const { Event, Sport, Venue, EventCategory } = require("../models/models");

// helper function to validate related records
const validateRecordExistence = async (Model, id, modelName) => {
  const record = await Model.findByPk(id);
  if (!record) {
    throw new Error(`${modelName} with ID ${id} not found`);
  }
  return record;
};

// add a new event
exports.addEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { _sport_id, _category_id, _venue_id, data_time, description } =
      req.body;

    // Validate related records
    const sport = await validateRecordExistence(Sport, _sport_id, "Sport");
    const category = await validateRecordExistence(
      EventCategory,
      _category_id,
      "Category"
    );
    const venue = await validateRecordExistence(Venue, _venue_id, "Venue");

    // create the event
    const newEvent = await Event.create({
      _sport_id,
      _category_id,
      _venue_id,
      data_time,
      description,
    });

    // fetch the created event with associations
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

// get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
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

// get a single event by ID
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
