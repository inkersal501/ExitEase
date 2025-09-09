const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const config = require("./config/config");
const routes = require("./routes");
// const { jwtStrategy } = require("./config/passport");
// const passport = require("passport");

const app = express();
const PORT = config.port;
const DB_URL = config.mongoose.url;

mongoose
  .connect(DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("Error connecting to DB:", error));

app.use(express.json()); 

app.use(cors({
  origin: config.appURL,
  credentials: true,
})); 

// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

app.use(session({
  secret: config.session_key,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: DB_URL, collectionName: "sessions"}),
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: config.node_env === "production" ? true : false
  }
}));

app.use((req, res, next) => { 
    console.log(`${req.method} ${req.originalUrl}`); 
    next();
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Exit Ease Backend is listening on port ${PORT}`);
});
