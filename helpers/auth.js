const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.hasPermissions = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    const isAuth = roles.includes(role);
    if (isAuth) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "You don't have permissions to perform this operation",
        });
    }
  };
};

exports.veryToken = (req, res, next) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) return res.status(401).json(error);

    User.findById(decoded.id).then((user) => {
      req.user = user;
      next();
    });
  });
};
