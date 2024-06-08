const jwt = require("jsonwebtoken");

const JWT_AUTH = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if the Authorization header exists
    if (!token) {
      console.log("Authorization header missing");
      return res.status(403).json({ message: "JWT not provided" });
    }

    // Log the Authorization header value
    console.log("Authorization header:", token);

    // Extract the token part from the header
    token = token.split(" ")[1];

    // Log the extracted token
    console.log("Extracted token:", token);

    // Verify the token
    const decodedData = jwt.verify(token, process.env.SECRET);

    // Log the decoded data
    console.log("Decoded data:", decodedData);

    req.decodedData = decodedData;

    next();
  } catch (error) {
    // Log the error for debugging
    console.error("Error verifying token:", error);

    res.status(403).json({ message: "Invalid token or token expired" });
  }
};

module.exports = JWT_AUTH;
