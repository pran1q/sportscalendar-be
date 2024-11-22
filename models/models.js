// ensure models and associations are initialized
const Sport = require("./sport");
const Event = require("./event");
const Venue = require("./venue");
const Competitor = require("./competitor");
const EventCategory = require("./eventCategory");
const EventCompetitor = require("./eventCompetitor");

const models = {
  Sport,
  Event,
  Venue,
  Competitor,
  EventCategory,
  EventCompetitor,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
