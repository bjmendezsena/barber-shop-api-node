const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  // Read token

  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    req.id = id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
