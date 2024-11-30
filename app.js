const express = require("express");
const path = require("path");
const eventRoutes = require("./routes/eventRoutes");
const sportRoutes = require("./routes/sportRoutes");
const { Event, Sport, Venue, EventCategory } = require("./models/models");
const sequelize = require("./util/database");

const app = express();
app.set("view engine", "pug"); // Set Pug as the template engine
app.set("views", path.join(__dirname, "views")); // Set views directory

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/sports", sportRoutes);

// Render the main page with today's events
app.get("/", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const events = await Event.findAll({
      where: sequelize.where(
        sequelize.fn("DATE", sequelize.col("data_time")),
        today
      ),
      include: [
        { model: Sport, as: "sport", attributes: ["name"] },
        { model: Venue, as: "venue", attributes: ["name", "location"] },
        { model: EventCategory, as: "category", attributes: ["name"] },
      ],
    });
    res.render("index", { currentDate: today, events });
  } catch (error) {
    console.error("Error rendering main page:", error);
    res.status(500).send("An error occurred while rendering the page.");
  }
});

const port = 3000;
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
