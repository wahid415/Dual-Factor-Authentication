const winston = require("winston");

module.exports = function (err, req, res, next) {
  //Log the error using winston
  winston.error(err.message, err);

  res.status(500).send("Internal Server error: Please contact Admin");
};
