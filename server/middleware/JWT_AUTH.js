const jwt = require("jsonwebtoken");

const JWT_AUTH = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: `JWT not provider` });

    const decodedData = jwt.verify(token.split(" ")[1], process.env.SECRET);

    console.log(decodedData);

    req.decodedData = decodedData;

    next();
  } catch (error) {
    res.status(403).json({ message: "Khong co token / token da het han" });
  }
};

module.exports = JWT_AUTH;
