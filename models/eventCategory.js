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
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "eventcategory",
    timestamps: false,
  }
);

module.exports = EventCategory;
