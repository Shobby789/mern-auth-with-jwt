const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

module.exports.DbConnection = async () => {
  mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "DB connection error"));
  db.once("open", () => console.log("DB connected"));
};
