const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const { DbConnection } = require("./dbConnection/dbConnection");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db
DbConnection();
app.use("/api", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
