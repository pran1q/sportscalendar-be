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
      type: DataTypes.STRING(100), // limit name to 100 characters
      allowNull: false,
      validate: {
        notEmpty: true, // ensure name is not empty
        len: [1, 100], // name must be between 1 and 100 characters
      },
    },
    location: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 255], // limit location description to 255 characters
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true, // must be an integer
        min: 1, // must be at least 1
      },
    },
  },
  {
    tableName: "venue",
    timestamps: false,
  }
);

// define associations
Venue.associate = function (models) {
  // A venue can host many events
  Venue.hasMany(models.Event, {
    foreignKey: "_venue_id",
    as: "events",
  });
};

module.exports = Venue;
