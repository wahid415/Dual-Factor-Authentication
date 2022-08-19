const mongoose = require("mongoose");
const winston = require("winston");
const dbDebugger = require("debug")("app:db");

const dbConnect = async () => {
  try {
    dbDebugger("Ran DB debugger");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // winston.log({
    //   level: "info",
    //   message: `Database connected: ${conn.connection.host}`.cyan.underline
    //     .bold,
    // });

    winston.info(
      `Database connected: ${conn.connection.host}`.cyan.underline.bold
    );
    return conn;
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
  }
};

module.exports = dbConnect;
