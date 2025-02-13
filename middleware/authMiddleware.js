const jwt = require("jsonwebtoken");
const secret = process.env.secret; 
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  console.log("Token received:", token);
  jwt.verify(token.replace("Bearer ", ""), secret, (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
