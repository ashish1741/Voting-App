require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("something went wrong");
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

module.exports = database;
