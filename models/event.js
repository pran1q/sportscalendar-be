//importing models for referencing keys
const Sport = require("./sport");
const EventCategory = require("./eventCategory");
const Venue = require("./venue");

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

//event model
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
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "event",
    timestamps: false,
  }
);

module.exports = Event;
