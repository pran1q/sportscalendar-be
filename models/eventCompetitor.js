const Event = require("./event");
const Competitor = require("./competitor");

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const EventCompetitor = sequelize.define(
  "EventCompetitor",
  {
    event_competitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    is_home_competitor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "event_competitor",
    timestamps: false,
  }
);

// associations in the model
EventCompetitor.associate = function (models) {
  // EventCompetitor belongs to an Event
  EventCompetitor.belongsTo(models.Event, {
    foreignKey: "_event_id",
    as: "event",
  });

  // EventCompetitor belongs to a Competitor
  EventCompetitor.belongsTo(models.Competitor, {
    foreignKey: "_competitor_id",
    as: "competitor",
  });
};

module.exports = EventCompetitor;
