const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token synchronously (better for middleware flow)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user data properly
    req.user = {
      userId: decoded.userId || decoded.id || decoded._id, // Handle different payload structures
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    // Specific error messages
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.status(500).json({ error: "Authentication failed" });
  }
};
