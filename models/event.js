// importing models for referencing keys
const Sport = require("./sport");
const EventCategory = require("./eventCategory");
const Venue = require("./venue");

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

// event model definition
const Event = sequelize.define(
  "event",
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    _sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sport,
        key: "sport_id",
      },
    },
    _category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EventCategory,
        key: "category_id",
      },
    },
    _venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venue,
        key: "venue_id",
      },
    },
    data_time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // ensure valid date
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500], // limit description to 500 characters
      },
    },
  },
  {
    tableName: "event",
    timestamps: false,
  }
);

// define associations
Event.belongsTo(Sport, { foreignKey: "_sport_id", as: "sport" });
Event.belongsTo(Venue, { foreignKey: "_venue_id", as: "venue" });
Event.belongsTo(EventCategory, { foreignKey: "_category_id", as: "category" });

module.exports = Event;
