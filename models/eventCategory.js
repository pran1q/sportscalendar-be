const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const EventCategory = sequelize.define(
  "EventCategory",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50), // limit name length to 50 characters
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true, // ensure name is not empty
        len: [1, 50], // name must be between 1 and 50 characters
      },
    },
  },
  {
    tableName: "event_category",
    timestamps: false,
  }
);

// define associations
EventCategory.associate = function (models) {
  EventCategory.hasMany(models.Event, {
    foreignKey: "_category_id",
    as: "events",
  });
};

module.exports = EventCategory;
