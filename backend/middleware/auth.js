exports.authUser = (req, res, next) => {
  if (!req.session.user || !req.userId) {
    res.status(400).send("Please login to move forward.");
  }
  next();
};
