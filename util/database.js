const Sequelize = require("sequelize");

const sequelize = new Sequelize("sportscalendar_db", "root", "sportradar", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
