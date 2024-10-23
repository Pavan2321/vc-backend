const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ResUtil = require("../utils/res");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      ResUtil.UNAUTHORIZED(
        req,
        res,
        { error: "Not authorized, token failed" },
        "ERROR"
      );
    }
  } else {
    ResUtil.UNAUTHORIZED(req, res, { error: "No token provided" }, "ERROR");
  }
};

module.exports = { protect };
