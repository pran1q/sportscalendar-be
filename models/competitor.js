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
      type: DataTypes.STRING(100), // limit name length to 100 characters
      allowNull: false,
      validate: {
        notEmpty: true, // ensure name is not empty
      },
    },
    country: {
      type: DataTypes.STRING(50), // limit country name to 50 characters
      validate: {
        is: /^[a-zA-Z\s]*$/, // only allow letters and spaces
      },
    },
    home_city: {
      type: DataTypes.STRING(100), // limit home city to 100 characters
    },
  },
  {
    tableName: "competitor",
    timestamps: false,
  }
);

module.exports = Competitor;
