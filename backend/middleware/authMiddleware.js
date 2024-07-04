const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid authorization header" });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "Invalid authorization header" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded._id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ msg: "Problem with decoding token" });
  }
};

module.exports = authMiddleware;
