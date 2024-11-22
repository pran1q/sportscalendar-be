const sequelize = require("../util/database");

// Import all models
const models = {
  Sport: require("./sport"),
  Event: require("./event"),
  Venue: require("./venue"),
  Competitor: require("./competitor"),
  EventCategory: require("./eventCategory"),
  EventCompetitor: require("./eventCompetitor"),
};

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models; // Export all models
