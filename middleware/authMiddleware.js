const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  try {
    const authheader = req.headers["authorization"];
    if (!authheader)
      return res.status(400).json({ message: "no token provided" });

    const token = authheader.split(" ")[1];
    if (!token)
      return res.status(400).json({ message: "invalid token format" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "inavild or expried token" });

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
      console.log(error);
    return res.status(500).json({ message: "Server error in auth middleware" });
  }
};
module.exports=authmiddleware