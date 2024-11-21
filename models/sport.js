const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Sport = sequelize.define("Sport", {
  sport_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Sport;
