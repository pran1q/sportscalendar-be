const express = require("express");
const app = express();

const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import database connection and models
const sequelize = require("./util/database");
const models = require("./models/models"); // Models imported from models/index.js

// Sync database and start the server
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Error syncing database:", err));
