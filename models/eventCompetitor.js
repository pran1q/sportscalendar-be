const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const EventCompetitor = sequelize.define(
  "EventCompetitor",
  {
    event_competitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    _event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "event", // table name
        key: "event_id", // primary key in Event
      },
      validate: {
        isInt: true, // must be an integer
        min: 1, // must be greater than 0
      },
    },
    _competitor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "competitor", // table name
        key: "competitor_id", // primary key in Competitor
      },
      validate: {
        isInt: true, // must be an integer
        min: 1, // must be greater than 0
      },
    },
    is_home_competitor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isIn: [[true, false]], // must be a boolean
      },
    },
  },
  {
    tableName: "event_competitor",
    timestamps: false,
  }
);

// define associations
EventCompetitor.associate = function (models) {
  // eventCompetitor belongs to an Event
  EventCompetitor.belongsTo(models.Event, {
    foreignKey: "_event_id",
    as: "event",
  });

  // eventCompetitor belongs to a Competitor
  EventCompetitor.belongsTo(models.Competitor, {
    foreignKey: "_competitor_id",
    as: "competitor",
  });
};

module.exports = EventCompetitor;
