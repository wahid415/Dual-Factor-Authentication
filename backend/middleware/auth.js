exports.authUser = (req, res, next) => {
  if (!req.session.user || !req.userId) {
    return res.status(400).send("Please login to move forward.");
  }
  next();
};
