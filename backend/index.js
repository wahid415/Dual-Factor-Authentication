const express = require("express");
const winston = require("winston");
require("dotenv").config();
require("colors");
require("express-async-error");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const userRoutes = require("./routes/userRoutes");
const verifyRoutes = require("./routes/verifyRoutes");

const dbConnect = require("./utils/db");
const error = require("./middleware/error");

const app = express();

//Wisnton loggin method set up
winston.add(new winston.transports.File({ filename: "logFile.log" }));

//Debugger like console
const startupDebugger = require("debug")("app:startup");

//Setting up body parsing MF
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cors
app.use(cors());

startupDebugger("startup debugger ran..");

//Database cnnection
dbConnect();

//Session set up
const sessionOptions = session({
  secret: "technical test secret",
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

//Use session
app.use(sessionOptions);
app.use((req, res, next) => {
  if (req.session.user) {
    req.userId = req.session.user._id;
  } else {
    req.userId = 0;
  }

  next();
});

//Routes setup
app.use("/api/users", userRoutes);
app.use("/technical-test", verifyRoutes);

//Error MW for loggin errors
app.use(error);

const PORT = process.env.PORT;
app.listen(PORT, () => startupDebugger(`App is listening on port ${PORT}`));
// app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
