const checkAdmin = require("./checkAdmin");

module.exports = (req, res, next) =>
  req.user._id === req.params.id ? next() : checkAdmin(req, res, next);
