const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Competitor = sequelize.define(
  "Competitor",
  {
    competitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
    home_city: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "competitor",
    timestamps: false,
  }
);

module.exports = Competitor;
