const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Venue = sequelize.define(
  "Venue",
  {
    venue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "venue",
    timestamps: false,
  }
);

module.exports = Venue;
