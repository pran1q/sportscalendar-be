const express = require("express");
const sequelize = require("./util/database");
const sportRoutes = require("./routes/sportRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", sportRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Error syncing database:", err));
