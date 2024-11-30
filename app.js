const port = 3000;

// Importing express
const express = require("express");
// Database connection
const sequelize = require("./util/database");

const eventRoutes = require("./routes/eventRoutes");

const app = express();

// Setting Pug as the template engine
app.set("view engine", "pug");
app.set("views", "./views");

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (e.g., CSS) from the public folder
app.use(express.static("public"));

// Routes for API
app.use("/api", eventRoutes);

// Route to render the frontend page
app.get("/", (req, res) => {
  const currentDate = new Date().toLocaleDateString();
  // Example events data; replace with data fetched from your database
  const events = [
    {
      date: "2024-12-01",
      sport: "Football",
      teams: "Salzburg vs. Sturm",
      info: "League Match",
    },
    {
      date: "2024-12-05",
      sport: "Basketball",
      teams: "Lakers vs. Celtics",
      info: "Friendly Match",
    },
  ];
  res.render("index", { currentDate, events });
});

// Syncing with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced!");
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("Error syncing database:", err));
