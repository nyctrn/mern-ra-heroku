const config = require("config");

const jwt = require("jsonwebtoken");
const envSecret = config.get("JWTSECRET");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "no token provided" });
  }

  try {
    const decoded = jwt.verify(token, envSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
