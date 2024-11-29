const port = 3000;

// importing express
const express = require("express");
// database connection
const sequelize = require("./util/database");

const eventRoutes = require("./routes/eventRoutes");

// initialize express app
const app = express();

// middleware to parse incoming JSON req
app.use(express.json());

app.use("/api", eventRoutes);

sequelize
  // syncing with the database
  .sync({ force: false })
  .then(() => {
    console.log("Database synced!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Error syncing database:", err));
