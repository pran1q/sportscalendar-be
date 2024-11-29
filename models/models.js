// import all models
const Sport = require("./sport");
const Event = require("./event");
const Venue = require("./venue");
const Competitor = require("./competitor");
const EventCategory = require("./eventCategory");
const EventCompetitor = require("./eventCompetitor");

// combine models into a single object for easier management
const models = {
  Sport,
  Event,
  Venue,
  Competitor,
  EventCategory,
  EventCompetitor,
};

// initialize associations for each model
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// export all models for use in other parts of the application
module.exports = models;
