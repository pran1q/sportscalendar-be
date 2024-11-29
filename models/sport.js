const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Sport = sequelize.define(
  "sport",
  {
    sport_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100), // limit name length to 100 characters
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true, // ensure name is not empty
        len: [1, 100], // name must be between 1 and 100 characters
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
    tableName: "sport",
    timestamps: false,
  }
);

// define associations
Sport.associate = function (models) {
  // A sport can have many events
  Sport.hasMany(models.Event, {
    foreignKey: "_sport_id",
    as: "events",
  });
};

module.exports = Sport;
