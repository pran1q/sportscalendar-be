const express = require("express");
const app = express();

const port = 3000;

const sequelize = require("./util/database");

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(port);
  })
  .catch((err) => console.log(err));
