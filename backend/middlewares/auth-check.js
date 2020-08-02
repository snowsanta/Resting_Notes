const jwt = require("jsonwebtoken");
const userConn = require("../connections/userConn");

// checking authenticity of jwt

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.jwtkey);
    var User = userConn.model("User", require("../routes/models/usermodel"));
    User.findOne({ _id: decoded.userId })
      .exec()
      .then((user) => {
        req.userData = decoded;
        next();
      })
      .catch((err) => res.status(500).json({ err: "User found no more" }));
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
