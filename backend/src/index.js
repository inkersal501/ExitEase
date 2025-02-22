const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");

const app = express();
const port = config.port;
const db = config.mongoose;

mongoose
  .connect(db.url)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("Error connecting to DB:", error));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => { 
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// app.use("/api")

app.listen(port, () => {
  console.log(`Xexit Backend listening on port ${port}`);
});
