const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization?.split(" ")[1];

  // verify token
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decode) => {
      if (err) {
        return false;
      } else {
        return decode;
      }
    }
  );

  if (verifyToken) {
    // save the user id in the request object
    req.user = verifyToken.id;
    next();
  } else {
    const error = new Error("Not authorized, token failed");
    next(error);
  }
};

module.exports = isAuthenticated;
